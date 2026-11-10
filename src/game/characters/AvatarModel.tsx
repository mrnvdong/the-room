import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VisitorIdentity } from '@/types';
import { VISITOR_IDENTITIES } from '@/features/visitor/identityData';
import { CharacterActionId } from '@/features/character/characterActions';

interface AvatarModelProps {
  identity: VisitorIdentity;
  isMoving?: boolean;
  isRunning?: boolean;
  isTurntablePreview?: boolean;
  currentAction?: CharacterActionId | null;
  actionStartTime?: number;
  isSitting?: boolean;
}

export const AvatarModel: React.FC<AvatarModelProps> = ({
  identity,
  isMoving = false,
  isRunning = false,
  isTurntablePreview = false,
  currentAction = null,
  actionStartTime = 0,
  isSitting = false,
}) => {
  const identityConfig = VISITOR_IDENTITIES[identity] || VISITOR_IDENTITIES.visitor;

  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const bodyGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const scarfRef = useRef<THREE.Group>(null);
  const ghostOrbsRef = useRef<THREE.Group>(null);
  const laserRef = useRef<THREE.Group>(null);
  const flashRef = useRef<THREE.PointLight>(null);

  const animTimeRef = useRef(0);

  const isGhost = identity === 'ghost';
  const isRobot = identity === 'robot';
  const isThief = identity === 'thief';
  const isRecruiter = identity === 'recruiter';
  const isPartner = identity === 'partner';
  const isFriend = identity === 'friend';
  const isVisitor = identity === 'visitor';
  const isMystery = identity === 'mystery';

  useFrame((_, delta) => {
    const activeMoving = isMoving || (isTurntablePreview && animTimeRef.current % 6 > 3);
    const activeRunning = isRunning && activeMoving;
    const actionElapsed = actionStartTime > 0 ? (Date.now() - actionStartTime) / 1000 : 0;
    const hasActiveAction = Boolean(currentAction);

    // Dynamic scarf or ribbon flutter
    if (scarfRef.current) {
      scarfRef.current.rotation.x = 0.2 + Math.sin(animTimeRef.current * 4) * 0.15;
      scarfRef.current.rotation.y = Math.cos(animTimeRef.current * 3) * 0.1;
    }

    // Ghost floating spirit motes orbit
    if (ghostOrbsRef.current) {
      ghostOrbsRef.current.rotation.y += delta * 2.2;
    }

    // 1. SITTING POSE
    if (isSitting) {
      if (bodyGroupRef.current) {
        bodyGroupRef.current.position.y = 0.54;
        bodyGroupRef.current.position.z = -0.06;
        bodyGroupRef.current.rotation.x = 0.05;
        bodyGroupRef.current.rotation.y = 0;
      }
      if (headGroupRef.current) {
        headGroupRef.current.rotation.set(0, 0, 0);
      }
      if (!isGhost) {
        if (leftLegRef.current) {
          leftLegRef.current.rotation.x = -Math.PI / 2.05;
          leftLegRef.current.rotation.z = -0.06;
        }
        if (rightLegRef.current) {
          rightLegRef.current.rotation.x = -Math.PI / 2.05;
          rightLegRef.current.rotation.z = 0.06;
        }
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -0.55;
        leftArmRef.current.rotation.z = 0.12;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -0.55;
        rightArmRef.current.rotation.z = -0.12;
      }
      return;
    }

    // 2. ACTIVE ACTIONS & EMOTES
    if (hasActiveAction && currentAction) {
      const t = actionElapsed;

      if (!activeMoving && !isGhost) {
        if (leftLegRef.current) leftLegRef.current.rotation.set(0, 0, 0);
        if (rightLegRef.current) rightLegRef.current.rotation.set(0, 0, 0);
      }

      switch (currentAction) {
        case 'wave': {
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.85;
            rightArmRef.current.rotation.z = -0.3 + Math.sin(t * 12) * 0.45;
          }
          if (leftArmRef.current) leftArmRef.current.rotation.set(0, 0, 0.1);
          if (headGroupRef.current) headGroupRef.current.rotation.z = Math.sin(t * 6) * 0.08;
          break;
        }

        case 'applause': {
          const clap = Math.abs(Math.sin(t * 14));
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.25;
            leftArmRef.current.rotation.y = -0.4 + clap * 0.35;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.25;
            rightArmRef.current.rotation.y = 0.4 - clap * 0.35;
          }
          if (headGroupRef.current) headGroupRef.current.rotation.x = Math.sin(t * 7) * 0.08;
          break;
        }

        case 'laugh': {
          const bounce = Math.sin(t * 16) * 0.04;
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 0.95 + bounce;
            bodyGroupRef.current.rotation.x = -0.15;
          }
          if (headGroupRef.current) headGroupRef.current.rotation.x = -0.22 + bounce * 2;
          if (leftArmRef.current) leftArmRef.current.rotation.x = -0.35 + bounce;
          if (rightArmRef.current) rightArmRef.current.rotation.x = -0.35 - bounce;
          break;
        }

        case 'dance':
        case 'robot_dance': {
          if (currentAction === 'robot_dance') {
            const step = Math.floor(t * 4) % 4;
            const poses = [
              { rx: -1.5, rz: 0, lx: 0, lz: 1.5, headY: 0.5 },
              { rx: 0, rz: -1.5, lx: -1.5, lz: 0, headY: -0.5 },
              { rx: -2.5, rz: 0.8, lx: -0.8, lz: -0.8, headY: 0 },
              { rx: 0, rz: 0, lx: -2.5, lz: 0.5, headY: 0.3 },
            ];
            const p = poses[step];
            if (rightArmRef.current) rightArmRef.current.rotation.set(p.rx, 0, p.rz);
            if (leftArmRef.current) leftArmRef.current.rotation.set(p.lx, 0, p.lz);
            if (headGroupRef.current) headGroupRef.current.rotation.set(0, p.headY, 0);
          } else {
            const sway = Math.sin(t * 8);
            if (bodyGroupRef.current) {
              bodyGroupRef.current.position.y = 0.95 + Math.abs(sway) * 0.1;
              bodyGroupRef.current.rotation.z = sway * 0.12;
            }
            if (rightArmRef.current) {
              rightArmRef.current.rotation.x = -1.2 + Math.cos(t * 8) * 0.6;
              rightArmRef.current.rotation.z = -0.6;
            }
            if (leftArmRef.current) {
              leftArmRef.current.rotation.x = -1.2 - Math.cos(t * 8) * 0.6;
              leftArmRef.current.rotation.z = 0.6;
            }
          }
          break;
        }

        case 'handshake': {
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.5;
            rightArmRef.current.rotation.y = -0.25;
            rightArmRef.current.rotation.z = Math.sin(t * 10) * 0.15;
          }
          if (bodyGroupRef.current) bodyGroupRef.current.rotation.x = 0.08;
          if (headGroupRef.current) headGroupRef.current.rotation.x = Math.sin(t * 5) * 0.08;
          break;
        }

        case 'inspect_cv': {
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.2;
            leftArmRef.current.rotation.y = 0.55;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.1;
            rightArmRef.current.rotation.y = -0.3 + Math.sin(t * 5) * 0.15;
          }
          if (headGroupRef.current) headGroupRef.current.rotation.x = 0.38;
          break;
        }

        case 'nod_approval': {
          if (headGroupRef.current) headGroupRef.current.rotation.x = Math.sin(t * 8) * 0.22;
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.4;
            rightArmRef.current.rotation.z = -0.4;
          }
          break;
        }

        case 'adjust_tie': {
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.9;
            rightArmRef.current.rotation.z = -0.6 + Math.sin(t * 12) * 0.1;
          }
          if (headGroupRef.current) headGroupRef.current.rotation.x = 0.15;
          break;
        }

        case 'type_device': {
          const tap = Math.sin(t * 18) * 0.06;
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.3 + tap;
            leftArmRef.current.rotation.y = 0.3;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.3 - tap;
            rightArmRef.current.rotation.y = -0.3;
          }
          if (headGroupRef.current) headGroupRef.current.rotation.x = 0.25;
          break;
        }

        case 'discuss_architecture': {
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -0.8 + Math.sin(t * 4) * 0.45;
            leftArmRef.current.rotation.z = 0.4;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -0.8 - Math.sin(t * 4) * 0.45;
            rightArmRef.current.rotation.z = -0.4;
          }
          if (headGroupRef.current) headGroupRef.current.rotation.y = Math.sin(t * 3) * 0.25;
          break;
        }

        case 'think_ponder': {
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -0.8;
            leftArmRef.current.rotation.z = 0.8;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.9;
            rightArmRef.current.rotation.z = -0.35;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = -0.15;
            headGroupRef.current.rotation.z = 0.18;
          }
          break;
        }

        case 'high_five': {
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.4;
            rightArmRef.current.rotation.z = -0.5;
          }
          break;
        }

        case 'drink_coffee': {
          const sip = Math.sin(Math.min(Math.PI, t * 1.5));
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -0.6 - sip * 1.25;
            rightArmRef.current.rotation.y = -0.3;
          }
          if (headGroupRef.current) headGroupRef.current.rotation.x = -sip * 0.3;
          break;
        }

        case 'cheer': {
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -2.6 + Math.sin(t * 8) * 0.2;
            leftArmRef.current.rotation.z = 0.4;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.6 + Math.sin(t * 8) * 0.2;
            rightArmRef.current.rotation.z = -0.4;
          }
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 0.95 + Math.abs(Math.sin(t * 8)) * 0.1;
          }
          break;
        }

        case 'look_around': {
          if (headGroupRef.current) headGroupRef.current.rotation.y = Math.sin(t * 2.5) * 0.65;
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.2;
            rightArmRef.current.rotation.z = -0.6;
          }
          break;
        }

        case 'take_photo': {
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.6;
            leftArmRef.current.rotation.y = 0.3;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.6;
            rightArmRef.current.rotation.y = -0.3;
          }
          if (flashRef.current) {
            const flashActive = (t > 1.2 && t < 1.35) || (t > 2.6 && t < 2.75);
            flashRef.current.intensity = flashActive ? 8 : 0;
          }
          break;
        }

        case 'sneak_crouch': {
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 0.68;
            bodyGroupRef.current.rotation.x = 0.25;
          }
          if (leftArmRef.current) leftArmRef.current.rotation.x = -0.7;
          if (rightArmRef.current) rightArmRef.current.rotation.x = -0.7;
          if (headGroupRef.current) headGroupRef.current.rotation.y = Math.sin(t * 5) * 0.4;
          break;
        }

        case 'inspect_vault': {
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 0.6;
            bodyGroupRef.current.rotation.x = 0.3;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.2;
            rightArmRef.current.rotation.y = -0.4 + Math.sin(t * 10) * 0.2;
          }
          break;
        }

        case 'blend_in': {
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.0;
            rightArmRef.current.rotation.z = -0.2;
          }
          break;
        }

        case 'spooky_boo': {
          const floatWobble = Math.sin(t * 6);
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 1.35 + floatWobble * 0.15;
            bodyGroupRef.current.rotation.y = Math.sin(t * 3) * 0.3;
          }
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -2.2 + floatWobble * 0.3;
            leftArmRef.current.rotation.z = 0.5;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.2 - floatWobble * 0.3;
            rightArmRef.current.rotation.z = -0.5;
          }
          break;
        }

        case 'twirl_float': {
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 1.4 + Math.sin(t * 4) * 0.1;
            bodyGroupRef.current.rotation.y = t * 6;
          }
          if (leftArmRef.current) leftArmRef.current.rotation.z = 0.7;
          if (rightArmRef.current) rightArmRef.current.rotation.z = -0.7;
          break;
        }

        case 'laser_scan': {
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = 0.2 + Math.sin(t * 4) * 0.25;
            headGroupRef.current.rotation.y = Math.sin(t * 3) * 0.5;
          }
          if (laserRef.current) laserRef.current.visible = true;
          break;
        }

        case 'recharge': {
          if (bodyGroupRef.current) bodyGroupRef.current.rotation.set(0, 0, 0);
          if (leftArmRef.current) leftArmRef.current.rotation.set(0, 0, 0.1);
          if (rightArmRef.current) rightArmRef.current.rotation.set(0, 0, -0.1);
          break;
        }

        case 'mysterious_bow': {
          if (bodyGroupRef.current) bodyGroupRef.current.rotation.x = 0.6;
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.2;
            rightArmRef.current.rotation.z = -0.8;
          }
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = 0.4;
            leftArmRef.current.rotation.z = 0.4;
          }
          break;
        }

        case 'snap_fingers': {
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.6;
            rightArmRef.current.rotation.z = -0.6 + (t % 1 < 0.2 ? -0.2 : 0);
          }
          break;
        }
      }

      return;
    }

    if (laserRef.current) laserRef.current.visible = false;
    if (flashRef.current) flashRef.current.intensity = 0;

    // 3. ORGANIC WALKING & RUNNING
    if (activeMoving) {
      const freq = activeRunning ? 15 : 10;
      animTimeRef.current += delta * freq;
      const swing = (activeRunning ? 0.65 : 0.42) * Math.sin(animTimeRef.current);

      if (!isGhost) {
        if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
      }

      if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.85;
      if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.85;

      if (bodyGroupRef.current) {
        const bounce = isGhost
          ? Math.sin(animTimeRef.current * 0.8) * 0.15 + 0.3
          : Math.abs(Math.sin(animTimeRef.current)) * 0.08;
        bodyGroupRef.current.position.y = 0.95 + bounce;
        // Natural slight torso lean and hip twist
        bodyGroupRef.current.rotation.x = activeRunning ? 0.12 : 0.05;
        bodyGroupRef.current.rotation.y = Math.sin(animTimeRef.current) * 0.06;
      }
      if (headGroupRef.current) {
        headGroupRef.current.rotation.x = activeRunning ? 0.05 : 0;
        headGroupRef.current.rotation.y = -Math.sin(animTimeRef.current) * 0.04;
      }
    } else {
      // Idle Breathing Cycle
      animTimeRef.current += delta * (isGhost ? 3 : 2);
      const idleBob = Math.sin(animTimeRef.current) * (isGhost ? 0.12 : 0.02);

      if (leftLegRef.current) leftLegRef.current.rotation.x *= 0.85;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 0.85;
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x *= 0.85;
        leftArmRef.current.rotation.y = 0;
        leftArmRef.current.rotation.z = 0.08;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x *= 0.85;
        rightArmRef.current.rotation.y = 0;
        rightArmRef.current.rotation.z = -0.08;
      }

      if (bodyGroupRef.current) {
        bodyGroupRef.current.position.y = 0.95 + (isGhost ? 0.25 + idleBob : idleBob);
        bodyGroupRef.current.position.z = 0;
        bodyGroupRef.current.rotation.set(0, 0, 0);
      }
      if (headGroupRef.current) {
        headGroupRef.current.rotation.set(0, 0, 0);
      }
    }
  });

  return (
    <group>
      {/* Main Body & Head Group */}
      <group ref={bodyGroupRef} position={[0, 0.95, 0]}>
        {/* ==================== 1. TORSO & OUTFIT ==================== */}
        <group position={[0, 0.12, 0]}>
          {/* Main Upper Torso (Smooth Tapered Capsule/Cylinder) */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.18, 0.54, 18]} />
            {isGhost ? (
              <meshStandardMaterial
                color={identityConfig.primaryColor}
                emissive={identityConfig.accentColor}
                emissiveIntensity={0.65}
                transparent
                opacity={0.6}
                roughness={0.1}
              />
            ) : isRobot ? (
              <meshStandardMaterial
                color="#f8fafc"
                metalness={0.3}
                roughness={0.15}
              />
            ) : (
              <meshStandardMaterial
                color={identityConfig.primaryColor}
                roughness={0.55}
                metalness={0.05}
              />
            )}
          </mesh>

          {/* Shoulders Cushion / Lapels */}
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.24, 0.22, 0.1, 18]} />
            <meshStandardMaterial
              color={isRobot ? '#0f172a' : identityConfig.primaryColor}
              roughness={0.6}
            />
          </mesh>

          {/* Recruiter: Elegant Suit Lapels & Crimson Silk Tie */}
          {isRecruiter && (
            <group position={[0, 0.05, 0.14]}>
              {/* White Shirt Triangle */}
              <mesh position={[0, 0.12, 0]}>
                <planeGeometry args={[0.16, 0.18]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </mesh>
              {/* Peaked Blazer Lapels (Left & Right) */}
              <mesh position={[-0.1, 0.08, 0.01]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.08, 0.28, 0.02]} />
                <meshStandardMaterial color="#0f172a" roughness={0.4} />
              </mesh>
              <mesh position={[0.1, 0.08, 0.01]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.08, 0.28, 0.02]} />
                <meshStandardMaterial color="#0f172a" roughness={0.4} />
              </mesh>
              {/* Silk Tie */}
              <mesh position={[0, 0.02, 0.015]}>
                <boxGeometry args={[0.055, 0.32, 0.01]} />
                <meshStandardMaterial color="#e11d48" roughness={0.2} metalness={0.3} />
              </mesh>
              {/* Gold Tie Clip */}
              <mesh position={[0, 0.06, 0.022]}>
                <boxGeometry args={[0.04, 0.01, 0.005]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          )}

          {/* Partner: Modern High-Tech Turtleneck & Smart Seams */}
          {isPartner && (
            <group position={[0, 0.06, 0.14]}>
              <mesh position={[0, 0.14, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
                <meshStandardMaterial color="#022c22" roughness={0.8} />
              </mesh>
              {/* Glowing Tech Seam Line */}
              <mesh position={[0, -0.05, 0.005]}>
                <boxGeometry args={[0.02, 0.36, 0.005]} />
                <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.8} />
              </mesh>
            </group>
          )}

          {/* Friend: Oversized Cozy Hoodie with Drawstrings */}
          {isFriend && (
            <group position={[0, 0.14, 0.12]}>
              {/* Thick Rounded Hoodie Collar */}
              <mesh position={[0, 0.08, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.12, 0.04, 8, 20]} />
                <meshStandardMaterial color="#d97706" roughness={0.7} />
              </mesh>
              {/* White Drawstrings */}
              <mesh position={[-0.04, -0.06, 0.02]}>
                <cylinderGeometry args={[0.008, 0.008, 0.16, 6]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </mesh>
              <mesh position={[0.04, -0.06, 0.02]}>
                <cylinderGeometry args={[0.008, 0.008, 0.16, 6]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* Visitor: Field Jacket with Snap Pockets */}
          {isVisitor && (
            <group position={[0, 0.05, 0.14]}>
              <mesh position={[-0.09, 0.08, 0]}>
                <boxGeometry args={[0.07, 0.08, 0.02]} />
                <meshStandardMaterial color="#1e3a5f" roughness={0.7} />
              </mesh>
              <mesh position={[0.09, 0.08, 0]}>
                <boxGeometry args={[0.07, 0.08, 0.02]} />
                <meshStandardMaterial color="#1e3a5f" roughness={0.7} />
              </mesh>
            </group>
          )}

          {/* Robot: Glowing Chest Arc Reactor Core */}
          {isRobot && (
            <group position={[0, 0.08, 0.14]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} />
              </mesh>
              <mesh position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
                <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={1.8} />
              </mesh>
            </group>
          )}

          {/* Thief: Stealth Crossed Chest Straps */}
          {isThief && (
            <group position={[0, 0.05, 0.13]}>
              <mesh rotation={[0, 0, 0.6]}>
                <boxGeometry args={[0.04, 0.52, 0.01]} />
                <meshStandardMaterial color="#020617" roughness={0.9} />
              </mesh>
              <mesh rotation={[0, 0, -0.6]}>
                <boxGeometry args={[0.04, 0.52, 0.01]} />
                <meshStandardMaterial color="#020617" roughness={0.9} />
              </mesh>
            </group>
          )}
        </group>

        {/* ==================== 2. HEAD & FACIAL STYLING ==================== */}
        <group ref={headGroupRef} position={[0, 0.62, 0]}>
          {/* Neck (Smooth Cylinder) */}
          {!isGhost && (
            <mesh position={[0, -0.16, 0]}>
              <cylinderGeometry args={[0.075, 0.085, 0.12, 16]} />
              <meshStandardMaterial
                color={isRobot ? '#64748b' : isThief ? '#020617' : '#fcd34d'}
                roughness={isRobot ? 0.2 : 0.6}
                metalness={isRobot ? 0.8 : 0}
              />
            </mesh>
          )}

          {/* Head Base: Smooth Rounded Beveled Head */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.165, 0.145, 0.28, 20]} />
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
              <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
            ) : isMystery ? (
              <meshStandardMaterial color="#1e1035" roughness={0.9} />
            ) : (
              <meshStandardMaterial color="#fed7aa" roughness={0.45} />
            )}
          </mesh>

          {/* Top of Head (Rounded Dome) */}
          <mesh position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.165, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            {isGhost ? (
              <meshStandardMaterial
                color={identityConfig.primaryColor}
                emissive={identityConfig.accentColor}
                emissiveIntensity={0.8}
                transparent
                opacity={0.65}
              />
            ) : isRobot ? (
              <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
            ) : (
              <meshStandardMaterial color="#fed7aa" roughness={0.45} />
            )}
          </mesh>

          {/* Stylized Eyes for Humanoid Characters */}
          {!isRobot && !isMystery && !isGhost && !isThief && (
            <group position={[0, 0.02, 0.155]}>
              {/* Left Eye */}
              <mesh position={[-0.065, 0, 0]}>
                <sphereGeometry args={[0.022, 12, 12]} />
                <meshBasicMaterial color="#0f172a" />
              </mesh>
              {/* Left Eye Catchlight Specular */}
              <mesh position={[-0.06, 0.008, 0.016]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>

              {/* Right Eye */}
              <mesh position={[0.065, 0, 0]}>
                <sphereGeometry args={[0.022, 12, 12]} />
                <meshBasicMaterial color="#0f172a" />
              </mesh>
              {/* Right Eye Catchlight Specular */}
              <mesh position={[0.07, 0.008, 0.016]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>

              {/* Subtle Warm Cheeks */}
              <mesh position={[-0.08, -0.035, 0]}>
                <planeGeometry args={[0.035, 0.02]} />
                <meshBasicMaterial color="#f472b6" transparent opacity={0.35} />
              </mesh>
              <mesh position={[0.08, -0.035, 0]}>
                <planeGeometry args={[0.035, 0.02]} />
                <meshBasicMaterial color="#f472b6" transparent opacity={0.35} />
              </mesh>
            </group>
          )}

          {/* Sculpted Stylized Hair (for Humanoids) */}
          {!isRobot && !isGhost && !isThief && !isMystery && (
            <group position={[0, 0.04, 0]}>
              {/* Top Hair Volume */}
              <mesh position={[0, 0.16, -0.01]}>
                <boxGeometry args={[0.34, 0.12, 0.34]} />
                <meshStandardMaterial
                  color={isRecruiter ? '#1e293b' : isFriend ? '#78350f' : '#27272a'}
                  roughness={0.7}
                />
              </mesh>
              {/* Side Hair Locks (Left & Right) */}
              <mesh position={[-0.17, 0.04, 0]}>
                <cylinderGeometry args={[0.03, 0.02, 0.18, 8]} />
                <meshStandardMaterial color={isRecruiter ? '#1e293b' : '#27272a'} roughness={0.7} />
              </mesh>
              <mesh position={[0.17, 0.04, 0]}>
                <cylinderGeometry args={[0.03, 0.02, 0.18, 8]} />
                <meshStandardMaterial color={isRecruiter ? '#1e293b' : '#27272a'} roughness={0.7} />
              </mesh>
              {/* Back Hair Volume */}
              <mesh position={[0, 0.06, -0.16]}>
                <boxGeometry args={[0.32, 0.18, 0.06]} />
                <meshStandardMaterial color={isRecruiter ? '#1e293b' : '#27272a'} roughness={0.7} />
              </mesh>
            </group>
          )}

          {/* Partner: Sleek Cyber AR Eyewear */}
          {isPartner && (
            <group position={[0, 0.03, 0.16]}>
              {/* Curved Glass Bar */}
              <mesh>
                <boxGeometry args={[0.26, 0.045, 0.02]} />
                <meshStandardMaterial
                  color="#10b981"
                  emissive="#10b981"
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.8}
                  roughness={0.1}
                />
              </mesh>
              {/* Thin Titanium Frame Arms */}
              <mesh position={[-0.14, 0, -0.08]}>
                <boxGeometry args={[0.01, 0.01, 0.16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} />
              </mesh>
              <mesh position={[0.14, 0, -0.08]}>
                <boxGeometry args={[0.01, 0.01, 0.16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} />
              </mesh>
            </group>
          )}

          {/* Friend: Studio Monitor Headphones around neck */}
          {isFriend && (
            <group position={[0, -0.12, 0]}>
              {/* Headphone Band */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.19, 0.025, 8, 24, Math.PI]} />
                <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
              </mesh>
              {/* Earcups with Soft Cushions */}
              <mesh position={[-0.19, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                <meshStandardMaterial color="#0f172a" roughness={0.5} />
              </mesh>
              <mesh position={[0.19, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
                <meshStandardMaterial color="#0f172a" roughness={0.5} />
              </mesh>
            </group>
          )}

          {/* Visitor: Designer Glasses */}
          {isVisitor && (
            <group position={[0, 0.03, 0.16]}>
              <mesh position={[-0.065, 0, 0]}>
                <torusGeometry args={[0.035, 0.008, 8, 16]} />
                <meshStandardMaterial color="#475569" metalness={0.8} />
              </mesh>
              <mesh position={[0.065, 0, 0]}>
                <torusGeometry args={[0.035, 0.008, 8, 16]} />
                <meshStandardMaterial color="#475569" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.04, 0.008, 0.01]} />
                <meshStandardMaterial color="#475569" metalness={0.8} />
              </mesh>
            </group>
          )}

          {/* Robot: Sleek Glossy Face with Animated LED Eye Emotes */}
          {isRobot && (
            <group position={[0, 0, 0]}>
              {/* Curved Dark Glass Face Screen */}
              <mesh position={[0, 0.01, 0.13]}>
                <boxGeometry args={[0.26, 0.16, 0.04]} />
                <meshStandardMaterial color="#020617" roughness={0.1} />
              </mesh>
              {/* Glowing Cyan LED Emote Eyes */}
              <mesh position={[-0.06, 0.02, 0.155]}>
                <sphereGeometry args={[0.025, 12, 12]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.0} />
              </mesh>
              <mesh position={[0.06, 0.02, 0.155]}>
                <sphereGeometry args={[0.025, 12, 12]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.0} />
              </mesh>
              {/* Antenna Mast */}
              <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
              </mesh>
              {/* Pulsing Beacon Sphere */}
              <mesh position={[0, 0.38, 0]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.2} />
              </mesh>

              {/* Laser Projector Cone for laser_scan */}
              <group ref={laserRef} visible={false} position={[0, 0.02, 0.2]}>
                <mesh position={[0, -0.6, 1.2]} rotation={[Math.PI / 4, 0, 0]}>
                  <coneGeometry args={[0.8, 2.5, 16, 1, true]} />
                  <meshBasicMaterial
                    color="#ef4444"
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            </group>
          )}

          {/* Thief: Sleek Ninja Mask & Flowing Scarf */}
          {isThief && (
            <group position={[0, 0, 0]}>
              {/* Matte Black Face Mask covering nose/mouth */}
              <mesh position={[0, -0.05, 0.14]}>
                <boxGeometry args={[0.28, 0.16, 0.05]} />
                <meshStandardMaterial color="#020617" roughness={0.9} />
              </mesh>
              {/* Glowing Optic Sensor over left eye */}
              <mesh position={[-0.06, 0.04, 0.16]}>
                <circleGeometry args={[0.022, 12]} />
                <meshStandardMaterial color="#e11d48" emissive="#f43f5e" emissiveIntensity={1.8} />
              </mesh>
              {/* Crimson Headband */}
              <mesh position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.175, 0.175, 0.06, 18]} />
                <meshStandardMaterial color="#e11d48" roughness={0.5} />
              </mesh>
              {/* Trailing Fluttering Scarf */}
              <group ref={scarfRef} position={[0, -0.08, -0.16]}>
                <mesh position={[0, -0.15, -0.08]} rotation={[0.4, 0, 0]}>
                  <boxGeometry args={[0.09, 0.36, 0.015]} />
                  <meshStandardMaterial color="#e11d48" roughness={0.6} />
                </mesh>
              </group>
            </group>
          )}

          {/* Mystery: Aristocratic Masquerade Gilded Mask & Top Hat */}
          {isMystery && (
            <group position={[0, 0, 0]}>
              {/* Venetian Gilded Masquerade Mask */}
              <mesh position={[0, 0.02, 0.15]}>
                <boxGeometry args={[0.26, 0.12, 0.03]} />
                <meshStandardMaterial
                  color="#f59e0b"
                  metalness={0.9}
                  roughness={0.2}
                />
              </mesh>
              {/* Violet Arcane Eye Glows */}
              <mesh position={[-0.065, 0.02, 0.17]}>
                <sphereGeometry args={[0.022, 8, 8]} />
                <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2.0} />
              </mesh>
              <mesh position={[0.065, 0.02, 0.17]}>
                <sphereGeometry args={[0.022, 8, 8]} />
                <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2.0} />
              </mesh>
              {/* Top Hat */}
              <group position={[0, 0.16, 0]}>
                {/* Brim */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.26, 0.26, 0.02, 20]} />
                  <meshStandardMaterial color="#090a0f" roughness={0.4} />
                </mesh>
                {/* Crown */}
                <mesh position={[0, 0.14, 0]}>
                  <cylinderGeometry args={[0.18, 0.19, 0.26, 20]} />
                  <meshStandardMaterial color="#090a0f" roughness={0.4} />
                </mesh>
                {/* Purple Satin Ribbon */}
                <mesh position={[0, 0.04, 0]}>
                  <cylinderGeometry args={[0.192, 0.192, 0.04, 20]} />
                  <meshStandardMaterial color="#9333ea" roughness={0.2} />
                </mesh>
              </group>
            </group>
          )}

          {/* Ghost: Swirling Floating Spirit Orbs */}
          {isGhost && (
            <group ref={ghostOrbsRef}>
              <mesh position={[0.3, 0.1, 0]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={1.8} />
              </mesh>
              <mesh position={[-0.25, -0.08, 0.15]}>
                <sphereGeometry args={[0.028, 12, 12]} />
                <meshStandardMaterial color="#a5f3fc" emissive="#a5f3fc" emissiveIntensity={1.8} />
              </mesh>
            </group>
          )}
        </group>

        {/* ==================== 3. ARMS & ACCESSORIES ==================== */}
        {/* Left Arm Group */}
        <group ref={leftArmRef} position={[-0.28, 0.28, 0]}>
          <mesh castShadow position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 0.44, 12]} />
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              roughness={0.6}
              metalness={isRobot ? 0.4 : 0}
              transparent={isGhost}
              opacity={isGhost ? 0.65 : 1}
            />
          </mesh>
          {/* Stylized Rounded Hand */}
          <mesh position={[0, -0.42, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color={isRobot ? '#94a3b8' : isGhost ? identityConfig.primaryColor : '#fed7aa'}
              roughness={0.4}
              transparent={isGhost}
              opacity={isGhost ? 0.65 : 1}
            />
          </mesh>

          {/* Dynamic Action Prop: CV Dossier for inspect_cv */}
          {currentAction === 'inspect_cv' && (
            <group position={[0.14, -0.28, 0.18]} rotation={[0.4, 0.3, -0.2]}>
              <mesh castShadow>
                <boxGeometry args={[0.26, 0.34, 0.02]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.12, 0.012]}>
                <planeGeometry args={[0.24, 0.06]} />
                <meshBasicMaterial color="#0284c7" />
              </mesh>
            </group>
          )}

          {/* Dynamic Action Prop: Smartphone for take_photo */}
          {currentAction === 'take_photo' && (
            <group position={[0.24, -0.24, 0.24]}>
              <mesh castShadow>
                <boxGeometry args={[0.2, 0.12, 0.015]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[0.06, 0.02, 0.01]}>
                <circleGeometry args={[0.02, 8]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
              <pointLight
                ref={flashRef}
                position={[0.06, 0.02, 0.1]}
                color="#ffffff"
                intensity={0}
                distance={6}
              />
            </group>
          )}
        </group>

        {/* Right Arm Group */}
        <group ref={rightArmRef} position={[0.28, 0.28, 0]}>
          <mesh castShadow position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 0.44, 12]} />
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              roughness={0.6}
              metalness={isRobot ? 0.4 : 0}
              transparent={isGhost}
              opacity={isGhost ? 0.65 : 1}
            />
          </mesh>
          {/* Stylized Rounded Hand */}
          <mesh position={[0, -0.42, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color={isRobot ? '#94a3b8' : isGhost ? identityConfig.primaryColor : '#fed7aa'}
              roughness={0.4}
              transparent={isGhost}
              opacity={isGhost ? 0.65 : 1}
            />
          </mesh>

          {/* Recruiter: Executive Leather Briefcase with Brass Latches */}
          {isRecruiter && currentAction !== 'inspect_cv' && currentAction !== 'handshake' && (
            <group position={[0.12, -0.4, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.09, 0.28, 0.36]} />
                <meshStandardMaterial color="#451a03" roughness={0.35} />
              </mesh>
              <mesh position={[0, 0.16, 0]}>
                <torusGeometry args={[0.05, 0.012, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#2d1302" roughness={0.5} />
              </mesh>
              <mesh position={[0.048, 0.06, 0.08]}>
                <boxGeometry args={[0.008, 0.03, 0.03]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0.048, 0.06, -0.08]}>
                <boxGeometry args={[0.008, 0.03, 0.03]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          )}

          {/* Partner: Glowing Digital Tablet */}
          {isPartner && currentAction !== 'handshake' && (
            <group position={[0.08, -0.28, 0.1]} rotation={[0.4, -0.3, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.018, 0.28, 0.22]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
              </mesh>
              <mesh position={[0.011, 0, 0]}>
                <planeGeometry args={[0.26, 0.2]} />
                <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.9} />
              </mesh>
            </group>
          )}

          {/* Friend / Action: Modern Coffee Mug */}
          {currentAction === 'drink_coffee' && (
            <group position={[0, -0.32, 0.15]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.055, 0.045, 0.14, 16]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.15} />
              </mesh>
              {/* Sleeve */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.057, 0.052, 0.07, 16]} />
                <meshStandardMaterial color="#78350f" roughness={0.8} />
              </mesh>
            </group>
          )}
        </group>
      </group>

      {/* ==================== 4. LEGS & FOOTWEAR ==================== */}
      {!isGhost ? (
        <>
          {/* Left Leg */}
          <group ref={leftLegRef} position={[-0.13, 0.55, 0]}>
            {/* Tapered Pant Leg */}
            <mesh castShadow position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.075, 0.065, 0.48, 14]} />
              <meshStandardMaterial
                color={isRobot ? '#475569' : isRecruiter ? '#1e293b' : '#334155'}
                metalness={isRobot ? 0.6 : 0.05}
                roughness={0.65}
              />
            </mesh>
            {/* Modern Sneaker / Shoe */}
            <group position={[0, -0.48, 0.04]}>
              {/* Sole */}
              <mesh position={[0, 0.015, 0]}>
                <boxGeometry args={[0.13, 0.035, 0.22]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </mesh>
              {/* Upper Shoe */}
              <mesh position={[0, 0.055, -0.01]}>
                <boxGeometry args={[0.12, 0.055, 0.2]} />
                <meshStandardMaterial
                  color={isRecruiter ? '#090a0f' : isFriend ? '#f59e0b' : '#0284c7'}
                  roughness={isRecruiter ? 0.2 : 0.6}
                />
              </mesh>
              {/* Rounded Toe Cap */}
              <mesh position={[0, 0.045, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.058, 0.058, 0.04, 14]} />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
              </mesh>
            </group>
          </group>

          {/* Right Leg */}
          <group ref={rightLegRef} position={[0.13, 0.55, 0]}>
            <mesh castShadow position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.075, 0.065, 0.48, 14]} />
              <meshStandardMaterial
                color={isRobot ? '#475569' : isRecruiter ? '#1e293b' : '#334155'}
                metalness={isRobot ? 0.6 : 0.05}
                roughness={0.65}
              />
            </mesh>
            {/* Modern Sneaker / Shoe */}
            <group position={[0, -0.48, 0.04]}>
              <mesh position={[0, 0.015, 0]}>
                <boxGeometry args={[0.13, 0.035, 0.22]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.055, -0.01]}>
                <boxGeometry args={[0.12, 0.055, 0.2]} />
                <meshStandardMaterial
                  color={isRecruiter ? '#090a0f' : isFriend ? '#f59e0b' : '#0284c7'}
                  roughness={isRecruiter ? 0.2 : 0.6}
                />
              </mesh>
              <mesh position={[0, 0.045, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.058, 0.058, 0.04, 14]} />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
              </mesh>
            </group>
          </group>
        </>
      ) : (
        /* Ghost: Floating Spectral Ethereal Wisps */
        <group position={[0, 0.45, 0]}>
          <mesh>
            <coneGeometry args={[0.24, 0.75, 18, 1, true]} />
            <meshStandardMaterial
              color="#0891b2"
              emissive="#a5f3fc"
              emissiveIntensity={0.7}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[0.18, 0.5, 14, 1, true]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#22d3ee"
              emissiveIntensity={0.8}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {/* Floor Contact Soft Ambient Occlusion Shadow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[isGhost ? 0.45 : 0.38, 24]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={isSitting ? 0.45 : isGhost ? 0.15 : 0.32}
        />
      </mesh>
    </group>
  );
};
