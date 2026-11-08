import React, { useState } from 'react';
import { FileSpreadsheet, ArrowRightLeft, CheckCircle2, XCircle, Clock, MessageCircle, Check, ChevronRight } from 'lucide-react';
import { QuoteRequest } from '../types';
import { USD_TO_CDF } from '../data/mockData';

interface QuotesViewProps {
  quotes: QuoteRequest[];
  onOpenNegotiation: (quote: QuoteRequest) => void;
  onAcceptQuote: (quoteId: string) => void;
  onOpenChat: (proId: string, proName: string) => void;
  onOpenEscrowModal?: (quote: QuoteRequest) => void;
}

export const QuotesView: React.FC<QuotesViewProps> = ({
  quotes,
  onOpenNegotiation,
  onAcceptQuote,
  onOpenChat,
  onOpenEscrowModal
}) => {
  const [filter, setFilter] = useState<'all' | 'in_negotiation' | 'accepted'>('all');

  const filteredQuotes = quotes.filter((q) => {
    if (filter === 'all') return true;
    if (filter === 'in_negotiation') return q.status === 'under_review' || q.status === 'counter_offered' || q.status === 'submitted';
    if (filter === 'accepted') return q.status === 'accepted';
    return true;
  });

  const getStatusBadge = (status: QuoteRequest['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Accepté
          </span>
        );
      case 'counter_offered':
        return (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3" />
            Contre-offre active
          </span>
        );
      case 'declined':
        return (
          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Décliné
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold text-stone-700 bg-stone-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Offre reçue
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#faf8f5] overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-white border-b border-stone-200 space-y-2.5 shrink-0">
        <div>
          <h2 className="font-extrabold text-sm text-stone-900 tracking-tight">
            Gestion & Comparaison des Devis
          </h2>
          <span className="text-[11px] text-stone-500">
            Suivez vos offres de prix, comparez les prestataires et négociez
          </span>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tous ({quotes.length})
          </button>
          <button
            onClick={() => setFilter('in_negotiation')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
              filter === 'in_negotiation'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            En négociation
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
              filter === 'accepted'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Validés
          </button>
        </div>
      </div>

      {/* Quote Cards */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {filteredQuotes.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 mt-4 space-y-2">
            <FileSpreadsheet className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="font-bold text-sm text-stone-800">Aucun devis dans cette catégorie</h4>
            <p className="text-xs text-stone-500">
              Les propositions soumises par les artisans apparaîtront ici avec le détail des coûts.
            </p>
          </div>
        ) : (
          filteredQuotes.map((quote) => {
            const whatsappUrl = `https://wa.me/243897441122?text=${encodeURIComponent(
              `Bonjour ${quote.professionalName}, je reviens vers vous à propos du devis pour "${quote.projectTitle}".`
            )}`;

            return (
              <div
                key={quote.id}
                className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#0e3b27] transition-all space-y-3"
              >
                {/* Top strip */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c86432]">
                      Chantier
                    </span>
                    <h3 className="font-bold text-stone-900 text-xs leading-snug">
                      {quote.projectTitle}
                    </h3>
                  </div>
                  {getStatusBadge(quote.status)}
                </div>

                {/* Pro info & price */}
                <div className="p-2.5 bg-stone-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={quote.professionalAvatar}
                      alt={quote.professionalName}
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block truncate max-w-[150px]">
                        {quote.professionalName}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {quote.professionalTrade} · {quote.durationDays} j
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-sm text-[#0e3b27] block tabular-nums">
                      {quote.quoteAmountUSD.toLocaleString()} $
                    </span>
                    <span className="text-[10px] text-stone-400 tabular-nums">
                      ≈ {quote.quoteAmountCDF.toLocaleString()} CDF
                    </span>
                  </div>
                </div>

                {/* Counter offer note if active */}
                {quote.counterOfferUSD && (
                  <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-semibold text-[11px]">Contre-proposition :</span>
                    </div>
                    <span className="font-bold text-[#0e3b27] tabular-nums">
                      {quote.counterOfferUSD.toLocaleString()} $
                    </span>
                  </div>
                )}

                {/* Items preview */}
                <div className="text-[11px] text-stone-600 space-y-1">
                  <span className="font-semibold text-stone-800 block text-[10px] uppercase tracking-wider">
                    Postes inclus ({quote.items.length}) :
                  </span>
                  {quote.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] text-stone-700">
                      <span className="truncate max-w-[200px]">· {item.description}</span>
                      <span className="tabular-nums font-medium">
                        {(item.quantity * item.unitPriceUSD).toLocaleString()} $
                      </span>
                    </div>
                  ))}
                  {quote.items.length > 2 && (
                    <span className="text-[10px] text-stone-400 italic block">
                      + {quote.items.length - 2} autre(s) poste(s) détaillé(s)
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#25D366] text-white hover:brightness-110"
                        title="Discuter sur WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => onOpenChat(quote.professionalId, quote.professionalName)}
                        className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
                      >
                        Chat
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {quote.status !== 'accepted' && (
                        <button
                          onClick={() => onAcceptQuote(quote.id)}
                          className="py-1.5 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accepter</span>
                        </button>
                      )}
                      <button
                        onClick={() => onOpenNegotiation(quote)}
                        className="py-1.5 px-3 bg-[#0e3b27] hover:bg-[#0a291b] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1"
                      >
                        <span>Négocier</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {onOpenEscrowModal && (
                    <button
                      onClick={() => onOpenEscrowModal(quote)}
                      className="w-full py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#0e3b27] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Sécuriser par Séquestre Mobile Money (M-Pesa, Orange, Airtel)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
