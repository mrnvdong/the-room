import React, { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { getAssetUrl } from '@/config/assets';

const SERVER_RACK_URL = getAssetUrl('models/server_rack.glb');

try {
  useGLTF.preload(SERVER_RACK_URL);
} catch {
  // Ignore in SSR
}

/**
 * Photorealistic Enterprise 42U Server Rack Model
 * Authentic steel enclosure with server chassis, rack rails, fan vents, and active LED matrix
 */
const ServerRackModel: React.FC = () => {
  const { scene } = useGLTF(SERVER_RACK_URL);
  const statusLedsRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Enhance materials with rich PBR properties
        const mat = mesh.material;
        if (mat instanceof THREE.MeshStandardMaterial) {
          const matName = mat.name.toLowerCase();
          if (matName.includes('navy') || matName.includes('cube')) {
            // High-density matte powder-coated chassis steel
            mat.color = new THREE.Color('#0c0f16');
            mat.metalness = 0.85;
            mat.roughness = 0.28;
          } else if (matName.includes('steel') || matName.includes('teal')) {
            // Brushed aluminum equipment rails
            mat.color = new THREE.Color('#1e293b');
            mat.metalness = 0.9;
            mat.roughness = 0.2;
          } else if (matName.includes('lime') || matName.includes('status')) {
            // Server network & power activity status LEDs
            mat.color = new THREE.Color('#22c55e');
            mat.emissive = new THREE.Color('#22c55e');
            mat.emissiveIntensity = 2.4;
            mat.toneMapped = false;
            statusLedsRef.current = mat;
          } else if (matName.includes('orange') || matName.includes('safety')) {
            // Disk drive array I/O activity LEDs
            mat.color = new THREE.Color('#f97316');
            mat.emissive = new THREE.Color('#f97316');
            mat.emissiveIntensity = 2.0;
            mat.toneMapped = false;
          } else if (matName.includes('fan')) {
            // Exhaust fan vents
            mat.color = new THREE.Color('#05070a');
            mat.metalness = 0.95;
            mat.roughness = 0.15;
          } else if (matName.includes('trim') || matName.includes('recess')) {
            mat.color = new THREE.Color('#0f172a');
            mat.metalness = 0.7;
            mat.roughness = 0.35;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  // Subtle realistic network activity LED flickering
  useFrame(({ clock }) => {
    if (statusLedsRef.current) {
      const t = clock.getElapsedTime();
      const flicker = 2.0 + Math.sin(t * 12) * 0.4 + Math.cos(t * 23) * 0.3;
      statusLedsRef.current.emissiveIntensity = flicker;
    }
  });

  return (
    <primitive
      object={clonedScene}
      scale={[1.35, 1.35, 1.35]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

export const ServerRack: React.FC = () => {
  return (
    <group position={[5.4, 0, -4.4]} rotation={[0, -0.22, 0]}>
      {/* =========================================================================
          1. PHOTOREALISTIC 42U ENTERPRISE SERVER ENCLOSURE
      ========================================================================= */}
      <Suspense fallback={null}>
        <ServerRackModel />
      </Suspense>

      {/* Heavy Steel Server Anti-Vibration Base Mat */}
      <mesh receiveShadow position={[0, 0.006, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.95} />
      </mesh>

      {/* Internal Rack Ambient Glow (Cool Enterprise Cyan / Blue Light Spill) */}
      <pointLight
        position={[0, 1.2, 0.3]}
        color="#38bdf8"
        intensity={1.2}
        distance={2.8}
        decay={2}
      />

      {/* Top Exhaust Vent Hot-Aisle Accent Light */}
      <pointLight
        position={[0, 2.3, -0.3]}
        color="#0284c7"
        intensity={0.6}
        distance={2.0}
        decay={2}
      />
    </group>
  );
};
