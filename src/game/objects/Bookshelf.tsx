import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { getAssetUrl } from '@/config/assets';

const SHELF_URL = getAssetUrl('models/shelf_large.glb');
const VASE_FLOWERS_URL = getAssetUrl('models/vase_flowers.glb');

try {
  useGLTF.preload(SHELF_URL);
  useGLTF.preload(VASE_FLOWERS_URL);
} catch {
  // Ignore in SSR
}

/**
 * Photorealistic Architectural Modular Library Shelving Unit
 */
const ShelfModel: React.FC = () => {
  const { scene } = useGLTF(SHELF_URL);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Apply high-end architectural walnut wood PBR material
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#2e1f16'),
          roughness: 0.45,
          metalness: 0.05,
        });
      }
    });
    return clone;
  }, [scene]);

  // Scaled ~0.65 to fit height ~2.88m, positioned flush against back wall
  return (
    <primitive
      object={clonedScene}
      scale={[0.65, 0.65, 0.65]}
      position={[0.35, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

/**
 * Photorealistic Glass Vase with Fresh Flowers (Khronos GlassVaseFlowers)
 */
const VaseFlowersModel: React.FC = () => {
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
    <group position={[-0.45, 1.48, 0.08]} rotation={[0, 0.8, 0]}>
      <primitive object={clonedScene} scale={[2.0, 2.0, 2.0]} />
    </group>
  );
};

export const Bookshelf: React.FC = () => {
  return (
    <group position={[-0.2, 0, -5.5]}>
      {/* =========================================================================
          1. REAL 3D ARCHITECTURAL LIBRARY BOOKCASE UNIT
      ========================================================================= */}
      <Suspense fallback={null}>
        <ShelfModel />
        <VaseFlowersModel />
      </Suspense>

      {/* Recessed Architectural Plinth Toe-Kick */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[2.5, 0.06, 0.52]} />
        <meshStandardMaterial color="#11141a" roughness={0.7} />
      </mesh>

      {/* Under-shelf Warm Architectural Accent LED Glow Strips */}
      {[0.75, 1.42, 2.1, 2.78].map((y, idx) => (
        <group key={idx} position={[0, y, 0.15]}>
          <mesh>
            <boxGeometry args={[2.2, 0.008, 0.02]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={1.3}
            />
          </mesh>
        </group>
      ))}

      {/* Warm Ambient Shelf Light Spill */}
      <pointLight
        position={[0, 1.8, 0.35]}
        color="#f59e0b"
        intensity={0.8}
        distance={3.2}
        decay={2}
      />

      {/* =========================================================================
          2. HARDCOVER TECHNICAL VOLUMES & LITERATURE ON SHELVES
      ========================================================================= */}
      {/* Lower Shelf Volumes */}
      <group position={[-0.85, 0.78, 0.05]}>
        {[
          { color: '#b91c1c', w: 0.065, h: 0.35, d: 0.28, title: '#fde047' },
          { color: '#1e3a8a', w: 0.075, h: 0.38, d: 0.3, title: '#93c5fd' },
          { color: '#065f46', w: 0.06, h: 0.33, d: 0.27, title: '#6ee7b7' },
          { color: '#78350f', w: 0.08, h: 0.4, d: 0.31, title: '#fde68a' },
          { color: '#581c87', w: 0.07, h: 0.36, d: 0.28, title: '#d8b4fe' },
          { color: '#0e7490', w: 0.065, h: 0.34, d: 0.26, title: '#67e8f9' },
          { color: '#1f2937', w: 0.085, h: 0.39, d: 0.29, title: '#e5e7eb' },
        ].map((book, i) => (
          <group key={i} position={[i * 0.09, book.h / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[book.w, book.h, book.d]} />
              <meshStandardMaterial color={book.color} roughness={0.35} />
            </mesh>
            {/* Gilded Spine Title */}
            <mesh position={[0, 0, book.d / 2 + 0.001]}>
              <planeGeometry args={[book.w * 0.6, book.h * 0.7]} />
              <meshStandardMaterial color={book.title} roughness={0.2} metalness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Leaning Volume */}
        <mesh castShadow position={[0.72, 0.17, 0]} rotation={[0, 0, -0.24]}>
          <boxGeometry args={[0.065, 0.37, 0.28]} />
          <meshStandardMaterial color="#be123c" roughness={0.35} />
        </mesh>

        {/* Solid Brass Sculptural Bookend */}
        <mesh castShadow position={[0.88, 0.12, 0]}>
          <boxGeometry args={[0.08, 0.24, 0.22]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Middle-Right Shelf: Design Monographs & Architecture Folios */}
      <group position={[0.2, 1.48, 0.05]}>
        {[
          { color: '#0f172a', w: 0.07, h: 0.36, d: 0.28 },
          { color: '#334155', w: 0.08, h: 0.39, d: 0.3 },
          { color: '#475569', w: 0.075, h: 0.35, d: 0.27 },
          { color: '#d97706', w: 0.065, h: 0.33, d: 0.26 },
        ].map((book, i) => (
          <mesh key={i} castShadow position={[i * 0.085, book.h / 2, 0]}>
            <boxGeometry args={[book.w, book.h, book.d]} />
            <meshStandardMaterial color={book.color} roughness={0.4} />
          </mesh>
        ))}

        {/* Horizontal Stack of Art Catalogues */}
        <group position={[0.48, 0, 0]}>
          {[0.04, 0.08, 0.12].map((y, idx) => (
            <mesh key={idx} castShadow position={[0, y, 0]} rotation={[0, (idx - 1) * 0.08, 0]}>
              <boxGeometry args={[0.24, 0.035, 0.3]} />
              <meshStandardMaterial
                color={idx === 0 ? '#1e293b' : idx === 1 ? '#e2e8f0' : '#b45309'}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
