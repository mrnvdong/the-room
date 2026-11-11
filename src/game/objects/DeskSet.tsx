import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { getAssetUrl } from '@/config/assets';

const DESK_MODEL_URL = getAssetUrl('models/desk.glb');
const DESK_LAMP_URL = getAssetUrl('models/light_desk.glb');
const TRASHCAN_URL = getAssetUrl('models/trashcan_cylindric.glb');
const DRACO_URL = getAssetUrl('draco/');

try {
  useGLTF.preload(DESK_MODEL_URL, DRACO_URL);
  useGLTF.preload(DESK_LAMP_URL);
  useGLTF.preload(TRASHCAN_URL);
} catch {
  // Ignore in SSR
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

/**
 * Photorealistic 3D Articulated Desk Lamp (Interactive Toggle)
 */
const PhotorealisticDeskLamp: React.FC<{ lampOn: boolean }> = ({ lampOn }) => {
  const { scene } = useGLTF(DESK_LAMP_URL);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const mat = mesh.material;
        if (mat instanceof THREE.MeshStandardMaterial) {
          if (mesh.name === 'Light_Desk_3' || mat.name.toLowerCase().includes('white')) {
            mat.color = new THREE.Color(lampOn ? '#fffbeb' : '#475569');
            mat.emissive = new THREE.Color(lampOn ? '#fef08a' : '#000000');
            mat.emissiveIntensity = lampOn ? 2.5 : 0;
          } else if (mat.name.toLowerCase().includes('black')) {
            mat.color = new THREE.Color('#0f172a');
            mat.metalness = 0.8;
            mat.roughness = 0.25;
          }
        }
      }
    });
    return clone;
  }, [scene, lampOn]);

  return (
    <group position={[-0.72, 0.74, -0.22]} rotation={[0, 0.65, 0]}>
      <primitive object={clonedScene} scale={[0.62, 0.62, 0.62]} />
      {lampOn && (
        <spotLight
          position={[0, 0.35, 0.15]}
          target-position={[0.3, 0, 0.2]}
          color="#fffbeb"
          intensity={2.8}
          angle={0.65}
          penumbra={0.7}
          distance={3.5}
        />
      )}
    </group>
  );
};

/**
 * Photorealistic Brushed Steel Wastepaper Bin Beside Desk
 */
const WasteBinModel: React.FC = () => {
  const { scene } = useGLTF(TRASHCAN_URL);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#1e293b'),
          metalness: 0.85,
          roughness: 0.25,
        });
      }
    });
    return clone;
  }, [scene]);

  return (
    <group position={[-1.15, 0, 0.35]} rotation={[0, 0.2, 0]}>
      <primitive object={clonedScene} scale={[0.38, 0.38, 0.38]} />
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
        <PhotorealisticDeskLamp lampOn={deskLampOn} />
        <WasteBinModel />
      </Suspense>

      {/* Under-Desk Designer Wool Runner */}
      <mesh receiveShadow position={[0, 0.005, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 2.0]} />
        <meshStandardMaterial color="#181c24" roughness={0.9} />
      </mesh>

      {/* =========================================================================
          2. SECRET DRAWER DIGITAL KEYPAD VAULT LOCK (Interactive)
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
