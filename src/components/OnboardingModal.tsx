import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight, HardHat, PhoneCall, FileSpreadsheet, ShieldCheck, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAsRole: (role: 'client' | 'artisan' | 'architect_engineer') => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onStartAsRole
}) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: 'Bienvenue sur Jenga RDC',
      subtitle: 'La plateforme mobile du BTP en République Démocratique du Congo',
      image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
      description: 'Jenga rassemble tous les acteurs de la construction : propriétaires, maîtres d’œuvre, artisans maçons, électriciens, architectes agréés, ingénieurs civils et dépôts de matériaux à Kinshasa, Lubumbashi, Goma et dans toutes les provinces.',
      bullets: [
        'Profils professionnels vérifiés avec portfolio de réalisations réelles',
        'Filtres par corps de métier, ville et commune spécifique',
        'Devis chiffrés en Dollars (USD) et Francs Congolais (CDF)'
      ]
    },
    {
      title: 'WhatsApp & Appels Directs',
      subtitle: 'La fluidité de contact adaptée aux habitudes congolaises',
      image: '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
      description: 'Pas d’intermédiaire bloquant. Chaque fiche pro et chaque offre de chantier intègre un bouton d’appel vocal direct et un lien WhatsApp pré-rempli pour échanger photos, vidéos et géolocalisation de vos parcelles instantanément.',
      bullets: [
        'Lien WhatsApp direct en un clic sans enregistrer le numéro',
        'Messagerie intégrée avec historique des accords et devis',
        'Contrôle d’identité et avis authentifiés de clients précédents'
      ]
    },
    {
      title: 'Comparaison & Négociation de Devis',
      subtitle: 'Transparence des coûts et maîtrise de votre budget',
      image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
      description: 'Recevez plusieurs propositions détaillées pour vos travaux, comparez les prix de la main-d’œuvre et des matériaux, et émettez des contre-propositions formelles en toute clarté.',
      bullets: [
        'Décomposition postes main-d’œuvre vs matériaux',
        'Contre-offres avec calendrier de paiement par tranches',
        'Baromètre des prix du ciment, fer à béton et tôles'
      ]
    }
  ];

  const currentSlide = slides[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="bg-[#faf8f5] w-full max-w-md rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Image & Header */}
        <div className="relative h-44 w-full bg-stone-900 overflow-hidden shrink-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/50 px-2 py-0.5 rounded">
              Lancement 100% Gratuit
            </span>
            <h3 className="text-white font-extrabold text-lg leading-tight mt-1">
              {currentSlide.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <p className="text-xs font-semibold text-[#0e3b27]">
            {currentSlide.subtitle}
          </p>
          <p className="text-xs text-stone-600 leading-relaxed">
            {currentSlide.description}
          </p>

          <div className="space-y-2 pt-1">
            {currentSlide.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#0e3b27] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  step === idx ? 'w-6 bg-[#0e3b27]' : 'w-1.5 bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="py-2 px-3 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Retour
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2 px-3 text-xs font-semibold text-stone-500 hover:text-stone-800"
            >
              Passer
            </button>
          )}

          {step < slides.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0e3b27] hover:bg-[#0a291b] shadow-sm ml-auto"
            >
              <span>Suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => {
                  onStartAsRole('client');
                  onClose();
                }}
                className="py-2.5 px-3.5 rounded-xl text-xs font-bold text-white bg-[#0e3b27] hover:bg-[#0a291b] shadow-sm"
              >
                Explorer Jenga
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
