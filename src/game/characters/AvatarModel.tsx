import React, { Component, ErrorInfo, ReactNode, Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { VisitorIdentity } from '@/types';
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

// Compute asset URL compatible with GitHub Pages subpath (./) and local dev (/)
const getAssetUrl = (relativePath: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${cleanBase}${cleanPath}`;
};

export const MODEL_URL = getAssetUrl('models/human_avatar.glb');

// Preload the rigged humanoid model
try {
  useGLTF.preload(MODEL_URL);
} catch {
  // Ignore preload error on offline environments
}

// Helper to determine role color palettes (Realistic Wardrobe matching video1.mp4)
function getIdentityPalette(identity: VisitorIdentity) {
  let bodyColor = 0x0284c7; // Modern sky/teal T-shirt like video1.mp4
  let pantsColor = 0x334155; // Denim slate jeans
  let hairColor = 0x292524; // Natural dark hair
  let backpackColor = 0x996d44; // Camel canvas
  let pocketColor = 0x7c5330;

  if (identity === 'recruiter') {
    bodyColor = 0x1e3a8a; // Navy Suit shirt
    pantsColor = 0x0f172a; // Dark charcoal trousers
    hairColor = 0x1c1917;
    backpackColor = 0x334155; // Executive dark slate backpack
    pocketColor = 0x1e293b;
  } else if (identity === 'partner') {
    bodyColor = 0x065f46; // Dark Emerald
    pantsColor = 0x1e293b;
    hairColor = 0x27272a;
    backpackColor = 0x785535;
    pocketColor = 0x5a3a1f;
  } else if (identity === 'friend') {
    bodyColor = 0xd97706; // Warm Amber
    pantsColor = 0x3b5371; // Blue jeans
    hairColor = 0x451a03;
    backpackColor = 0x996d44;
    pocketColor = 0x7c5330;
  } else if (identity === 'thief') {
    bodyColor = 0x0f172a; // Stealth Charcoal
    pantsColor = 0x020617;
    hairColor = 0x0a0a0a;
    backpackColor = 0x1e293b;
    pocketColor = 0x0f172a;
  } else if (identity === 'ghost') {
    bodyColor = 0x06b6d4; // Spectral Cyan
    pantsColor = 0x0891b2;
    hairColor = 0xcffafe;
    backpackColor = 0x0e7490;
    pocketColor = 0x155e75;
  } else if (identity === 'robot') {
    bodyColor = 0x475569; // Graphite
    pantsColor = 0x1e293b;
    hairColor = 0x71717a;
    backpackColor = 0x334155;
    pocketColor = 0x1e293b;
  } else if (identity === 'mystery') {
    bodyColor = 0x312e81; // Deep Indigo
    pantsColor = 0x18181b;
    hairColor = 0x18181b;
    backpackColor = 0x4338ca;
    pocketColor = 0x3730a3;
  }

  return { bodyColor, pantsColor, hairColor, backpackColor, pocketColor };
}

/**
 * 1. REAL RIGGED GLB SKINNEDMESH AVATAR WITH FULL KINEMATICS ENGINE
 * Realistic 3D Human Character matching video1.mp4 (Nha Trang Online)
 */
const GLBAvatar: React.FC<AvatarModelProps> = ({
  identity,
  isMoving = false,
  isRunning = false,
  isTurntablePreview = false,
  currentAction = null,
  actionStartTime = 0,
  isSitting = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const animTimeRef = useRef(0);

  // Load the 3D rigged SkinnedMesh model
  const { scene, animations } = useGLTF(MODEL_URL);

  const palette = useMemo(() => getIdentityPalette(identity), [identity]);

  // Clone scene so each avatar has isolated bones and materials
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(scene) as THREE.Group;

    // Apply realistic PBR materials to character clothing while preserving photorealistic face & skin
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Keep photorealistic textures for Head, Eyes, Teeth
        if (
          mesh.name.includes('Head') ||
          mesh.name.includes('Eye') ||
          mesh.name.includes('Teeth')
        ) {
          if (identity === 'ghost' && mesh.material) {
            (mesh.material as THREE.Material).transparent = true;
            (mesh.material as THREE.Material).opacity = 0.75;
          }
          return;
        }

        // T-Shirt styling by role
        if (mesh.name === 'Wolf3D_Outfit_Top') {
          mesh.material = new THREE.MeshStandardMaterial({
            color: palette.bodyColor,
            roughness: 0.65,
            metalness: 0.05,
            transparent: identity === 'ghost',
            opacity: identity === 'ghost' ? 0.75 : 1.0,
          });
        }
        // Pants / Jeans
        else if (mesh.name === 'Wolf3D_Outfit_Bottom') {
          mesh.material = new THREE.MeshStandardMaterial({
            color: palette.pantsColor,
            roughness: 0.8,
            metalness: 0.02,
            transparent: identity === 'ghost',
            opacity: identity === 'ghost' ? 0.75 : 1.0,
          });
        }
        // Footwear / Sneakers
        else if (mesh.name === 'Wolf3D_Outfit_Footwear') {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.5,
            metalness: 0.1,
          });
        }
        // Hair
        else if (mesh.name === 'Wolf3D_Hair') {
          mesh.material = new THREE.MeshStandardMaterial({
            color: palette.hairColor,
            roughness: 0.85,
            metalness: 0.05,
          });
        }
      }
    });

    // Attach Travel Canvas Backpack (Balo) from video1.mp4 to Spine2
    const spine2Bone =
      clone.getObjectByName('Spine2') ||
      clone.getObjectByName('mixamorigSpine2') ||
      clone.getObjectByName('mixamorig:Spine2');

    if (spine2Bone) {
      const backpackRig = new THREE.Group();
      backpackRig.name = 'travel_backpack_rig';

      // Attach Travel Canvas Backpack (Balo) from video1.mp4 to Spine2 (Back of character)
      const bagMat = new THREE.MeshStandardMaterial({
        color: palette.backpackColor,
        roughness: 0.85,
        metalness: 0.08,
      });
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.38, 0.15), bagMat);
      bag.position.set(0, -0.05, -0.16); // Mounted on the back

      // Back Zipper Storage Pocket
      const pocketMat = new THREE.MeshStandardMaterial({
        color: palette.pocketColor,
        roughness: 0.9,
      });
      const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.19, 0.06), pocketMat);
      pocket.position.set(0, -0.08, -0.25);

      // Top Flap
      const flapMat = new THREE.MeshStandardMaterial({
        color: 0x4a2e18,
        roughness: 0.8,
      });
      const topFlap = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.14), flapMat);
      topFlap.position.set(0, 0.13, -0.15);

      // Padded Ergonomic Shoulder Straps over shoulders
      const strapMat = new THREE.MeshStandardMaterial({ color: 0x2e1e11, roughness: 0.9 });
      const leftStrap = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.32, 0.015), strapMat);
      leftStrap.position.set(-0.1, -0.03, -0.02);
      leftStrap.rotation.x = -0.1;
      const rightStrap = leftStrap.clone();
      rightStrap.position.x = 0.1;

      // Side Elastic Water Bottle Pocket
      const sideHolder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.035, 0.14, 12),
        new THREE.MeshStandardMaterial({ color: 0x3b4252, roughness: 0.7 })
      );
      sideHolder.position.set(0.15, -0.06, -0.15);

      backpackRig.add(bag, pocket, topFlap, leftStrap, rightStrap, sideHolder);
      spine2Bone.add(backpackRig);

      // Crisp Formal Necktie for Recruiter (Front Chest)
      if (identity === 'recruiter') {
        const tieRig = new THREE.Group();
        tieRig.name = 'recruiter_necktie_rig';
        tieRig.position.set(0, 0.14, 0.11); // Front of upper chest

        const collarMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
        const leftCollar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, 0.015), collarMat);
        leftCollar.rotation.z = 0.35;
        leftCollar.position.set(-0.04, 0.05, 0.01);
        const rightCollar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, 0.015), collarMat);
        rightCollar.rotation.z = -0.35;
        rightCollar.position.set(0.04, 0.05, 0.01);
        tieRig.add(leftCollar, rightCollar);

        const tieMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35, metalness: 0.2 });
        const knot = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.045, 4), tieMat);
        knot.rotation.z = Math.PI;
        knot.position.set(0, 0.02, 0.012);
        tieRig.add(knot);

        const tieBody = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.25, 0.012), tieMat);
        tieBody.position.set(0, -0.11, 0.012);
        tieRig.add(tieBody);

        const clipMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.2 });
        const tieClip = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.01, 0.006), clipMat);
        tieClip.position.set(0.01, -0.07, 0.02);
        tieRig.add(tieClip);

        spine2Bone.add(tieRig);
      }
    }

    return clone;
  }, [scene, palette, identity]);

  // Cache bone references for high-performance kinematic posing
  const bones = useMemo(() => {
    const getBone = (name: string) =>
      clonedScene.getObjectByName(name) ||
      clonedScene.getObjectByName(`mixamorig${name}`) ||
      clonedScene.getObjectByName(`mixamorig:${name}`);

    return {
      hips: getBone('Hips') as THREE.Bone,
      spine: getBone('Spine') as THREE.Bone,
      spine2: getBone('Spine2') as THREE.Bone,
      head: getBone('Head') as THREE.Bone,
      leftArm: getBone('LeftArm') as THREE.Bone,
      leftForeArm: getBone('LeftForeArm') as THREE.Bone,
      leftHand: getBone('LeftHand') as THREE.Bone,
      rightArm: getBone('RightArm') as THREE.Bone,
      rightForeArm: getBone('RightForeArm') as THREE.Bone,
      rightHand: getBone('RightHand') as THREE.Bone,
      leftUpLeg: getBone('LeftUpLeg') as THREE.Bone,
      leftLeg: getBone('LeftLeg') as THREE.Bone,
      leftFoot: getBone('LeftFoot') as THREE.Bone,
      rightUpLeg: getBone('RightUpLeg') as THREE.Bone,
      rightLeg: getBone('RightLeg') as THREE.Bone,
      rightFoot: getBone('RightFoot') as THREE.Bone,
    };
  }, [clonedScene]);

  // Attach and cache Action Props to skeleton hands and head
  const propsRefs = useMemo(() => {
    const rightHand = bones.rightHand;
    const leftHand = bones.leftHand;
    const head = bones.head;

    // 1. Ceramic Coffee mug
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.025, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    cup.position.set(0, 0.08, 0.04);
    cup.visible = false;
    rightHand?.add(cup);

    // 2. Modern Smartphone with Camera Flash
    const phone = new THREE.Group();
    phone.position.set(0, 0.08, 0.04);
    const phoneBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.12, 0.008),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 })
    );
    const phoneScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.062, 0.11, 0.002),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    phoneScreen.position.z = 0.005;
    const flashLight = new THREE.PointLight(0xffffff, 0, 4);
    flashLight.position.set(0, 0.04, -0.02);
    phone.add(phoneBody, phoneScreen, flashLight);
    phone.visible = false;
    rightHand?.add(phone);

    // 3. Leather CV Portfolio Dossier
    const cv = new THREE.Group();
    cv.position.set(0, 0.1, 0.04);
    const folder = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.24, 0.015),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 })
    );
    const paper = new THREE.Mesh(
      new THREE.PlaneGeometry(0.15, 0.21),
      new THREE.MeshBasicMaterial({ color: 0xf8fafc, side: THREE.DoubleSide })
    );
    paper.position.z = 0.01;
    cv.add(folder, paper);
    cv.visible = false;
    leftHand?.add(cv);

    // 4. Subtle Sensor Laser Beam
    const laser = new THREE.Group();
    laser.position.set(0, 0.12, 0.15);
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.004, 0.004, 2.0, 8),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    beam.rotation.x = Math.PI / 2;
    beam.position.z = 1.0;
    laser.add(beam);
    laser.visible = false;
    head?.add(laser);

    return { cup, phone, flashLight, cv, laser };
  }, [bones]);

  // Hook up skeletal animation mixer
  const { actions } = useAnimations(animations, groupRef);

  // Manage base animation clip transitions
  useEffect(() => {
    if (!actions) return;

    let targetAction = 'idle';

    if (isSitting) {
      targetAction = ''; // Procedural sitting kinematics handles seated posture
    } else if (isMoving || (isTurntablePreview && Math.floor(animTimeRef.current) % 6 > 3)) {
      targetAction = isRunning ? 'run' : 'walk';
    } else if (currentAction === 'dance' || currentAction === 'robot_dance') {
      targetAction = 'dance';
    } else if (currentAction === 'discuss_architecture' || currentAction === 'nod_approval') {
      targetAction = 'talk';
    } else {
      targetAction = 'idle';
    }

    const target = targetAction ? actions[targetAction] : null;
    if (target) {
      target.reset().fadeIn(0.2).play();
    }

    Object.keys(actions).forEach((key) => {
      if (key !== targetAction && actions[key]?.isRunning()) {
        actions[key]?.fadeOut(0.2);
      }
    });
  }, [actions, isMoving, isRunning, isTurntablePreview, currentAction, isSitting]);

  // Frame kinematics loop for sitting and expressive character actions
  useFrame((_, delta) => {
    animTimeRef.current += delta;
    const t = actionStartTime > 0 ? (Date.now() - actionStartTime) / 1000 : animTimeRef.current;

    // Toggle Action Props visibility
    propsRefs.cup.visible = currentAction === 'drink_coffee';
    propsRefs.phone.visible = currentAction === 'take_photo';
    propsRefs.cv.visible = currentAction === 'inspect_cv';
    propsRefs.laser.visible = currentAction === 'laser_scan';

    if (currentAction === 'take_photo') {
      propsRefs.flashLight.intensity = Math.sin(t * 8) > 0.6 ? 4.0 : 0;
    }

    // 1. SITTING POSE KINEMATICS (Chair / Sofa)
    if (isSitting) {
      if (bones.hips) {
        bones.hips.position.set(0, 0.52, 0.05); // Seated comfortably at chair/cushion height
      }
      if (bones.leftUpLeg) bones.leftUpLeg.rotation.set(-Math.PI / 2, 0, -3.076);
      if (bones.rightUpLeg) bones.rightUpLeg.rotation.set(-Math.PI / 2, 0, 3.076);
      if (bones.leftLeg) bones.leftLeg.rotation.set(-Math.PI / 2, 0, 0);
      if (bones.rightLeg) bones.rightLeg.rotation.set(-Math.PI / 2, 0, 0);
      if (bones.leftFoot) bones.leftFoot.rotation.set(1.57, 0, 0);
      if (bones.rightFoot) bones.rightFoot.rotation.set(1.57, 0, 0);
      if (bones.leftArm) bones.leftArm.rotation.set(0.8, 0.2, 0.2);
      if (bones.rightArm) bones.rightArm.rotation.set(0.8, -0.2, -0.2);
      if (bones.leftForeArm) bones.leftForeArm.rotation.set(0.2, 0.5, 0.8);
      if (bones.rightForeArm) bones.rightForeArm.rotation.set(0.2, -0.5, -0.8);
      return;
    }

    // 2. ACTIVE ACTIONS & EMOTES KINEMATICS
    if (currentAction && !isMoving) {
      switch (currentAction) {
        case 'wave': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          if (bones.rightArm) bones.rightArm.rotation.set(-0.2, -0.4, 1.4);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-0.2, 0.2, Math.sin(t * 10) * 0.45);
          if (bones.head) bones.head.rotation.z = Math.sin(t * 5) * 0.1;
          break;
        }

        case 'handshake': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          if (bones.rightArm) bones.rightArm.rotation.set(1.1, -0.4, -1.0);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-0.2, 0.9, 0.2);
          if (bones.rightHand) bones.rightHand.rotation.set(-0.1, 0.5, 0.3 + Math.sin(t * 10) * 0.06);
          if (bones.spine) bones.spine.rotation.x = 0.06;
          break;
        }

        case 'applause': {
          const clap = Math.sin(t * 14) * 0.08;
          if (bones.rightArm) bones.rightArm.rotation.set(0.5, -0.5 + clap, -0.9);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-0.6, -0.4, -1.5);
          if (bones.leftArm) bones.leftArm.rotation.set(0.5, 0.5 - clap, 0.9);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(-0.6, 0.4, 1.5);
          break;
        }

        case 'drink_coffee': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          const sip = Math.sin(t * 3);
          const sipFactor = Math.max(0, sip);
          if (bones.rightArm) bones.rightArm.rotation.set(-0.2 - sipFactor * 0.1, 0, -1.3);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-1.3, 0.6, -1.5);
          if (bones.head) bones.head.rotation.x = -sipFactor * 0.18;
          break;
        }

        case 'take_photo': {
          if (bones.rightArm) bones.rightArm.rotation.set(0.4, -0.3, -1.1);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-0.8, 0.4, -1.4);
          if (bones.leftArm) bones.leftArm.rotation.set(0.4, 0.3, 1.1);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(-0.8, -0.4, 1.4);
          if (bones.head) bones.head.rotation.x = 0.05;
          if (propsRefs.flashLight) {
            propsRefs.flashLight.intensity = Math.sin(t * 6) > 0.85 ? 15 : 0;
          }
          break;
        }

        case 'inspect_cv': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.6, 0.4, 0.8);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(-0.6, 0.4, 1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0.6, -0.4, -0.8);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-0.4, -0.3 + Math.sin(t * 4) * 0.12, -1.2);
          if (bones.head) bones.head.rotation.x = 0.28;
          break;
        }

        case 'nod_approval': {
          if (bones.head) bones.head.rotation.x = Math.sin(t * 8) * 0.25;
          break;
        }

        case 'adjust_tie': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          const adj = Math.sin(t * 8) * 0.04;
          if (bones.rightArm) bones.rightArm.rotation.set(-0.5 + adj, -0.4, -1.5);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-1.3, 0.6, -1.5);
          if (bones.head) bones.head.rotation.x = 0.15;
          break;
        }

        case 'type_device': {
          const tapL = Math.sin(t * 16) * 0.05;
          const tapR = Math.cos(t * 16) * 0.05;
          if (bones.leftArm) bones.leftArm.rotation.set(0.7, 0.3, 0.6);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(-0.4 + tapL, 0.3, 1.0);
          if (bones.rightArm) bones.rightArm.rotation.set(0.7, -0.3, -0.6);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-0.4 + tapR, -0.3, -1.0);
          if (bones.head) bones.head.rotation.x = 0.22;
          break;
        }

        case 'discuss_architecture': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          if (bones.rightArm) bones.rightArm.rotation.set(0.4, 0.3 + Math.sin(t * 4) * 0.2, 0.3);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(-0.1, 0.8, -0.2);
          break;
        }

        case 'think_ponder': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          if (bones.rightArm) bones.rightArm.rotation.set(0.3, 0.4, 0.2);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0.1, -1.5, 0.4);
          if (bones.head) bones.head.rotation.set(-0.1, 0.2, 0.15);
          break;
        }

        case 'high_five': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          if (bones.rightArm) bones.rightArm.rotation.set(-0.8, -0.4, 0.9);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0.2, 0.2, 0);
          if (bones.rightHand) bones.rightHand.rotation.set(-0.2, 0.5, 0.2);
          break;
        }

        case 'cheer': {
          if (bones.leftArm) bones.leftArm.rotation.set(-0.4, 0.3, -1.4 + Math.sin(t * 8) * 0.2);
          if (bones.rightArm) bones.rightArm.rotation.set(-0.4, -0.3, 1.4 - Math.sin(t * 8) * 0.2);
          if (bones.head) bones.head.rotation.x = -0.2;
          break;
        }

        case 'look_around': {
          if (bones.head) bones.head.rotation.y = Math.sin(t * 2) * 0.6;
          break;
        }

        case 'laser_scan': {
          if (bones.head) bones.head.rotation.y = Math.sin(t * 4) * 0.6;
          break;
        }

        case 'laugh': {
          const bounce = Math.sin(t * 16) * 0.05;
          if (bones.spine) bones.spine.rotation.x = -0.15 + bounce;
          if (bones.head) bones.head.rotation.x = -0.2 + bounce * 2;
          break;
        }

        case 'spooky_boo': {
          if (bones.hips) bones.hips.position.y = 1.0 + Math.sin(t * 6) * 0.12;
          if (bones.leftArm) bones.leftArm.rotation.set(-0.3, 0.3, -1.3 + Math.sin(t * 8) * 0.2);
          if (bones.rightArm) bones.rightArm.rotation.set(-0.3, -0.3, 1.3 - Math.sin(t * 8) * 0.2);
          break;
        }

        case 'twirl_float': {
          if (bones.hips) bones.hips.position.y = 1.0 + Math.sin(t * 4) * 0.15;
          if (groupRef.current) groupRef.current.rotation.y = t * 6;
          break;
        }

        case 'mysterious_bow': {
          if (bones.spine) bones.spine.rotation.x = 0.45;
          if (bones.head) bones.head.rotation.x = 0.25;
          if (bones.rightArm) bones.rightArm.rotation.set(0.3, 0.3, 0.4);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0.1, -1.2, 0.2);
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          break;
        }

        case 'snap_fingers': {
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          if (bones.rightArm) bones.rightArm.rotation.set(0.4, 0.3, 0.3);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.8, -0.2);
          break;
        }

        case 'sneak_crouch': {
          if (bones.hips) bones.hips.position.y = 0.8;
          break;
        }

        case 'inspect_vault': {
          if (bones.hips) bones.hips.position.y = 0.8;
          if (bones.head) bones.head.rotation.y = Math.sin(t * 3) * 0.4;
          break;
        }

        case 'blend_in':
        case 'recharge': {
          if (bones.head) bones.head.rotation.x = 0.25;
          if (bones.leftArm) bones.leftArm.rotation.set(0.998, 0.019, -0.144);
          if (bones.rightArm) bones.rightArm.rotation.set(0.998, -0.019, 0.144);
          break;
        }
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={clonedScene} scale={0.95} position={[0, 0, 0]} />
    </group>
  );
};

/**
 * 2. INSTANT ZERO-LATENCY FALLBACK MESH
 */
const FallbackStylizedAvatar: React.FC<AvatarModelProps> = ({
  identity,
  isMoving = false,
  isSitting = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const palette = useMemo(() => getIdentityPalette(identity), [identity]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      if (isMoving) {
        groupRef.current.position.y = Math.sin(t * 10) * 0.05 + (isSitting ? -0.35 : 0);
      } else {
        groupRef.current.position.y = Math.sin(t * 2) * 0.02 + (isSitting ? -0.35 : 0);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, isSitting ? -0.35 : 0, 0]}>
      {/* Torso & Suit */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.45, 8, 16]} />
        <meshStandardMaterial color={palette.bodyColor} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Head */}
      <group position={[0, 1.45, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial color={0xffedd5} roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.08, -0.02]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={palette.hairColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Limbs */}
      <mesh position={[-0.1, 0.45, 0]}>
        <capsuleGeometry args={[0.07, 0.45, 8, 12]} />
        <meshStandardMaterial color={palette.pantsColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.1, 0.45, 0]}>
        <capsuleGeometry args={[0.07, 0.45, 8, 12]} />
        <meshStandardMaterial color={palette.pantsColor} roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * 3. ERROR BOUNDARY
 */
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('GLBAvatar error caught by boundary, using fallback:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * 4. EXPORTED COMPONENT
 */
export const AvatarModel: React.FC<AvatarModelProps> = (props) => {
  return (
    <group>
      <ModelErrorBoundary fallback={<FallbackStylizedAvatar {...props} />}>
        <Suspense fallback={<FallbackStylizedAvatar {...props} />}>
          <GLBAvatar {...props} />
        </Suspense>
      </ModelErrorBoundary>
    </group>
  );
};
