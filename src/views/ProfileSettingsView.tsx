import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Zap, 
  Award, 
  HelpCircle, 
  Globe, 
  Check, 
  CreditCard, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  Store,
  ArrowRight
} from 'lucide-react';
import { UserRole } from '../types';

interface ProfileSettingsViewProps {
  currentUser: {
    name: string;
    role: UserRole;
    roleTitle: string;
    avatar: string;
    company?: string;
    city: string;
    phone: string;
    whatsapp: string;
  };
  onOpenRoleModal: () => void;
  onOpenOnboarding: () => void;
  onOpenVerifiedBadge: () => void;
  onOpenSponsoredDepot: () => void;
  onOpenEscrow: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  currentUser,
  onOpenRoleModal,
  onOpenOnboarding,
  onOpenVerifiedBadge,
  onOpenSponsoredDepot,
  onOpenEscrow
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'ln' | 'en'>('fr');
  const [phoneVerified, setPhoneVerified] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto bg-[#faf8f5] p-4 space-y-4">
      {/* Current User Card */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0e3b27] shadow-sm bg-stone-100"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-stone-900 text-sm truncate">
                {currentUser.name}
              </h3>
              {phoneVerified && (
                <span className="p-0.5 rounded-full bg-emerald-600 text-white" title="Numéro vérifié">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              )}
            </div>

            <span className="text-xs font-semibold text-[#0e3b27] block truncate">
              {currentUser.roleTitle}
            </span>

            {currentUser.company && (
              <span className="text-[11px] text-stone-500 block truncate">
                {currentUser.company}
              </span>
            )}

            <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
              <MapPin className="w-3 h-3 text-[#c86432]" />
              <span>{currentUser.city}</span>
            </div>
          </div>
        </div>

        {/* Change Role Trigger */}
        <button
          onClick={onOpenRoleModal}
          className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-between"
        >
          <span>Changer de rôle / profil d’utilisateur</span>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>
      </div>

      {/* 3 Active Monetization Pillars Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-extrabold text-xs text-stone-900 uppercase tracking-wider">
            Piliers de Monétisation & Sécurité
          </span>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
            Services Jenga Pro
          </span>
        </div>

        {/* 1. Badge Pro Vérifié Physiquement */}
        <div 
          onClick={onOpenVerifiedBadge}
          className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#0e3b27] transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900">
                  Badge Pro Vérifié Physiquement
                </h4>
                <span className="text-[10px] text-stone-500">
                  Inspection de bureau & outillage sur site (25 $)
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
          </div>
          <p className="text-[11px] text-stone-600 leading-snug pl-10">
            Un inspecteur Jenga certifie l'existence de votre atelier et la qualification réelle de vos équipes à Kinshasa, Lubumbashi ou Goma.
          </p>
        </div>

        {/* 2. Séquestre Sécurisé Mobile Money */}
        <div 
          onClick={onOpenEscrow}
          className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#0e3b27] transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-[#0e3b27]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900">
                  Séquestre Mobile Money (M-Pesa, Orange, Airtel)
                </h4>
                <span className="text-[10px] text-stone-500">
                  Paiement sécurisé par étapes de chantier
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
          </div>
          <p className="text-[11px] text-stone-600 leading-snug pl-10">
            Protège le maître d'ouvrage et garantit à l'artisan que les fonds sont réservés avant de commencer les travaux.
          </p>
        </div>

        {/* 3. Comptes Dépôts Sponsorisés */}
        <div 
          onClick={onOpenSponsoredDepot}
          className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#c86432] transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-100 text-[#c86432]">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900">
                  Comptes Dépôts Matériaux Sponsorisés
                </h4>
                <span className="text-[10px] text-stone-500">
                  Priorité N°1 ciment, fer et carrelage (45 $/mois)
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
          </div>
          <p className="text-[11px] text-stone-600 leading-snug pl-10">
            Placez vos stocks en tête du baromètre des prix et recevez des alertes WhatsApp directes sur tous les appels d'offres matériaux.
          </p>
        </div>
      </div>

      {/* Free Launch Policy Information */}
      <div className="p-3.5 bg-[#f4eee3] rounded-2xl border border-stone-200 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#0e3b27] text-white flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-stone-900">
              Accès de Base 100% Gratuit
            </h4>
            <span className="text-[10px] text-stone-600">Lancement gratuit sans abonnement obligatoire</span>
          </div>
        </div>
        <p className="text-[11px] text-stone-700 leading-relaxed">
          La consultation de l’annuaire, le dépôt de projets, les devis et la messagerie WhatsApp restent entièrement gratuits pour tous les Congolais.
        </p>
      </div>

      {/* Language Selector */}
      <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
          <Globe className="w-4 h-4 text-stone-500" />
          <span>Langue d’affichage</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedLanguage('fr')}
            className={`py-1.5 text-xs font-semibold rounded-lg border text-center transition-colors ${
              selectedLanguage === 'fr'
                ? 'bg-[#0e3b27] text-white border-[#0e3b27]'
                : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            Français
          </button>
          <button
            onClick={() => setSelectedLanguage('ln')}
            className={`py-1.5 text-xs font-semibold rounded-lg border text-center transition-colors ${
              selectedLanguage === 'ln'
                ? 'bg-[#0e3b27] text-white border-[#0e3b27]'
                : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            Lingála
          </button>
          <button
            onClick={() => setSelectedLanguage('en')}
            className={`py-1.5 text-xs font-semibold rounded-lg border text-center transition-colors ${
              selectedLanguage === 'en'
                ? 'bg-[#0e3b27] text-white border-[#0e3b27]'
                : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* DRC Institutional & Regulatory Resources */}
      <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2 text-xs">
        <span className="font-bold text-stone-900 block">
          Organismes & Réglementation BTP en RDC
        </span>
        <div className="space-y-1.5 text-stone-600 text-[11px]">
          <div className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
            <span>Ordre National des Architectes (ONAR)</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
            <span>Ordre National des Ingénieurs Civils (ONIC)</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="flex items-center justify-between p-2 bg-stone-50 rounded-lg">
            <span>GUPEC - Guichet Unique Permis de Construire</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </div>
        </div>
      </div>

      {/* Guide button */}
      <button
        onClick={onOpenOnboarding}
        className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
      >
        <HelpCircle className="w-4 h-4 text-stone-500" />
        <span>Revoir le guide d'utilisation Jenga</span>
      </button>

      <div className="text-center text-[10px] text-stone-400 pt-2 pb-4">
        <span>Jenga RDC v1.1.0 · Piliers de Monétisation Activés</span>
        <span className="block mt-0.5">Kinshasa · Lubumbashi · Goma · Kolwezi · Matadi</span>
      </div>
    </div>
  );
};
