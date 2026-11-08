import React from 'react';
import { X, CheckCircle, ShieldCheck, Zap, Coins, Building2, User, Wrench, HardHat, Store } from 'lucide-react';
import { UserRole } from '../types';
import { CURRENT_USER_OPTIONS } from '../data/mockData';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeRole,
  onSelectRole
}) => {
  if (!isOpen) return null;

  const roleDefinitions: {
    role: UserRole;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: string;
    currentPersona: string;
  }[] = [
    {
      role: 'client',
      icon: User,
      title: 'Client / Maître d’Ouvrage',
      subtitle: 'Particulier, Propriétaire ou Investisseur',
      description: 'Publiez des besoins de travaux, comparez les offres de devis, contactez directement par WhatsApp et suivez l’avancement de vos chantiers.',
      currentPersona: CURRENT_USER_OPTIONS.client.name
    },
    {
      role: 'artisan',
      icon: Wrench,
      title: 'Artisan & Technicien Qualifié',
      subtitle: 'Maçon, Électricien, Plombier, Menuisier, Peintre',
      description: 'Recevez des demandes de travaux dans votre commune, soumettez des devis détaillés et négociez en toute confiance.',
      currentPersona: CURRENT_USER_OPTIONS.artisan.name
    },
    {
      role: 'architect_engineer',
      icon: Building2,
      title: 'Architecte & Ingénieur Génie Civil',
      subtitle: 'Agréés ONAR / ONIC RDC',
      description: 'Valorisez vos projets de conception 3D, études géotechniques et calculs de structure pour les chantiers résidentiels et tertiaires.',
      currentPersona: CURRENT_USER_OPTIONS.architect_engineer.name
    },
    {
      role: 'contractor',
      icon: HardHat,
      title: 'Entrepreneur Général BTP',
      subtitle: 'Entreprise de construction clé en main',
      description: 'Répondez aux appels d’offres majeurs, gérez des équipes pluridisciplinaires et trouvez des sous-traitants fiables.',
      currentPersona: CURRENT_USER_OPTIONS.contractor.name
    },
    {
      role: 'supplier',
      icon: Store,
      title: 'Fournisseur de Matériaux',
      subtitle: 'Dépôts de ciment, fer à béton, carrelage, quincaillerie',
      description: 'Affichez vos stocks et prix en temps réel, recevez des commandes groupées avec livraison directe sur chantier.',
      currentPersona: CURRENT_USER_OPTIONS.supplier.name
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Sélection du Rôle Jenga</h3>
            <p className="text-xs text-stone-200">Testez l’expérience selon votre profil métier</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Access & Monetization Transparency Banner */}
        <div className="bg-[#f4eee3] p-3.5 border-b border-stone-200">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#0e3b27] text-white shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-xs text-stone-700">
              <span className="font-bold text-stone-900 block">Lancement Gratuit pour Tous</span>
              Jenga est accessible à 100% sans commission ni abonnement de départ. Les options de monétisation futures (Badges Pro vérifiés, mise en avant sponsorisée et séquestre sécurisé Mobile Money) soutiendront la croissance du secteur.
            </div>
          </div>
        </div>

        {/* Role Options */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {roleDefinitions.map((item) => {
            const Icon = item.icon;
            const isSelected = activeRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => {
                  onSelectRole(item.role);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-white border-[#0e3b27] ring-2 ring-[#0e3b27]/20 shadow-md'
                    : 'bg-white/70 hover:bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected
                        ? 'bg-[#0e3b27] text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-stone-900 text-sm">{item.title}</span>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-[#0e3b27] shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-[#c86432] block truncate">
                      {item.subtitle}
                    </span>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Profil démo : <strong className="text-stone-800">{item.currentPersona}</strong></span>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Accès gratuit
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Sécurité & contacts WhatsApp directs</span>
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#0e3b27] hover:bg-[#0a291b]"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
