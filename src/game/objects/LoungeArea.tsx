import React from 'react';
import * as THREE from 'three';

export const LoungeArea: React.FC = () => {
  return (
    <group>
      {/* =========================================================================
          1. DESIGNER HAND-TUFTED GEOMETRIC WOOL RUG
      ========================================================================= */}
      <mesh receiveShadow position={[4.5, 0.006, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 5.0]} />
        <meshStandardMaterial color="#1a1c23" roughness={0.95} />
      </mesh>
      {/* Sculpted Low-Pile Border Accent Line */}
      <mesh receiveShadow position={[4.5, 0.007, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.75, 1.78, 36]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.8} />
      </mesh>

      {/* =========================================================================
          2. ITALIAN CONTEMPORARY BOUCLÉ & VELVET MODULAR SOFA (Sofa cao cấp)
          Positioned centered at [4.5, 0, 2.7] matching Avatar sofa sitting point
      ========================================================================= */}
      <group position={[4.5, 0, 2.7]}>
        {/* Recessed Floating Solid Dark Walnut Base Frame */}
        <mesh castShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[3.2, 0.1, 1.65]} />
          <meshStandardMaterial color="#2c1f15" roughness={0.5} />
        </mesh>

        {/* 6 Tapered Brushed Brass Architectural Cylinder Feet */}
        {[-1.45, 0, 1.45].map((x) =>
          [-0.68, 0.68].map((z) => (
            <mesh key={`${x}_${z}`} position={[x, 0.025, z]}>
              <cylinderGeometry args={[0.025, 0.018, 0.05, 14]} />
              <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.2} />
            </mesh>
          ))
        )}

        {/* Deep Plush Seat Base with French Welt Piping */}
        <mesh castShadow position={[0, 0.26, 0.04]}>
          <boxGeometry args={[3.15, 0.22, 1.58]} />
          <meshStandardMaterial color="#2d3748" roughness={0.75} />
        </mesh>

        {/* Left & Right Ultra-Plush Bouclé Cushion Slabs */}
        <group position={[-0.72, 0.42, 0.06]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.44, 0.16, 1.44]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          {/* Subtle cushion crown bevel */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[1.38, 0.02, 1.38]} />
            <meshStandardMaterial color="#3b4a60" roughness={0.65} />
          </mesh>
        </group>

        <group position={[0.72, 0.42, 0.06]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.44, 0.16, 1.44]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[1.38, 0.02, 1.38]} />
            <meshStandardMaterial color="#3b4a60" roughness={0.65} />
          </mesh>
        </group>

        {/* Ergonomically Slanted Low-Profile Backrest */}
        <mesh castShadow position={[0, 0.65, 0.72]} rotation={[-0.06, 0, 0]}>
          <boxGeometry args={[3.15, 0.48, 0.26]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>

        {/* Soft Rounded Flank Armrests */}
        <mesh castShadow position={[-1.48, 0.52, 0.06]}>
          <boxGeometry args={[0.26, 0.36, 1.54]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[1.48, 0.52, 0.06]}>
          <boxGeometry args={[0.26, 0.36, 1.54]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>

        {/* Curated Designer Pillows & Cashmere Throw */}
        {/* Ochre Gold Velvet Lumbar Pillow */}
        <mesh castShadow position={[-0.75, 0.62, 0.52]} rotation={[0.18, 0.22, -0.06]}>
          <boxGeometry args={[0.46, 0.38, 0.15]} />
          <meshStandardMaterial color="#d97706" roughness={0.55} />
        </mesh>
        {/* Deep Petrol Blue Velvet Pillow */}
        <mesh castShadow position={[0.78, 0.62, 0.52]} rotation={[0.16, -0.25, 0.05]}>
          <boxGeometry args={[0.44, 0.36, 0.14]} />
          <meshStandardMaterial color="#0284c7" roughness={0.55} />
        </mesh>
        {/* Cylindrical Bolster Roll Cushion on Left */}
        <mesh castShadow position={[-1.25, 0.56, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.76, 16]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} />
        </mesh>
        {/* Soft Cashmere Throw Blanket draped over right arm */}
        <group position={[1.42, 0.52, -0.1]} rotation={[0, 0, -0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.12, 0.65]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.85} />
          </mesh>
          {/* Drooping fringe corner */}
          <mesh position={[0.1, -0.16, 0]}>
            <boxGeometry args={[0.04, 0.22, 0.55]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.85} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          3. TIERED NESTING MARBLE & FLUTED TAMBOUR COFFEE TABLES
      ========================================================================= */}
      {/* Primary Table: Italian Carrara Marble Slab & Brass Bevel */}
      <group position={[4.05, 0, 0.7]}>
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
      <group position={[5.15, 0, 0.95]}>
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
          5. BIOPHILIC LUXURY MONSTERA DELICIOSA IN FLUTED PLANTER
      ========================================================================= */}
      <group position={[6.2, 0, 4.8]}>
        {/* 4-Leg Natural Ash Wood Plant Stand with Brass Foot Caps */}
        {[-0.18, 0.18].map((x) =>
          [-0.18, 0.18].map((z) => (
            <group key={`leg_${x}_${z}`} position={[x, 0.22, z]}>
              <mesh>
                <cylinderGeometry args={[0.016, 0.016, 0.44, 12]} />
                <meshStandardMaterial color="#573a21" roughness={0.6} />
              </mesh>
              <mesh position={[0, -0.19, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.06, 12]} />
                <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          ))
        )}
        {/* Cross Bracing */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.4, 0.025, 0.025]} />
          <meshStandardMaterial color="#573a21" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.025, 0.025, 0.4]} />
          <meshStandardMaterial color="#573a21" roughness={0.6} />
        </mesh>

        {/* Fluted Matte White Ceramic Planter Pot */}
        <mesh castShadow position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.26, 0.22, 0.52, 28]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} />
        </mesh>
        {/* Dark Potting Soil with Preserved Moss */}
        <mesh position={[0, 0.76, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.03, 20]} />
          <meshStandardMaterial color="#2d1d11" roughness={0.95} />
        </mesh>

        {/* Multi-tier Sculptural Monstera Foliage */}
        {[
          { stemRot: [0.3, 0.2, 0], leafPos: [0.16, 1.05, 0.26], leafRot: [0.6, 0.3, -0.2], size: [0.36, 0.5] },
          { stemRot: [-0.35, -0.4, 0], leafPos: [-0.22, 1.15, -0.24], leafRot: [-0.5, -0.4, 0.2], size: [0.4, 0.54] },
          { stemRot: [0.1, 1.2, 0], leafPos: [0.3, 1.28, -0.1], leafRot: [0.3, 1.1, -0.3], size: [0.34, 0.48] },
          { stemRot: [-0.2, -1.3, 0], leafPos: [-0.3, 1.38, 0.16], leafRot: [-0.4, -1.2, 0.25], size: [0.38, 0.52] },
          { stemRot: [0.05, 0.1, 0], leafPos: [0, 1.58, 0], leafRot: [0.2, 0.1, 0], size: [0.42, 0.58] },
        ].map((leaf, idx) => (
          <group key={idx}>
            {/* Curved Stem */}
            <mesh position={[leaf.leafPos[0] * 0.5, 0.77 + (leaf.leafPos[1] - 0.77) * 0.45, leaf.leafPos[2] * 0.5]}>
              <cylinderGeometry args={[0.012, 0.016, leaf.leafPos[1] - 0.77, 8]} />
              <meshStandardMaterial color="#166534" roughness={0.6} />
            </mesh>
            {/* Fenestrated Glossy Leaf Blade */}
            <mesh
              castShadow
              position={leaf.leafPos as [number, number, number]}
              rotation={leaf.leafRot as [number, number, number]}
            >
              <planeGeometry args={[leaf.size[0], leaf.size[1]]} />
              <meshStandardMaterial
                color="#15803d"
                roughness={0.35}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          6. SMART HI-FI AUDIOPHILE TOWER SPEAKER
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
