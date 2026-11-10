import React from 'react';

export const RoomShell: React.FC = () => {
  // Acoustic vertical oak slats array (x from -6.2 to -2.0)
  const slats = Array.from({ length: 28 }, (_, i) => -6.2 + i * 0.15);

  return (
    <group>
      {/* ==================== 1. POLISHED WOOD FLOOR & DESIGNER RUGS ==================== */}
      {/* Main Rich Walnut Parquet Floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial
          color="#2a2018"
          roughness={0.4}
          metalness={0.08}
        />
      </mesh>

      {/* Main Workstation Designer Rug (Under Desk & Bookshelf) */}
      <mesh receiveShadow position={[-2.2, 0.005, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.8, 7.2]} />
        <meshStandardMaterial
          color="#1e222b"
          roughness={0.9}
        />
      </mesh>
      {/* Decorative Border for Workstation Rug */}
      <mesh position={[-2.2, 0.006, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.6, 3.68, 4]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>

      {/* ==================== 2. CEILING & ARCHITECTURAL COVE ==================== */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#0f1117" roughness={0.9} />
      </mesh>

      {/* Modern Perimeter Cove Light Glow Troughs */}
      <mesh position={[0, 4.16, -5.8]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13.6, 0.12]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive="#f59e0b"
          emissiveIntensity={1.2}
        />
      </mesh>
      <mesh position={[6.8, 4.16, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[11.6, 0.12]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Ceiling Track Light System with Spotlights */}
      <group position={[0, 4.14, -1]}>
        {/* Track Bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[10, 0.04, 0.04]} />
          <meshStandardMaterial color="#090a0f" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Minimalist Spotlight Heads */}
        {[-3.8, -1.5, 1.2, 3.5].map((x, idx) => (
          <group key={idx} position={[x, -0.06, 0]} rotation={[0.3, idx % 2 === 0 ? 0.2 : -0.2, 0]}>
            <mesh>
              <cylinderGeometry args={[0.045, 0.045, 0.1, 12]} />
              <meshStandardMaterial color="#1e222a" metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.051, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.04, 12]} />
              <meshBasicMaterial color="#fffbeb" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ==================== 3. BACK WALL WITH OAK SLATS ==================== */}
      <mesh receiveShadow position={[0, 2.1, -6]}>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial color="#1a1d24" roughness={0.8} />
      </mesh>

      {/* Architectural Dark Charcoal Feature Backing */}
      <mesh position={[-4.1, 2.1, -5.98]}>
        <planeGeometry args={[4.8, 4.1]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.9} />
      </mesh>

      {/* Vertical Oak Acoustic Slats */}
      <group position={[0, 2.1, -5.95]}>
        {slats.map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.05, 4.1, 0.025]} />
            <meshStandardMaterial color="#66462c" roughness={0.65} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* Warm Ambient LED Strip Behind Acoustic Wall */}
      <mesh position={[-4.1, 0.06, -5.92]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 0.06]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.5} />
      </mesh>

      {/* ==================== 4. FRONT WALL & ENTRANCE THRESHOLD ==================== */}
      <mesh receiveShadow position={[-4.5, 2.1, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 4.2]} />
        <meshStandardMaterial color="#181a20" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[4.5, 2.1, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5, 4.2]} />
        <meshStandardMaterial color="#181a20" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 3.5, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4, 1.4]} />
        <meshStandardMaterial color="#181a20" roughness={0.85} />
      </mesh>

      {/* Entrance Doorway Architrave & Threshold */}
      <group position={[0, 0, 5.95]}>
        {/* Modern Minimalist Architrave Frame */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[2.2, 2.8, 0.08]} />
          <meshStandardMaterial color="#0b0d12" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Solid Walnut Door with Sleek Vertical Grooves */}
        <mesh position={[0, 1.35, 0.02]}>
          <boxGeometry args={[1.96, 2.66, 0.05]} />
          <meshStandardMaterial color="#38281d" roughness={0.5} />
        </mesh>
        {/* Architectural Long Brushed Brass Pull Handle */}
        <mesh position={[0.74, 1.3, 0.07]}>
          <cylinderGeometry args={[0.016, 0.016, 0.8, 12]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Backlit Brushed Aluminum Nameplate */}
        <group position={[0, 2.48, 0.06]}>
          <mesh>
            <boxGeometry args={[1.5, 0.26, 0.03]} />
            <meshStandardMaterial color="#090a0f" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[1.42, 0.2]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      </group>

      {/* ==================== 5. LEFT WALL (SKYLINE WINDOW AREA) ==================== */}
      <mesh receiveShadow position={[-7, 2.1, -4.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 4.2]} />
        <meshStandardMaterial color="#1c1f26" roughness={0.8} />
      </mesh>
      <mesh receiveShadow position={[-7, 2.1, 4.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 4.2]} />
        <meshStandardMaterial color="#1c1f26" roughness={0.8} />
      </mesh>
      <mesh receiveShadow position={[-7, 3.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6, 0.8]} />
        <meshStandardMaterial color="#1c1f26" roughness={0.8} />
      </mesh>
      <mesh receiveShadow position={[-7, 0.35, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6, 0.7]} />
        <meshStandardMaterial color="#1c1f26" roughness={0.8} />
      </mesh>

      {/* ==================== 6. RIGHT WALL (PROJECT GALLERY) ==================== */}
      <mesh receiveShadow position={[7, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[12, 4.2]} />
        <meshStandardMaterial color="#1c2028" roughness={0.8} />
      </mesh>

      {/* Baseboard Skirting Trim around room perimeter */}
      <mesh position={[0, 0.06, -5.96]}>
        <boxGeometry args={[14, 0.12, 0.03]} />
        <meshStandardMaterial color="#090a0f" roughness={0.5} />
      </mesh>
      <mesh position={[6.96, 0.06, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.12, 0.03]} />
        <meshStandardMaterial color="#090a0f" roughness={0.5} />
      </mesh>
    </group>
  );
};
