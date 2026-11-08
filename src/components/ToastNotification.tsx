import React, { useEffect } from 'react';
import { CheckCircle2, X, Sparkles, FileSpreadsheet, HardHat } from 'lucide-react';

export interface ToastData {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'quote' | 'project';
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4200);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'project':
        return <HardHat className="w-5 h-5 text-[#c86432]" />;
      case 'quote':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="absolute top-14 left-3 right-3 z-50 pointer-events-none flex justify-center animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="pointer-events-auto w-full max-w-sm bg-[#0e3b27] text-white p-3.5 rounded-2xl shadow-xl border border-[#1d724e]/50 backdrop-blur-md flex items-start gap-3 ring-1 ring-black/20">
        <div className="p-2 rounded-xl bg-white/10 shrink-0 mt-0.5">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-xs text-white leading-tight">
              {toast.title}
            </h4>
          </div>
          <p className="text-[11px] text-stone-200/90 leading-snug mt-0.5">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 shrink-0 transition-colors"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
