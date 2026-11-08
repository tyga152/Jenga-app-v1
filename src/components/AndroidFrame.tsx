import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, BatteryCharging, Signal } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  activeRoleTitle: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children, activeRoleTitle }) => {
  const [isFrameActive, setIsFrameActive] = useState(true);
  const [currentTime, setCurrentTime] = useState('13:05');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#101412] text-[#141715] flex flex-col items-center justify-start p-0 md:py-6 selection:bg-[#c86432]/30 selection:text-[#0e3b27]">
      {/* Top Simulator Control Bar on Desktop */}
      <div className="w-full max-w-6xl px-4 py-2 flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/80 mb-0 md:mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-stone-200 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#c86432]"></span>
            <span>JENGA RDC</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span className="text-stone-400 hidden sm:inline">Plateforme BTP & Construction Mobile</span>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span className="text-stone-300 font-medium hidden md:inline">{activeRoleTitle}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-stone-400 hidden lg:inline">Affichage :</span>
          <div className="flex items-center bg-stone-900/90 rounded-lg p-0.5 border border-stone-800">
            <button
              onClick={() => setIsFrameActive(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                isFrameActive ? 'bg-[#0e3b27] text-white shadow-sm' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android (Pixel)</span>
            </button>
            <button
              onClick={() => setIsFrameActive(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                !isFrameActive ? 'bg-[#0e3b27] text-white shadow-sm' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Plein Écran</span>
            </button>
          </div>
        </div>
      </div>

      {/* Frame Container */}
      {isFrameActive ? (
        <div className="relative w-full max-w-[430px] md:h-[900px] h-screen bg-[#faf8f5] md:rounded-[44px] md:shadow-2xl md:border-[10px] md:border-[#1d2320] flex flex-col overflow-hidden ring-1 ring-white/10">
          {/* Android Punch Hole & Status Bar */}
          <div className="h-9 w-full bg-[#0e3b27] text-white/95 px-6 flex items-center justify-between text-xs select-none z-50 shrink-0">
            <span className="font-semibold tracking-tight text-[11px]">{currentTime}</span>
            {/* Front Camera Cutout */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#0a291b] border border-black/40 shadow-inner"></div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="text-[10px] font-mono tracking-tighter">4G+</span>
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] tabular-nums">94%</span>
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Applet Mobile Viewport Screen */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-[#faf8f5]">
            {children}
          </div>

          {/* Android Bottom Gesture Bar */}
          <div className="h-5 bg-[#faf8f5] w-full flex items-center justify-center shrink-0 z-40 select-none pb-1">
            <div className="w-32 h-1 bg-stone-300 rounded-full"></div>
          </div>
        </div>
      ) : (
        /* Expanded Responsive Multi-Column Web Mode */
        <div className="w-full max-w-5xl min-h-[850px] bg-[#faf8f5] md:rounded-3xl shadow-xl border border-stone-800 flex flex-col overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};
