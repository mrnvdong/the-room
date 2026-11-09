import React, { useRef, useCallback } from 'react';
import { useInputStore } from '@/stores/useInputStore';

export const TouchLookArea: React.FC = () => {
  const addLookDelta = useInputStore((state) => state.addLookDelta);
  const touchIdRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only capture first touch in this zone
    if (touchIdRef.current !== null) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    lastPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === touchIdRef.current) {
          const dx = touch.clientX - lastPosRef.current.x;
          const dy = touch.clientY - lastPosRef.current.y;
          lastPosRef.current = { x: touch.clientX, y: touch.clientY };
          addLookDelta(dx, dy);
          break;
        }
      }
    },
    [addLookDelta]
  );

  const handleTouchEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null;
        break;
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="absolute top-0 right-0 w-1/2 h-full touch-none select-none pointer-events-auto"
      aria-label="Touch Camera Orbit Zone"
    />
  );
};
