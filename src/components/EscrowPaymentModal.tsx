import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  AlertCircle, 
  ArrowRight, 
  Check, 
  Clock, 
  Coins,
  ChevronRight
} from 'lucide-react';
import { QuoteRequest, MobileMoneyProvider, EscrowMilestone, EscrowContract } from '../types';
import { USD_TO_CDF } from '../data/mockData';

interface EscrowPaymentModalProps {
  quote: QuoteRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmEscrow: (contract: EscrowContract) => void;
  existingContract?: EscrowContract | null;
  onReleaseMilestone?: (contractId: string, milestoneId: string) => void;
}

export const EscrowPaymentModal: React.FC<EscrowPaymentModalProps> = ({
  quote,
  isOpen,
  onClose,
  onConfirmEscrow,
  existingContract,
  onReleaseMilestone
}) => {
  const [provider, setProvider] = useState<MobileMoneyProvider>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('0815002345');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'configure' | 'ussd_pin' | 'active_contract'>(
    existingContract ? 'active_contract' : 'configure'
  );

  if (!isOpen || !quote) return null;

  const totalUSD = quote.counterOfferUSD || quote.quoteAmountUSD;
  const totalCDF = totalUSD * USD_TO_CDF;

  // Default 3-milestone breakdown: 30% / 40% / 30%
  const defaultMilestones: EscrowMilestone[] = [
    {
      id: 'm-1',
      title: 'Jalon 1 : Démarrage & Approvisionnement',
      percentage: 30,
      amountUSD: Math.round(totalUSD * 0.3),
      amountCDF: Math.round(totalUSD * 0.3 * USD_TO_CDF),
      status: 'held_in_escrow',
      description: 'Décaissé après installation du chantier et vérification des premiers matériaux.'
    },
    {
      id: 'm-2',
      title: 'Jalon 2 : Gros Œuvre & Coulage Béton',
      percentage: 40,
      amountUSD: Math.round(totalUSD * 0.4),
      amountCDF: Math.round(totalUSD * 0.4 * USD_TO_CDF),
      status: 'pending_deposit',
      description: 'Décaissé après coulage de la dalle ou élévation des murs certifiée par le client.'
    },
    {
      id: 'm-3',
      title: 'Jalon 3 : Finitions & Réception Définitive',
      percentage: 30,
      amountUSD: Math.round(totalUSD * 0.3),
      amountCDF: Math.round(totalUSD * 0.3 * USD_TO_CDF),
      status: 'pending_deposit',
      description: 'Libéré lors de la remise des clés et levée des réserves.'
    }
  ];

  const currentMilestones = existingContract ? existingContract.milestones : defaultMilestones;

  const handleInitiateUSSD = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('ussd_pin');
    }, 1200);
  };

  const handleConfirmUSSDPin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newContract: EscrowContract = {
        id: `escrow-${Date.now()}`,
        quoteId: quote.id,
        projectTitle: quote.projectTitle,
        clientName: quote.clientName,
        clientPhone: phoneNumber,
        professionalName: quote.professionalName,
        professionalPhone: '+243 89 744 1122',
        totalAmountUSD: totalUSD,
        totalAmountCDF: totalCDF,
        provider,
        providerAccountNumber: phoneNumber,
        milestones: defaultMilestones,
        status: 'active',
        createdAt: 'Aujourd’hui'
      };
      onConfirmEscrow(newContract);
      setStep('active_contract');
    }, 1500);
  };

  const getProviderBrand = (p: MobileMoneyProvider) => {
    switch (p) {
      case 'mpesa':
        return { name: 'Vodacom M-Pesa', color: 'bg-red-600', prefix: '081 / 082' };
      case 'orange':
        return { name: 'Orange Money RDC', color: 'bg-orange-600', prefix: '084 / 085 / 089' };
      case 'airtel':
        return { name: 'Airtel Money RDC', color: 'bg-rose-700', prefix: '097 / 098 / 099' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Séquestre Mobile Money Sécurisé</h3>
              <p className="text-xs text-stone-200">Protection des paiements par jalons en RDC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Context Strip */}
        <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="min-w-0 pr-2">
            <span className="font-bold text-stone-900 block truncate">{quote.projectTitle}</span>
            <span className="text-[11px] text-stone-500">Bénéficiaire : {quote.professionalName}</span>
          </div>
          <div className="text-right shrink-0">
            <span className="font-black text-sm text-[#0e3b27] block tabular-nums">
              {totalUSD.toLocaleString()} $ USD
            </span>
            <span className="text-[10px] text-stone-400 tabular-nums">
              ≈ {totalCDF.toLocaleString()} CDF
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          {step === 'configure' && (
            <div className="space-y-4">
              {/* How it works */}
              <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <span className="font-bold text-stone-900 text-xs block">
                  Principe du séquestre Jenga :
                </span>
                <p className="text-stone-600 leading-relaxed text-xs">
                  Vos fonds ne sont <strong>pas envoyés d’un coup</strong> à l’artisan. L'argent est consigné dans un compte séquestre bancaire/télécom sécurisé et débloqué uniquement après votre validation à chaque étape de chantier terminée.
                </p>
              </div>

              {/* Milestones schedule */}
              <div>
                <span className="font-bold text-stone-900 text-xs block mb-2">
                  Échéancier de paiement recommandé (3 Jalons) :
                </span>
                <div className="space-y-2">
                  {defaultMilestones.map((milestone, idx) => (
                    <div
                      key={milestone.id}
                      className="p-3 bg-white rounded-xl border border-stone-200 flex items-start justify-between gap-2"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#0e3b27]/10 text-[#0e3b27] font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-stone-900 text-xs">{milestone.title}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1">{milestone.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-[#0e3b27] text-xs tabular-nums block">
                          {milestone.amountUSD.toLocaleString()} $ ({milestone.percentage}%)
                        </span>
                        <span className="text-[10px] text-stone-400 tabular-nums">
                          ≈ {milestone.amountCDF.toLocaleString()} CDF
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Money Operator Choice */}
              <div>
                <label className="font-bold text-stone-900 text-xs block mb-2">
                  Sélectionner votre opérateur Mobile Money RDC :
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mpesa', 'orange', 'airtel'] as MobileMoneyProvider[]).map((prov) => {
                    const brand = getProviderBrand(prov);
                    const isSelected = provider === prov;
                    return (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => setProvider(prov)}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-[#0e3b27] text-white border-[#0e3b27] shadow-sm'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span className="text-[11px] font-bold leading-tight">{brand.name}</span>
                        <span className="text-[9px] opacity-75">{brand.prefix}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Phone number input */}
              <div>
                <label className="font-bold text-stone-900 text-xs block mb-1">
                  Numéro de compte Mobile Money (ex: 081 500 2345)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-stone-400 text-xs">+243</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="81 500 2345"
                    className="w-full pl-12 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0e3b27]"
                  />
                </div>
                <span className="text-[10px] text-stone-500 block mt-1">
                  Une invite USSD sera envoyée sur votre téléphone pour autoriser la consignation du Jalon 1 (
                  {Math.round(totalUSD * 0.3)} $).
                </span>
              </div>

              <button
                type="button"
                onClick={handleInitiateUSSD}
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-[#0e3b27] hover:bg-[#0a291b] text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-emerald-300" />
                <span>
                  {isProcessing ? 'Connexion à l’opérateur...' : `Consigner le Jalon 1 (${Math.round(totalUSD * 0.3)} $)`}
                </span>
              </button>
            </div>
          )}

          {step === 'ussd_pin' && (
            <div className="p-4 bg-stone-900 text-white rounded-2xl space-y-4 text-center animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Smartphone className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h4 className="font-bold text-sm">Confirmation USSD Mobile Money</h4>
                <p className="text-xs text-stone-300 mt-1">
                  Invite envoyée sur le <span className="font-mono text-emerald-300">+243 {phoneNumber}</span> via{' '}
                  <strong>{getProviderBrand(provider).name}</strong>.
                </p>
              </div>

              <div className="p-3 bg-stone-800 rounded-xl border border-stone-700 text-left text-xs font-mono space-y-1">
                <p className="text-emerald-400 font-bold">&gt; Séquestre Jenga RDC :</p>
                <p>Consignation Jalon 1 : {Math.round(totalUSD * 0.3)} $ USD</p>
                <p className="text-stone-400">≈ {(Math.round(totalUSD * 0.3) * USD_TO_CDF).toLocaleString()} CDF</p>
                <p className="text-stone-300 pt-1">Tapez votre code secret PIN pour valider.</p>
              </div>

              <button
                type="button"
                onClick={handleConfirmUSSDPin}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                {isProcessing ? 'Validation du transfert...' : 'Simuler : PIN saisi avec succès'}
              </button>
            </div>
          )}

          {step === 'active_contract' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-emerald-950">Séquestre Mobile Money Actif</h4>
                  <p className="text-[11px] text-emerald-800">
                    Les fonds sont protégés. Débloquez chaque jalon après vérification des travaux sur place.
                  </p>
                </div>
              </div>

              {/* Milestones list with Release buttons */}
              <div className="space-y-2.5">
                <span className="font-bold text-stone-900 text-xs block">
                  Suivi des Jalons de Chantier :
                </span>

                {currentMilestones.map((m, idx) => {
                  const isHeld = m.status === 'held_in_escrow';
                  const isReleased = m.status === 'released_to_pro';

                  return (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isReleased
                          ? 'bg-stone-50 border-stone-200 opacity-80'
                          : isHeld
                          ? 'bg-white border-[#0e3b27] ring-1 ring-[#0e3b27]/20 shadow-xs'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                              Étape {idx + 1}
                            </span>
                            {isReleased && (
                              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                                Décaissé à l'artisan
                              </span>
                            )}
                            {isHeld && (
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                                En séquestre (sécurisé)
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-stone-900 text-xs mt-0.5">{m.title}</h5>
                          <p className="text-[11px] text-stone-500 mt-1">{m.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-black text-xs text-[#0e3b27] tabular-nums block">
                            {m.amountUSD.toLocaleString()} $
                          </span>
                          <span className="text-[10px] text-stone-400 tabular-nums">
                            ≈ {m.amountCDF.toLocaleString()} CDF
                          </span>
                        </div>
                      </div>

                      {/* Action trigger for releasing escrow */}
                      {isHeld && (
                        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-stone-600">
                            Travaux vérifiés et conformes ?
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (onReleaseMilestone && existingContract) {
                                onReleaseMilestone(existingContract.id, m.id);
                              } else {
                                m.status = 'released_to_pro';
                              }
                            }}
                            className="py-1.5 px-3 bg-[#0e3b27] hover:bg-[#0a291b] text-white font-bold rounded-lg text-xs shadow-xs flex items-center gap-1"
                          >
                            <Unlock className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Débloquer les fonds</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dispute assistance notice */}
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <span className="font-bold text-stone-800 block">Assistance Litiges Jenga RDC :</span>
                <p>
                  En cas de malfaçon ou désaccord sur le ferraillage/dosage du béton, un médiateur de l'Ordre National des Ingénieurs (ONIC) peut intervenir pour constater l'état du chantier avant tout déblocage.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs">
          <span className="text-stone-500 text-[11px]">Partenaires : Vodacom · Orange · Airtel</span>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-xl text-xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
