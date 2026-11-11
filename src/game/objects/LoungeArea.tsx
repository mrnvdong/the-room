import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { getAssetUrl } from '@/config/assets';

const SOFA_URL = getAssetUrl('models/sofa_velvet.glb');
const CHAIR_URL = getAssetUrl('models/chair.glb');
const PLANT_URL = getAssetUrl('models/plant.glb');
const TABLE_LARGE_URL = getAssetUrl('models/table_roundlarge.glb');
const TABLE_SMALL_URL = getAssetUrl('models/table_roundsmall.glb');
const TEACUP_URL = getAssetUrl('models/teacup.glb');
const FLOOR_LAMP_URL = getAssetUrl('models/light_floor1.glb');
const VASE_FLOWERS_URL = getAssetUrl('models/vase_flowers.glb');

// Preload models for instant smooth rendering
try {
  useGLTF.preload(SOFA_URL);
  useGLTF.preload(CHAIR_URL);
  useGLTF.preload(PLANT_URL);
  useGLTF.preload(TABLE_LARGE_URL);
  useGLTF.preload(TABLE_SMALL_URL);
  useGLTF.preload(TEACUP_URL);
  useGLTF.preload(FLOOR_LAMP_URL);
  useGLTF.preload(VASE_FLOWERS_URL);
} catch {
  // Ignore in SSR
}

/**
 * Photorealistic Luxury Velvet & Brass Sofa Model (Khronos GlamVelvetSofa)
 */
const LuxuryVelvetSofa: React.FC = () => {
  const { scene } = useGLTF(SOFA_URL);
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

  return (
    <group position={[4.5, 0, 2.7]} rotation={[0, Math.PI, 0]}>
      <primitive object={clonedScene} scale={[1.3, 1.3, 1.3]} />
    </group>
  );
};

/**
 * High-End Designer Lounge Armchair (Khronos SheenChair)
 */
const DesignerLoungeChair: React.FC = () => {
  const { scene } = useGLTF(CHAIR_URL);
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

  return (
    <group position={[2.2, 0, 2.2]} rotation={[0, Math.PI - 0.55, 0]}>
      <primitive object={clonedScene} scale={[1.35, 1.35, 1.35]} />
    </group>
  );
};

/**
 * Photorealistic Biophilic Potted Plant (Khronos DiffuseTransmissionPlant)
 */
const RealisticIndoorPlant: React.FC = () => {
  const { scene } = useGLTF(PLANT_URL);
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

  return (
    <group position={[6.2, 0, 4.3]} rotation={[0, 0.4, 0]}>
      <primitive object={clonedScene} scale={[1.0, 1.0, 1.0]} />
    </group>
  );
};

/**
 * Photorealistic 3D Designer Coffee Tables (Quaternius Interior Pack)
 */
const CoffeeTablesModel: React.FC = () => {
  const largeTable = useGLTF(TABLE_LARGE_URL);
  const smallTable = useGLTF(TABLE_SMALL_URL);

  const clonedLarge = useMemo(() => {
    const clone = largeTable.scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#2d2118'),
          roughness: 0.35,
          metalness: 0.08,
        });
      }
    });
    return clone;
  }, [largeTable.scene]);

  const clonedSmall = useMemo(() => {
    const clone = smallTable.scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#1f1914'),
          roughness: 0.38,
          metalness: 0.1,
        });
      }
    });
    return clone;
  }, [smallTable.scene]);

  return (
    <>
      {/* Primary Coffee Table */}
      <group position={[4.0, 0, 1.0]} rotation={[0, 0.25, 0]}>
        <primitive object={clonedLarge} scale={[0.38, 0.38, 0.38]} />
      </group>

      {/* Secondary Nesting Accent Table */}
      <group position={[5.25, 0, 1.25]} rotation={[0, -0.4, 0]}>
        <primitive object={clonedSmall} scale={[0.32, 0.32, 0.32]} />
      </group>
    </>
  );
};

/**
 * Authentic Ceramic Teacup with Saucer (Khronos DiffuseTransmissionTeacup)
 */
