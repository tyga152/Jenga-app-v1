import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  FileText, 
  Camera, 
  Smartphone,
  Check
} from 'lucide-react';
import { USD_TO_CDF } from '../data/mockData';

interface VerifiedBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyForVerification: (details: {
    address: string;
    commune: string;
    city: string;
    inspectionDate: string;
  }) => void;
}

export const VerifiedBadgeModal: React.FC<VerifiedBadgeModalProps> = ({
  isOpen,
  onClose,
  onApplyForVerification
}) => {
  const [commune, setCommune] = useState('Limete');
  const [address, setAddress] = useState('12ème Rue Résidentiel, N° 45');
  const [inspectionDate, setInspectionDate] = useState('2026-11-14');
  const [hasIdDoc, setHasIdDoc] = useState(true);
  const [hasInppDoc, setHasInppDoc] = useState(true);
  const [hasOrderDoc, setHasOrderDoc] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyForVerification({
      address,
      commune,
      city: 'Kinshasa',
      inspectionDate
    });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Badge Pro Vérifié Physiquement</h3>
              <p className="text-xs text-stone-200">Audit de bureau & visite d'inspection sur site</p>
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
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pillar Explanation */}
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <span className="font-bold text-stone-900 text-xs block">
                  Pourquoi certifier votre profil physiquement ?
                </span>
                <p className="text-stone-600 leading-relaxed text-xs">
                  En RDC, les propriétaires et promoteurs craignent les intermédiaires fantômes. Avec le badge <strong>Vérifié Physiquement</strong>, un inspecteur assermenté Jenga visite votre atelier ou siège social pour valider votre matériel et vos qualifications.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-stone-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0e3b27]" />
                    <span>Positionnement en tête d’annuaire</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0e3b27]" />
                    <span>+300% de demandes de devis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0e3b27]" />
                    <span>Sceau officiel sur vos devis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0e3b27]" />
                    <span>Priorité appels d’offres majeurs</span>
                  </div>
                </div>
              </div>

              {/* Inspection fee & Mobile Money */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                    Frais d’audit & déplacement inspecteur
                  </span>
                  <span className="font-bold text-stone-900 text-xs">
                    Rapport de conformité + Sceau numérique à vie
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-black text-sm text-[#0e3b27] tabular-nums block">
                    25 $ USD
                  </span>
                  <span className="text-[10px] text-stone-500 tabular-nums">
                    ≈ {(25 * USD_TO_CDF).toLocaleString()} CDF
                  </span>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3">
                <span className="font-bold text-stone-900 text-xs block">
                  Coordonnées de l'atelier / bureau pour la visite :
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Commune *
                    </label>
                    <input
                      type="text"
                      required
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      placeholder="Ex: Limete, Bandalungwa..."
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Date souhaitée de visite *
                    </label>
                    <input
                      type="date"
                      required
                      value={inspectionDate}
                      onChange={(e) => setInspectionDate(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Adresse physique exacte & repère *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Avenue, numéro, arrêt de bus ou station repère"
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                  />
                </div>

                {/* Documents checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="font-bold text-stone-900 text-xs block">
                    Pièces justificatives à présenter lors de la visite :
                  </span>

                  <label className="flex items-center gap-2 p-2 bg-white border border-stone-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasIdDoc}
                      onChange={(e) => setHasIdDoc(e.target.checked)}
                      className="rounded text-[#0e3b27] focus:ring-[#0e3b27]"
                    />
                    <span className="text-stone-700">
                      Pièce d'identité congolaise (Passeport, Permis de conduire ou Carte d'électeur)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white border border-stone-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasInppDoc}
                      onChange={(e) => setHasInppDoc(e.target.checked)}
                      className="rounded text-[#0e3b27] focus:ring-[#0e3b27]"
                    />
                    <span className="text-stone-700">
                      Brevet INPP BTP / Diplôme technique d'État
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-white border border-stone-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasOrderDoc}
                      onChange={(e) => setHasOrderDoc(e.target.checked)}
                      className="rounded text-[#0e3b27] focus:ring-[#0e3b27]"
                    />
                    <span className="text-stone-700">
                      Agrément Ordre des Architectes (ONAR) / Ingénieurs (ONIC) (Optionnel)
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0e3b27] hover:bg-[#0a291b] text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Programmer la visite d’inspection (25 $)</span>
              </button>
            </form>
          ) : (
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-stone-900">
                  Visite d'inspection programmée !
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Un inspecteur assermenté Jenga RDC se présentera à votre adresse ({address}, {commune}) le <strong>{inspectionDate}</strong>.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs text-stone-700 space-y-1">
                <p>
                  <strong>Inspecteur assigné :</strong> Ing. Patrick Tshibangu (Bureau Kinshasa Est)
                </p>
                <p>
                  <strong>Contact WhatsApp :</strong> +243 81 777 9900
                </p>
                <p className="text-stone-500 text-[11px] pt-1">
                  Le badge sera attribué sous 24h après le constat sur site.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#0e3b27] text-white font-bold rounded-xl text-xs"
              >
                Terminer
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs">
          <span className="text-stone-500 text-[11px]">Audit certifié conforme aux normes BTP RDC</span>
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
