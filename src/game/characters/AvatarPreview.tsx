import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VisitorIdentity } from '@/types';
import { AvatarModel } from './AvatarModel';

interface AvatarPreviewProps {
  identity: VisitorIdentity;
}

const Turntable: React.FC<{ identity: VisitorIdentity }> = ({ identity }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // Gentle auto-spin
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.85, 0]}>
      <AvatarModel identity={identity} isTurntablePreview />
    </group>
  );
};

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({ identity }) => {
  return (
    <div className="w-full h-56 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden relative shadow-inner">
      <Canvas
        camera={{ position: [0, 0.1, 2.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            'webglcontextlost',
            (e) => e.preventDefault(),
            false
          );
        }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[2, 3, 3]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-2, 1, 2]} intensity={1.0} color="#38bdf8" />
        <Turntable identity={identity} />
      </Canvas>
      <div className="absolute bottom-2 inset-x-0 text-center text-[10px] text-slate-400 font-mono tracking-wider uppercase pointer-events-none">
        360° Live Character Preview
      </div>
    </div>
  );
};
