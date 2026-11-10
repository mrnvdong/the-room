import React from 'react';

export const LoungeArea: React.FC = () => {
  return (
    <group>
      {/* 1. Designer Geometric Lounge Rug */}
      <mesh receiveShadow position={[4.5, 0.006, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 4.8]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.95} />
      </mesh>
      {/* Inner Accent Rug Border */}
      <mesh receiveShadow position={[4.5, 0.007, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.63, 32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.8} />
      </mesh>

      {/* 2. Scandinavian Modern Bouclé / Velvet Sofa */}
      <group position={[4.5, 0, 2.7]}>
        {/* Recessed Floating Oak Plinth Base */}
        <mesh castShadow position={[0, 0.06, 0]}>
          <boxGeometry args={[3.2, 0.12, 1.7]} />
          <meshStandardMaterial color="#2d2218" roughness={0.6} />
        </mesh>
        {/* Minimalist Brass Feet */}
        {[-1.4, 1.4].map((x) =>
          [-0.65, 0.65].map((z) => (
            <mesh key={`${x}_${z}`} position={[x, 0.03, z]}>
              <cylinderGeometry args={[0.03, 0.025, 0.06, 12]} />
              <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
            </mesh>
          ))
        )}

        {/* Deep Plush Seat Plinth */}
        <mesh castShadow position={[0, 0.28, 0.05]}>
          <boxGeometry args={[3.15, 0.24, 1.6]} />
          <meshStandardMaterial color="#334155" roughness={0.75} />
        </mesh>

        {/* Left & Right Plush Seat Cushions */}
        <mesh castShadow position={[-0.72, 0.44, 0.08]}>
          <boxGeometry args={[1.42, 0.14, 1.42]} />
          <meshStandardMaterial color="#38475d" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0.72, 0.44, 0.08]}>
          <boxGeometry args={[1.42, 0.14, 1.42]} />
          <meshStandardMaterial color="#38475d" roughness={0.7} />
        </mesh>

        {/* Contoured Low Backrest */}
        <mesh castShadow position={[0, 0.65, 0.72]}>
          <boxGeometry args={[3.15, 0.48, 0.28]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>

        {/* Soft Rounded Armrests */}
        <mesh castShadow position={[-1.46, 0.52, 0.08]}>
          <boxGeometry args={[0.26, 0.36, 1.56]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[1.46, 0.52, 0.08]}>
          <boxGeometry args={[0.26, 0.36, 1.56]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>

        {/* Cylindrical Bolster Pillow on Left */}
        <mesh castShadow position={[-1.25, 0.56, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} />
        </mesh>

        {/* Designer Ochre Velvet Accent Pillow */}
        <mesh castShadow position={[-0.7, 0.62, 0.52]} rotation={[0.18, 0.25, -0.05]}>
          <boxGeometry args={[0.45, 0.4, 0.14]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.5} />
        </mesh>

        {/* Deep Petrol Blue Accent Pillow */}
        <mesh castShadow position={[0.8, 0.62, 0.52]} rotation={[0.16, -0.22, 0.04]}>
          <boxGeometry args={[0.42, 0.38, 0.14]} />
          <meshStandardMaterial color="#0284c7" roughness={0.5} />
        </mesh>
      </group>

      {/* 3. Dual Nesting Designer Coffee Tables */}
      {/* Primary Nesting Table (Carrara Marble Top + Brass Rim) */}
      <group position={[4.1, 0, 0.7]}>
        {/* Marble Top Disc */}
        <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.035, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.05} />
        </mesh>
        {/* Brass Outer Rim Edge */}
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.63, 0.63, 0.036, 32]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Minimalist 3-Leg Tripod in Matte Black & Brass Tips */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
          const legX = Math.cos(angle) * 0.45;
          const legZ = Math.sin(angle) * 0.45;
          return (
            <group key={idx} position={[legX, 0.18, legZ]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.018, 0.015, 0.36, 12]} />
                <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Brass Foot Cap */}
              <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.04, 12]} />
                <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          );
        })}

        {/* Artisanal Ceramic Coffee Cup & Saucer */}
        <group position={[-0.15, 0.4, 0.1]}>
          <mesh position={[0, 0.008, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.015, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.045, 0.035, 0.07, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          {/* Coffee liquid */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.005, 16]} />
            <meshStandardMaterial color="#451a03" roughness={0.1} />
          </mesh>
        </group>

        {/* Minimalist Hardcover Architecture Monograph */}
        <mesh castShadow position={[0.18, 0.41, -0.05]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.3, 0.025, 0.4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
      </group>

      {/* Secondary Nesting Table (Lower Smoked Glass / Fluted Oak) */}
      <group position={[5.2, 0, 0.95]}>
        {/* Smoked Dark Glass Top */}
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.025, 32]} />
          <meshPhysicalMaterial
            color="#090a0f"
            roughness={0.1}
            transmission={0.7}
            transparent
            opacity={0.88}
            ior={1.5}
          />
        </mesh>
        {/* Fluted Base Cylinder */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.24, 0.26, 0.28, 24]} />
          <meshStandardMaterial color="#292524" roughness={0.5} />
        </mesh>
        {/* Minimalist Brass Ring Tray */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.12, 0.11, 0.018, 20]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 4. "The Frame" Lifestyle OLED TV with Ambient Glow on Right Wall */}
      <group position={[6.92, 2.2, 2.6]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Natural White Oak Bezel Frame */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 1.45, 0.04]} />
          <meshStandardMaterial color="#d4a373" roughness={0.4} />
        </mesh>
        {/* Inner Black Mat Border */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[2.42, 1.37]} />
          <meshStandardMaterial color="#090a0f" roughness={0.5} />
        </mesh>
        {/* OLED Artwork Display with Subtle Emissive Glow */}
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[2.32, 1.27]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#1e3a8a"
            emissiveIntensity={0.65}
            roughness={0.1}
          />
        </mesh>
        {/* Ambient Backlight strip casting glow against the wall */}
        <pointLight position={[0, 0, -0.1]} color="#38bdf8" intensity={0.6} distance={2.0} />
      </group>

      {/* 5. Biophilic Monstera Plant in Fluted Ceramic Pot with Wood Stand */}
      <group position={[6.2, 0, 4.8]}>
        {/* 4-Leg Natural Ash Wood Plant Stand */}
        {[-0.18, 0.18].map((x) =>
          [-0.18, 0.18].map((z) => (
            <mesh key={`leg_${x}_${z}`} position={[x, 0.22, z]}>
              <cylinderGeometry args={[0.018, 0.018, 0.44, 12]} />
              <meshStandardMaterial color="#573a21" roughness={0.6} />
            </mesh>
          ))
        )}
        {/* Cross Braces */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.4, 0.03, 0.03]} />
          <meshStandardMaterial color="#573a21" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#573a21" roughness={0.6} />
        </mesh>

        {/* Fluted Stone White Ceramic Planter */}
        <mesh castShadow position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.26, 0.22, 0.52, 24]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.25} />
        </mesh>
        {/* Dark Potting Soil */}
        <mesh position={[0, 0.76, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.03, 20]} />
          <meshStandardMaterial color="#2d1d11" roughness={0.9} />
        </mesh>

        {/* Sculptural Arching Monstera Stems & Leaves */}
        {[
          { stemRot: [0.3, 0.2, 0], leafPos: [0.15, 1.05, 0.25], leafRot: [0.6, 0.3, -0.2], size: [0.34, 0.48] },
          { stemRot: [-0.35, -0.4, 0], leafPos: [-0.2, 1.15, -0.22], leafRot: [-0.5, -0.4, 0.2], size: [0.38, 0.52] },
          { stemRot: [0.1, 1.2, 0], leafPos: [0.28, 1.25, -0.1], leafRot: [0.3, 1.1, -0.3], size: [0.32, 0.46] },
          { stemRot: [-0.2, -1.3, 0], leafPos: [-0.28, 1.35, 0.15], leafRot: [-0.4, -1.2, 0.25], size: [0.36, 0.5] },
          { stemRot: [0.05, 0.1, 0], leafPos: [0, 1.55, 0], leafRot: [0.2, 0.1, 0], size: [0.4, 0.56] },
        ].map((leaf, idx) => (
          <group key={idx}>
            {/* Arching Plant Stem */}
            <mesh position={[leaf.leafPos[0] * 0.5, 0.77 + (leaf.leafPos[1] - 0.77) * 0.45, leaf.leafPos[2] * 0.5]}>
              <cylinderGeometry args={[0.012, 0.016, leaf.leafPos[1] - 0.77, 8]} />
              <meshStandardMaterial color="#166534" roughness={0.6} />
            </mesh>
            {/* Monstera Stylized Leaf Blade */}
            <mesh
              castShadow
              position={leaf.leafPos as [number, number, number]}
              rotation={leaf.leafRot as [number, number, number]}
            >
              <planeGeometry args={[leaf.size[0], leaf.size[1]]} />
              <meshStandardMaterial
                color="#15803d"
                roughness={0.4}
                side={2} // THREE.DoubleSide
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 6. Smart Hi-Fi Audiophile Speaker Column */}
      <group position={[6.4, 0, 0.5]}>
        {/* Cast Aluminum Base Ring */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 0.04, 24]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Woven Acoustical Fabric Tower */}
        <mesh castShadow position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.88, 24]} />
          <meshStandardMaterial color="#27272a" roughness={0.8} />
        </mesh>
        {/* Brushed Metal Top Touch Panel */}
        <mesh position={[0, 0.93, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 24]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Cyan Ambient Status LED Ring */}
        <mesh position={[0, 0.941, 0]}>
          <ringGeometry args={[0.08, 0.1, 24]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  );
};
