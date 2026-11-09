import React from 'react';

export const Bookshelf: React.FC = () => {
  return (
    <group position={[-0.2, 0, -5.3]}>
      {/* Outer Wooden Shell (Oak/Walnut Frame) */}
      {/* Left Upright */}
      <mesh castShadow position={[-1.9, 1.5, 0]}>
        <boxGeometry args={[0.08, 3.0, 0.65]} />
        <meshStandardMaterial color="#3b322a" roughness={0.7} />
      </mesh>
      {/* Right Upright */}
      <mesh castShadow position={[1.9, 1.5, 0]}>
        <boxGeometry args={[0.08, 3.0, 0.65]} />
        <meshStandardMaterial color="#3b322a" roughness={0.7} />
      </mesh>
      {/* Back Panel */}
      <mesh position={[0, 1.5, -0.3]}>
        <boxGeometry args={[3.8, 3.0, 0.04]} />
        <meshStandardMaterial color="#2d251f" roughness={0.8} />
      </mesh>
      {/* Top Cap */}
      <mesh castShadow position={[0, 3.02, 0]}>
        <boxGeometry args={[3.92, 0.08, 0.68]} />
        <meshStandardMaterial color="#3b322a" roughness={0.7} />
      </mesh>
      {/* Bottom Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[3.92, 0.1, 0.68]} />
        <meshStandardMaterial color="#3b322a" roughness={0.7} />
      </mesh>

      {/* Horizontal Shelves */}
      {[0.7, 1.35, 2.0, 2.6].map((y, idx) => (
        <mesh key={idx} castShadow receiveShadow position={[0, y, 0]}>
          <boxGeometry args={[3.72, 0.05, 0.6]} />
          <meshStandardMaterial color="#453a32" roughness={0.7} />
        </mesh>
      ))}

      {/* Shelf 1 Books (Bottom-ish: Programming & CS) */}
      <group position={[-1.2, 0.73, 0]}>
        {[
          { color: '#ef4444', w: 0.08, h: 0.35, d: 0.3 },
          { color: '#3b82f6', w: 0.09, h: 0.38, d: 0.32 },
          { color: '#10b981', w: 0.07, h: 0.32, d: 0.28 },
          { color: '#f59e0b', w: 0.1, h: 0.4, d: 0.34 },
          { color: '#8b5cf6', w: 0.08, h: 0.36, d: 0.3 },
          { color: '#06b6d4', w: 0.07, h: 0.33, d: 0.29 },
          { color: '#64748b', w: 0.11, h: 0.39, d: 0.31 },
        ].map((book, i) => (
          <mesh key={i} castShadow position={[i * 0.1, book.h / 2, 0]}>
            <boxGeometry args={[book.w, book.h, book.d]} />
            <meshStandardMaterial color={book.color} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Shelf 2 Books (Web & Cloud Architecture) */}
      <group position={[0.4, 1.38, 0]}>
        {[
          { color: '#f97316', w: 0.09, h: 0.38, d: 0.32 },
          { color: '#0ea5e9', w: 0.08, h: 0.34, d: 0.3 },
          { color: '#ec4899', w: 0.07, h: 0.32, d: 0.28 },
          { color: '#eab308', w: 0.1, h: 0.42, d: 0.35 },
          { color: '#6366f1', w: 0.09, h: 0.36, d: 0.3 },
        ].map((book, i) => (
          <mesh key={i} castShadow position={[i * 0.11, book.h / 2, 0]}>
            <boxGeometry args={[book.w, book.h, book.d]} />
            <meshStandardMaterial color={book.color} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Decorative Ceramic Vase on Shelf 2 */}
      <mesh castShadow position={[-1.2, 1.55, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.34, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} />
      </mesh>

      {/* Shelf 3 Books (AI & Future Tech) */}
      <group position={[-0.8, 2.03, 0]}>
        {[
          { color: '#38bdf8', w: 0.08, h: 0.36, d: 0.3 },
          { color: '#a855f7', w: 0.08, h: 0.35, d: 0.31 },
          { color: '#10b981', w: 0.09, h: 0.38, d: 0.33 },
          { color: '#f43f5e', w: 0.07, h: 0.32, d: 0.28 },
        ].map((book, i) => (
          <mesh key={i} castShadow position={[i * 0.1, book.h / 2, 0]}>
            <boxGeometry args={[book.w, book.h, book.d]} />
            <meshStandardMaterial color={book.color} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Small Succulent Pot on Shelf 3 */}
      <mesh castShadow position={[1.1, 2.13, 0]}>
        <cylinderGeometry args={[0.1, 0.07, 0.16, 12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
      </mesh>
      <mesh position={[1.1, 2.25, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
    </group>
  );
};
