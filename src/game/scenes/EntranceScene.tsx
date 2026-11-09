import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/stores/useGameStore';

interface EntranceSceneProps {
  onDoorbellRing?: () => void;
  onCameraInteract?: (message: string) => void;
}

export const EntranceScene: React.FC<EntranceSceneProps> = ({
  onDoorbellRing,
  onCameraInteract,
}) => {
  const { camera } = useThree();
  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);
  const visitorNickname = useGameStore((state) => state.visitorNickname);
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);

  // Door rotation for cinematic opening
  const doorPivotRef = useRef<THREE.Group>(null);
  const securityCamPivotRef = useRef<THREE.Group>(null);
  const [doorbellPressed, setDoorbellPressed] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);

  // Cinematic progress accumulator
  const cinematicTimeRef = useRef(0);

  useFrame((state, delta) => {
    // 1. Interactive Security Camera: tracks visitor pointer across the screen
    if (securityCamPivotRef.current && cameraActive) {
      const targetYaw = state.pointer.x * 0.45;
      const targetPitch = -state.pointer.y * 0.35;
      securityCamPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        securityCamPivotRef.current.rotation.y,
        targetYaw,
        delta * 3
      );
      securityCamPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        securityCamPivotRef.current.rotation.x,
        targetPitch,
        delta * 3
      );
    }

    // 2. Door Opening Cinematic when in ENTERING state
    if (gameState === 'ENTERING') {
      cinematicTimeRef.current += delta;
      const t = cinematicTimeRef.current;

      // Rotate door leaf open around hinge
      if (doorPivotRef.current) {
        const targetDoorAngle = -Math.PI * 0.48; // Open ~85 degrees inward
        doorPivotRef.current.rotation.y = THREE.MathUtils.lerp(
          doorPivotRef.current.rotation.y,
          targetDoorAngle,
          delta * 2.5
        );
      }

      // Fly camera forward through the doorway
      // Starts at Z = 5.5 and flies to Z = 0.5 into the workspace
      const startZ = 5.2;
      const targetZ = 0.5;
      const progress = Math.min(t / 2.8, 1);
      const easeProgress = progress * progress * (3 - 2 * progress); // smoothstep

      camera.position.z = THREE.MathUtils.lerp(startZ, targetZ, easeProgress);
      camera.position.y = THREE.MathUtils.lerp(1.7, 1.8, easeProgress);

      // Once cinematic completes, transition to EXPLORING state
      if (progress >= 1) {
        setGameState('EXPLORING');
      }
    } else {
      // Gentle idle sway in corridor
      camera.position.set(0, 1.7, 5.2);
      camera.lookAt(0, 1.6, 0);
    }
  });

  const handleDoorbellClick = () => {
    setDoorbellPressed(true);
    setTimeout(() => setDoorbellPressed(false), 800);
    onDoorbellRing?.();
  };

  const handleCameraClick = () => {
    setCameraActive(true);
    const msgs = [
      `Security Feed: Visitor identified as "${visitorNickname}" (${visitorIdentity.toUpperCase()}). Access granted.`,
      `Camera AI: Motion detected in entrance corridor. Welcome to Dong's workspace.`,
      `Biometric Scan: 100% human engineer detected. Enjoy exploring!`,
    ];
    const chosen = msgs[Math.floor(Math.random() * msgs.length)];
    onCameraInteract?.(chosen);
  };

  return (
    <group>
      {/* Corridor Lighting */}
      <ambientLight intensity={0.65} color="#cbd5e1" />
      <pointLight position={[0, 3.2, 3]} intensity={1.5} color="#fef08a" distance={8} />
      <directionalLight position={[0, 3.5, 4]} intensity={1.2} color="#ffffff" castShadow />

      {/* 1. Corridor Shell */}
      {/* Floor: Polished dark corridor tiles */}
      <mesh receiveShadow position={[0, 0, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#1a1c23" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.5, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Ceiling Recessed Linear Warm Light */}
      <mesh position={[0, 3.49, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 5]} />
        <meshStandardMaterial color="#ffffff" emissive="#fffbeb" emissiveIntensity={0.8} />
      </mesh>

      {/* Left Corridor Wall */}
      <mesh receiveShadow position={[-3, 1.75, 2.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 3.5]} />
        <meshStandardMaterial color="#1e222b" roughness={0.8} />
      </mesh>

      {/* Right Corridor Wall */}
      <mesh receiveShadow position={[3, 1.75, 2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 3.5]} />
        <meshStandardMaterial color="#1e222b" roughness={0.8} />
      </mesh>

      {/* 2. Entrance Portal Wall (Z = 0) */}
      {/* Wall Left */}
      <mesh receiveShadow position={[-2, 1.75, 0]}>
        <planeGeometry args={[2, 3.5]} />
        <meshStandardMaterial color="#1e2430" roughness={0.7} />
      </mesh>
      {/* Wall Right */}
      <mesh receiveShadow position={[2, 1.75, 0]}>
        <planeGeometry args={[2, 3.5]} />
        <meshStandardMaterial color="#1e2430" roughness={0.7} />
      </mesh>
      {/* Lintel above door */}
      <mesh receiveShadow position={[0, 3.05, 0]}>
        <planeGeometry args={[2, 0.9]} />
        <meshStandardMaterial color="#1e2430" roughness={0.7} />
      </mesh>

      {/* Door Outer Frame */}
      <mesh position={[0, 1.3, 0.02]}>
        <boxGeometry args={[2.08, 2.68, 0.12]} />
        <meshStandardMaterial color="#0b0d11" roughness={0.4} />
      </mesh>

      {/* 3. Main Entrance Door with Hinged Pivot (X = -0.95 is hinge side) */}
      <group position={[-0.95, 0, 0]} ref={doorPivotRef}>
        {/* Door Leaf (offset so pivot is at hinge edge) */}
        <group position={[0.95, 1.3, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.9, 2.55, 0.08]} />
            <meshStandardMaterial color="#30261e" roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Vertical Architectural Wood Slat Accent on Door */}
          {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
            <mesh key={i} position={[x, 0, 0.045]}>
              <boxGeometry args={[0.04, 2.3, 0.015]} />
              <meshStandardMaterial color="#423429" roughness={0.6} />
            </mesh>
          ))}

          {/* Minimalist Brass Door Handle */}
          <mesh position={[0.72, -0.05, 0.07]}>
            <boxGeometry args={[0.05, 0.35, 0.06]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Door Peephole */}
          <mesh position={[0, 0.35, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* 4. Nameplate above door */}
      <group position={[0, 2.75, 0.07]}>
        {/* Backing Plaque */}
        <mesh>
          <boxGeometry args={[1.8, 0.35, 0.03]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Border Trim */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[1.74, 0.29]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* 5. Interactive Doorbell on Right Wall next to door */}
      <group
        position={[1.25, 1.35, 0.05]}
        onClick={handleDoorbellClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        {/* Mount Plate */}
        <mesh>
          <boxGeometry args={[0.16, 0.28, 0.03]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Chime Button (depresses when clicked) */}
        <mesh position={[0, 0, doorbellPressed ? 0.01 : 0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial
            color={doorbellPressed ? '#38bdf8' : '#ffffff'}
            emissive={doorbellPressed ? '#38bdf8' : '#60a5fa'}
            emissiveIntensity={doorbellPressed ? 1.5 : 0.4}
          />
        </mesh>
      </group>

      {/* 6. Security Camera mounted on Upper Left Wall (tracks pointer) */}
      <group
        position={[-1.3, 2.8, 0.3]}
        onClick={handleCameraClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        {/* Base Wall Mount */}
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Articulated Camera Gimbal Pivot */}
        <group ref={securityCamPivotRef} position={[0, 0, 0.1]}>
          <mesh castShadow rotation={[Math.PI / 2 + 0.2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.22, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Camera Lens Glass */}
          <mesh position={[0, -0.02, 0.115]}>
            <circleGeometry args={[0.045, 16]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
          </mesh>
          {/* Active Recording Red/Cyan LED */}
          <mesh position={[0.04, 0.04, 0.11]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color={cameraActive ? '#ef4444' : '#10b981'} />
          </mesh>
        </group>
      </group>

      {/* 7. Welcome Signboard on Left Wall */}
      <group position={[-2.95, 1.8, 2.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[1.4, 0.9, 0.04]} />
          <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Glowing Welcome Display */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.3, 0.8]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0369a1"
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};
