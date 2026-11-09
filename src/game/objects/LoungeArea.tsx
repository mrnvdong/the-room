import React from 'react';

export const LoungeArea: React.FC = () => {
  return (
    <group>
      {/* Lounge Area Rug */}
      <mesh receiveShadow position={[4.5, 0.006, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 4.6]} />
        <meshStandardMaterial color="#292524" roughness={0.9} />
      </mesh>

      {/* 1. Modern Sectional Sofa */}
      <group position={[4.5, 0, 2.6]}>
        {/* Base / Wooden Plinth */}
        <mesh castShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[3.2, 0.2, 1.8]} />
          <meshStandardMaterial color="#302720" roughness={0.7} />
        </mesh>
        {/* Main Seat Cushions */}
        <mesh castShadow position={[0, 0.32, 0.1]}>
          <boxGeometry args={[3.1, 0.25, 1.5]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Backrest Cushion */}
        <mesh castShadow position={[0, 0.65, 0.72]}>
          <boxGeometry args={[3.1, 0.45, 0.26]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Left Armrest */}
        <mesh castShadow position={[-1.45, 0.5, 0.1]}>
          <boxGeometry args={[0.22, 0.4, 1.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Right Armrest */}
        <mesh castShadow position={[1.45, 0.5, 0.1]}>
          <boxGeometry args={[0.22, 0.4, 1.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Throw Pillows */}
        <mesh castShadow position={[-1.1, 0.55, 0.5]} rotation={[0.2, 0.3, 0]}>
          <boxGeometry args={[0.4, 0.35, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[1.1, 0.55, 0.5]} rotation={[0.2, -0.3, 0]}>
          <boxGeometry args={[0.4, 0.35, 0.15]} />
          <meshStandardMaterial color="#0284c7" roughness={0.6} />
        </mesh>
      </group>

      {/* 2. Coffee Table */}
      <group position={[4.5, 0, 0.7]}>
        {/* Wooden Table Top */}
        <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
          <boxGeometry args={[2.0, 0.06, 0.9]} />
          <meshStandardMaterial color="#44382e" roughness={0.6} />
        </mesh>
        {/* Table Legs */}
        {[-0.9, 0.9].map((x) =>
          [-0.35, 0.35].map((z) => (
            <mesh key={`${x}_${z}`} position={[x, 0.19, z]}>
              <cylinderGeometry args={[0.025, 0.025, 0.38, 8]} />
              <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.2} />
            </mesh>
          ))
        )}
        {/* Magazines on table */}
        <mesh castShadow position={[-0.4, 0.42, 0]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.42]} />
          <meshStandardMaterial color="#e0e7ff" roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0.4, 0.42, 0.1]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.28, 0.015, 0.38]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.3} />
        </mesh>
      </group>

      {/* 3. Wall Mounted Smart Display / TV on Right Wall (X = 6.95) */}
      <group position={[6.92, 2.2, 2.6]} rotation={[0, -Math.PI / 2, 0]}>
        {/* TV Frame */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 1.4, 0.05]} />
          <meshStandardMaterial color="#090a0f" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[2.3, 1.3]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#1e3a8a"
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 4. Floor Standing Potted Plant */}
      <group position={[6.2, 0, 4.8]}>
        {/* Ceramic Planter */}
        <mesh castShadow position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.26, 0.2, 0.64, 16]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        {/* Plant Stems & Foliage */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.45, 12, 12]} />
          <meshStandardMaterial color="#166534" roughness={0.7} />
        </mesh>
        <mesh position={[0.15, 1.15, -0.1]}>
          <sphereGeometry args={[0.35, 10, 10]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} />
        </mesh>
      </group>

      {/* 5. Smart Hi-Fi Audio Speaker */}
      <group position={[6.4, 0.45, 0.5]}>
        <mesh castShadow position={[0, 0.25, 0]}>
          <boxGeometry args={[0.26, 0.5, 0.26]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} />
        </mesh>
        {/* Subtle LED Ring */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
};
