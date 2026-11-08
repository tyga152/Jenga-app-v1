import React from 'react';
import { Home, Users, HardHat, FileSpreadsheet, MessageSquare } from 'lucide-react';

export type TabType = 'home' | 'directory' | 'projects' | 'quotes' | 'messages';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadMessagesCount: number;
  pendingQuotesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadMessagesCount,
  pendingQuotesCount
}) => {
  const tabs: { id: TabType; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'directory', label: 'Annuaire', icon: Users },
    { id: 'projects', label: 'Chantiers', icon: HardHat },
    { id: 'quotes', label: 'Devis', icon: FileSpreadsheet, badge: pendingQuotesCount },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount }
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-t border-stone-200 shadow-lg shrink-0">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] relative transition-colors ${
                isActive ? 'text-[#0e3b27]' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 bg-[#c86432] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 truncate max-w-[56px] ${
                  isActive ? 'font-bold text-[#0e3b27]' : 'font-medium text-stone-500'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0e3b27] absolute bottom-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
