import React from 'react';
import { Keyboard, Smartphone, X } from 'lucide-react';
import { useInputStore } from '@/stores/useInputStore';

interface ControlsHelpProps {
  onClose: () => void;
}

export const ControlsHelp: React.FC<ControlsHelpProps> = ({ onClose }) => {
  const isTouchDevice = useInputStore((state) => state.isTouchDevice);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm pointer-events-auto">
      <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            {isTouchDevice ? <Smartphone className="w-5 h-5 text-sky-400" /> : <Keyboard className="w-5 h-5 text-sky-400" />}
            Control Guide
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3 text-sm">
          {!isTouchDevice ? (
            <>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Move Character</span>
                <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-sky-300 font-semibold">
                  W / A / S / D or Arrows
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Sprint / Run</span>
                <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-sky-300 font-semibold">
                  Shift (Hold)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Orbit Camera</span>
                <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-sky-300 font-semibold">
                  Left-Click Drag
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Zoom In / Out</span>
                <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-sky-300 font-semibold">
                  Mouse Wheel
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Interact with Object</span>
                <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-sky-300 font-semibold">
                  E Key
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Close Panel / Dismiss</span>
                <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-sky-300 font-semibold">
                  Esc Key
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Move Around</span>
                <span className="font-semibold text-xs text-sky-300">Left Analog Joystick</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Sprint Mode</span>
                <span className="font-semibold text-xs text-amber-400">Walk / Run Button</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Orbit / Look Camera</span>
                <span className="font-semibold text-xs text-sky-300">Swipe on Right Side</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                <span className="text-slate-300">Inspect Object</span>
                <span className="font-semibold text-xs text-emerald-400">Tap Action Button</span>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
