import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useInputStore } from '@/stores/useInputStore';

export const VirtualJoystick: React.FC = () => {
  const setMoveVector = useInputStore((state) => state.setMoveVector);
  const containerRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const touchIdRef = useRef<number | null>(null);

  const radius = 50; // Max joystick radius in px

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    setIsDragging(true);
    updateVector(touch.clientX, touch.clientY);
  };

  const updateVector = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist > radius) {
        dx = (dx / dist) * radius;
        dy = (dy / dist) * radius;
      }

      setKnobPos({ x: dx, y: dy });

      // Normalized vector: normalized X is strafe, normalized Y (dy) is forward/backward
      // dy < 0 means pushing joystick up (forward), so in game space z is negative!
      const normX = dx / radius;
      const normZ = dy / radius;
      setMoveVector([normX, normZ]);
    },
    [setMoveVector, radius]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === touchIdRef.current) {
          updateVector(touch.clientX, touch.clientY);
          break;
        }
      }
    },
    [isDragging, updateVector]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdRef.current) {
          setIsDragging(false);
          touchIdRef.current = null;
          setKnobPos({ x: 0, y: 0 });
          setMoveVector([0, 0]);
          break;
        }
      }
    },
    [setMoveVector]
  );

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      className="relative flex items-center justify-center w-32 h-32 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 select-none touch-none shadow-xl pointer-events-auto"
      aria-label="Virtual Movement Joystick"
    >
      {/* Direction Guide Crosshairs */}
      <div className="absolute inset-x-4 h-0.5 bg-white/10" />
      <div className="absolute inset-y-4 w-0.5 bg-white/10" />

      {/* Joystick Handle / Knob */}
      <div
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 border border-white/40 shadow-lg pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
        }}
      />
    </div>
  );
};
