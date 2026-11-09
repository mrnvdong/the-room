import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VisitorIdentity } from '@/types';
import { VISITOR_IDENTITIES } from '@/features/visitor/identityData';

interface AvatarModelProps {
  identity: VisitorIdentity;
  isMoving?: boolean;
  isRunning?: boolean;
  isTurntablePreview?: boolean;
}

export const AvatarModel: React.FC<AvatarModelProps> = ({
  identity,
  isMoving = false,
  isRunning = false,
  isTurntablePreview = false,
}) => {
  const identityConfig = VISITOR_IDENTITIES[identity] || VISITOR_IDENTITIES.visitor;

  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const bodyGroupRef = useRef<THREE.Group>(null);
  const accessoryRef = useRef<THREE.Group>(null);

  const animTimeRef = useRef(0);

  useFrame((_, delta) => {
    // If turntable preview, play gentle walk animation to showcase character in motion
    const activeMoving = isMoving || (isTurntablePreview && animTimeRef.current % 6 > 3);
    const activeRunning = isRunning && activeMoving;

    const isGhost = identity === 'ghost';

    if (activeMoving) {
      const freq = activeRunning ? 16 : 10;
      animTimeRef.current += delta * freq;
      const swing = (activeRunning ? 0.7 : 0.45) * Math.sin(animTimeRef.current);

      if (!isGhost) {
        if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      }

      if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.8;
      if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.8;

      if (bodyGroupRef.current) {
        const bounce = isGhost
          ? Math.sin(animTimeRef.current * 0.8) * 0.15 + 0.3
          : Math.abs(Math.sin(animTimeRef.current)) * 0.08;
        bodyGroupRef.current.position.y = 0.95 + bounce;
      }
    } else {
      // Idle animation
      animTimeRef.current += delta * (isGhost ? 3 : 2);
      const idleBob = Math.sin(animTimeRef.current) * (isGhost ? 0.12 : 0.02);

      if (leftLegRef.current) leftLegRef.current.rotation.x *= 0.85;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 0.85;
      if (leftArmRef.current) leftArmRef.current.rotation.x *= 0.85;
      if (rightArmRef.current) rightArmRef.current.rotation.x *= 0.85;

      if (bodyGroupRef.current) {
        bodyGroupRef.current.position.y = 0.95 + (isGhost ? 0.25 + idleBob : idleBob);
      }
    }

    // Ghost or Robot accessory bob
    if (isGhost && accessoryRef.current) {
      accessoryRef.current.rotation.y += delta * 1.5;
    }
  });

  const isGhost = identity === 'ghost';
  const isRobot = identity === 'robot';
  const isThief = identity === 'thief';
  const isRecruiter = identity === 'recruiter';
  const isPartner = identity === 'partner';
  const isMystery = identity === 'mystery';

  return (
    <group>
      {/* Body & Head Group */}
      <group ref={bodyGroupRef} position={[0, 0.95, 0]}>
        {/* 1. Torso */}
        <mesh castShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[0.45, 0.6, 0.28]} />
          {isGhost ? (
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              emissive={identityConfig.accentColor}
              emissiveIntensity={0.6}
              transparent
              opacity={0.65}
              roughness={0.1}
            />
          ) : isRobot ? (
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              metalness={0.85}
              roughness={0.2}
            />
          ) : (
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              roughness={0.6}
            />
          )}
        </mesh>

        {/* Identity Specific Torso Details */}
        {/* Recruiter: Tie & Collar */}
        {isRecruiter && (
          <group position={[0, 0.18, 0.145]}>
            {/* White Shirt V */}
            <mesh position={[0, 0.14, 0]}>
              <planeGeometry args={[0.16, 0.14]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Red Tie */}
            <mesh position={[0, 0.02, 0.005]}>
              <boxGeometry args={[0.06, 0.32, 0.01]} />
              <meshStandardMaterial color="#ef4444" roughness={0.3} />
            </mesh>
          </group>
        )}

        {/* 2. Neck */}
        {!isGhost && (
          <mesh position={[0, 0.44, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.1, 12]} />
            <meshStandardMaterial
              color={isRobot ? '#94a3b8' : isThief ? '#0f172a' : '#fcd34d'}
              metalness={isRobot ? 0.7 : 0}
              roughness={0.5}
            />
          </mesh>
        )}

        {/* 3. Head */}
        <mesh castShadow position={[0, 0.62, 0]}>
          <boxGeometry args={[0.34, 0.34, 0.32]} />
          {isGhost ? (
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              emissive={identityConfig.accentColor}
              emissiveIntensity={0.8}
              transparent
              opacity={0.65}
              roughness={0.1}
            />
          ) : isRobot ? (
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          ) : isMystery ? (
            <meshStandardMaterial color="#1e1035" roughness={0.9} />
          ) : (
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          )}
        </mesh>

        {/* 4. Headwear & Eyewear based on Identity */}
        {/* Robot: Antenna & LED Visor */}
        {isRobot && (
          <group position={[0, 0.62, 0]}>
            {/* Antenna Mast */}
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.22, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>
            {/* Blinking Top Beacon */}
            <mesh position={[0, 0.38, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} />
            </mesh>
            {/* Horizontal Blue Scanner Visor */}
            <mesh position={[0, 0.02, 0.165]}>
              <boxGeometry args={[0.26, 0.08, 0.03]} />
              <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={1.2} />
            </mesh>
          </group>
        )}

        {/* Thief: Ninja Mask & Headband */}
        {isThief && (
          <group position={[0, 0.62, 0]}>
            {/* Face Mask covering mouth/nose */}
            <mesh position={[0, -0.06, 0.165]}>
              <boxGeometry args={[0.34, 0.18, 0.03]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
            {/* Crimson Headband */}
            <mesh position={[0, 0.12, 0]}>
              <boxGeometry args={[0.36, 0.07, 0.34]} />
              <meshStandardMaterial color="#e11d48" roughness={0.5} />
            </mesh>
            {/* Headband Tails at Back */}
            <mesh position={[0, 0.06, -0.22]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[0.08, 0.24, 0.02]} />
              <meshStandardMaterial color="#e11d48" roughness={0.5} />
            </mesh>
          </group>
        )}

        {/* Mystery: Hooded Cloak / Cowl */}
        {isMystery && (
          <group position={[0, 0.62, 0]}>
            {/* Deep Hood */}
            <mesh position={[0, 0.04, -0.02]}>
              <boxGeometry args={[0.42, 0.44, 0.4]} />
              <meshStandardMaterial color="#3b0764" roughness={0.9} />
            </mesh>
            {/* Glowing Purple Shadow Eyes */}
            <mesh position={[-0.08, 0.02, 0.17]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1.8} />
            </mesh>
            <mesh position={[0.08, 0.02, 0.17]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1.8} />
            </mesh>
          </group>
        )}

        {/* Standard / Recruiter / Partner / Friend / Visitor Visor & Hair */}
        {!isRobot && !isThief && !isMystery && !isGhost && (
          <>
            {/* Hair */}
            <mesh position={[0, 0.77, -0.02]}>
              <boxGeometry args={[0.36, 0.14, 0.34]} />
              <meshStandardMaterial
                color={isRecruiter ? '#0f172a' : '#1e1e24'}
                roughness={0.7}
              />
            </mesh>
            {/* Visor / Glasses */}
            <mesh position={[0, 0.64, 0.165]}>
              <boxGeometry args={[0.26, 0.08, 0.04]} />
              <meshStandardMaterial
                color={identityConfig.accentColor}
                emissive={identityConfig.accentColor}
                emissiveIntensity={0.5}
                roughness={0.2}
              />
            </mesh>
          </>
        )}

        {/* 5. Arms & Accessories */}
        {/* Left Arm */}
        <group position={[-0.3, 0.3, 0]}>
          <mesh ref={leftArmRef} castShadow position={[0, -0.22, 0]}>
            <boxGeometry args={[0.12, 0.45, 0.12]} />
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              roughness={0.6}
              metalness={isRobot ? 0.8 : 0}
              transparent={isGhost}
              opacity={isGhost ? 0.65 : 1}
            />
          </mesh>
        </group>

        {/* Right Arm & Hand Accessory */}
        <group position={[0.3, 0.3, 0]}>
          <mesh ref={rightArmRef} castShadow position={[0, -0.22, 0]}>
            <boxGeometry args={[0.12, 0.45, 0.12]} />
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              roughness={0.6}
              metalness={isRobot ? 0.8 : 0}
              transparent={isGhost}
              opacity={isGhost ? 0.65 : 1}
            />
          </mesh>

          {/* Recruiter: Executive Briefcase */}
          {isRecruiter && (
            <group position={[0.12, -0.42, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.1, 0.3, 0.38]} />
                <meshStandardMaterial color="#451a03" roughness={0.4} />
              </mesh>
              {/* Gold Latches */}
              <mesh position={[0.052, 0.08, 0]}>
                <boxGeometry args={[0.01, 0.04, 0.18]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} />
              </mesh>
            </group>
          )}

          {/* Partner: Glowing Digital Tablet */}
          {isPartner && (
            <group position={[0.1, -0.28, 0.1]} rotation={[0.4, -0.3, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.02, 0.28, 0.22]} />
                <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Glowing Screen */}
              <mesh position={[0.012, 0, 0]}>
                <planeGeometry args={[0.26, 0.2]} />
                <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.8} />
              </mesh>
            </group>
          )}
        </group>
      </group>

      {/* 6. Legs / Lower Body */}
      {!isGhost ? (
        <>
          {/* Left Leg */}
          <group position={[-0.14, 0.55, 0]}>
            <mesh ref={leftLegRef} castShadow position={[0, -0.25, 0]}>
              <boxGeometry args={[0.15, 0.55, 0.16]} />
              <meshStandardMaterial
                color={isRobot ? '#475569' : isRecruiter ? '#1e293b' : '#334155'}
                metalness={isRobot ? 0.8 : 0}
                roughness={0.7}
              />
            </mesh>
          </group>

          {/* Right Leg */}
          <group position={[0.14, 0.55, 0]}>
            <mesh ref={rightLegRef} castShadow position={[0, -0.25, 0]}>
              <boxGeometry args={[0.15, 0.55, 0.16]} />
              <meshStandardMaterial
                color={isRobot ? '#475569' : isRecruiter ? '#1e293b' : '#334155'}
                metalness={isRobot ? 0.8 : 0}
                roughness={0.7}
              />
            </mesh>
          </group>
        </>
      ) : (
        /* Ghost: Floating Spectral Tail */
        <group position={[0, 0.45, 0]}>
          <mesh>
            <coneGeometry args={[0.26, 0.7, 16]} />
            <meshStandardMaterial
              color="#0891b2"
              emissive="#a5f3fc"
              emissiveIntensity={0.7}
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      )}

      {/* Floor Contact Shadow (dimmer for ghost) */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[isGhost ? 0.5 : 0.42, 24]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={isGhost ? 0.15 : 0.35}
        />
      </mesh>
    </group>
  );
};
