import React from 'react';
import * as THREE from 'three';

export const Bookshelf: React.FC = () => {
  return (
    <group position={[-0.2, 0, -5.3]}>
      {/* =========================================================================
          1. ARCHITECTURAL DARK BRONZE & WALNUT MODULAR BOOKCASE
      ========================================================================= */}
      {/* Left Upright Column */}
      <mesh castShadow position={[-1.9, 1.5, 0]}>
        <boxGeometry args={[0.06, 3.0, 0.6]} />
        <meshStandardMaterial color="#111318" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Right Upright Column */}
      <mesh castShadow position={[1.9, 1.5, 0]}>
        <boxGeometry args={[0.06, 3.0, 0.6]} />
        <meshStandardMaterial color="#111318" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Center Asymmetrical Architectural Divider */}
      <mesh castShadow position={[0.2, 1.5, 0]}>
        <boxGeometry args={[0.045, 3.0, 0.58]} />
        <meshStandardMaterial color="#111318" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Dark Slatted Wood Backing Panel */}
      <mesh position={[0, 1.5, -0.28]}>
        <boxGeometry args={[3.84, 3.0, 0.03]} />
        <meshStandardMaterial color="#181513" roughness={0.9} />
      </mesh>

      {/* Top Cap Slab */}
      <mesh castShadow position={[0, 3.02, 0]}>
        <boxGeometry args={[3.92, 0.06, 0.64]} />
        <meshStandardMaterial color="#352317" roughness={0.45} />
      </mesh>
      {/* Recessed Base Plinth with Brass Toe-Kick Trim */}
      <group position={[0, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[3.92, 0.1, 0.64]} />
          <meshStandardMaterial color="#111318" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.03, 0.315]}>
          <boxGeometry args={[3.88, 0.015, 0.01]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* Solid Walnut Horizontal Shelves with Integrated Under-shelf Warm LED Glow Strips */}
      {[0.7, 1.35, 2.0, 2.6].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          {/* Main Walnut Shelf Slab */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.74, 0.048, 0.58]} />
            <meshStandardMaterial color="#3d281a" roughness={0.45} metalness={0.05} />
          </mesh>
          {/* Recessed Warm LED Strip */}
          <mesh position={[0, -0.025, 0.2]}>
            <boxGeometry args={[3.6, 0.006, 0.015]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}

      {/* Warm Ambient Shelf Glow Light */}
      <pointLight position={[0, 1.8, 0.1]} color="#f59e0b" intensity={0.7} distance={3.0} />

      {/* =========================================================================
          2. SHELF 1 (Y = 0.7): HARDCOVER SYSTEMS & ARCHITECTURE VOLUMES
      ========================================================================= */}
      {/* Left Compartment: Stand-up Technical Volumes with Leaning Book and Brass Bookend */}
      <group position={[-1.65, 0.725, 0]}>
        {[
          { color: '#b91c1c', w: 0.075, h: 0.36, d: 0.32, title: '#fef08a' },
          { color: '#1d4ed8', w: 0.085, h: 0.39, d: 0.34, title: '#93c5fd' },
          { color: '#047857', w: 0.07, h: 0.33, d: 0.3, title: '#6ee7b7' },
          { color: '#b45309', w: 0.095, h: 0.42, d: 0.35, title: '#fde68a' },
          { color: '#6d28d9', w: 0.08, h: 0.38, d: 0.31, title: '#c4b5fd' },
          { color: '#0e7490', w: 0.07, h: 0.34, d: 0.29, title: '#a5f3fc' },
          { color: '#334155', w: 0.09, h: 0.4, d: 0.33, title: '#e2e8f0' },
        ].map((book, i) => (
          <group key={i} position={[i * 0.1, book.h / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[book.w, book.h, book.d]} />
              <meshStandardMaterial color={book.color} roughness={0.35} />
            </mesh>
            {/* Gilded Spine Title Accent Line */}
            <mesh position={[0, 0, book.d / 2 + 0.001]}>
              <planeGeometry args={[book.w * 0.6, book.h * 0.7]} />
              <meshStandardMaterial color={book.title} roughness={0.2} metalness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Leaning Book */}
        <mesh castShadow position={[0.78, 0.18, 0]} rotation={[0, 0, -0.26]}>
          <boxGeometry args={[0.07, 0.38, 0.3]} />
          <meshStandardMaterial color="#e11d48" roughness={0.35} />
        </mesh>
        {/* Sculptured Geometric Brass Bookend */}
        <mesh position={[0.92, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.24, 0.24]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Right Compartment: Stack of Horizontal Art & Architecture Monographs */}
      <group position={[0.85, 0.725, 0]}>
        {[
          { color: '#1e293b', w: 0.44, h: 0.055, d: 0.36 },
          { color: '#334155', w: 0.4, h: 0.05, d: 0.34 },
          { color: '#0f172a', w: 0.36, h: 0.045, d: 0.3 },
        ].map((vol, i) => (
          <mesh key={i} castShadow position={[0, i * 0.055 + vol.h / 2, 0]}>
            <boxGeometry args={[vol.w, vol.h, vol.d]} />
            <meshStandardMaterial color={vol.color} roughness={0.4} />
          </mesh>
        ))}
        {/* Minimalist Brass Paperweight Ring on top */}
        <mesh position={[0, 0.175, 0]}>
          <torusGeometry args={[0.045, 0.015, 12, 24]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* =========================================================================
          3. SHELF 2 (Y = 1.35): SCULPTURES, HOURGLASS & VASES
      ========================================================================= */}
      {/* Twisted Bronze Möbius Strip Sculpture on Carrara Marble Pedestal */}
      <group position={[-1.1, 1.375, 0]}>
        {/* White Marble Pedestal Block */}
        <mesh castShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[0.22, 0.1, 0.22]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Bronze Ring / Infinity Torus Loop */}
        <mesh position={[0, 0.22, 0]} rotation={[0.4, 0.6, 0.2]}>
          <torusGeometry args={[0.11, 0.028, 16, 32]} />
          <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.25} />
        </mesh>
      </group>

      {/* Vintage Glass Hourglass with Flowing Golden Sand */}
      <group position={[-0.45, 1.375, 0]}>
        {/* Top & Bottom Walnut Caps */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.015, 18]} />
          <meshStandardMaterial color="#3d281a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.015, 18]} />
          <meshStandardMaterial color="#3d281a" roughness={0.5} />
        </mesh>
        {/* Glass Bulbs */}
        <mesh position={[0, 0.06, 0]}>
          <coneGeometry args={[0.05, 0.09, 16]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.92} transparent opacity={0.3} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.05, 0.09, 16]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.92} transparent opacity={0.3} roughness={0.05} />
        </mesh>
        {/* Golden Sand */}
        <mesh position={[0, 0.035, 0]}>
          <coneGeometry args={[0.04, 0.04, 12]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.8} />
        </mesh>
      </group>

      {/* Minimalist Stoneware Ceramics (Two Sculptural Vases) */}
      <group position={[1.05, 1.375, 0]}>
        {/* Tall Fluted Terracotta Vase */}
        <mesh castShadow position={[-0.12, 0.18, 0]}>
          <cylinderGeometry args={[0.065, 0.09, 0.36, 20]} />
          <meshStandardMaterial color="#9a3412" roughness={0.8} />
        </mesh>
        {/* Slender Dried Botanical Twigs protruding from vase */}
        <mesh position={[-0.12, 0.44, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.003, 0.003, 0.22, 6]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>
        {/* Round Speckled Cream Ceramic Vessel */}
        <mesh castShadow position={[0.14, 0.11, 0.04]}>
          <sphereGeometry args={[0.1, 18, 18]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
        </mesh>
      </group>

      {/* =========================================================================
          4. SHELF 3 (Y = 2.0): CASCADING BIOPHILIC POTHOS VINE & FRAMED AWARDS
      ========================================================================= */}
      {/* Ceramic Planter Pot with Cascading Hanging Vines (Dangling down shelves) */}
      <group position={[-1.4, 2.025, 0.12]}>
        {/* Matte Terracotta Pot */}
        <mesh castShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.13, 0.1, 0.2, 18]} />
          <meshStandardMaterial color="#c2410c" roughness={0.65} />
        </mesh>
        {/* Soil & Bushy Crown */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.14, 12, 10]} />
          <meshStandardMaterial color="#15803d" roughness={0.6} />
        </mesh>
        {/* Cascading Vine 1 (Drapes down past Shelf 2) */}
        <group position={[0.08, 0.08, 0.08]}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <mesh
              key={i}
              position={[Math.sin(i * 0.5) * 0.04, -i * 0.08, Math.cos(i * 0.4) * 0.03]}
              rotation={[0.3, i * 0.4, 0.2]}
            >
              <planeGeometry args={[0.07, 0.09]} />
              <meshStandardMaterial color="#22c55e" roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
        {/* Cascading Vine 2 */}
        <group position={[-0.06, 0.05, 0.09]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              position={[Math.cos(i * 0.6) * 0.03, -i * 0.07, 0]}
              rotation={[-0.2, -i * 0.5, -0.3]}
            >
              <planeGeometry args={[0.06, 0.08]} />
              <meshStandardMaterial color="#16a34a" roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Framed Architecture & Systems Design Certificate */}
      <group position={[0.9, 2.025, -0.05]} rotation={[-0.08, -0.15, 0]}>
        {/* Black Brushed Metal Frame */}
        <mesh castShadow position={[0, 0.18, 0]}>
          <boxGeometry args={[0.38, 0.3, 0.02]} />
          <meshStandardMaterial color="#090d14" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Inner Parchment Certificate with Gold Seal */}
        <mesh position={[0, 0.18, 0.012]}>
          <planeGeometry args={[0.34, 0.26]} />
          <meshStandardMaterial color="#fffbeb" roughness={0.5} />
        </mesh>
        {/* Gold Foil Seal Stamp */}
        <mesh position={[0.1, 0.11, 0.014]}>
          <circleGeometry args={[0.025, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
};
