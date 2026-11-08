import React, { useState } from 'react';
import { 
  X, 
  Store, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Smartphone, 
  Zap, 
  Check, 
  ShoppingBag,
  BellRing
} from 'lucide-react';
import { MobileMoneyProvider } from '../types';
import { USD_TO_CDF } from '../data/mockData';

interface SponsoredDepotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (details: {
    depotName: string;
    city: string;
    phone: string;
    provider: MobileMoneyProvider;
  }) => void;
}

export const SponsoredDepotModal: React.FC<SponsoredDepotModalProps> = ({
  isOpen,
  onClose,
  onSubscribe
}) => {
  const [depotName, setDepotName] = useState('Comptoir Général Aciers & Ciment Kingabwa');
  const [city, setCity] = useState('Kinshasa');
  const [phone, setPhone] = useState('0859991100');
  const [provider, setProvider] = useState<MobileMoneyProvider>('orange');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const monthlyUSD = 45;
  const monthlyCDF = monthlyUSD * USD_TO_CDF;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe({
      depotName,
      city,
      phone,
      provider
    });
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#c86432]/30 text-[#dc7a48]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Comptes Dépôts Sponsorisés</h3>
              <p className="text-xs text-stone-200">Visibilité maximale pour fournisseurs BTP en RDC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pillar Explanation */}
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <span className="font-bold text-stone-900 text-xs block">
                  Propulsez les ventes de votre dépôt de matériaux :
                </span>
                <p className="text-stone-600 leading-relaxed text-xs">
                  Avec le statut de <strong>Dépôt Partenaire Sponsorisé</strong>, vos stocks de ciment, fers à béton, carrelage et tôles apparaissent en première position devant des centaines d’entrepreneurs et investisseurs immobiliers à Kinshasa, Lubumbashi et Goma.
                </p>

                <div className="space-y-1.5 pt-1 text-stone-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0e3b27] shrink-0 mt-0.5" />
                    <span><strong>Positionnement N°1</strong> sur le baromètre des prix de votre ville.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0e3b27] shrink-0 mt-0.5" />
                    <span><strong>Alertes WhatsApp immédiates</strong> dès qu'un gros chantier cherche des matériaux.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0e3b27] shrink-0 mt-0.5" />
                    <span><strong>Badge "Dépôt Partenaire Officiel"</strong> pour rassurer sur l'authenticité des normes.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0e3b27] shrink-0 mt-0.5" />
                    <span>Bouton de commande directe WhatsApp & Appel sans intermédiaire.</span>
                  </div>
                </div>
              </div>

              {/* Pricing strip */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                    Abonnement Mensuel Sans Engagement
                  </span>
                  <span className="font-bold text-stone-900 text-xs">
                    Pack Dépôt Sponsorisé Pro
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-black text-sm text-[#0e3b27] tabular-nums block">
                    {monthlyUSD} $ USD <span className="text-[10px] font-normal text-stone-500">/ mois</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 tabular-nums">
                    ≈ {monthlyCDF.toLocaleString()} CDF
                  </span>
                </div>
              </div>

              {/* Depot Information */}
              <div className="space-y-2.5">
                <span className="font-bold text-stone-900 text-xs block">
                  Informations de votre quincaillerie / dépôt :
                </span>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Nom commercial du dépôt *
                  </label>
                  <input
                    type="text"
                    required
                    value={depotName}
                    onChange={(e) => setDepotName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Ville principale *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-medium"
                    >
                      <option value="Kinshasa">Kinshasa</option>
                      <option value="Lubumbashi">Lubumbashi</option>
                      <option value="Goma">Goma</option>
                      <option value="Kolwezi">Kolwezi</option>
                      <option value="Matadi">Matadi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Opérateur Mobile Money *
                    </label>
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value as MobileMoneyProvider)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-medium"
                    >
                      <option value="orange">Orange Money RDC</option>
                      <option value="mpesa">Vodacom M-Pesa</option>
                      <option value="airtel">Airtel Money RDC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Numéro de prélèvement Mobile Money *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 font-bold text-stone-400">+243</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="85 999 1100"
                      className="w-full pl-12 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-900"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#c86432] hover:bg-[#b35222] text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Activer l'abonnement Dépôt Sponsorisé (45 $)</span>
              </button>
            </form>
          ) : (
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-[#c86432] mx-auto flex items-center justify-center">
                <Store className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-stone-900">
                  Dépôt Sponsorisé Activé avec Succès !
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  <strong>{depotName}</strong> est désormais épinglé en tête du baromètre des matériaux à {city}.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs text-stone-700 space-y-1">
                <p>
                  <strong>Statut :</strong> Sponsorisé (Priorité N°1)
                </p>
                <p>
                  <strong>Paiement validé :</strong> 45 $ via {provider.toUpperCase()} (+243 {phone})
                </p>
                <p className="text-emerald-700 font-semibold pt-1">
                  ✓ Les alertes WhatsApp d'appels d'offres ciment/fer sont actives.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#0e3b27] text-white font-bold rounded-xl text-xs"
              >
                Accéder au catalogue sponsorisé
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs">
          <span className="text-stone-500 text-[11px]">Facturation mensuelle sans engagement</span>
          <button
            type="button"
            onClick={onClose}
            className="py-1 px-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg text-xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
