import React from 'react';

export const Bookshelf: React.FC = () => {
  return (
    <group position={[-0.2, 0, -5.3]}>
      {/* 1. Architectural Steel & Walnut Open Bookcase Structure */}
      {/* Left Upright Column */}
      <mesh castShadow position={[-1.9, 1.5, 0]}>
        <boxGeometry args={[0.06, 3.0, 0.6]} />
        <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Right Upright Column */}
      <mesh castShadow position={[1.9, 1.5, 0]}>
        <boxGeometry args={[0.06, 3.0, 0.6]} />
        <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Center Divider Column for architectural balance */}
      <mesh castShadow position={[0.2, 1.5, 0]}>
        <boxGeometry args={[0.04, 3.0, 0.58]} />
        <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Dark Textured Acoustic Back Panel */}
      <mesh position={[0, 1.5, -0.28]}>
        <boxGeometry args={[3.84, 3.0, 0.03]} />
        <meshStandardMaterial color="#1c1917" roughness={0.85} />
      </mesh>

      {/* Top Cap */}
      <mesh castShadow position={[0, 3.02, 0]}>
        <boxGeometry args={[3.92, 0.06, 0.64]} />
        <meshStandardMaterial color="#38291f" roughness={0.5} />
      </mesh>
      {/* Base Plinth */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[3.92, 0.1, 0.64]} />
        <meshStandardMaterial color="#18181b" roughness={0.4} />
      </mesh>

      {/* Horizontal Shelves (Rich Natural Walnut) with Under-shelf LED Strips */}
      {[0.7, 1.35, 2.0, 2.6].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          {/* Main Walnut Shelf Slab */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.74, 0.05, 0.58]} />
            <meshStandardMaterial color="#453123" roughness={0.5} />
          </mesh>
          {/* Recessed Warm LED Strip underneath */}
          <mesh position={[0, -0.026, 0.2]}>
            <boxGeometry args={[3.6, 0.008, 0.02]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Subtle shelf warm glow light */}
      <pointLight position={[0, 1.8, 0.1]} color="#f59e0b" intensity={0.5} distance={2.5} />

      {/* Shelf 1 Books (Bottom Tier: Computer Science & Systems Engineering) */}
      <group position={[-1.65, 0.73, 0]}>
        {/* Book stack */}
        {[
          { color: '#dc2626', w: 0.08, h: 0.36, d: 0.32 },
          { color: '#2563eb', w: 0.09, h: 0.39, d: 0.34 },
          { color: '#059669', w: 0.07, h: 0.33, d: 0.3 },
          { color: '#d97706', w: 0.11, h: 0.42, d: 0.35 },
          { color: '#7c3aed', w: 0.08, h: 0.38, d: 0.31 },
          { color: '#0891b2', w: 0.07, h: 0.34, d: 0.29 },
          { color: '#475569', w: 0.1, h: 0.4, d: 0.33 },
        ].map((book, i) => (
          <mesh key={i} castShadow position={[i * 0.11, book.h / 2, 0]}>
            <boxGeometry args={[book.w, book.h, book.d]} />
            <meshStandardMaterial color={book.color} roughness={0.35} />
          </mesh>
        ))}
        {/* Leaning Book */}
        <mesh castShadow position={[0.85, 0.18, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.07, 0.38, 0.3]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.35} />
        </mesh>
        {/* Minimalist Brass Bookend */}
        <mesh position={[0.98, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.24, 0.22]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Shelf 1 Right Side: Stack of Large Horizontal Art Volumes */}
      <group position={[0.8, 0.73, 0]}>
        {[
          { color: '#1e293b', w: 0.42, h: 0.06, d: 0.36 },
          { color: '#334155', w: 0.38, h: 0.05, d: 0.34 },
          { color: '#0f172a', w: 0.34, h: 0.05, d: 0.3 },
        ].map((vol, i) => (
          <mesh key={i} castShadow position={[0, i * 0.06 + vol.h / 2, 0]}>
            <boxGeometry args={[vol.w, vol.h, vol.d]} />
            <meshStandardMaterial color={vol.color} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Shelf 2 (Middle Tier: Web Architecture & Cloud Systems) */}
      <group position={[0.45, 1.38, 0]}>
        {[
          { color: '#ea580c', w: 0.09, h: 0.38, d: 0.32 },
          { color: '#0284c7', w: 0.08, h: 0.35, d: 0.3 },
          { color: '#db2777', w: 0.07, h: 0.33, d: 0.28 },
          { color: '#ca8a04', w: 0.1, h: 0.42, d: 0.34 },
          { color: '#4f46e5', w: 0.09, h: 0.37, d: 0.31 },
          { color: '#059669', w: 0.08, h: 0.34, d: 0.29 },
        ].map((book, i) => (
          <mesh key={i} castShadow position={[i * 0.11, book.h / 2, 0]}>
            <boxGeometry args={[book.w, book.h, book.d]} />
            <meshStandardMaterial color={book.color} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Decorative Sculptural Ceramic Vase on Shelf 2 Left */}
      <group position={[-1.0, 1.38, 0]}>
        <mesh castShadow position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.15, 0.44, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} />
        </mesh>
        {/* Dried Botanical Frond */}
        <mesh position={[0.02, 0.52, 0]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.006, 0.008, 0.28, 8]} />
          <meshStandardMaterial color="#d4a373" roughness={0.7} />
        </mesh>
      </group>

      {/* Shelf 3 (Upper Tier: AI & Modern Design) */}
      <group position={[-0.8, 2.03, 0]}>
        {[
          { color: '#0284c7', w: 0.08, h: 0.37, d: 0.31 },
          { color: '#9333ea', w: 0.08, h: 0.36, d: 0.32 },
          { color: '#059669', w: 0.09, h: 0.39, d: 0.34 },
          { color: '#e11d48', w: 0.07, h: 0.33, d: 0.29 },
          { color: '#d97706', w: 0.08, h: 0.35, d: 0.3 },
        ].map((book, i) => (
          <mesh key={i} castShadow position={[i * 0.1, book.h / 2, 0]}>
            <boxGeometry args={[book.w, book.h, book.d]} />
            <meshStandardMaterial color={book.color} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Modernist Geometric Sculpture on Shelf 3 Right */}
      <group position={[1.0, 2.03, 0]}>
        <mesh castShadow position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 20]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} />
        </mesh>
        {/* Intersecting Torus / Ring Sculpture */}
        <mesh castShadow position={[0, 0.32, 0]} rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[0.12, 0.024, 16, 32]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Shelf 4 (Top Tier: Trailing Pothos Plant) */}
      <group position={[-0.9, 2.63, 0]}>
        {/* Textured Concrete Planter */}
        <mesh castShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.14, 0.11, 0.18, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
        {/* Trailing Green Foliage */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#166534" roughness={0.6} />
        </mesh>
        {/* Drooping Vine Over Shelf Lip */}
        <mesh position={[0.08, 0.06, 0.16]} rotation={[0.3, 0, -0.2]}>
          <cylinderGeometry args={[0.02, 0.015, 0.22, 8]} />
          <meshStandardMaterial color="#15803d" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};
