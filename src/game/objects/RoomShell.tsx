import React from 'react';

export const RoomShell: React.FC = () => {
  return (
    <group>
      {/* 1. Main Parquet / Walnut Wooden Floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#2d241e" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Floor accent border / rug under desk and center */}
      <mesh receiveShadow position={[-1.5, 0.005, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.5, 7.5]} />
        <meshStandardMaterial color="#3a3733" roughness={0.9} />
      </mesh>

      {/* 2. Ceiling */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#1a1c22" roughness={0.9} />
      </mesh>

      {/* Recessed ceiling light panels */}
      <mesh position={[-3, 4.19, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 1.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[3, 4.19, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 1.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={0.6} />
      </mesh>

      {/* 3. Back Wall (Z = -6) */}
      <mesh receiveShadow position={[0, 2.1, -6]}>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial color="#242832" roughness={0.8} />
      </mesh>

      {/* Back Wall Accent Acoustic Slat Paneling */}
      <mesh position={[-4, 2.1, -5.98]}>
        <planeGeometry args={[4.5, 4.2]} />
        <meshStandardMaterial color="#3f3730" roughness={0.75} />
      </mesh>

      {/* 4. Front Wall (Z = +6) */}
      {/* Left section */}
      <mesh receiveShadow position={[-4.5, 2.1, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 4.2]} />
        <meshStandardMaterial color="#1f2229" roughness={0.85} />
      </mesh>
      {/* Right section */}
      <mesh receiveShadow position={[4.5, 2.1, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 4.2]} />
        <meshStandardMaterial color="#1f2229" roughness={0.85} />
      </mesh>
      {/* Top lintel above door */}
      <mesh receiveShadow position={[0, 3.5, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4, 1.4]} />
        <meshStandardMaterial color="#1f2229" roughness={0.85} />
      </mesh>

      {/* Entrance Door Frame & Door */}
      <group position={[0, 0, 5.95]}>
        {/* Door Trim */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[2.2, 2.8, 0.1]} />
          <meshStandardMaterial color="#111317" roughness={0.5} />
        </mesh>
        {/* Door Leaf */}
        <mesh position={[0, 1.35, 0.02]}>
          <boxGeometry args={[1.95, 2.65, 0.06]} />
          <meshStandardMaterial color="#312a23" roughness={0.6} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.7, 1.3, 0.08]}>
          <boxGeometry args={[0.06, 0.2, 0.08]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Nameplate above door */}
        <mesh position={[0, 2.5, 0.08]}>
          <boxGeometry args={[1.5, 0.28, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* 5. Left Wall (X = -7) with Large Window Cutout */}
      {/* Back section */}
      <mesh receiveShadow position={[-7, 2.1, -4.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 4.2]} />
        <meshStandardMaterial color="#21252d" roughness={0.8} />
      </mesh>
      {/* Front section */}
      <mesh receiveShadow position={[-7, 2.1, 4.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 4.2]} />
        <meshStandardMaterial color="#21252d" roughness={0.8} />
      </mesh>
      {/* Top lintel */}
      <mesh receiveShadow position={[-7, 3.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6, 0.8]} />
        <meshStandardMaterial color="#21252d" roughness={0.8} />
      </mesh>
      {/* Bottom window sill ledge */}
      <mesh receiveShadow position={[-7, 0.35, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6, 0.7]} />
        <meshStandardMaterial color="#21252d" roughness={0.8} />
      </mesh>

      {/* 6. Right Wall (X = +7) Project Gallery Wall */}
      <mesh receiveShadow position={[7, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[12, 4.2]} />
        <meshStandardMaterial color="#242831" roughness={0.8} />
      </mesh>

      {/* Skirting / Baseboards */}
      {/* Back */}
      <mesh position={[0, 0.08, -5.96]}>
        <boxGeometry args={[14, 0.16, 0.04]} />
        <meshStandardMaterial color="#16181d" roughness={0.5} />
      </mesh>
      {/* Right */}
      <mesh position={[6.96, 0.08, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.16, 0.04]} />
        <meshStandardMaterial color="#16181d" roughness={0.5} />
      </mesh>
    </group>
  );
};
