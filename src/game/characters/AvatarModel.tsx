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
  const laserRef = useRef<THREE.Group>(null);
  const flashRef = useRef<THREE.PointLight>(null);

  const animTimeRef = useRef(0);

  const isGhost = identity === 'ghost';
  const isRobot = identity === 'robot';
  const isThief = identity === 'thief';
  const isRecruiter = identity === 'recruiter';
  const isPartner = identity === 'partner';
  const isMystery = identity === 'mystery';

  useFrame((_, delta) => {
    const activeMoving = isMoving || (isTurntablePreview && animTimeRef.current % 6 > 3);
    const activeRunning = isRunning && activeMoving;

    // Time elapsed for current action
    const actionElapsed = actionStartTime > 0 ? (Date.now() - actionStartTime) / 1000 : 0;
    const hasActiveAction = Boolean(currentAction);

    // 1. SITTING POSE
    if (isSitting) {
      if (bodyGroupRef.current) {
        bodyGroupRef.current.position.y = 0.52;
        bodyGroupRef.current.position.z = -0.05;
        bodyGroupRef.current.rotation.x = 0.05;
        bodyGroupRef.current.rotation.y = 0;
      }
      if (headGroupRef.current) {
        headGroupRef.current.rotation.set(0, 0, 0);
      }
      if (!isGhost) {
        if (leftLegRef.current) {
          leftLegRef.current.rotation.x = -Math.PI / 2.1;
          leftLegRef.current.rotation.z = -0.05;
        }
        if (rightLegRef.current) {
          rightLegRef.current.rotation.x = -Math.PI / 2.1;
          rightLegRef.current.rotation.z = 0.05;
        }
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -0.55;
        leftArmRef.current.rotation.z = 0.1;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -0.55;
        rightArmRef.current.rotation.z = -0.1;
      }
      return;
    }

    // 2. ACTIVE ACTIONS & EMOTES
    if (hasActiveAction && currentAction) {
      const t = actionElapsed;

      // Reset base leg positions if not running
      if (!activeMoving && !isGhost) {
        if (leftLegRef.current) leftLegRef.current.rotation.set(0, 0, 0);
        if (rightLegRef.current) rightLegRef.current.rotation.set(0, 0, 0);
      }

      switch (currentAction) {
        case 'wave': {
          // Right arm raises high and waves side to side
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.8;
            rightArmRef.current.rotation.z = -0.3 + Math.sin(t * 12) * 0.45;
          }
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = 0;
            leftArmRef.current.rotation.z = 0;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.z = Math.sin(t * 6) * 0.1;
          }
          break;
        }

        case 'applause': {
          // Both arms held in front, clapping hands together
          const clap = Math.abs(Math.sin(t * 14));
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.25;
            leftArmRef.current.rotation.y = -0.4 + clap * 0.35;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.25;
            rightArmRef.current.rotation.y = 0.4 - clap * 0.35;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = Math.sin(t * 7) * 0.08;
          }
          break;
        }

        case 'laugh': {
          // Body bounces back with shoulders trembling with joy
          const bounce = Math.sin(t * 16) * 0.05;
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 0.95 + bounce;
            bodyGroupRef.current.rotation.x = -0.15;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = -0.25 + bounce * 2;
          }
          if (leftArmRef.current) leftArmRef.current.rotation.x = -0.4 + bounce;
          if (rightArmRef.current) rightArmRef.current.rotation.x = -0.4 - bounce;
          break;
        }

        case 'dance':
        case 'robot_dance': {
          if (currentAction === 'robot_dance') {
            // Snappy 90-degree robotic dance steps
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
            // Victory dance: sway hips and swing arms
            const sway = Math.sin(t * 8);
            if (bodyGroupRef.current) {
              bodyGroupRef.current.position.y = 0.95 + Math.abs(sway) * 0.12;
              bodyGroupRef.current.rotation.z = sway * 0.15;
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
          // Right hand extended forward, shaking up and down
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.5;
            rightArmRef.current.rotation.y = -0.25;
            rightArmRef.current.rotation.z = Math.sin(t * 10) * 0.15;
          }
          if (bodyGroupRef.current) {
            bodyGroupRef.current.rotation.x = 0.08;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = Math.sin(t * 5) * 0.08;
          }
          break;
        }

        case 'inspect_cv': {
          // Left hand holds dossier in front of chest, right hand flips pages
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.2;
            leftArmRef.current.rotation.y = 0.55;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.1;
            rightArmRef.current.rotation.y = -0.3 + Math.sin(t * 5) * 0.15;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = 0.38; // Tilt down to read
          }
          break;
        }

        case 'nod_approval': {
          // Head nods vigorously with thumb up
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = Math.sin(t * 8) * 0.25;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.4;
            rightArmRef.current.rotation.z = -0.4;
          }
          break;
        }

        case 'adjust_tie': {
          // Right hand reaches up to adjust necktie
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.9;
            rightArmRef.current.rotation.z = -0.6 + Math.sin(t * 12) * 0.1;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = 0.15;
          }
          break;
        }

        case 'type_device': {
          // Both hands tap on digital tablet
          const tap = Math.sin(t * 18) * 0.06;
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.3 + tap;
            leftArmRef.current.rotation.y = 0.3;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.3 - tap;
            rightArmRef.current.rotation.y = -0.3;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = 0.25;
          }
          break;
        }

        case 'discuss_architecture': {
          // Alternating sweeping hand gestures
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -0.8 + Math.sin(t * 4) * 0.45;
            leftArmRef.current.rotation.z = 0.4;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -0.8 - Math.sin(t * 4) * 0.45;
            rightArmRef.current.rotation.z = -0.4;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.y = Math.sin(t * 3) * 0.25;
          }
          break;
        }

        case 'think_ponder': {
          // Hand on chin, looking up thoughtfully
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
          // Right arm raised high with open hand
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.4;
            rightArmRef.current.rotation.z = -0.5;
          }
          break;
        }

        case 'drink_coffee': {
          // Right arm raises coffee cup to mouth, head tilts back
          const sip = Math.sin(Math.min(Math.PI, t * 1.5));
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -0.6 - sip * 1.25;
            rightArmRef.current.rotation.y = -0.3;
          }
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = -sip * 0.3;
          }
          break;
        }

        case 'cheer': {
          // Both arms up in the air celebrating
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
          // Head scans side to side, hand shades eyes
          if (headGroupRef.current) {
            headGroupRef.current.rotation.y = Math.sin(t * 2.5) * 0.65;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.2;
            rightArmRef.current.rotation.z = -0.6;
          }
          break;
        }

        case 'take_photo': {
          // Holds phone up, flash fires at interval
          if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -1.6;
            leftArmRef.current.rotation.y = 0.3;
          }
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.6;
            rightArmRef.current.rotation.y = -0.3;
          }
          if (flashRef.current) {
            // Flash on at t=1.2s and t=2.6s
            const flashActive = (t > 1.2 && t < 1.35) || (t > 2.6 && t < 2.75);
            flashRef.current.intensity = flashActive ? 8 : 0;
          }
          break;
        }

        case 'sneak_crouch': {
          // Low crouch, sneaky tiptoe
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 0.68;
            bodyGroupRef.current.rotation.x = 0.25;
          }
          if (leftArmRef.current) leftArmRef.current.rotation.x = -0.7;
          if (rightArmRef.current) rightArmRef.current.rotation.x = -0.7;
          if (headGroupRef.current) {
            headGroupRef.current.rotation.y = Math.sin(t * 5) * 0.4;
          }
          break;
        }

        case 'inspect_vault': {
          // Crouches down examining combination locks
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
          // Shh gesture: finger to mouth
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -2.0;
            rightArmRef.current.rotation.z = -0.2;
          }
          break;
        }

        case 'spooky_boo': {
          // Ghost floats high with undulating arms
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
          // Smooth 360 degree spin in the air
          if (bodyGroupRef.current) {
            bodyGroupRef.current.position.y = 1.4 + Math.sin(t * 4) * 0.1;
            bodyGroupRef.current.rotation.y = t * 6;
          }
          if (leftArmRef.current) leftArmRef.current.rotation.z = 0.7;
          if (rightArmRef.current) rightArmRef.current.rotation.z = -0.7;
          break;
        }

        case 'laser_scan': {
          // Visor laser sweeps back and forth
          if (headGroupRef.current) {
            headGroupRef.current.rotation.x = 0.2 + Math.sin(t * 4) * 0.25;
            headGroupRef.current.rotation.y = Math.sin(t * 3) * 0.5;
          }
          if (laserRef.current) {
            laserRef.current.visible = true;
          }
          break;
        }

        case 'recharge': {
          // Rigid standby stance with antenna blink
          if (bodyGroupRef.current) {
            bodyGroupRef.current.rotation.set(0, 0, 0);
          }
          if (leftArmRef.current) leftArmRef.current.rotation.set(0, 0, 0.1);
          if (rightArmRef.current) rightArmRef.current.rotation.set(0, 0, -0.1);
          break;
        }

        case 'mysterious_bow': {
          // Deep formal bow
          if (bodyGroupRef.current) {
            bodyGroupRef.current.rotation.x = 0.6;
          }
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
          // Snaps fingers at shoulder height
          if (rightArmRef.current) {
            rightArmRef.current.rotation.x = -1.6;
            rightArmRef.current.rotation.z = -0.6 + (t % 1 < 0.2 ? -0.2 : 0);
          }
          break;
        }
      }

      return;
    }

    // Hide action props when not in action
    if (laserRef.current) laserRef.current.visible = false;
    if (flashRef.current) flashRef.current.intensity = 0;

    // 3. STANDARD WALKING & RUNNING
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
        bodyGroupRef.current.rotation.set(0, 0, 0);
      }
      if (headGroupRef.current) {
        headGroupRef.current.rotation.set(0, 0, 0);
      }
    } else {
      // Idle animation
      animTimeRef.current += delta * (isGhost ? 3 : 2);
      const idleBob = Math.sin(animTimeRef.current) * (isGhost ? 0.12 : 0.02);

      if (leftLegRef.current) leftLegRef.current.rotation.x *= 0.85;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 0.85;
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x *= 0.85;
        leftArmRef.current.rotation.y = 0;
        leftArmRef.current.rotation.z = 0;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x *= 0.85;
        rightArmRef.current.rotation.y = 0;
        rightArmRef.current.rotation.z = 0;
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
            <mesh position={[0, 0.14, 0]}>
              <planeGeometry args={[0.16, 0.14]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
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

        {/* 3. Head Group (Animatable via headGroupRef) */}
        <group ref={headGroupRef} position={[0, 0.62, 0]}>
          <mesh castShadow position={[0, 0, 0]}>
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

          {/* Robot: Antenna & Visor */}
          {isRobot && (
            <group position={[0, 0, 0]}>
              <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.22, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
              </mesh>
              <mesh position={[0, 0.38, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial
                  color="#22d3ee"
                  emissive="#22d3ee"
                  emissiveIntensity={1.5}
                />
              </mesh>
              <mesh position={[0, 0.02, 0.165]}>
                <boxGeometry args={[0.26, 0.08, 0.03]} />
                <meshStandardMaterial
                  color="#22d3ee"
                  emissive="#06b6d4"
                  emissiveIntensity={1.2}
                />
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

          {/* Thief: Ninja Mask & Headband */}
          {isThief && (
            <group position={[0, 0, 0]}>
              <mesh position={[0, -0.06, 0.165]}>
                <boxGeometry args={[0.34, 0.18, 0.03]} />
                <meshStandardMaterial color="#020617" roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.12, 0]}>
                <boxGeometry args={[0.36, 0.07, 0.34]} />
                <meshStandardMaterial color="#e11d48" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0.06, -0.22]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.08, 0.24, 0.02]} />
                <meshStandardMaterial color="#e11d48" roughness={0.5} />
              </mesh>
            </group>
          )}

          {/* Mystery: Hooded Cloak */}
          {isMystery && (
            <group position={[0, 0, 0]}>
              <mesh position={[0, 0.04, -0.02]}>
                <boxGeometry args={[0.42, 0.44, 0.4]} />
                <meshStandardMaterial color="#3b0764" roughness={0.9} />
              </mesh>
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

          {/* Hair & Visor */}
          {!isRobot && !isThief && !isMystery && !isGhost && (
            <>
              <mesh position={[0, 0.15, -0.02]}>
                <boxGeometry args={[0.36, 0.14, 0.34]} />
                <meshStandardMaterial
                  color={isRecruiter ? '#0f172a' : '#1e1e24'}
                  roughness={0.7}
                />
              </mesh>
              <mesh position={[0, 0.02, 0.165]}>
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
        </group>

        {/* 4. Arms & Hands */}
        {/* Left Arm Group */}
        <group ref={leftArmRef} position={[-0.3, 0.3, 0]}>
          <mesh castShadow position={[0, -0.22, 0]}>
            <boxGeometry args={[0.12, 0.45, 0.12]} />
            <meshStandardMaterial
              color={identityConfig.primaryColor}
              roughness={0.6}
              metalness={isRobot ? 0.8 : 0}
              transparent={isGhost}
              opacity={isGhost ? 0.65 : 1}
            />
          </mesh>

          {/* Dynamic Action Prop: CV Dossier for inspect_cv */}
          {currentAction === 'inspect_cv' && (
            <group position={[0.15, -0.3, 0.18]} rotation={[0.4, 0.3, -0.2]}>
              <mesh castShadow>
                <boxGeometry args={[0.26, 0.34, 0.02]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.3} />
              </mesh>
              {/* Blue Header Banner */}
              <mesh position={[0, 0.12, 0.012]}>
                <planeGeometry args={[0.24, 0.06]} />
                <meshBasicMaterial color="#0284c7" />
              </mesh>
            </group>
          )}

          {/* Dynamic Action Prop: Smartphone for take_photo */}
          {currentAction === 'take_photo' && (
            <group position={[0.25, -0.25, 0.25]}>
              <mesh castShadow>
                <boxGeometry args={[0.2, 0.12, 0.015]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Camera Lens */}
              <mesh position={[0.06, 0.02, 0.01]}>
                <circleGeometry args={[0.02, 8]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
              {/* Camera Flash Light Source */}
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
        <group ref={rightArmRef} position={[0.3, 0.3, 0]}>
          <mesh castShadow position={[0, -0.22, 0]}>
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
          {isRecruiter && currentAction !== 'inspect_cv' && currentAction !== 'handshake' && (
            <group position={[0.12, -0.42, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.1, 0.3, 0.38]} />
                <meshStandardMaterial color="#451a03" roughness={0.4} />
              </mesh>
              <mesh position={[0.052, 0.08, 0]}>
                <boxGeometry args={[0.01, 0.04, 0.18]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} />
              </mesh>
            </group>
          )}

          {/* Partner: Glowing Digital Tablet */}
          {isPartner && currentAction !== 'handshake' && (
            <group position={[0.1, -0.28, 0.1]} rotation={[0.4, -0.3, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.02, 0.28, 0.22]} />
                <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
              </mesh>
              <mesh position={[0.012, 0, 0]}>
                <planeGeometry args={[0.26, 0.2]} />
                <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.8} />
              </mesh>
            </group>
          )}

          {/* Coffee Mug for drink_coffee */}
          {currentAction === 'drink_coffee' && (
            <group position={[0, -0.32, 0.15]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.06, 0.05, 0.14, 12]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.055, 0.055, 0.01, 12]} />
                <meshStandardMaterial color="#451a03" roughness={0.1} />
              </mesh>
            </group>
          )}
        </group>
      </group>

      {/* 5. Legs / Lower Body */}
      {!isGhost ? (
        <>
          {/* Left Leg Group */}
          <group ref={leftLegRef} position={[-0.14, 0.55, 0]}>
            <mesh castShadow position={[0, -0.25, 0]}>
              <boxGeometry args={[0.15, 0.55, 0.16]} />
              <meshStandardMaterial
                color={isRobot ? '#475569' : isRecruiter ? '#1e293b' : '#334155'}
                metalness={isRobot ? 0.8 : 0}
                roughness={0.7}
              />
            </mesh>
          </group>

          {/* Right Leg Group */}
          <group ref={rightLegRef} position={[0.14, 0.55, 0]}>
            <mesh castShadow position={[0, -0.25, 0]}>
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

      {/* Floor Contact Shadow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[isGhost ? 0.5 : 0.42, 24]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={isSitting ? 0.5 : isGhost ? 0.15 : 0.35}
        />
      </mesh>
    </group>
  );
};
