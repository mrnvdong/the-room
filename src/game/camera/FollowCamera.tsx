import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInputStore } from '@/stores/useInputStore';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { ROOM_BOUNDS } from '@/game/collision/collisionSystem';

interface FollowCameraProps {
  targetPosition: React.MutableRefObject<[number, number, number]>;
}

export const FollowCamera: React.FC<FollowCameraProps> = ({ targetPosition }) => {
  const { camera, gl } = useThree();
  const consumeLookDelta = useInputStore((state) => state.consumeLookDelta);
  const isWindowLookout = useRoomStateStore((state) => state.isWindowLookout);
  const isSittingOnSofa = useRoomStateStore((state) => state.isSittingOnSofa);

  // Camera spherical orbit state
  const orbitRef = useRef({
    yaw: 0, // Horizontal rotation in radians
    pitch: 0.22, // Vertical angle in radians (heroic eye-level third-person)
    distance: 3.2, // Distance behind character
    targetLookAt: new THREE.Vector3(0, 1.1, 0),
    currentCamPos: new THREE.Vector3(0, 1.8, 5.0),
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      // Only drag if left click or pointer
      if (e.button === 0) {
        orbitRef.current.isDragging = true;
        orbitRef.current.lastMouseX = e.clientX;
        orbitRef.current.lastMouseY = e.clientY;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!orbitRef.current.isDragging) return;
      const dx = e.clientX - orbitRef.current.lastMouseX;
      const dy = e.clientY - orbitRef.current.lastMouseY;
      orbitRef.current.lastMouseX = e.clientX;
      orbitRef.current.lastMouseY = e.clientY;

      const sensitivity = 0.005;
      orbitRef.current.yaw -= dx * sensitivity;
      orbitRef.current.pitch = THREE.MathUtils.clamp(
        orbitRef.current.pitch - dy * sensitivity,
        0.05,
        1.1
      );
    };

    const onPointerUp = () => {
      orbitRef.current.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.distance = THREE.MathUtils.clamp(
        orbitRef.current.distance + e.deltaY * 0.003,
        2.2,
        6.0
      );
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [gl]);

  useFrame((_, delta) => {
    // 1. Check special cinematic camera modes
    if (isWindowLookout) {
      const windowCamPos = new THREE.Vector3(-4.2, 1.8, 0);
      const windowLookAt = new THREE.Vector3(-10, 1.8, 0);
      orbitRef.current.currentCamPos.lerp(windowCamPos, 1 - Math.exp(-6 * delta));
      orbitRef.current.targetLookAt.lerp(windowLookAt, 1 - Math.exp(-6 * delta));
      camera.position.copy(orbitRef.current.currentCamPos);
      camera.lookAt(orbitRef.current.targetLookAt);
      return;
    }

    if (isSittingOnSofa) {
      const sofaCamPos = new THREE.Vector3(3.2, 1.3, 0.9);
      const sofaLookAt = new THREE.Vector3(4.5, 0.75, 2.7);
      orbitRef.current.currentCamPos.lerp(sofaCamPos, 1 - Math.exp(-6 * delta));
      orbitRef.current.targetLookAt.lerp(sofaLookAt, 1 - Math.exp(-6 * delta));
      camera.position.copy(orbitRef.current.currentCamPos);
      camera.lookAt(orbitRef.current.targetLookAt);
      return;
    }

    // 2. Consume any look delta from touch controls
    const [touchDx, touchDy] = consumeLookDelta();
    if (touchDx !== 0 || touchDy !== 0) {
      const touchSensitivity = 0.006;
      orbitRef.current.yaw -= touchDx * touchSensitivity;
      orbitRef.current.pitch = THREE.MathUtils.clamp(
        orbitRef.current.pitch - touchDy * touchSensitivity,
        0.05,
        1.1
      );
    }

    const [tx, ty, tz] = targetPosition.current;
    // Look point slightly above character center
    const desiredLookAt = new THREE.Vector3(tx, ty + 1.2, tz);
    orbitRef.current.targetLookAt.lerp(desiredLookAt, 1 - Math.exp(-12 * delta));

    // 3. Compute desired spherical camera position relative to target
    const { yaw, pitch, distance } = orbitRef.current;
    const horizontalDist = distance * Math.cos(pitch);
    const verticalDist = distance * Math.sin(pitch);

    const desiredCamX = tx + horizontalDist * Math.sin(yaw);
    const desiredCamY = ty + verticalDist + 1.0;
    const desiredCamZ = tz + horizontalDist * Math.cos(yaw);

    // 4. Wall collision avoidance: clamp camera inside room boundaries
    const margin = 0.4;
    const clampedCamX = THREE.MathUtils.clamp(
      desiredCamX,
      ROOM_BOUNDS.minX + margin,
      ROOM_BOUNDS.maxX - margin
    );
    const clampedCamY = THREE.MathUtils.clamp(desiredCamY, 0.6, ROOM_BOUNDS.maxY - margin);
    const clampedCamZ = THREE.MathUtils.clamp(
      desiredCamZ,
      ROOM_BOUNDS.minZ + margin,
      ROOM_BOUNDS.maxZ - margin
    );

    const targetCamPos = new THREE.Vector3(clampedCamX, clampedCamY, clampedCamZ);

    // 5. Smooth camera damping
    orbitRef.current.currentCamPos.lerp(targetCamPos, 1 - Math.exp(-10 * delta));
    camera.position.copy(orbitRef.current.currentCamPos);
    camera.lookAt(orbitRef.current.targetLookAt);
  });

  return null;
};
