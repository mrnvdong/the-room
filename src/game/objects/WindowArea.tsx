import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useRoomStateStore } from '@/stores/useRoomStateStore';

/**
 * Procedural Tropical Island Mountain Component
 */
const Island: React.FC<{
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  rockColor?: string;
}> = ({ position, scale, color, rockColor = '#475569' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Main Island Peak */}
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[3.2, 3.2, 8]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
      {/* Secondary Island Shoulder */}
      <mesh position={[-1.8, 0.9, 0.5]}>
        <coneGeometry args={[2.3, 2.2, 7]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
      {/* Third Island Shoulder */}
      <mesh position={[1.9, 0.7, -0.4]}>
        <coneGeometry args={[2.0, 1.8, 7]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
      {/* Coastal rocky reef base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[3.8, 4.4, 0.5, 10]} />
        <meshStandardMaterial color={rockColor} roughness={0.95} flatShading />
      </mesh>
    </group>
  );
};

/**
 * Tropical Palm Tree Component (Areca / Coconut Palm)
 */
const PalmTree: React.FC<{
  position: [number, number, number];
  scale?: number;
  leanAngle?: number;
  trunkCurvature?: number;
}> = ({ position, scale = 1, leanAngle = 0.1, trunkCurvature = 0.05 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[trunkCurvature, 0, leanAngle]}>
      {/* Textured curved trunk */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.07, 0.12, 2.4, 8]} />
        <meshStandardMaterial color="#6b4c30" roughness={0.9} />
      </mesh>
      {/* Crown base with coconut cluster */}
      <group position={[0, 2.38, 0]}>
        {[0, 120, 240].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.cos(rad) * 0.08, -0.05, Math.sin(rad) * 0.08]}>
              <sphereGeometry args={[0.06, 6, 6]} />
              <meshStandardMaterial color="#452a15" roughness={0.9} />
            </mesh>
          );
        })}

        {/* 12 graceful radiating and arching palm fronds */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const isUpperTier = i % 2 === 0;
          return (
            <group key={i} rotation={[0, rad, 0]}>
              {/* Main stem */}
              <mesh
                position={[0.55, isUpperTier ? 0.14 : 0.04, 0]}
                rotation={[0, 0, isUpperTier ? -0.38 : -0.55]}
              >
                <boxGeometry args={[1.05, 0.02, 0.22]} />
                <meshStandardMaterial
                  color={isUpperTier ? '#16a34a' : '#15803d'}
                  roughness={0.65}
                />
              </mesh>
              {/* Drooping feather tip */}
              <mesh
                position={[1.05, isUpperTier ? -0.12 : -0.26, 0]}
                rotation={[0, 0, isUpperTier ? -0.75 : -0.95]}
              >
                <boxGeometry args={[0.55, 0.015, 0.16]} />
                <meshStandardMaterial color="#22c55e" roughness={0.65} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

/**
 * Sea Cable Car Pylon (Vinpearl style over Nha Trang Bay)
 */
const CableCarTower: React.FC<{
  position: [number, number, number];
  weatherMode: string;
}> = ({ position, weatherMode }) => {
  const isNight = weatherMode === 'night';
  return (
    <group position={position}>
      {/* Concrete Marine Caisson Foundation */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.2, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>
      {/* Red & White Lattice Steel Pylon Structure */}
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[0.16, 0.45, 3.2, 4]} />
        <meshStandardMaterial color="#dc2626" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <cylinderGeometry args={[0.07, 0.16, 1.6, 4]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Top Crossarm holding cables */}
      <mesh position={[0, 5.2, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.18, 0.14, 2.0]} />
        <meshStandardMaterial color="#dc2626" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Pylon warning beacon light */}
      <mesh position={[0, 5.4, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={isNight ? '#ef4444' : '#fee2e2'} />
      </mesh>
    </group>
  );
};

/**
 * Luxury Yacht / Catamaran on the Bay
 */
const Yacht: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({ position, rotation = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Streamlined Boat Hull */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[2.4, 0.4, 0.8]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Bow taper */}
      <mesh position={[1.4, 0.22, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.42, 0.9, 4]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Cabin & Tinted Flybridge Glass */}
      <mesh position={[-0.2, 0.52, 0]}>
        <boxGeometry args={[1.2, 0.38, 0.6]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.7} />
      </mesh>
      {/* Flybridge Roof */}
      <mesh position={[-0.2, 0.74, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.66]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Water Wake Foam */}
      <mesh position={[-1.4, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/**
 * Cloud Puff Component
 */
const Cloud: React.FC<{
  position: [number, number, number];
  scale?: number;
  opacity?: number;
  color?: string;
}> = ({ position, scale = 1, opacity = 0.85, color = '#ffffff' }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.6, 8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} roughness={1} />
      </mesh>
      <mesh position={[-1.2, -0.2, 0.2]}>
        <sphereGeometry args={[1.2, 8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} roughness={1} />
      </mesh>
      <mesh position={[1.3, -0.15, -0.2]}>
        <sphereGeometry args={[1.3, 8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} roughness={1} />
      </mesh>
      <mesh position={[0.4, 0.5, 0.1]}>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} roughness={1} />
      </mesh>
    </group>
  );
};

export const WindowArea: React.FC = () => {
  const weatherMode = useRoomStateStore((state) => state.weatherMode);

  // Dynamic environmental colors based on active weather mode
  const env = useMemo(() => {
    switch (weatherMode) {
      case 'sunset':
        return {
          skyTop: '#7c2d12',
          skyMid: '#ea580c',
          skyBottom: '#fdba74',
          sunColor: '#fb923c',
          sunPos: [-24, 4.2, 8] as [number, number, number],
          sunRadius: 2.3,
          oceanNear: '#ea580c',
          oceanFar: '#c2410c',
          islandColor: '#365314',
          cloudColor: '#fed7aa',
          cloudOpacity: 0.8,
          glassTint: '#fed7aa',
          terraceDeckColor: '#5c3a21',
          buildingLightOpacity: 0.55,
        };
      case 'rain':
        return {
          skyTop: '#334155',
          skyMid: '#475569',
          skyBottom: '#64748b',
          sunColor: '#94a3b8',
          sunPos: [-24, 8.0, 6] as [number, number, number],
          sunRadius: 1.2,
          oceanNear: '#334155',
          oceanFar: '#1e293b',
          islandColor: '#1e3a1f',
          cloudColor: '#94a3b8',
          cloudOpacity: 0.95,
          glassTint: '#94a3b8',
          terraceDeckColor: '#3f2b1c',
          buildingLightOpacity: 0.25,
        };
      case 'night':
        return {
          skyTop: '#030712',
          skyMid: '#0b1329',
          skyBottom: '#111e38',
          sunColor: '#e0e7ff', // Moon
          sunPos: [-24, 9.5, 7] as [number, number, number],
          sunRadius: 1.4,
          oceanNear: '#07111e',
          oceanFar: '#020617',
          islandColor: '#0a1a0f',
          cloudColor: '#1e293b',
          cloudOpacity: 0.4,
          glassTint: '#38bdf8',
          terraceDeckColor: '#2b1b11',
          buildingLightOpacity: 0.85,
        };
      case 'clear':
      default:
        return {
          skyTop: '#0284c7',
          skyMid: '#38bdf8',
          skyBottom: '#bae6fd',
          sunColor: '#fef08a',
          sunPos: [-24, 9.8, 7] as [number, number, number],
          sunRadius: 1.9,
          oceanNear: '#0ea5e9',
          oceanFar: '#0284c7',
          islandColor: '#15803d',
          cloudColor: '#ffffff',
          cloudOpacity: 0.9,
          glassTint: '#7dd3fc',
          terraceDeckColor: '#784e2d',
          buildingLightOpacity: 0.12,
        };
    }
  }, [weatherMode]);

  return (
    <group position={[-7.0, 0, 0]}>
      {/* =========================================================================
          1. WINDOW FRAME BARS & REALISTIC CLEAR GLASS PANE (Opening: Z: -2.9 to 2.9, Y: 0.4 to 3.8)
      ========================================================================= */}
      {/* Top Frame Bar */}
      <mesh position={[0.02, 3.75, 0]}>
        <boxGeometry args={[0.08, 0.1, 5.88]} />
        <meshStandardMaterial color="#0b0f19" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Bottom Frame Bar */}
      <mesh position={[0.02, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.1, 5.88]} />
        <meshStandardMaterial color="#0b0f19" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Left Frame Bar */}
      <mesh position={[0.02, 2.1, -2.9]}>
        <boxGeometry args={[0.08, 3.3, 0.08]} />
        <meshStandardMaterial color="#0b0f19" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Right Frame Bar */}
      <mesh position={[0.02, 2.1, 2.9]}>
        <boxGeometry args={[0.08, 3.3, 0.08]} />
        <meshStandardMaterial color="#0b0f19" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Slim Modern Mullions (Vertical and Transom) */}
      <mesh position={[0.03, 2.1, -1.9]}>
        <boxGeometry args={[0.06, 3.3, 0.05]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.03, 2.1, 1.9]}>
        <boxGeometry args={[0.06, 3.3, 0.05]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Horizontal Transom Sightline Bar */}
      <mesh position={[0.03, 2.85, 0]}>
        <boxGeometry args={[0.06, 0.05, 5.76]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Clear Floor-to-Ceiling Panoramic Glass Pane */}
      <mesh position={[0.02, 2.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5.74, 3.3]} />
        <meshPhysicalMaterial
          color={env.glassTint}
          transmission={0.94}
          opacity={0.3}
          transparent
          roughness={0.04}
          ior={1.45}
          reflectivity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* =========================================================================
          2. LUXURY PENTHOUSE PANORAMIC TERRACE (Directly outside window, X: -0.2 to -2.6)
      ========================================================================= */}
      <group position={[-1.2, 0, 0]}>
        {/* Natural Teak Wood Decking Planks */}
        <mesh position={[0, 0.65, 0]} receiveShadow>
          <boxGeometry args={[2.3, 0.12, 6.4]} />
          <meshStandardMaterial color={env.terraceDeckColor} roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Subtle deck plank grooves */}
        {[-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].map((z, idx) => (
          <mesh key={idx} position={[0, 0.715, z]}>
            <boxGeometry args={[2.28, 0.005, 0.02]} />
            <meshBasicMaterial color="#1a0f08" />
          </mesh>
        ))}

        {/* Frameless Tempered Glass Balustrade at Terrace Edge */}
        <group position={[-1.1, 0.7, 0]}>
          {/* Glass Railing Panels */}
          <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[6.2, 1.1]} />
            <meshPhysicalMaterial
              color="#e0f2fe"
              transmission={0.9}
              opacity={0.3}
              transparent
              roughness={0.05}
              ior={1.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Minimalist Brushed Stainless Steel Top Rail */}
          <mesh position={[0, 1.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 6.2, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Stainless Steel Floor Spigots */}
          {[-2.8, -1.8, -0.8, 0.2, 1.2, 2.2, 3.0].map((z, i) => (
            <mesh key={i} position={[0, 0.08, z]}>
              <boxGeometry args={[0.05, 0.16, 0.07]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
          {/* Inset LED Strip Light washing the deck edge at night */}
          <mesh position={[0.02, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[6.0, 0.03]} />
            <meshBasicMaterial
              color={weatherMode === 'night' ? '#38bdf8' : '#fde047'}
              transparent
              opacity={weatherMode === 'night' ? 0.7 : 0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Left Terrace Plant: Modern White Cylinder Planter with Tropical Areca Palm */}
        <group position={[-0.4, 0.71, -2.45]}>
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.32, 0.24, 0.76, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
            <meshStandardMaterial color="#2d1c0b" roughness={0.95} />
          </mesh>
          <PalmTree position={[0, 0.75, 0]} scale={0.78} leanAngle={-0.08} trunkCurvature={-0.05} />
        </group>

        {/* Right Terrace Plant: Planter with Tropical Foliage */}
        <group position={[-0.4, 0.71, 2.45]}>
          <mesh position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.28, 0.2, 0.64, 14]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.63, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.04, 14]} />
            <meshStandardMaterial color="#2d1c0b" roughness={0.95} />
          </mesh>
          <PalmTree position={[0, 0.64, 0]} scale={0.68} leanAngle={0.08} trunkCurvature={0.04} />
        </group>

        {/* Modern Outdoor Lounge Chaise & Cocktail Table */}
        <group position={[-0.1, 0.71, 1.1]}>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[1.4, 0.16, 0.65]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.23, 0]}>
            <boxGeometry args={[1.36, 0.09, 0.62]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
          </mesh>
          <mesh position={[-0.5, 0.35, 0]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.42, 0.08, 0.62]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
          </mesh>
          <group position={[0.4, 0, 0.5]}>
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.36, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.42, 0]}>
              <cylinderGeometry args={[0.04, 0.03, 0.14, 12]} />
              <meshPhysicalMaterial color="#38bdf8" transmission={0.9} transparent opacity={0.6} />
            </mesh>
          </group>
        </group>
      </group>

      {/* =========================================================================
          3. NHA TRANG BAY OCEAN SURFACE (X: -2.3 to -35)
      ========================================================================= */}
      <group position={[-18, -0.25, 0]}>
        {/* Main Ocean Water Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[35, 48, 16, 16]} />
          <meshStandardMaterial
            color={env.oceanNear}
            roughness={0.1}
            metalness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Sparkling Water Highlights & Wave Foam Bands */}
        {[-8, -3, 2, 7, 13].map((zPos, idx) => (
          <mesh
            key={idx}
            position={[idx % 2 === 0 ? 3 : -3, 0.02, zPos]}
            rotation={[-Math.PI / 2, 0, idx % 2 === 0 ? 0.08 : -0.08]}
          >
            <planeGeometry args={[12, 0.35]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={weatherMode === 'sunset' ? 0.28 : 0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          4. GOLDEN COASTAL SHORELINE, STRIP & PALM PROMENADE
      ========================================================================= */}
      <group position={[-12, -0.15, -9]}>
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <planeGeometry args={[9, 14]} />
          <meshStandardMaterial color="#d4a373" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[2.8, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <planeGeometry args={[2.5, 14]} />
          <meshStandardMaterial color="#334155" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
        <PalmTree position={[-1.2, 0.08, -2.5]} scale={1.1} leanAngle={-0.2} />
        <PalmTree position={[0.3, 0.08, -0.8]} scale={1.3} leanAngle={-0.15} />
        <PalmTree position={[-0.7, 0.08, 2.2]} scale={1.0} leanAngle={-0.25} />
        <PalmTree position={[0.9, 0.08, 4.0]} scale={1.2} leanAngle={-0.1} />
      </group>

      {/* =========================================================================
          5. NHA TRANG BAY ISLANDS (The iconic Hòn Tre / Vinpearl Mountain Silhouette)
      ========================================================================= */}
      {/* Main Mountain Island (Center-Right) */}
      <Island
        position={[-23, -0.2, 1]}
        scale={[3.4, 2.7, 3.4]}
        color={env.islandColor}
        rockColor="#334155"
      />
      {/* Secondary Mountain Island (Far Left) */}
      <Island
        position={[-26, -0.2, -12]}
        scale={[2.6, 2.0, 2.8]}
        color={env.islandColor}
        rockColor="#334155"
      />
      {/* Satellite Island (Far Right) */}
      <Island
        position={[-27, -0.2, 13]}
        scale={[2.4, 1.8, 2.4]}
        color={env.islandColor}
        rockColor="#334155"
      />

      {/* Hilltop castle / attraction silhouette on main island (Vinpearl landmark) */}
      <group position={[-23, 6.4, 1]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.25, 0.38, 0.9, 6]} />
          <meshStandardMaterial color={weatherMode === 'night' ? '#f59e0b' : '#f8fafc'} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <coneGeometry args={[0.3, 0.5, 6]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        {weatherMode === 'night' && (
          <pointLight position={[0, 0.8, 0]} intensity={1.5} color="#f59e0b" distance={8} />
        )}
      </group>

      {/* =========================================================================
          6. ICONIC SEA CABLE CAR SYSTEM (Shifted to Left/Mid Bay for Open Panoramic Center)
      ========================================================================= */}
      <CableCarTower position={[-12, -0.25, -4.5]} weatherMode={weatherMode} />
      <CableCarTower position={[-19, -0.25, -7.0]} weatherMode={weatherMode} />

      {/* Cable Lines connecting Towers towards the Island */}
      <mesh position={[-15.5, 5.0, -5.7]} rotation={[0, 0.3, -0.04]}>
        <boxGeometry args={[8.0, 0.015, 0.015]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-21.5, 5.5, -9.0]} rotation={[0, 0.3, -0.08]}>
        <boxGeometry args={[6.0, 0.015, 0.015]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>

      {/* Cable Car Gondolas */}
      <group position={[-14.0, 4.75, -5.2]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.32, 6]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[0.26, 0.22, 0.2]} />
          <meshStandardMaterial
            color="#ef4444"
            roughness={0.3}
            emissive={weatherMode === 'night' ? '#ef4444' : '#000000'}
            emissiveIntensity={weatherMode === 'night' ? 0.8 : 0}
          />
        </mesh>
      </group>
      <group position={[-17.5, 5.15, -6.5]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.32, 6]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[0.26, 0.22, 0.2]} />
          <meshStandardMaterial
            color="#3b82f6"
            roughness={0.3}
            emissive={weatherMode === 'night' ? '#3b82f6' : '#000000'}
            emissiveIntensity={weatherMode === 'night' ? 0.8 : 0}
          />
        </mesh>
      </group>

      {/* =========================================================================
          7. BOATS & YACHTS SAILING IN THE BAY
      ========================================================================= */}
      {/* Luxury White Yacht cruising in the mid bay */}
      <Yacht position={[-9.5, -0.15, 2.8]} rotation={[0, -0.35, 0]} scale={0.85} />
      {/* Second boat in the distance */}
      <group position={[-16, -0.18, 5.0]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.5, 0.28, 0.55]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.4, 6]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>
        <mesh position={[0.22, 0.85, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.5, 1.1, 3]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* =========================================================================
          8. DISTANT MODERN COASTAL RESORT SKYLINE
      ========================================================================= */}
      <group position={[-22, 0, -15]}>
        {[
          { x: 0, w: 1.8, h: 7.2, z: 0, color: '#f1f5f9' },
          { x: -2.2, w: 1.5, h: 8.6, z: -1, color: '#e2e8f0' },
          { x: -4.3, w: 1.9, h: 6.4, z: -2, color: '#f8fafc' },
          { x: 2.1, w: 1.6, h: 7.8, z: 1, color: '#e2e8f0' },
          { x: 4.2, w: 2.0, h: 5.8, z: 2, color: '#cbd5e1' },
        ].map((bldg, i) => (
          <group key={i} position={[bldg.x, bldg.h / 2, bldg.z]}>
            <mesh>
              <boxGeometry args={[bldg.w, bldg.h, 1.2]} />
              <meshStandardMaterial color={bldg.color} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.62]}>
              <planeGeometry args={[bldg.w * 0.85, bldg.h * 0.8]} />
              <meshBasicMaterial
                color="#fef08a"
                transparent
                opacity={env.buildingLightOpacity}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          9. TROPICAL SKY DOME, RADIANT SUN & VOLUMETRIC CUMULUS CLOUDS
      ========================================================================= */}
      <group position={[-30, 9, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[55, 30]} />
          <meshBasicMaterial color={env.skyMid} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 7.5, 0.05]}>
          <planeGeometry args={[55, 15]} />
          <meshBasicMaterial color={env.skyTop} transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -7.0, 0.05]}>
          <planeGeometry args={[55, 12]} />
          <meshBasicMaterial color={env.skyBottom} transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Radiant Sun Disc / Moon */}
      <mesh position={env.sunPos}>
        <sphereGeometry args={[env.sunRadius, 16, 16]} />
        <meshBasicMaterial color={env.sunColor} />
      </mesh>
      {/* Sun Corona Glow Ring */}
      <mesh position={[env.sunPos[0] + 0.1, env.sunPos[1], env.sunPos[2]]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[env.sunRadius * 1.05, env.sunRadius * 2.2, 24]} />
        <meshBasicMaterial
          color={env.sunColor}
          transparent
          opacity={weatherMode === 'night' ? 0.2 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Volumetric Tropical Clouds */}
      <Cloud position={[-20, 9.0, -8]} scale={1.9} color={env.cloudColor} opacity={env.cloudOpacity} />
      <Cloud position={[-24, 10.5, 5]} scale={2.2} color={env.cloudColor} opacity={env.cloudOpacity} />
      <Cloud position={[-18, 8.0, 11]} scale={1.6} color={env.cloudColor} opacity={env.cloudOpacity} />
      <Cloud position={[-22, 8.5, -14]} scale={1.7} color={env.cloudColor} opacity={env.cloudOpacity} />
    </group>
  );
};
