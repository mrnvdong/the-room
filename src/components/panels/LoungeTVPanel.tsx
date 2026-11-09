import React from 'react';
import { Tv } from 'lucide-react';

export const LoungeTVPanel: React.FC = () => (
  <section className="overflow-hidden rounded-2xl border border-white/20 bg-slate-950 font-sans text-slate-100 shadow-2xl">
    <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900 px-4 py-3">
      <Tv className="h-4 w-4 text-sky-400" />
      <span className="text-xs font-bold text-white">Media display</span>
    </div>
    <div className="relative flex min-h-64 flex-col items-center justify-center gap-3 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/80 p-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
      <h3 className="relative text-lg font-bold text-white">No video configured</h3>
      <p className="relative max-w-md text-xs leading-relaxed text-slate-300">
        The player will appear here after the owner supplies a video. This panel does not simulate playback or live stream quality.
      </p>
    </div>
  </section>
);
