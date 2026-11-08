import React, { useState } from 'react';
import { X, Plus, Trash2, FileSpreadsheet, Check, DollarSign } from 'lucide-react';
import { ProfessionalProfile, ProjectListing, QuoteItem, QuoteRequest } from '../types';
import { USD_TO_CDF } from '../data/mockData';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile?: ProfessionalProfile | null;
  targetProject?: ProjectListing | null;
  onSaveQuote: (quote: QuoteRequest) => void;
  currentUser: {
    name: string;
    role: string;
  };
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  targetProfile,
  targetProject,
  onSaveQuote,
  currentUser
}) => {
  const [durationDays, setDurationDays] = useState<number>(30);
  const [includesMaterials, setIncludesMaterials] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    'Proposition détaillée pour exécution des travaux selon les normes de l’art.'
  );
  const [items, setItems] = useState<QuoteItem[]>([
    { description: 'Main-d’œuvre gros œuvre & coffrage', quantity: 1, unit: 'Forfait', unitPriceUSD: 1200 },
    { description: 'Ferraillage et coulage béton vibré', quantity: 1, unit: 'Forfait', unitPriceUSD: 850 }
  ]);

  if (!isOpen) return null;

  const totalUSD = items.reduce((sum, item) => sum + item.quantity * item.unitPriceUSD, 0);
  const totalCDF = totalUSD * USD_TO_CDF;

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, unit: 'Forfait', unitPriceUSD: 100 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index: number, field: keyof QuoteItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}`,
      projectId: targetProject?.id || 'proj-general',
      projectTitle: targetProject?.title || `Travaux avec ${targetProfile?.name || 'Client'}`,
      professionalId: targetProfile?.id || 'pro-me',
      professionalName: targetProfile?.name || currentUser.name,
      professionalAvatar: targetProfile?.avatar || '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
      professionalTrade: targetProfile?.trade || 'Artisan BTP',
      clientId: targetProject?.clientName || 'client-lukusa',
      clientName: targetProject?.clientName || 'Jean-Paul Lukusa',
      quoteAmountUSD: totalUSD,
      quoteAmountCDF: totalCDF,
      durationDays: Number(durationDays),
      message: message.trim(),
      items: items.filter((i) => i.description.trim().length > 0),
      status: 'submitted',
      createdAt: 'Aujourd’hui',
      updatedAt: 'Aujourd’hui',
      includesMaterials
    };

    onSaveQuote(newQuote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#c86432]" />
            <div>
              <h3 className="font-bold text-base">Établir un Devis Détaillé</h3>
              <p className="text-xs text-stone-200 truncate max-w-[280px]">
                {targetProject?.title || targetProfile?.name}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          {/* Target Summary */}
          <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
              Destinataire
            </span>
            <span className="font-bold text-stone-900 text-xs block">
              {targetProject ? `${targetProject.clientName} (${targetProject.city})` : targetProfile?.name}
            </span>
            <span className="text-[11px] text-stone-600 block truncate">
              {targetProject ? targetProject.title : targetProfile?.companyName}
            </span>
          </div>

          {/* Breakdown Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-stone-900">
                Postes et lignes de décomposition *
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#0e3b27] hover:text-[#0a291b]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter une ligne</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white rounded-xl border border-stone-200 space-y-2 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Désignation du poste..."
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="flex-1 p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900"
                    />
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Qté</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                        className="w-full p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 tabular-nums"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Unité</span>
                      <input
                        type="text"
                        placeholder="m², jour, etc."
                        value={item.unit}
                        onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                        className="w-full p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">P.U ($)</span>
                      <input
                        type="number"
                        min="0"
                        value={item.unitPriceUSD}
                        onChange={(e) => handleItemChange(idx, 'unitPriceUSD', Number(e.target.value))}
                        className="w-full p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 font-bold tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Box */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <span className="font-bold text-emerald-950">Montant Total :</span>
            <div className="text-right">
              <span className="font-extrabold text-base text-[#0e3b27] tabular-nums block">
                {totalUSD.toLocaleString()} $ USD
              </span>
              <span className="text-[11px] text-emerald-700 tabular-nums">
                ≈ {totalCDF.toLocaleString()} CDF
              </span>
            </div>
          </div>

          {/* Options: Duration & Materials */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-stone-900 mb-1">Durée (jours)</label>
              <input
                type="number"
                min="1"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 tabular-nums"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2 bg-white border border-stone-300 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={includesMaterials}
                  onChange={(e) => setIncludesMaterials(e.target.checked)}
                  className="rounded text-[#0e3b27] focus:ring-[#0e3b27]"
                />
                <span className="text-[11px] text-stone-800 font-medium leading-tight">
                  Matériaux inclus
                </span>
              </label>
            </div>
          </div>

          {/* Notes / Message */}
          <div>
            <label className="block font-bold text-stone-900 mb-1">
              Précisions contractuelles & conditions
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none text-xs text-stone-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#0e3b27] hover:bg-[#0a291b] text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Envoyer la proposition de devis</span>
          </button>
        </form>
      </div>
    </div>
  );
};
