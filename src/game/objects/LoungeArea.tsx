import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { getAssetUrl } from '@/config/assets';

const SOFA_URL = getAssetUrl('models/sofa_velvet.glb');
const CHAIR_URL = getAssetUrl('models/chair.glb');
const PLANT_URL = getAssetUrl('models/plant.glb');

// Preload models for seamless instant rendering
try {
  useGLTF.preload(SOFA_URL);
  useGLTF.preload(CHAIR_URL);
  useGLTF.preload(PLANT_URL);
} catch {
  // Ignore in SSR/offline
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

  // Position centered at [4.5, 0, 2.7], rotated Math.PI to face coffee table and TV (-Z)
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

  // Positioned on the left flank of the lounge [2.2, 0, 2.2], angled inwards towards coffee table
  return (
    <group position={[2.2, 0, 2.2]} rotation={[0, Math.PI - 0.55, 0]}>
      <primitive object={clonedScene} scale={[1.35, 1.35, 1.35]} />
    </group>
  );
};

/**
 * Organic Photorealistic Biophilic Potted Plant (Khronos DiffuseTransmissionPlant)
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

  // Positioned naturally in the lush lounge corner [6.2, 0, 4.3]
  return (
    <group position={[6.2, 0, 4.3]} rotation={[0, 0.4, 0]}>
      <primitive object={clonedScene} scale={[1.0, 1.0, 1.0]} />
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
          2. PHOTOREALISTIC LUXURY VELVET SOFA & DESIGNER ARMCHAIR
      ========================================================================= */}
      <Suspense fallback={null}>
        <LuxuryVelvetSofa />
        <DesignerLoungeChair />
        <RealisticIndoorPlant />
      </Suspense>

      {/* =========================================================================
          3. TIERED NESTING MARBLE & FLUTED TAMBOUR COFFEE TABLES
      ========================================================================= */}
      {/* Primary Table: Italian Carrara Marble Slab & Brass Bevel */}
      <group position={[4.05, 0, 0.9]}>
        {/* Polished White Carrara Marble Disc */}
        <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.035, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.18} metalness={0.08} />
        </mesh>
        {/* Brushed Brass Bullnose Outer Rim */}
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.63, 0.63, 0.036, 32]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.2} />
        </mesh>
        {/* Minimalist 3-Leg Tripod with Brass Ferrule Shoes */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
          const legX = Math.cos(angle) * 0.45;
          const legZ = Math.sin(angle) * 0.45;
          return (
            <group key={idx} position={[legX, 0.18, legZ]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.018, 0.014, 0.36, 12]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.25} />
              </mesh>
              {/* Brass Ferrule Cap */}
              <mesh position={[0, -0.155, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.05, 12]} />
                <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
              </mesh>
            </group>
          );
        })}

        {/* Artisanal Ceramic Coffee Cup, Saucer & Spoon */}
        <group position={[-0.15, 0.4, 0.1]}>
          <mesh position={[0, 0.008, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.015, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.045, 0.035, 0.07, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          {/* Rich Espresso Crema */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.005, 16]} />
            <meshStandardMaterial color="#451a03" roughness={0.1} />
          </mesh>
        </group>

        {/* Minimalist Hardcover Architecture Monograph Book */}
        <mesh castShadow position={[0.18, 0.41, -0.05]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.3, 0.026, 0.4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
      </group>

      {/* Secondary Lower Table: Fluted Tambour Oak Base + Smoked Glass Top */}
      <group position={[5.15, 0, 1.15]}>
        {/* Tinted Smoked Bronze Glass Top */}
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.025, 32]} />
          <meshPhysicalMaterial
            color="#090a0f"
            roughness={0.08}
            transmission={0.75}
            transparent
            opacity={0.88}
            ior={1.5}
          />
        </mesh>
        {/* Fluted Tambour Oak Drum Base with Vertical Ribs */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.25, 0.27, 0.28, 28]} />
          <meshStandardMaterial color="#2c1f15" roughness={0.5} />
        </mesh>
        {/* Sculptured Brass Catchall Tray */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.12, 0.11, 0.018, 20]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* =========================================================================
          4. "THE FRAME" LIFESTYLE 75" ART OLED TV & MINIMALIST SOUNDBAR
      ========================================================================= */}
      <group position={[6.92, 2.2, 2.6]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Beveled Natural Oak Frame Molding */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.52, 1.48, 0.04]} />
          <meshStandardMaterial color="#d4a373" roughness={0.4} />
        </mesh>
        {/* Museum Anti-Glare Mat Border */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[2.42, 1.38]} />
          <meshStandardMaterial color="#090a0f" roughness={0.5} />
        </mesh>
        {/* OLED Art Display (Fine Art Coastal Landscape) */}
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

      {/* =========================================================================
          5. SMART HI-FI AUDIOPHILE TOWER SPEAKER
      ========================================================================= */}
      <group position={[6.4, 0, 0.5]}>
        {/* Cast Aluminum Base Ring with Brass Isolation Spikes */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 0.04, 24]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Acoustic Woven Fabric Column */}
        <mesh castShadow position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.88, 24]} />
          <meshStandardMaterial color="#1e2430" roughness={0.8} />
        </mesh>
        {/* Top Brushed Metal Touch Controller Panel */}
        <mesh position={[0, 0.93, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 24]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Cyan Ambient Status LED Ring */}
        <mesh position={[0, 0.941, 0]}>
          <ringGeometry args={[0.08, 0.1, 24]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};
