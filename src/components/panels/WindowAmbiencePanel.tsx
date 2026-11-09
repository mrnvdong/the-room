import React from 'react';
import { useRoomStateStore, WeatherMode } from '@/stores/useRoomStateStore';
import { CloudSun, Sun, CloudRain, Moon, Eye, Sparkles } from 'lucide-react';

export const WindowAmbiencePanel: React.FC = () => {
  const weatherMode = useRoomStateStore((state) => state.weatherMode);
  const setWeatherMode = useRoomStateStore((state) => state.setWeatherMode);
  const isWindowLookout = useRoomStateStore((state) => state.isWindowLookout);
  const setWindowLookout = useRoomStateStore((state) => state.setWindowLookout);

  const modes: { id: WeatherMode; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { id: 'clear', label: 'Daylight Clear', icon: Sun, desc: 'Crisp morning daylight streaming through the glass' },
    { id: 'sunset', label: 'Golden Sunset', icon: CloudSun, desc: 'Warm amber horizon glow across distant skyscrapers' },
    { id: 'rain', label: 'Rain Ambience', icon: CloudRain, desc: 'Moody rainy atmosphere with softened room lighting' },
    { id: 'night', label: 'Midnight Studio', icon: Moon, desc: 'Deep night with neon cyan monitor reflections' },
  ];

  return (
    <div className="p-6 bg-slate-950 rounded-2xl border border-white/20 shadow-2xl max-w-md mx-auto text-slate-100 font-sans space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <h3 className="font-bold text-base text-white">Panoramic Window & Ambience</h3>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Atmospheric Lighting Preset:
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = weatherMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setWeatherMode(m.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400 text-white ring-1 ring-sky-400'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Icon className="w-4 h-4 text-sky-400" />
                  <span>{m.label}</span>
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">{m.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Look-out Camera Toggle */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-white">Cinematic Look-Out View</div>
          <div className="text-[11px] text-slate-400">Framed camera viewing the skyline</div>
        </div>
        <button
          type="button"
          onClick={() => setWindowLookout(!isWindowLookout)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            isWindowLookout
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isWindowLookout ? 'Return to Room' : 'Look Out'}</span>
        </button>
      </div>
    </div>
  );
};
