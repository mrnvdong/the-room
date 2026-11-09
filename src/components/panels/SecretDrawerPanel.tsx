import React, { useState } from 'react';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { soundManager } from '@/features/audio/soundManager';
import { Lock, Unlock, KeyRound, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const SecretDrawerPanel: React.FC = () => {
  const secretDrawerUnlocked = useRoomStateStore((state) => state.secretDrawerUnlocked);
  const unlockSecretDrawer = useRoomStateStore((state) => state.unlockSecretDrawer);

  const [enteredCode, setEnteredCode] = useState<string>('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleKeyPress = (num: string) => {
    if (enteredCode.length < 4) {
      setEnteredCode((prev) => prev + num);
      setErrorNotice(null);
    }
  };

  const handleClear = () => {
    setEnteredCode('');
    setErrorNotice(null);
  };

  const handleSubmit = () => {
    if (enteredCode === '1337') {
      soundManager.playUnlockSuccess();
      unlockSecretDrawer();
    } else {
      setErrorNotice('INVALID PASSCODE // Type "hint" in keyboard terminal for clue!');
      setEnteredCode('');
    }
  };

  if (secretDrawerUnlocked) {
    return (
      <div className="p-6 bg-slate-950 rounded-2xl border border-amber-500/40 shadow-2xl space-y-5 text-slate-100 font-sans">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <Unlock className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">
              DEMO DRAWER UNLOCKED
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono uppercase font-bold">
            Decrypted
          </span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Achievement Unlocked: Master of Spatial Secrets</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              This is a local puzzle reward. No owner archive or personal information is stored here.
            </p>
          </div>
        </div>

        <p className="rounded-lg border border-amber-400/20 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100">
          Owner archive content has not been configured. The code is a game puzzle only and is not security.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-950 rounded-2xl border border-white/20 shadow-2xl max-w-sm mx-auto text-slate-100 font-sans space-y-4">
      {/* Titlebar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-base text-white">Demo Drawer Puzzle</h3>
        </div>
        <KeyRound className="w-4 h-4 text-slate-500" />
      </div>

      <p className="text-xs text-slate-300">
        Enter the 4-digit game code to open the demo drawer. (Hint: run <code className="text-sky-400 font-mono">hint</code> in the desktop terminal). This is not a security feature.
      </p>

      {/* Code Display Screen */}
      <div className="h-12 rounded-xl bg-slate-900 border border-white/15 flex items-center justify-center font-mono text-xl tracking-[0.5em] text-amber-400 font-bold select-none">
        {enteredCode.padEnd(4, '•')}
      </div>

      {errorNotice && (
        <div className="text-[11px] font-mono text-rose-400 text-center animate-fade-in font-medium">
          {errorNotice}
        </div>
      )}

      {/* Numeric Keypad Grid */}
      <div className="grid grid-cols-3 gap-2 select-none">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            type="button"
            onClick={() => handleKeyPress(digit)}
            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-mono text-base font-bold transition-all border border-white/5"
          >
            {digit}
          </button>
        ))}
        <button
          type="button"
          onClick={handleClear}
          className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-bold transition-all border border-white/5"
        >
          CLR
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('0')}
          className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-mono text-base font-bold transition-all border border-white/5"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white text-xs font-bold transition-all flex items-center justify-center"
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