const TabletopTeacupModel: React.FC = () => {
  const { scene } = useGLTF(TEACUP_URL);
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

  return (
    <group position={[3.85, 0.42, 0.95]} rotation={[0, 0.6, 0]}>
      <primitive object={clonedScene} scale={[1.3, 1.3, 1.3]} />
    </group>
  );
};

/**
 * Photorealistic Glass Vase with Fresh Flowers on the Side Table
 */
const TabletopFlowersModel: React.FC = () => {
  const { scene } = useGLTF(VASE_FLOWERS_URL);
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

  return (
    <group position={[5.25, 0.37, 1.25]} rotation={[0, 1.1, 0]}>
      <primitive object={clonedScene} scale={[1.4, 1.4, 1.4]} />
    </group>
  );
};

/**
 * Photorealistic Designer Floor Standing Lamp
 */
const FloorLampModel: React.FC = () => {
  const { scene } = useGLTF(FLOOR_LAMP_URL);
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material;
        if (mat instanceof THREE.MeshStandardMaterial && mat.name.toLowerCase().includes('light')) {
          mat.color = new THREE.Color('#fffbeb');
          mat.emissive = new THREE.Color('#f59e0b');
          mat.emissiveIntensity = 2.2;
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <group position={[6.2, 0, 1.9]} rotation={[0, -Math.PI / 4, 0]}>
      <primitive object={clonedScene} scale={[1.15, 1.15, 1.15]} />
      {/* Warm Ambient Lamp Shade Light Spill */}
      <pointLight position={[0, 1.6, 0]} color="#fbbf24" intensity={1.8} distance={4.5} decay={2} />
    </group>
  );
};

export const LoungeArea: React.FC = () => {
  return (
    <group>
      {/* =========================================================================
          1. DESIGNER HAND-TUFTED GEOMETRIC WOOL RUG
      ========================================================================= */}
      <mesh receiveShadow position={[4.5, 0.006, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 5.2]} />
        <meshStandardMaterial color="#1a1c23" roughness={0.95} />
      </mesh>
      {/* Sculpted Low-Pile Border Accent Line */}
      <mesh receiveShadow position={[4.5, 0.007, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.75, 1.78, 36]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.8} />
      </mesh>

      {/* =========================================================================
          2. PHOTOREALISTIC FURNITURE & ACCESSORIES (SOFA, ARMCHAIR, TABLES, LAMP)
      ========================================================================= */}
      <Suspense fallback={null}>
        <LuxuryVelvetSofa />
        <DesignerLoungeChair />
        <RealisticIndoorPlant />
        <CoffeeTablesModel />
        <TabletopTeacupModel />
        <TabletopFlowersModel />
        <FloorLampModel />
      </Suspense>

      {/* =========================================================================
          3. "THE FRAME" LIFESTYLE 75" ART OLED TV & MINIMALIST SOUNDBAR
      ========================================================================= */}
      <group position={[6.92, 2.2, 2.6]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Beveled Natural Oak Frame Molding */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.52, 1.48, 0.04]} />
          <meshStandardMaterial color="#c29463" roughness={0.4} />
        </mesh>
        {/* Anti-Glare Mat Border */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[2.42, 1.38]} />
          <meshStandardMaterial color="#090a0f" roughness={0.5} />
        </mesh>
        {/* OLED Art Display */}
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[2.3, 1.26]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#1e3a8a"
            emissiveIntensity={0.65}
            roughness={0.1}
          />
        </mesh>
        {/* Ambient Backlight strip washing the wall */}
        <pointLight position={[0, 0, -0.1]} color="#38bdf8" intensity={0.6} distance={2.0} />

        {/* Slim Acoustic Fabric Soundbar mounted below */}
        <group position={[0, -0.85, 0.02]}>
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.08, 0.08]} />
            <meshStandardMaterial color="#1e2430" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.042]}>
            <boxGeometry args={[1.56, 0.06, 0.005]} />
            <meshStandardMaterial color="#334155" roughness={0.9} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
