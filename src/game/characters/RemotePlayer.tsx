import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { RemotePlayer as RemotePlayerType } from '@/stores/useMultiplayerStore';
import { AvatarModel } from './AvatarModel';
import { VISITOR_IDENTITIES } from '@/features/visitor/identityData';
import { CHARACTER_ACTIONS } from '@/features/character/characterActions';

interface RemotePlayerProps {
  player: RemotePlayerType;
}

export const RemotePlayer: React.FC<RemotePlayerProps> = ({ player }) => {
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(...player.position));
  const currentRotY = useRef(player.rotationY);

  const identityConfig =
    VISITOR_IDENTITIES[player.identity] || VISITOR_IDENTITIES.visitor;

  const activeActionDef = player.currentAction ? CHARACTER_ACTIONS[player.currentAction] : null;
  const isChatVisible = Boolean(
    player.chatMessage && (!player.chatExpiresAt || player.chatExpiresAt > Date.now())
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // 1. Smooth position interpolation (lerp) towards latest network target
    const targetPos = new THREE.Vector3(...player.position);
    currentPos.current.lerp(targetPos, 1 - Math.exp(-12 * delta));
    groupRef.current.position.copy(currentPos.current);

    // 2. Smooth rotation towards movement facing angle
    if (player.rotationY !== undefined) {
      let diff = player.rotationY - currentRotY.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      currentRotY.current += diff * (1 - Math.exp(-15 * delta));
      groupRef.current.rotation.y = currentRotY.current;
    }
  });

  return (
    <group ref={groupRef} position={player.position}>
      {/* 3D Model with identity styling, action poses, and limb kinematics */}
      <AvatarModel
        identity={player.identity}
        isMoving={player.isMoving}
        isRunning={player.isRunning}
        currentAction={player.currentAction}
        actionStartTime={player.actionStartTime}
        isSitting={player.isSitting}
      />

      {/* Floating 3D Speech Bubble, Action Badge & Nametag above player's head */}
      <Html
        position={[0, 2.1, 0]}
        center
        zIndexRange={[10, 0]}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center">
          {/* Real-time In-Room Speech Bubble */}
          {isChatVisible && (
            <div className="mb-1 max-w-[220px] px-3 py-1.5 rounded-2xl bg-white text-slate-900 border-2 border-emerald-400 shadow-2xl text-xs font-semibold text-center animate-bounce-short">
              <span>{player.chatMessage}</span>
              <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white mx-auto -mb-2 mt-0.5" />
            </div>
          )}

          {/* Active Emote Action Badge */}
          {activeActionDef && (
            <div className="mb-1 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-bold text-[11px] shadow-lg animate-pulse">
              <span>{activeActionDef.emoji}</span>
              <span>{activeActionDef.labelVi}</span>
            </div>
          )}

          {/* Nametag & Role Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white border border-sky-400/40 shadow-xl backdrop-blur-md whitespace-nowrap">
            <span className="text-xs">{identityConfig.badge}</span>
            <span className="text-[11px] font-bold text-white tracking-wide">
              {player.nickname}
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-medium">
              {identityConfig.nameVi}
            </span>
          </div>
          {/* Downward indicator triangle */}
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900/90 -mt-0.5" />
        </div>
      </Html>
    </group>
  );
};
