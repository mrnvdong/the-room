import React from 'react';
import { useRoomStateStore, WeatherMode } from '@/stores/useRoomStateStore';
import { useI18nStore } from '@/stores/useI18nStore';
import { CloudSun, Sun, CloudRain, Moon, Eye, Sparkles } from 'lucide-react';

export const WindowAmbiencePanel: React.FC = () => {
  const language = useI18nStore((state) => state.language);
  const weatherMode = useRoomStateStore((state) => state.weatherMode);
  const setWeatherMode = useRoomStateStore((state) => state.setWeatherMode);
  const isWindowLookout = useRoomStateStore((state) => state.isWindowLookout);
  const setWindowLookout = useRoomStateStore((state) => state.setWindowLookout);

  const isVi = language === 'vi';

  const modes: {
    id: WeatherMode;
    label: string;
    icon: React.FC<{ className?: string }>;
    desc: string;
  }[] = [
    {
      id: 'clear',
      label: isVi ? 'Nắng Biển Ban Ngày' : 'Daylight Coastal Bay',
      icon: Sun,
      desc: isVi
        ? 'Nắng nhiệt đới rực rỡ, vịnh biển xanh ngọc và đồi núi xanh ngát'
        : 'Tropical sunshine over turquoise Nha Trang bay, islands & yachts',
    },
    {
      id: 'sunset',
      label: isVi ? 'Hoàng Hôn Vàng Cam' : 'Golden Sunset Bay',
      icon: CloudSun,
      desc: isVi
        ? 'Ánh hoàng hôn vàng óng rực rỡ phản chiếu mặt vịnh và cáp treo'
        : 'Warm amber glow across bay waters & Vinpearl cable car',
    },
    {
      id: 'rain',
      label: isVi ? 'Mưa Biển Sương Mờ' : 'Moody Coastal Mist',
      icon: CloudRain,
      desc: isVi
        ? 'Mưa giăng mờ ảo, mây sương bảng lảng ôm lấy sườn núi đảo'
        : 'Moody coastal mist and gentle rain over the tropical bay',
    },
    {
      id: 'night',
      label: isVi ? 'Đêm Vịnh Biển Lung Linh' : 'Luminous Bay Night',
      icon: Moon,
      desc: isVi
        ? 'Ánh đèn thành phố ven biển, cáp treo và các tòa tháp rực rỡ'
        : 'Sparkling coastal night skyline, moonlit ocean & illuminated towers',
    },
  ];

  return (
    <div className="p-6 bg-slate-950 rounded-2xl border border-white/20 shadow-2xl max-w-md mx-auto text-slate-100 font-sans space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <h3 className="font-bold text-base text-white">
            {isVi ? 'Cảnh Quan Ban Công & Vịnh Biển' : 'Panoramic Bay Terrace & Ambience'}
          </h3>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {isVi ? 'Chế độ thời tiết & ánh sáng:' : 'Atmospheric Lighting Preset:'}
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
          <div className="text-xs font-bold text-white">
            {isVi ? 'Góc Nhìn Toàn Cảnh Vịnh Biển' : 'Cinematic Look-Out View'}
          </div>
          <div className="text-[11px] text-slate-400">
            {isVi ? 'Phóng tầm mắt ngắm trọn cảnh quan biển đảo' : 'Framed camera viewing the coastal bay'}
          </div>
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
          <span>
            {isWindowLookout
              ? isVi
                ? 'Trở về phòng'
                : 'Return to Room'
              : isVi
              ? 'Ngắm vịnh biển'
              : 'Look Out'}
          </span>
        </button>
      </div>
    </div>
  );
};
