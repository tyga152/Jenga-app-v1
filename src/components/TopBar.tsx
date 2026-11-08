import React from 'react';
import { MapPin, ChevronDown, UserCheck, Bell, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface TopBarProps {
  currentCity: string;
  currentNeighborhood: string;
  activeRole: UserRole;
  userDisplayName: string;
  onOpenLocationModal: () => void;
  onOpenRoleModal: () => void;
  onOpenOnboarding: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentCity,
  currentNeighborhood,
  activeRole,
  userDisplayName,
  onOpenLocationModal,
  onOpenRoleModal,
  onOpenOnboarding
}) => {
  const getRoleBadgeLabel = (role: UserRole) => {
    switch (role) {
      case 'client':
        return 'Maître d’Ouvrage';
      case 'artisan':
        return 'Artisan Pro';
      case 'architect_engineer':
        return 'Architecte / Ingénieur';
      case 'contractor':
        return 'Entreprise BTP';
      case 'supplier':
        return 'Fournisseur';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0e3b27] text-white px-4 py-3 shadow-md shrink-0 border-b border-[#145237]">
      <div className="flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c86432] text-white font-black text-sm tracking-tighter shadow-sm">
            JG
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold tracking-tight text-base font-sans text-white">JENGA</span>
              <span className="text-[10px] font-semibold text-[#f4eee3]/80 uppercase tracking-widest bg-white/10 px-1 py-0.5 rounded">RDC</span>
            </div>
            <span className="text-[10px] text-[#f4eee3]/70 font-medium">Bâtiment & Travaux Publics</span>
          </div>
        </div>

        {/* Location & Role Controls */}
        <div className="flex items-center gap-1.5">
          {/* City / Commune Quick Trigger */}
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1 bg-[#0a291b]/90 hover:bg-[#0a291b] border border-white/10 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors max-w-[130px] sm:max-w-none"
            title="Changer de ville ou commune en RDC"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c86432] shrink-0" />
            <span className="truncate">
              {currentCity}{currentNeighborhood && currentNeighborhood !== 'Toutes les communes' ? ` · ${currentNeighborhood.split(' ')[0]}` : ''}
            </span>
            <ChevronDown className="w-3 h-3 text-white/60 shrink-0" />
          </button>

          {/* Role Switcher Button */}
          <button
            onClick={onOpenRoleModal}
            className="flex items-center gap-1.5 bg-[#145237] hover:bg-[#1a6343] text-[#faf7f2] border border-white/15 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors"
            title="Changer de rôle / profil d’utilisateur"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="hidden sm:inline truncate max-w-[100px]">{getRoleBadgeLabel(activeRole)}</span>
            <span className="sm:hidden text-[11px]">Rôle</span>
          </button>

          {/* Info / Onboarding Guide */}
          <button
            onClick={onOpenOnboarding}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#f4eee3] transition-colors"
            title="Découvrir la plateforme et l'accès gratuit"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>
    </header>
  );
};
