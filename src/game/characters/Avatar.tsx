import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useInputStore } from '@/stores/useInputStore';
import { useGameStore } from '@/stores/useGameStore';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { useMultiplayerStore } from '@/stores/useMultiplayerStore';
import { resolveCollision } from '@/game/collision/collisionSystem';
import { localAvatarState } from '@/game/avatarState';
import { AvatarModel } from './AvatarModel';
import { VISITOR_IDENTITIES } from '@/features/visitor/identityData';
import { CHARACTER_ACTIONS } from '@/features/character/characterActions';

interface AvatarProps {
  positionRef: React.MutableRefObject<[number, number, number]>;
}

export const Avatar: React.FC<AvatarProps> = ({ positionRef }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const currentRotationY = useRef(0);

  const moveVector = useInputStore((state) => state.moveVector);
  const isRunning = useInputStore((state) => state.isRunning);
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);
  const visitorNickname = useGameStore((state) => state.visitorNickname);

  const isSittingOnSofa = useRoomStateStore((state) => state.isSittingOnSofa);
  const setSittingOnSofa = useRoomStateStore((state) => state.setSittingOnSofa);

  const isLocalSitting = useMultiplayerStore((state) => state.isLocalSitting);
  const setLocalSitting = useMultiplayerStore((state) => state.setLocalSitting);
  const localAction = useMultiplayerStore((state) => state.localAction);
  const localActionStartTime = useMultiplayerStore((state) => state.localActionStartTime);
  const localChatMessage = useMultiplayerStore((state) => state.localChatMessage);

  const [inputX, inputZ] = moveVector;
  const isMoving = inputX !== 0 || inputZ !== 0;

  const identityConfig = VISITOR_IDENTITIES[visitorIdentity] || VISITOR_IDENTITIES.visitor;
  const activeActionDef = localAction ? CHARACTER_ACTIONS[localAction] : null;

  // Sync sofa state with local sitting
  useEffect(() => {
    if (isSittingOnSofa && !isLocalSitting) {
      setLocalSitting(true);
    }
  }, [isSittingOnSofa, isLocalSitting, setLocalSitting]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // If user starts moving while sitting, stand up automatically
    if (isMoving && (isLocalSitting || isSittingOnSofa)) {
      setLocalSitting(false);
      setSittingOnSofa(false);
    }

    if (isLocalSitting || isSittingOnSofa) {
      // Check if near sofa [4.5, 2.4] or desk chair [-4.7, -2.0]
      const [currX, , currZ] = positionRef.current;
      const distToSofa = Math.hypot(currX - 4.5, currZ - 2.4);
      const distToDeskChair = Math.hypot(currX - (-4.7), currZ - (-2.0));

      if (distToSofa < 2.0 || isSittingOnSofa) {
        // Sofa Seat
        positionRef.current = [4.5, 0.1, 2.4];
        currentRotationY.current = -Math.PI / 2;
      } else if (distToDeskChair < 1.8) {
        // Desk Ergonomic Chair
        positionRef.current = [-4.7, 0.1, -2.0];
        currentRotationY.current = 0;
      }
      // Otherwise sit right where standing!

      groupRef.current.position.set(positionRef.current[0], positionRef.current[1], positionRef.current[2]);
      groupRef.current.rotation.y = currentRotationY.current;

      localAvatarState.position = positionRef.current;
      localAvatarState.rotationY = currentRotationY.current;
      localAvatarState.isMoving = false;
      localAvatarState.isRunning = false;
      return;
    }

    // Movement speed
    const baseSpeed = isRunning ? 5.6 : 3.2;
    const speed = baseSpeed * delta;

    if (isMoving) {
      // Transform input vector relative to camera yaw
      const camForward = new THREE.Vector3();
      camera.getWorldDirection(camForward);
      camForward.y = 0;
      camForward.normalize();

      const camRight = new THREE.Vector3();
      camRight.crossVectors(new THREE.Vector3(0, 1, 0), camForward).normalize();

      const worldDir = new THREE.Vector3()
        .addScaledVector(camForward, -inputZ)
        .addScaledVector(camRight, -inputX)
        .normalize();

      const [currX, currY, currZ] = positionRef.current;
      const targetX = currX + worldDir.x * speed;
      const targetZ = currZ + worldDir.z * speed;

      // Sliding collision resolution
      const [resolvedX, resolvedZ] = resolveCollision(currX, currZ, targetX, targetZ);
      positionRef.current = [resolvedX, currY, resolvedZ];
      groupRef.current.position.set(resolvedX, currY, resolvedZ);

      // Rotate towards actual movement direction
      const actualDx = resolvedX - currX;
      const actualDz = resolvedZ - currZ;
      if (Math.hypot(actualDx, actualDz) > 0.001) {
        const targetAngle = Math.atan2(actualDx, actualDz);
        let diff = targetAngle - currentRotationY.current;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        currentRotationY.current += diff * (1 - Math.exp(-15 * delta));
        groupRef.current.rotation.y = currentRotationY.current;
      }
    } else {
      const [cx, cy, cz] = positionRef.current;
      groupRef.current.position.set(cx, cy, cz);
    }

    localAvatarState.position = positionRef.current;
    localAvatarState.rotationY = currentRotationY.current;
    localAvatarState.isMoving = isMoving;
    localAvatarState.isRunning = isRunning && isMoving;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <AvatarModel
        identity={visitorIdentity}
        isMoving={isMoving && !isLocalSitting}
        isRunning={isRunning && !isLocalSitting}
        currentAction={localAction}
        actionStartTime={localActionStartTime}
        isSitting={isLocalSitting || isSittingOnSofa}
      />

      {/* Floating 3D Speech Bubble & Emote Feedback above Local Avatar */}
      <Html
        position={[0, 1.95, 0]}
        center
        distanceFactor={7}
        zIndexRange={[10, 0]}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center">
          {/* Active Speech Bubble */}
          {localChatMessage && (
            <div className="mb-2 max-w-[240px] px-3 py-1.5 rounded-2xl bg-white text-slate-900 border-2 border-sky-400 shadow-2xl text-xs font-medium text-center animate-bounce-short">
              <span>{localChatMessage}</span>
              {/* Speech pointer */}
              <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white mx-auto -mb-2 mt-0.5" />
            </div>
          )}

          {/* Active Action Emote Badge */}
          {activeActionDef && (
            <div className="mb-1.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-bold text-[11px] shadow-lg animate-pulse">
              <span>{activeActionDef.emoji}</span>
              <span>{activeActionDef.labelVi}</span>
            </div>
          )}

          {/* Local Name Badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 text-white border border-sky-400/30 text-[10px] backdrop-blur-md">
            <span>{identityConfig.badge}</span>
            <span className="font-semibold">{visitorNickname || 'You'}</span>
            <span className="text-[9px] text-sky-300 font-mono">({identityConfig.nameVi})</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
