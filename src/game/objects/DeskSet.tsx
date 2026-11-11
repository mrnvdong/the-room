import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { getAssetUrl } from '@/config/assets';

const DESK_MODEL_URL = getAssetUrl('models/desk.glb');
const DRACO_URL = getAssetUrl('draco/');

try {
  useGLTF.preload(DESK_MODEL_URL, DRACO_URL);
} catch {
  // Ignore in SSR/offline
}

/**
 * Genuine Photorealistic Workstation Desk & Chair Model
 * Authentic wooden executive desk, ergonomic chair with cushion, monitor, CPU tower, keyboard, mouse, books & accessories
 */
const PhotorealisticDeskModel: React.FC = () => {
  const { scene } = useGLTF(DESK_MODEL_URL, DRACO_URL);
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Scaled ~0.041 to match real human proportions (desk height 0.74m, chair seat 0.45m)
  // Rotated -Math.PI / 2 so chair is in front (+Z) and monitor is at back (-Z)
  return (
    <group position={[0, 0.595, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={clonedScene} scale={[0.041, 0.041, 0.041]} />
    </group>
  );
};

export const DeskSet: React.FC = () => {
  const deskLampOn = useRoomStateStore((state) => state.deskLampOn);
  const secretDrawerUnlocked = useRoomStateStore((state) => state.secretDrawerUnlocked);

  return (
    <group position={[-4.7, 0, -3.2]}>
      {/* =========================================================================
          1. REAL 3D WORKSTATION DESK, ERGONOMIC CHAIR & COMPUTER SYSTEM
      ========================================================================= */}
      <Suspense fallback={null}>
        <PhotorealisticDeskModel />
      </Suspense>

      {/* Under-Desk Designer Wool Runner */}
      <mesh receiveShadow position={[0, 0.005, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.0, 1.8]} />
        <meshStandardMaterial color="#181c24" roughness={0.9} />
      </mesh>

      {/* =========================================================================
          2. ARCHITECTURAL BALANCED-ARM DESK TASK LAMP (Interactive)
      ========================================================================= */}
      <group position={[-0.55, 0.74, -0.2]}>
        {/* Heavy Cast Iron Base */}
        <mesh position={[0, 0.012, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 20]} />
          <meshStandardMaterial color="#1e2532" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Twin Balanced Articulated Arms */}
        <group position={[0, 0.18, 0]} rotation={[0.2, 0, 0]}>
          <mesh position={[-0.012, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.35, 10]} />
            <meshStandardMaterial color="#1e2532" metalness={0.9} />
          </mesh>
          <mesh position={[0.012, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.35, 10]} />
            <meshStandardMaterial color="#1e2532" metalness={0.9} />
          </mesh>
        </group>
        {/* Brass Hinge Joint */}
        <mesh position={[0, 0.35, 0.07]}>
          <sphereGeometry args={[0.016, 12, 12]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Upper Arm Segment */}
        <group position={[0, 0.48, 0.02]} rotation={[-0.35, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.006, 0.006, 0.3, 10]} />
            <meshStandardMaterial color="#1e2532" metalness={0.9} />
          </mesh>
        </group>
        {/* LED Lamp Head */}
        <group position={[0, 0.6, -0.05]} rotation={[0.4, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.18, 0.02, 0.045]} />
            <meshStandardMaterial
              color={deskLampOn ? '#fbbf24' : '#64748b'}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* LED Diffuser Lens */}
          <mesh position={[0, -0.011, 0]}>
            <planeGeometry args={[0.16, 0.035]} />
            <meshStandardMaterial
              color="#fffbeb"
              emissive={deskLampOn ? '#fef08a' : '#000000'}
              emissiveIntensity={deskLampOn ? 2.5 : 0}
            />
          </mesh>
        </group>
        {deskLampOn && (
          <spotLight
            position={[0, 0.58, -0.05]}
            target-position={[0, 0, 0]}
            color="#fffbeb"
            intensity={2.8}
            angle={0.65}
            penumbra={0.7}
            distance={3.5}
          />
        )}
      </group>

      {/* =========================================================================
          3. SECRET DRAWER DIGITAL KEYPAD VAULT LOCK (Interactive)
      ========================================================================= */}
      <group position={[0.55, 0.25, -0.1]}>
        <mesh>
          <boxGeometry args={[0.11, 0.08, 0.012]} />
          <meshStandardMaterial color="#090d14" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* LED Status Ring */}
        <mesh position={[0, 0, 0.007]}>
          <circleGeometry args={[0.02, 16]} />
          <meshStandardMaterial
            color={secretDrawerUnlocked ? '#10b981' : '#f59e0b'}
            emissive={secretDrawerUnlocked ? '#10b981' : '#f59e0b'}
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>
    </group>
  );
};
