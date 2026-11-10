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

export const MODEL_URL = getAssetUrl('models/xbot.glb');

// Preload the rigged humanoid model
try {
  useGLTF.preload(MODEL_URL);
} catch {
  // Ignore preload error on offline environments
}

// Helper to determine role color palettes
function getIdentityPalette(identity: VisitorIdentity) {
  let bodyColor = 0x2563eb; // Metaverse Explorer blue
  let jointColor = 0x0f172a; // Dark slate
  let visorScreenColor = 0x06b6d4; // Cyan
  let visorEmissive = 0x0284c7;
  let earColor = 0x8b5cf6; // Purple
  let hairColor = 0x854d0e; // Clay chestnut brown
  let frameColor = 0xf8fafc; // White

  if (identity === 'recruiter') {
    bodyColor = 0x1e3a8a; // Navy Suit
    jointColor = 0x0f172a;
    visorScreenColor = 0xef4444; // Crimson Red Tie accent
    visorEmissive = 0xb91c1c;
    earColor = 0x475569;
    hairColor = 0x1f2937;
    frameColor = 0x334155;
  } else if (identity === 'partner') {
    bodyColor = 0x065f46; // Emerald Green
    jointColor = 0x022c22;
    visorScreenColor = 0x34d399; // Mint
    visorEmissive = 0x059669;
    earColor = 0x10b981;
    hairColor = 0x3f3f46;
    frameColor = 0xe2e8f0;
  } else if (identity === 'friend') {
    bodyColor = 0xd97706; // Amber
    jointColor = 0x451a03;
    visorScreenColor = 0xfbbf24; // Gold
    visorEmissive = 0xd97706;
    earColor = 0xf59e0b;
    hairColor = 0x7c2d12;
    frameColor = 0xfef08a;
  } else if (identity === 'thief') {
    bodyColor = 0x0f172a; // Stealth Slate
    jointColor = 0x020617;
    visorScreenColor = 0xf43f5e; // Laser Red
    visorEmissive = 0xe11d48;
    earColor = 0xbe123c;
    hairColor = 0x111827;
    frameColor = 0x1e293b;
  } else if (identity === 'ghost') {
    bodyColor = 0x0891b2; // Spectral Cyan
    jointColor = 0x164e63;
    visorScreenColor = 0xa5f3fc;
    visorEmissive = 0x38bdf8;
    earColor = 0x67e8f9;
    hairColor = 0xcffafe;
    frameColor = 0xecfeff;
  } else if (identity === 'robot') {
    bodyColor = 0x475569; // Chrome Steel
    jointColor = 0x1e293b;
    visorScreenColor = 0x22d3ee; // Laser Cyan
    visorEmissive = 0x06b6d4;
    earColor = 0x0ea5e9;
    hairColor = 0x94a3b8;
    frameColor = 0xcbd5e1;
  } else if (identity === 'mystery') {
    bodyColor = 0x312e81; // Deep Indigo
    jointColor = 0x1e1b4b;
    visorScreenColor = 0xf59e0b; // Amber Gold
    visorEmissive = 0xd97706;
    earColor = 0x6366f1;
    hairColor = 0x18181b;
    frameColor = 0x4338ca;
  }

  return { bodyColor, jointColor, visorScreenColor, visorEmissive, earColor, hairColor, frameColor };
}

