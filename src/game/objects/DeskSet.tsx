import React from 'react';
import * as THREE from 'three';
import { useRoomStateStore } from '@/stores/useRoomStateStore';

export const DeskSet: React.FC = () => {
  const deskLampOn = useRoomStateStore((state) => state.deskLampOn);
  const secretDrawerUnlocked = useRoomStateStore((state) => state.secretDrawerUnlocked);

  return (
    <group position={[-4.7, 0, -3.7]}>
      {/* =========================================================================
          1. EXECUTIVE WALNUT MOTORIZED STANDING DESK (Bàn làm việc gỗ óc chó cao cấp)
      ========================================================================= */}
      {/* Solid Live-Edge Walnut Tabletop with Beveled Chamfer */}
      <group position={[0, 0.74, 0]}>
        {/* Main Solid Walnut Core */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.85, 0.07, 1.38]} />
          <meshStandardMaterial
            color="#3a2518"
            roughness={0.35}
            metalness={0.06}
          />
        </mesh>
        {/* Front Edge Bevel Trim (Live-edge feel) */}
        <mesh position={[0, -0.015, 0.69]}>
          <boxGeometry args={[2.85, 0.04, 0.02]} />
          <meshStandardMaterial color="#4a3020" roughness={0.4} />
        </mesh>
        {/* Brushed Brass Inlay Accent Line along the back */}
        <mesh position={[0, 0.036, -0.45]}>
          <boxGeometry args={[2.6, 0.003, 0.012]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Dual Heavy-Duty Motorized Lifting Legs (T-Frame) */}
      {/* Left Motorized Leg Column */}
      <group position={[-1.25, 0, 0]}>
        {/* Heavy Beveled Floor Foot */}
        <mesh castShadow position={[0, 0.025, 0]}>
          <boxGeometry args={[0.12, 0.05, 1.1]} />
          <meshStandardMaterial color="#0b0e14" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Outer Telescopic Lifting Column */}
        <mesh castShadow position={[0, 0.22, 0]}>
          <boxGeometry args={[0.09, 0.36, 0.1]} />
          <meshStandardMaterial color="#111620" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Inner Lifting Column */}
        <mesh castShadow position={[0, 0.52, 0]}>
          <boxGeometry args={[0.08, 0.36, 0.09]} />
          <meshStandardMaterial color="#181f2c" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Top Mounting Plate */}
        <mesh position={[0, 0.705, 0]}>
          <boxGeometry args={[0.11, 0.02, 0.9]} />
          <meshStandardMaterial color="#0b0e14" metalness={0.8} />
        </mesh>
      </group>

      {/* Right Motorized Leg Column */}
      <group position={[1.25, 0, 0]}>
        <mesh castShadow position={[0, 0.025, 0]}>
          <boxGeometry args={[0.12, 0.05, 1.1]} />
          <meshStandardMaterial color="#0b0e14" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh castShadow position={[0, 0.22, 0]}>
          <boxGeometry args={[0.09, 0.36, 0.1]} />
          <meshStandardMaterial color="#111620" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh castShadow position={[0, 0.52, 0]}>
          <boxGeometry args={[0.08, 0.36, 0.09]} />
          <meshStandardMaterial color="#181f2c" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.705, 0]}>
          <boxGeometry args={[0.11, 0.02, 0.9]} />
          <meshStandardMaterial color="#0b0e14" metalness={0.8} />
        </mesh>
      </group>

      {/* Under-Desk Cable Management Mesh Tray & Crossbeam */}
      <mesh position={[0, 0.69, -0.2]}>
        <boxGeometry args={[2.1, 0.04, 0.22]} />
        <meshStandardMaterial color="#090c10" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Vertebrae Flexible Cable Spine (Descending to floor) */}
      <group position={[-1.15, 0.35, -0.3]}>
        {[0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56].map((y, idx) => (
          <mesh key={idx} position={[0, y - 0.25, 0]}>
            <boxGeometry args={[0.045, 0.05, 0.055]} />
            <meshStandardMaterial color="#1e2430" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Under-Desk Digital Height Controller with LED Readout */}
      <group position={[0.95, 0.705, 0.68]}>
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[0.16, 0.03, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* OLED Height Display Screen "72.5 cm" */}
        <mesh position={[-0.03, -0.015, 0.026]}>
          <planeGeometry args={[0.065, 0.018]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} />
        </mesh>
        {/* Preset Buttons */}
        <mesh position={[0.035, -0.015, 0.026]}>
          <planeGeometry args={[0.04, 0.016]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      </group>

      {/* Premium Stitched Leather & Felt Desk Mat */}
      <group position={[0, 0.776, 0.08]}>
        <mesh receiveShadow>
          <boxGeometry args={[1.95, 0.008, 0.85]} />
          <meshStandardMaterial color="#1c202a" roughness={0.88} />
        </mesh>
        {/* Stitched Perimeter Border Line */}
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[1.93, 0.001, 0.83]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* =========================================================================
          2. FLAGSHIP 49" CURVED ULTRAWIDE DUAL-QHD DISPLAY (Màn hình cong 1500R)
      ========================================================================= */}
      <group position={[-0.15, 0.78, -0.36]}>
        {/* Heavy Dual-Link Cast Aluminum Monitor Arm */}
        {/* Base Clamp */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.04, 20]} />
          <meshStandardMaterial color="#1e2532" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Lower Arm Segment */}
        <mesh position={[0, 0.18, 0.02]} rotation={[-0.2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.032, 0.35, 16]} />
          <meshStandardMaterial color="#1e2532" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Articulation Elbow Hinge */}
        <mesh position={[0, 0.34, 0.06]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Upper Gas-Spring Arm */}
        <mesh position={[0, 0.44, 0.03]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.026, 0.028, 0.24, 14]} />
          <meshStandardMaterial color="#1e2532" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* VESA Mount Plate & Ball Joint */}
        <mesh position={[0, 0.52, 0.01]}>
          <boxGeometry args={[0.12, 0.12, 0.03]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>

        {/* 1500R Curved Ultrawide Display Structure (Center + Left Angle + Right Angle) */}
        <group position={[0, 0.54, 0.04]}>
          {/* Center Display Segment */}
          <group position={[0, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.7, 0.52, 0.03]} />
              <meshStandardMaterial color="#0a0d14" roughness={0.25} metalness={0.8} />
            </mesh>
            {/* Center OLED Screen Pane */}
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[0.68, 0.48]} />
              <meshStandardMaterial
                color="#0f172a"
                emissive="#0284c7"
                emissiveIntensity={0.7}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* Left Curved Display Wing (Angled at 12° forward) */}
          <group position={[-0.48, 0, 0.04]} rotation={[0, 0.22, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.38, 0.52, 0.03]} />
              <meshStandardMaterial color="#0a0d14" roughness={0.25} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[0.36, 0.48]} />
              <meshStandardMaterial
                color="#0f172a"
                emissive="#0369a1"
                emissiveIntensity={0.65}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* Right Curved Display Wing (Angled at 12° forward) */}
          <group position={[0.48, 0, 0.04]} rotation={[0, -0.22, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.38, 0.52, 0.03]} />
              <meshStandardMaterial color="#0a0d14" roughness={0.25} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[0.36, 0.48]} />
              <meshStandardMaterial
                color="#0f172a"
                emissive="#0369a1"
                emissiveIntensity={0.65}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* Top 4K Conference Webcam with Privacy Shutter Slider */}
          <group position={[0, 0.275, 0.02]}>
            <mesh>
              <boxGeometry args={[0.14, 0.03, 0.04]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            {/* Camera Lens */}
            <mesh position={[0, 0, 0.022]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.009, 0.009, 0.005, 14]} />
              <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} />
            </mesh>
            {/* Green Activity LED */}
            <mesh position={[0.04, 0, 0.021]}>
              <sphereGeometry args={[0.003, 6, 6]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
          </group>

          {/* Bottom Brushed Aluminum Logo Chin & Soundbar */}
          <mesh position={[0, -0.265, 0.02]}>
            <boxGeometry args={[0.72, 0.02, 0.035]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* ARGB Ambient Bias Light Strip casting glow on wall */}
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[1.35, 0.46]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          3. SECONDARY 27" PORTRAIT MONITOR (Màn hình phụ dựng đứng)
      ========================================================================= */}
      <group position={[0.9, 0.78, -0.32]} rotation={[0, -0.36, 0]}>
        {/* Slim Gas-Lift Arm */}
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.48, 14]} />
          <meshStandardMaterial color="#1e2532" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Monitor Housing */}
        <mesh castShadow position={[0, 0.48, 0.03]}>
          <boxGeometry args={[0.42, 0.74, 0.03]} />
          <meshStandardMaterial color="#0a0d14" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Code / Architecture Telemetry Screen */}
        <mesh position={[0, 0.48, 0.048]}>
          <planeGeometry args={[0.39, 0.7]} />
          <meshStandardMaterial
            color="#052e16"
            emissive="#10b981"
            emissiveIntensity={0.65}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* =========================================================================
          4. HIGH-END GLASS-PANEL GAMING / WORKSTATION PC TOWER (Case máy tính khủng)
      ========================================================================= */}
      <group position={[-1.15, 0.78, -0.25]} rotation={[0, 0.22, 0]}>
        {/* Premium Dual-Chamber Aluminum Chassis */}
        <mesh castShadow position={[0, 0.24, 0]}>
          <boxGeometry args={[0.26, 0.48, 0.52]} />
          <meshStandardMaterial color="#090d14" roughness={0.25} metalness={0.85} />
        </mesh>
        {/* Tempered Glass Side Window Panel */}
        <mesh position={[0.133, 0.24, 0]}>
          <boxGeometry args={[0.005, 0.44, 0.48]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transmission={0.85}
            transparent
            opacity={0.4}
            roughness={0.05}
            ior={1.5}
          />
        </mesh>
        {/* Interior Illuminated RTX Triple-Fan GPU */}
        <group position={[0.02, 0.16, 0]}>
          <mesh>
            <boxGeometry args={[0.15, 0.065, 0.32]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Glowing GPU RGB Side Logo */}
          <mesh position={[0.08, 0, 0]}>
            <planeGeometry args={[0.015, 0.16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
        {/* AIO Liquid CPU Cooler with LCD Pump Block */}
        <group position={[-0.04, 0.32, -0.05]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={1.2} />
          </mesh>
        </group>
        {/* Front Mesh Intake with 2 Glowing Fan Rings */}
        {[0.14, 0.34].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.262]}>
            <ringGeometry args={[0.065, 0.085, 20]} />
            <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          5. CUSTOM MECHANICAL KEYBOARD & ERGONOMIC MOUSE
      ========================================================================= */}
      {/* 75% Aluminum Gasket-Mount Mechanical Keyboard */}
      <group position={[-0.15, 0.785, 0.14]}>
        {/* Heavy Anodized Aluminum Case */}
        <mesh castShadow position={[0, 0.012, 0]}>
          <boxGeometry args={[0.48, 0.022, 0.18]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Brass Weight Bar on Top Edge */}
        <mesh position={[0, 0.022, -0.082]}>
          <boxGeometry args={[0.42, 0.004, 0.012]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Sculpted Keycap Matrix with RGB Underglow */}
        <mesh position={[0, 0.024, 0.005]}>
          <boxGeometry args={[0.45, 0.012, 0.15]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        {/* Accent Cyan Enter & Spacebar Keycaps */}
        <mesh position={[0.16, 0.03, 0.01]}>
          <boxGeometry args={[0.05, 0.006, 0.025]} />
          <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.04, 0.03, 0.055]}>
          <boxGeometry args={[0.18, 0.006, 0.024]} />
          <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.5} />
        </mesh>
        {/* Gold Rotary Volume Encoder Knob */}
        <mesh position={[0.21, 0.032, -0.065]}>
          <cylinderGeometry args={[0.014, 0.014, 0.014, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Coiled Braided Aviator Cable */}
        <group position={[-0.1, 0.01, -0.11]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.16, 12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Ergonomic Sculpted Wireless Mouse (MX Master Style) */}
      <group position={[0.38, 0.785, 0.14]}>
        {/* Contoured Thumb Rest & Palm Body */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <boxGeometry args={[0.075, 0.036, 0.125]} />
          <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Metallic Knurled Scroll Wheel */}
        <mesh position={[0, 0.038, -0.02]}>
          <cylinderGeometry args={[0.007, 0.007, 0.01, 14]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Thumb Rest Wing */}
        <mesh position={[-0.038, 0.01, 0.01]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.02, 0.01, 0.07]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
      </group>

      {/* Walnut & Brass Studio Headphone Stand with Planar Headphones */}
      <group position={[1.18, 0.78, 0.2]}>
        {/* Walnut Base */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 18]} />
          <meshStandardMaterial color="#3a2518" roughness={0.5} />
        </mesh>
        {/* Brass Rod */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.3, 12]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Curved Headband Cradle */}
        <mesh position={[0, 0.31, 0]}>
          <boxGeometry args={[0.08, 0.012, 0.04]} />
          <meshStandardMaterial color="#3a2518" roughness={0.5} />
        </mesh>
        {/* Headphones: Leather Headband & Plush Round Earcups */}
        <group position={[0, 0.25, 0]}>
          {/* Headband Arch */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.03, 16, 1, true, 0, Math.PI]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} side={THREE.DoubleSide} />
          </mesh>
          {/* Left Earcup */}
          <mesh position={[-0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.025, 18]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {/* Right Earcup */}
          <mesh position={[0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.025, 18]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Ceramic Coffee Tumbler with Silicone Grip */}
      <group position={[-0.78, 0.78, 0.24]}>
        <mesh castShadow position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.046, 0.038, 0.13, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Dark Terracotta Silicone Grip Band */}
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[0.047, 0.044, 0.05, 16]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        {/* Sip Lid */}
        <mesh position={[0, 0.138, 0]}>
          <cylinderGeometry args={[0.047, 0.047, 0.012, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
      </group>

      {/* =========================================================================
          6. ARCHITECTURAL BALANCED-ARM DESK TASK LAMP (Đèn bàn kiến trúc sư)
      ========================================================================= */}
      <group position={[-0.92, 0.78, 0.45]}>
        {/* Heavy Cast Iron Base */}
        <mesh position={[0, 0.015, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.025, 20]} />
          <meshStandardMaterial color="#1e2532" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Lower Twin Arms */}
        <group position={[0, 0.22, 0]} rotation={[0.2, 0, 0]}>
          <mesh position={[-0.015, 0, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.4, 10]} />
            <meshStandardMaterial color="#1e2532" metalness={0.9} />
          </mesh>
          <mesh position={[0.015, 0, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.4, 10]} />
            <meshStandardMaterial color="#1e2532" metalness={0.9} />
          </mesh>
        </group>
        {/* Middle Brass Articulation Hinge & Springs */}
        <mesh position={[0, 0.42, 0.08]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Upper Arm Segment */}
        <group position={[0, 0.58, 0.02]} rotation={[-0.35, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.007, 0.007, 0.36, 10]} />
            <meshStandardMaterial color="#1e2532" metalness={0.9} />
          </mesh>
        </group>
        {/* Sleek Minimalist LED Lamp Head */}
        <group position={[0, 0.72, -0.06]} rotation={[0.4, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.22, 0.022, 0.05]} />
            <meshStandardMaterial
              color={deskLampOn ? '#fbbf24' : '#64748b'}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* LED Diffuser Lens */}
          <mesh position={[0, -0.012, 0]}>
            <planeGeometry args={[0.2, 0.04]} />
            <meshStandardMaterial
              color="#fffbeb"
              emissive={deskLampOn ? '#fef08a' : '#000000'}
              emissiveIntensity={deskLampOn ? 2.5 : 0}
            />
          </mesh>
        </group>
        {deskLampOn && (
          <spotLight
            position={[0, 0.7, -0.06]}
            target-position={[0, 0, 0]}
            color="#fffbeb"
            intensity={2.8}
            angle={0.65}
            penumbra={0.7}
            distance={3.5}
          />
        )}
      </group>

      {/* =========================================================================
          7. SECRET DRAWER VAULT UNIT (Tủ khóa tài liệu gỗ óc chó & bàn phím số)
      ========================================================================= */}
      <group position={[1.05, 0.34, 0]}>
        {/* Solid Walnut Pedestal Cabinet */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.64, 0.92]} />
          <meshStandardMaterial color="#301f14" roughness={0.4} />
        </mesh>
        {/* Top Drawer Faceplate */}
        <mesh position={[0, 0.16, 0.465]}>
          <boxGeometry args={[0.5, 0.24, 0.02]} />
          <meshStandardMaterial color="#3a271a" roughness={0.35} />
        </mesh>
        {/* Secret Lower Vault Drawer Faceplate */}
        <mesh position={[0, -0.14, 0.465]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial color="#3a271a" roughness={0.35} />
        </mesh>
        {/* Brushed Brass Linear Drawer Pulls */}
        <mesh position={[0, 0.16, 0.48]}>
          <boxGeometry args={[0.18, 0.015, 0.015]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.08, 0.48]}>
          <boxGeometry args={[0.18, 0.015, 0.015]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* High-Tech Digital Keypad Vault Lock */}
        <group position={[0, -0.2, 0.48]}>
          <mesh>
            <boxGeometry args={[0.11, 0.08, 0.012]} />
            <meshStandardMaterial color="#090d14" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* LED Status Ring */}
          <mesh position={[0, 0, 0.007]}>
            <circleGeometry args={[0.02, 16]} />
            <meshStandardMaterial
              color={secretDrawerUnlocked ? '#10b981' : '#f59e0b'}
              emissive={secretDrawerUnlocked ? '#10b981' : '#f59e0b'}
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          8. HERMAN MILLER STYLE HIGH-END ERGONOMIC CHAIR (Ghế công thái học cao cấp)
          Located exactly at Z = 1.7 (World Z = -2.0) matching Avatar seat position
      ========================================================================= */}
      <group position={[0, 0, 1.7]} rotation={[0, Math.PI, 0]}>
        {/* 5-Star Polished Cast Aluminum Star Base with 5 Curved Legs */}
        <group position={[0, 0.06, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* 5 Radiating Curved Spider Legs with Dual-Wheel Casters */}
          {[0, 72, 144, 216, 288].map((deg, idx) => {
            const rad = (deg * Math.PI) / 180;
            const legLen = 0.35;
            const lx = Math.cos(rad) * legLen;
            const lz = Math.sin(rad) * legLen;
            return (
              <group key={idx}>
                {/* Slanted polished leg */}
                <mesh
                  position={[lx * 0.5, -0.01, lz * 0.5]}
                  rotation={[0, -rad + Math.PI / 2, 0.1]}
                >
                  <boxGeometry args={[0.038, 0.024, legLen]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.15} />
                </mesh>
                {/* Dual-Wheel Caster Assembly */}
                <group position={[lx, -0.02, lz]}>
                  {/* Caster stem */}
                  <mesh position={[0, 0.01, 0]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.02, 8]} />
                    <meshStandardMaterial color="#334155" metalness={0.8} />
                  </mesh>
                  {/* Rolling Caster Wheels */}
                  <mesh position={[-0.012, -0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.026, 0.026, 0.01, 14]} />
                    <meshStandardMaterial color="#090d14" roughness={0.4} />
                  </mesh>
                  <mesh position={[0.012, -0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.026, 0.026, 0.01, 14]} />
                    <meshStandardMaterial color="#090d14" roughness={0.4} />
                  </mesh>
                </group>
              </group>
            );
          })}
        </group>

        {/* Heavy-Duty Pneumatic Gas Cylinder & Mechanism Housing */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.028, 0.032, 0.38, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Tilt Mechanism Box & Tension Adjustment Knobs */}
        <mesh position={[0, 0.44, 0]}>
          <boxGeometry args={[0.22, 0.08, 0.24]} />
          <meshStandardMaterial color="#090d14" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Height Adjustment Paddle Lever */}
        <mesh position={[0.14, 0.44, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>

        {/* Ergonomic Waterfall Seat Cushion with Breathable Mesh Fabric */}
        <group position={[0, 0.5, 0]}>
          {/* Main Seat Pan with Gentle Contouring */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.56, 0.07, 0.52]} />
            <meshStandardMaterial color="#1e2532" roughness={0.7} />
          </mesh>
          {/* Waterfall Front Lip (Rolls smoothly down to relieve thigh pressure) */}
          <mesh position={[0, -0.02, 0.24]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.56, 0.05, 0.08]} />
            <meshStandardMaterial color="#1e2532" roughness={0.7} />
          </mesh>
        </group>

        {/* Articulated Spine & Backrest Assembly */}
        <group position={[0, 0.55, -0.22]}>
          {/* Anatomical Spine Column (Y-Spine Backbone) */}
          <mesh position={[0, 0.4, -0.04]}>
            <boxGeometry args={[0.07, 0.72, 0.045]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Dynamic Lumbar Support Pad */}
          <mesh position={[0, 0.18, 0.02]}>
            <boxGeometry args={[0.42, 0.14, 0.035]} />
            <meshStandardMaterial color="#090d14" roughness={0.5} />
          </mesh>

          {/* Flexible Rib Supports holding the mesh back */}
          {[0.12, 0.28, 0.44, 0.6].map((y, idx) => (
            <mesh key={idx} position={[0, y, -0.01]}>
              <boxGeometry args={[0.46, 0.02, 0.03]} />
              <meshStandardMaterial color="#334155" metalness={0.7} />
            </mesh>
          ))}

          {/* Breathable High-Tension Mesh Backrest with Ergonomic Lumbar Curve */}
          <mesh castShadow position={[0, 0.42, 0.01]} rotation={[-0.08, 0, 0]}>
            <boxGeometry args={[0.5, 0.68, 0.025]} />
            <meshStandardMaterial
              color="#2a3344"
              roughness={0.65}
              metalness={0.1}
            />
          </mesh>

          {/* Dual-Stalk Adjustable Headrest */}
          <group position={[0, 0.86, -0.04]}>
            {/* Brushed Metal Twin Rods */}
            <mesh position={[-0.05, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
            </mesh>
            <mesh position={[0.05, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
            </mesh>
            {/* Contoured Mesh Head Cushion */}
            <mesh position={[0, 0.06, 0.03]} rotation={[-0.15, 0, 0]}>
              <boxGeometry args={[0.28, 0.12, 0.05]} />
              <meshStandardMaterial color="#1e2532" roughness={0.7} />
            </mesh>
          </group>
        </group>

        {/* 3D Multi-Adjustable Armrests with Soft-Touch Contoured Pads */}
        {/* Left Armrest */}
        <group position={[-0.32, 0.5, 0]}>
          {/* Vertical Anodized Stalk */}
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.26, 10]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          {/* Soft-Touch Arm Pad */}
          <mesh position={[0, 0.27, -0.02]}>
            <boxGeometry args={[0.08, 0.028, 0.26]} />
            <meshStandardMaterial color="#090d14" roughness={0.4} />
          </mesh>
        </group>

        {/* Right Armrest */}
        <group position={[0.32, 0.5, 0]}>
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.26, 10]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.27, -0.02]}>
            <boxGeometry args={[0.08, 0.028, 0.26]} />
            <meshStandardMaterial color="#090d14" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
