import React, { useState } from 'react';
import { X, Check, ArrowRightLeft, MessageCircle, AlertCircle, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { QuoteRequest } from '../types';
import { USD_TO_CDF } from '../data/mockData';

interface QuoteNegotiationModalProps {
  quote: QuoteRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (quoteId: string) => void;
  onDecline: (quoteId: string) => void;
  onCounterOffer: (quoteId: string, amountUSD: number, note: string) => void;
  onOpenChat: (proId: string, proName: string) => void;
  onOpenEscrowModal?: (quote: QuoteRequest) => void;
}

export const QuoteNegotiationModal: React.FC<QuoteNegotiationModalProps> = ({
  quote,
  isOpen,
  onClose,
  onAccept,
  onDecline,
  onCounterOffer,
  onOpenChat,
  onOpenEscrowModal
}) => {
  const [showCounterForm, setShowCounterForm] = useState(false);
  const [counterUSD, setCounterUSD] = useState<number>(quote?.quoteAmountUSD ? Math.round(quote.quoteAmountUSD * 0.9) : 1000);
  const [counterNote, setCounterNote] = useState<string>(
    'Nous proposons un règlement par tranches : 30% à la signature, 40% après coulage de la dalle, 30% à la livraison.'
  );

  if (!isOpen || !quote) return null;

  const handleSendCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (counterUSD <= 0) return;
    onCounterOffer(quote.id, counterUSD, counterNote);
    setShowCounterForm(false);
    onClose();
  };

  const whatsappUrl = `https://wa.me/243897441122?text=${encodeURIComponent(
    `Bonjour ${quote.professionalName}, concernant votre devis #${quote.id} de ${quote.quoteAmountUSD}$ pour "${quote.projectTitle}", je souhaite en discuter.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-[#c86432]" />
            <div>
              <h3 className="font-bold text-base">Négociation de Devis</h3>
              <p className="text-xs text-stone-200 truncate max-w-[280px]">
                {quote.projectTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Professional summary strip */}
        <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <img
              src={quote.professionalAvatar}
              alt={quote.professionalName}
              className="w-9 h-9 rounded-xl object-cover border border-stone-300"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-bold text-stone-900 block">{quote.professionalName}</span>
              <span className="text-[11px] text-stone-500">{quote.professionalTrade}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-stone-500 block">Délai estimé</span>
            <span className="font-bold text-stone-800">{quote.durationDays} jours</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          {/* Status indicator */}
          <div className="p-3 rounded-xl border flex items-center justify-between bg-white border-stone-200 shadow-xs">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold block">
                Statut actuel de l’offre
              </span>
              <span className="font-bold text-xs capitalize text-stone-900">
                {quote.status === 'counter_offered'
                  ? 'Contre-proposition en attente'
                  : quote.status === 'accepted'
                  ? 'Accepté & Validé'
                  : quote.status === 'declined'
                  ? 'Décliné'
                  : 'Offre reçue'}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#0e3b27] tabular-nums block">
                {quote.quoteAmountUSD.toLocaleString()} $ USD
              </span>
              <span className="text-[10px] text-stone-500 tabular-nums">
                ≈ {quote.quoteAmountCDF.toLocaleString()} CDF
              </span>
            </div>
          </div>

          {/* Counter-offer note if active */}
          {quote.counterOfferUSD && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-stone-800">
              <div className="flex items-center justify-between font-bold text-xs text-amber-950 mb-1">
                <span>Dernière contre-proposition :</span>
                <span className="text-[#0e3b27] tabular-nums">
                  {quote.counterOfferUSD.toLocaleString()} $ USD
                </span>
              </div>
              <p className="text-[11px] text-stone-700 italic">
                "{quote.counterOfferNote}"
              </p>
            </div>
          )}

          {/* Items breakdown */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              Détail des postes chiffrés ({quote.items.length})
            </h4>
            <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
              {quote.items.map((item, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between text-xs">
                  <div className="flex-1 pr-2">
                    <span className="font-medium text-stone-900 block leading-tight">
                      {item.description}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {item.quantity} × {item.unit} à {item.unitPriceUSD} $
                    </span>
                  </div>
                  <span className="font-bold text-stone-900 tabular-nums shrink-0">
                    {(item.quantity * item.unitPriceUSD).toLocaleString()} $
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Message */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
              Note du professionnel
            </h4>
            <p className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 leading-relaxed italic">
              "{quote.message}"
            </p>
          </div>

          {/* Counter Offer Form (Toggleable) */}
          {showCounterForm && (
            <form onSubmit={handleSendCounter} className="p-3 bg-[#f4eee3] rounded-2xl border border-stone-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs">Votre contre-proposition</span>
                <button
                  type="button"
                  onClick={() => setShowCounterForm(false)}
                  className="text-stone-500 hover:text-stone-800 text-[11px]"
                >
                  Annuler
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Nouveau montant proposé (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-bold text-stone-500">$</span>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    required
                    value={counterUSD}
                    onChange={(e) => setCounterUSD(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold tabular-nums"
                  />
                </div>
                <span className="text-[10px] text-stone-500 block mt-0.5 tabular-nums">
                  ≈ {(counterUSD * USD_TO_CDF).toLocaleString()} CDF
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Commentaire / Modalités de paiement
                </label>
                <textarea
                  rows={2}
                  required
                  value={counterNote}
                  onChange={(e) => setCounterNote(e.target.value)}
                  className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3 bg-[#c86432] hover:bg-[#b35222] text-white font-bold rounded-xl text-xs shadow-xs"
              >
                Transmettre la contre-offre
              </button>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 space-y-2 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Négocier sur WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenChat(quote.professionalId, quote.professionalName)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold"
            >
              <span>Chat Jenga</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onDecline(quote.id);
                onClose();
              }}
              className="py-2.5 px-2 bg-stone-200 hover:bg-red-50 hover:text-red-700 text-stone-700 rounded-xl text-xs font-semibold"
            >
              Décliner
            </button>

            <button
              onClick={() => setShowCounterForm(!showCounterForm)}
              className="py-2.5 px-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold"
            >
              Contre-offre
            </button>

            <button
              onClick={() => {
                onAccept(quote.id);
                onClose();
              }}
              className="py-2.5 px-2 bg-[#0e3b27] hover:bg-[#0a291b] text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accepter</span>
            </button>
          </div>

          {onOpenEscrowModal && (
            <button
              onClick={() => {
                onClose();
                onOpenEscrowModal(quote);
              }}
              className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-[#0e3b27] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sécuriser le paiement par Séquestre Mobile Money</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