/**
 * 1. REAL RIGGED GLB SKINNEDMESH AVATAR WITH FULL KINEMATICS ENGINE
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

    // Apply materials to body and joints
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === 'Beta_Joints') {
          mesh.material = new THREE.MeshStandardMaterial({
            color: palette.jointColor,
            roughness: 0.45,
            metalness: 0.3,
          });
        } else {
          mesh.material = new THREE.MeshStandardMaterial({
            color: palette.bodyColor,
            roughness: 0.35,
            metalness: 0.15,
            transparent: identity === 'ghost',
            opacity: identity === 'ghost' ? 0.75 : 1.0,
          });
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    // Attach Stylized Pixar VR Headset, Clay Hair & Face to mixamorigHead
    const headBone = clone.getObjectByName('mixamorigHead');
    if (headBone) {
      const headRig = new THREE.Group();
      headRig.name = 'metaverse_head_rig';
      headRig.scale.setScalar(100);

      // Warm Peach Clay Skin & Smiling Face
      const skinMat = new THREE.MeshStandardMaterial({
        color: 0xffedd5,
        roughness: 0.65,
        metalness: 0.0,
      });

      const faceGeo = new THREE.SphereGeometry(0.125, 24, 24);
      const face = new THREE.Mesh(faceGeo, skinMat);
      face.scale.set(0.96, 1.02, 0.98);
      face.position.set(0, 0.03, 0.035);
      headRig.add(face);

      // Smiling mouth
      const smileGeo = new THREE.TorusGeometry(0.025, 0.005, 12, 16, Math.PI);
      const smileMat = new THREE.MeshBasicMaterial({ color: 0x7c2d12 });
      const smile = new THREE.Mesh(smileGeo, smileMat);
      smile.rotation.x = Math.PI * 0.9;
      smile.position.set(0, 0.02, 0.135);
      headRig.add(smile);

      // Button nose
      const noseGeo = new THREE.SphereGeometry(0.012, 12, 12);
      const nose = new THREE.Mesh(noseGeo, skinMat);
      nose.position.set(0, 0.05, 0.14);
      headRig.add(nose);

      // VR Headset Frame
      const visorFrameGeo = new THREE.BoxGeometry(0.24, 0.11, 0.12);
      const visorFrameMat = new THREE.MeshStandardMaterial({
        color: palette.frameColor,
        roughness: 0.25,
        metalness: 0.15,
      });
      const visorFrame = new THREE.Mesh(visorFrameGeo, visorFrameMat);
      visorFrame.position.set(0, 0.11, 0.09);
      headRig.add(visorFrame);

      // Glowing Holographic Screen
      const screenGeo = new THREE.BoxGeometry(0.21, 0.08, 0.02);
      const screenMat = new THREE.MeshStandardMaterial({
        color: palette.visorScreenColor,
        emissive: palette.visorEmissive,
        emissiveIntensity: 0.95,
        roughness: 0.08,
        metalness: 0.9,
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 0.11, 0.155);
      headRig.add(screen);

      // Glass Reflection Highlight
      const glintGeo = new THREE.BoxGeometry(0.04, 0.06, 0.005);
      const glintMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.65,
      });
      const glint = new THREE.Mesh(glintGeo, glintMat);
      glint.rotation.z = -0.3;
      glint.position.set(0.06, 0.115, 0.166);
      headRig.add(glint);

      // Audio Ear Cups
      const earGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.035, 24);
      const earMat = new THREE.MeshStandardMaterial({
        color: palette.earColor,
        roughness: 0.3,
        metalness: 0.25,
      });
      const leftEar = new THREE.Mesh(earGeo, earMat);
      leftEar.rotation.z = Math.PI / 2;
      leftEar.position.set(-0.13, 0.11, 0.03);
      headRig.add(leftEar);

      const rightEar = leftEar.clone();
      rightEar.position.x = 0.13;
      headRig.add(rightEar);

      // Headband strap
      const strapGeo = new THREE.TorusGeometry(0.125, 0.015, 12, 24, Math.PI);
      const strapMat = new THREE.MeshStandardMaterial({
        color: palette.jointColor,
        roughness: 0.6,
      });
      const strap = new THREE.Mesh(strapGeo, strapMat);
      strap.rotation.x = -Math.PI / 2;
      strap.position.set(0, 0.11, 0);
      headRig.add(strap);

      // Stylized Clay Hairstyle
      const hairMat = new THREE.MeshStandardMaterial({
        color: palette.hairColor,
        roughness: 0.8,
        metalness: 0.05,
      });

      const hairTopGeo = new THREE.SphereGeometry(0.145, 24, 24);
      const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
      hairTop.scale.set(0.96, 0.85, 1.05);
      hairTop.position.set(0, 0.18, -0.01);
      headRig.add(hairTop);

      // Front swooshes
      const swoosh1Geo = new THREE.ConeGeometry(0.065, 0.14, 16);
      const swoosh1 = new THREE.Mesh(swoosh1Geo, hairMat);
      swoosh1.rotation.x = 1.0;
      swoosh1.rotation.z = -0.35;
      swoosh1.position.set(0.04, 0.23, 0.09);
      headRig.add(swoosh1);

      const swoosh2 = swoosh1.clone();
      swoosh2.scale.set(0.8, 0.8, 0.8);
      swoosh2.rotation.z = 0.3;
      swoosh2.position.set(-0.04, 0.23, 0.08);
      headRig.add(swoosh2);

      // Side hair locks
      const sideLockGeo = new THREE.SphereGeometry(0.05, 16, 16);
      const leftLock = new THREE.Mesh(sideLockGeo, hairMat);
      leftLock.scale.set(0.7, 1.2, 0.9);
      leftLock.position.set(-0.12, 0.15, -0.02);
      headRig.add(leftLock);

      const rightLock = leftLock.clone();
      rightLock.position.x = 0.12;
      headRig.add(rightLock);

      headBone.add(headRig);
    }

    // Attach Sleek Oval Kneepads
    const leftKnee = clone.getObjectByName('mixamorigLeftLeg');
    const rightKnee = clone.getObjectByName('mixamorigRightLeg');
    if (leftKnee && rightKnee) {
      const padMat = new THREE.MeshStandardMaterial({
        color: palette.jointColor,
        roughness: 0.5,
        metalness: 0.25,
      });
      const padGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16);

      const leftPad = new THREE.Mesh(padGeo, padMat);
      leftPad.scale.setScalar(100);
      leftPad.rotation.x = Math.PI / 2;
      leftPad.position.set(0, 0, 0.07);
      leftKnee.add(leftPad);

      const rightPad = leftPad.clone();
      rightKnee.add(rightPad);
    }

    return clone;
  }, [scene, palette, identity]);

  // Cache bone references for high-performance kinematic posing
  const bones = useMemo(() => {
    return {
      hips: clonedScene.getObjectByName('mixamorigHips') as THREE.Bone,
      spine: clonedScene.getObjectByName('mixamorigSpine') as THREE.Bone,
      head: clonedScene.getObjectByName('mixamorigHead') as THREE.Bone,
      leftArm: clonedScene.getObjectByName('mixamorigLeftArm') as THREE.Bone,
      leftForeArm: clonedScene.getObjectByName('mixamorigLeftForeArm') as THREE.Bone,
      leftHand: clonedScene.getObjectByName('mixamorigLeftHand') as THREE.Bone,
      rightArm: clonedScene.getObjectByName('mixamorigRightArm') as THREE.Bone,
      rightForeArm: clonedScene.getObjectByName('mixamorigRightForeArm') as THREE.Bone,
      rightHand: clonedScene.getObjectByName('mixamorigRightHand') as THREE.Bone,
      leftUpLeg: clonedScene.getObjectByName('mixamorigLeftUpLeg') as THREE.Bone,
      leftLeg: clonedScene.getObjectByName('mixamorigLeftLeg') as THREE.Bone,
      rightUpLeg: clonedScene.getObjectByName('mixamorigRightUpLeg') as THREE.Bone,
      rightLeg: clonedScene.getObjectByName('mixamorigRightLeg') as THREE.Bone,
    };
  }, [clonedScene]);

  // Attach and cache Action Props to skeleton hands and head
  const propsRefs = useMemo(() => {
    const rightHand = bones.rightHand;
    const leftHand = bones.leftHand;
    const head = bones.head;

    // 1. Coffee cup
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.025, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    cup.scale.setScalar(100);
    cup.position.set(0, 6, 4);
    cup.visible = false;
    rightHand?.add(cup);

    // 2. Smartphone with Camera Flash
    const phone = new THREE.Group();
    phone.scale.setScalar(100);
    phone.position.set(0, 6, 4);
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

    // 3. CV Portfolio Folder
    const cv = new THREE.Group();
    cv.scale.setScalar(100);
    cv.position.set(0, 8, 4);
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

    // 4. Laser Scan Beam
    const laser = new THREE.Group();
    laser.scale.setScalar(100);
    laser.position.set(0, 11, 18);
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

    if (isMoving || (isTurntablePreview && Math.floor(animTimeRef.current) % 6 > 3)) {
      targetAction = isRunning ? 'run' : 'walk';
    } else if (currentAction === 'nod_approval' || currentAction === 'discuss_architecture') {
      targetAction = 'agree';
    } else if (currentAction === 'think_ponder') {
      targetAction = 'headShake';
    } else if (currentAction === 'sneak_crouch' || currentAction === 'inspect_vault') {
      targetAction = 'sneak_pose';
    } else {
      targetAction = 'idle';
    }

    const current = actions[targetAction];
    if (current) {
      current.reset().fadeIn(0.2).play();
    }

    Object.keys(actions).forEach((key) => {
      if (key !== targetAction && actions[key]?.isRunning()) {
        actions[key]?.fadeOut(0.2);
      }
    });
  }, [actions, isMoving, isRunning, isTurntablePreview, currentAction]);

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
        bones.hips.position.y = 58; // cm scale
        bones.hips.position.z = -5;
      }
      if (bones.leftUpLeg) bones.leftUpLeg.rotation.set(-Math.PI / 2.05, 0, -0.05);
      if (bones.rightUpLeg) bones.rightUpLeg.rotation.set(-Math.PI / 2.05, 0, 0.05);
      if (bones.leftLeg) bones.leftLeg.rotation.set(Math.PI / 2.05, 0, 0);
      if (bones.rightLeg) bones.rightLeg.rotation.set(Math.PI / 2.05, 0, 0);
      if (bones.leftArm) bones.leftArm.rotation.set(0, -0.3, -1.1);
      if (bones.leftForeArm) bones.leftForeArm.rotation.set(0, -0.6, 0.4);
      if (bones.rightArm) bones.rightArm.rotation.set(0, 0.3, 1.1);
      if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.6, 0.4);
      return;
    }

    // 2. ACTIVE ACTIONS & EMOTES KINEMATICS
    if (currentAction && !isMoving) {
      switch (currentAction) {
        case 'wave': {
          // Keep left arm resting at side
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(0, 0, 0);
          // Raise right arm and wave forearm
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.4, -2.2);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0, -0.6 + Math.sin(t * 10) * 0.45);
          if (bones.head) bones.head.rotation.z = Math.sin(t * 5) * 0.1;
          break;
        }

        case 'handshake': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 1.2, 0.35 + Math.sin(t * 10) * 0.1);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.3, 0);
          if (bones.spine) bones.spine.rotation.x = 0.08;
          break;
        }

        case 'applause': {
          const clap = Math.sin(t * 14) * 0.15;
          if (bones.leftArm) bones.leftArm.rotation.set(0, -0.9 + clap, -0.4);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(0, -0.5, -0.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.9 - clap, 0.4);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.5, -0.2);
          break;
        }

        case 'drink_coffee': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          const sip = Math.sin(t * 3);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.8 + sip * 0.1, 0.3);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.6, -1.2 + sip * 0.2);
          if (bones.head) bones.head.rotation.x = -sip * 0.12;
          break;
        }

        case 'take_photo': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, -1.1, -0.5);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(0, -0.6, -0.6);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 1.1, 0.5);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.6, -0.6);
          if (bones.head) bones.head.rotation.x = 0.1;
          break;
        }

        case 'inspect_cv': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, -0.9, -0.5);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(0, -0.7, -0.4);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.8, 0.4);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.6 + Math.sin(t * 4) * 0.12, -0.4);
          if (bones.head) bones.head.rotation.x = 0.35;
          break;
        }

        case 'nod_approval': {
          if (bones.head) bones.head.rotation.x = Math.sin(t * 8) * 0.25;
          break;
        }

        case 'adjust_tie': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.6, 0.3);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.8, -1.3 + Math.sin(t * 8) * 0.1);
          if (bones.head) bones.head.rotation.x = 0.15;
          break;
        }

        case 'type_device': {
          const typeL = Math.sin(t * 16) * 0.08;
          const typeR = Math.cos(t * 16) * 0.08;
          if (bones.leftArm) bones.leftArm.rotation.set(0, -1.1, -0.4);
          if (bones.leftForeArm) bones.leftForeArm.rotation.set(0, -0.4 + typeL, -0.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 1.1, 0.4);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.4 + typeR, -0.2);
          break;
        }

        case 'discuss_architecture': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.8 + Math.sin(t * 4) * 0.2, 0.4);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.4, -0.4);
          break;
        }

        case 'think_ponder': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.6, 0.3);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.7, -1.4);
          if (bones.head) bones.head.rotation.set(-0.1, 0.2, 0.15);
          break;
        }

        case 'high_five': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.5, -2.3);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.4, -0.4);
          break;
        }

        case 'cheer': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, -0.3, 2.3 + Math.sin(t * 8) * 0.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.3, -2.3 - Math.sin(t * 8) * 0.2);
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

        case 'robot_dance': {
          const step = Math.floor(t * 4) % 4;
          if (step === 0) {
            if (bones.rightArm) bones.rightArm.rotation.set(0, 1.4, 0);
            if (bones.leftArm) bones.leftArm.rotation.set(0, 0, 1.4);
          } else if (step === 1) {
            if (bones.rightArm) bones.rightArm.rotation.set(0, 0, -1.4);
            if (bones.leftArm) bones.leftArm.rotation.set(0, -1.4, 0);
          } else if (step === 2) {
            if (bones.rightArm) bones.rightArm.rotation.set(0, 0.5, -2.0);
            if (bones.leftArm) bones.leftArm.rotation.set(0, -0.5, 0.8);
          } else {
            if (bones.rightArm) bones.rightArm.rotation.set(0, 0, 1.15);
            if (bones.leftArm) bones.leftArm.rotation.set(0, -0.5, -2.0);
          }
          break;
        }

        case 'dance': {
          const sway = Math.sin(t * 8);
          if (bones.hips) bones.hips.position.x = sway * 5;
          if (bones.leftArm) bones.leftArm.rotation.set(0, -0.8 + Math.cos(t * 8) * 0.4, -0.6);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.8 - Math.cos(t * 8) * 0.4, 0.6);
          break;
        }

        case 'laugh': {
          const bounce = Math.sin(t * 16) * 0.05;
          if (bones.spine) bones.spine.rotation.x = -0.15 + bounce;
          if (bones.head) bones.head.rotation.x = -0.2 + bounce * 2;
          if (bones.leftArm) bones.leftArm.rotation.set(0, -0.4, -0.9);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.4, 0.9);
          break;
        }

        case 'spooky_boo': {
          if (bones.hips) bones.hips.position.y = 104 + Math.sin(t * 6) * 12;
          if (bones.leftArm) bones.leftArm.rotation.set(0, -1.2, -0.4 + Math.sin(t * 8) * 0.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 1.2, 0.4 - Math.sin(t * 8) * 0.2);
          break;
        }

        case 'twirl_float': {
          if (bones.hips) bones.hips.position.y = 104 + Math.sin(t * 4) * 15;
          if (groupRef.current) groupRef.current.rotation.y = t * 6;
          break;
        }

        case 'mysterious_bow': {
          if (bones.spine) bones.spine.rotation.x = 0.45;
          if (bones.head) bones.head.rotation.x = 0.25;
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.6, 0.5);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.8, -1.0);
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          break;
        }

        case 'snap_fingers': {
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0.8, 0.2);
          if (bones.rightForeArm) bones.rightForeArm.rotation.set(0, 0.4, -0.6);
          break;
        }

        case 'sneak_crouch': {
          if (bones.hips) bones.hips.position.y = 80;
          break;
        }

        case 'inspect_vault': {
          if (bones.hips) bones.hips.position.y = 80;
          if (bones.head) bones.head.rotation.y = Math.sin(t * 3) * 0.4;
          break;
        }

        case 'blend_in':
        case 'recharge': {
          if (bones.head) bones.head.rotation.x = 0.25;
          if (bones.leftArm) bones.leftArm.rotation.set(0, 0, -1.2);
          if (bones.rightArm) bones.rightArm.rotation.set(0, 0, 1.2);
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
        <mesh position={[0, -0.04, 0]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial color={0xffedd5} roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.02, 0.08]}>
          <boxGeometry args={[0.24, 0.11, 0.12]} />
          <meshStandardMaterial color={palette.frameColor} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.02, 0.145]}>
          <boxGeometry args={[0.21, 0.08, 0.02]} />
          <meshStandardMaterial
            color={palette.visorScreenColor}
            emissive={palette.visorEmissive}
            emissiveIntensity={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0.08, -0.02]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={palette.hairColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Limbs */}
      <mesh position={[-0.1, 0.45, 0]}>
        <capsuleGeometry args={[0.07, 0.45, 8, 12]} />
        <meshStandardMaterial color={palette.bodyColor} roughness={0.35} />
      </mesh>
      <mesh position={[0.1, 0.45, 0]}>
        <capsuleGeometry args={[0.07, 0.45, 8, 12]} />
        <meshStandardMaterial color={palette.bodyColor} roughness={0.35} />
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
  const holoShieldRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (holoShieldRef.current) {
      holoShieldRef.current.rotation.z += delta * 0.8;
      holoShieldRef.current.position.y = 0.95 + Math.sin(Date.now() * 0.003) * 0.03;
    }
  });

  return (
    <group>
      <ModelErrorBoundary fallback={<FallbackStylizedAvatar {...props} />}>
        <Suspense fallback={<FallbackStylizedAvatar {...props} />}>
          <GLBAvatar {...props} />
        </Suspense>
      </ModelErrorBoundary>

      {/* Floating Holographic Cyber Shield (as in reference image) */}
      <group
        ref={holoShieldRef}
        position={[0.55, 0.95, 0.15]}
        rotation={[0.1, -0.4, 0]}
      >
        <mesh>
          <ringGeometry args={[0.14, 0.22, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, -0.005]}>
          <circleGeometry args={[0.14, 32]} />
          <meshBasicMaterial
            color="#0284c7"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[0.08, 0.1, 4]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};
