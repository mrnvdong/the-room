import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInputStore } from '@/stores/useInputStore';
import { useGameStore } from '@/stores/useGameStore';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { resolveCollision } from '@/game/collision/collisionSystem';
import { localAvatarState } from '@/game/avatarState';
import { AvatarModel } from './AvatarModel';

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

  const isSittingOnSofa = useRoomStateStore((state) => state.isSittingOnSofa);
  const setSittingOnSofa = useRoomStateStore((state) => state.setSittingOnSofa);

  const [inputX, inputZ] = moveVector;
  const isMoving = inputX !== 0 || inputZ !== 0;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // If user starts moving while sitting on sofa, stand up automatically
    if (isMoving && isSittingOnSofa) {
      setSittingOnSofa(false);
    }

    if (isSittingOnSofa) {
      // Sitting position on sofa
      positionRef.current = [4.5, 0.1, 2.4];
      groupRef.current.position.set(4.5, 0.1, 2.4);
      currentRotationY.current = -Math.PI / 2;
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
    localAvatarState.isMoving = isMoving && !isSittingOnSofa;
    localAvatarState.isRunning = isRunning && !isSittingOnSofa;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <AvatarModel
        identity={visitorIdentity}
        isMoving={isMoving && !isSittingOnSofa}
        isRunning={isRunning && !isSittingOnSofa}
      />
    </group>
  );
};
