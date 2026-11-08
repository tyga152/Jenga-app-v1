import React, { useState } from 'react';
import { X, Plus, HardHat, DollarSign, MapPin, Calendar, Check, AlertCircle } from 'lucide-react';
import { ProjectListing, TradeCategory } from '../types';
import { DRC_CITIES_AND_NEIGHBORHOODS, TRADE_CATEGORIES, USD_TO_CDF } from '../data/mockData';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: ProjectListing) => void;
  currentUser: {
    name: string;
    roleTitle: string;
    avatar: string;
    phone: string;
    whatsapp: string;
  };
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  currentUser
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TradeCategory>('masonry');
  const [city, setCity] = useState('Kinshasa');
  const [neighborhood, setNeighborhood] = useState('Ngaliema (Macampagne, Binza)');
  const [budgetUSD, setBudgetUSD] = useState<number>(3500);
  const [duration, setDuration] = useState('3 semaines');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'planned'>('urgent');
  const [requirementsInput, setRequirementsInput] = useState(
    'Ferraillage conforme aux plans\nÉquipe disponible immédiatement\nRéférences vérifiables à Kinshasa'
  );

  if (!isOpen) return null;

  const neighborhoods = DRC_CITIES_AND_NEIGHBORHOODS[city] || ['Toutes les communes'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const requirements = requirementsInput
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const tradeObj = TRADE_CATEGORIES.find((t) => t.id === category);

    const newProject: ProjectListing = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      clientName: currentUser.name,
      clientRole: currentUser.roleTitle,
      clientPhone: currentUser.phone,
      clientWhatsapp: currentUser.whatsapp,
      clientAvatar: currentUser.avatar,
      category,
      tradeLabel: tradeObj ? tradeObj.label : 'BTP',
      city,
      neighborhood,
      budgetUSD: Number(budgetUSD),
      budgetCDF: Number(budgetUSD) * USD_TO_CDF,
      status: 'open',
      datePosted: 'À l’instant',
      quotesCount: 0,
      estimatedDuration: duration,
      description: description.trim(),
      requirements: requirements.length > 0 ? requirements : ['Disponibilité immédiate', 'Devis détaillé requis'],
      image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
      urgency
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardHat className="w-5 h-5 text-[#c86432]" />
            <div>
              <h3 className="font-bold text-base">Publier un Chantier / Appel d’Offres</h3>
              <p className="text-xs text-stone-200">Gratuit et diffusé immédiatement aux professionnels</p>
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
          {/* Title */}
          <div>
            <label className="block font-bold text-stone-900 mb-1">
              Titre du besoin ou des travaux *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Construction mur de clôture et portail lourd 200m"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3b27] text-xs text-stone-900"
            />
          </div>

          {/* Trade Category */}
          <div>
            <label className="block font-bold text-stone-900 mb-1">
              Corps de métier principal *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TradeCategory)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3b27] text-xs text-stone-900 font-medium"
            >
              {TRADE_CATEGORIES.filter((t) => t.id !== 'all').map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* City and Commune */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-stone-900 mb-1">Ville (RDC) *</label>
              <select
                value={city}
                onChange={(e) => {
                  const newCity = e.target.value;
                  setCity(newCity);
                  const firstNeigh = DRC_CITIES_AND_NEIGHBORHOODS[newCity]?.[1] || 'Centre-ville';
                  setNeighborhood(firstNeigh);
                }}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3b27] text-xs text-stone-900"
              >
                {Object.keys(DRC_CITIES_AND_NEIGHBORHOODS).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-900 mb-1">Commune / Quartier *</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3b27] text-xs text-stone-900 truncate"
              >
                {neighborhoods
                  .filter((n) => n !== 'Toutes les communes')
                  .map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-stone-900">Budget estimé (USD) *</label>
              <span className="text-[11px] text-stone-500 tabular-nums">
                ≈ {(budgetUSD * USD_TO_CDF).toLocaleString()} CDF
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
              <input
                type="number"
                min="50"
                step="50"
                required
                value={budgetUSD}
                onChange={(e) => setBudgetUSD(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3b27] text-xs text-stone-900 font-bold tabular-nums"
              />
            </div>
          </div>

          {/* Duration & Urgency */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-stone-900 mb-1">Durée souhaitée</label>
              <input
                type="text"
                placeholder="Ex: 3 semaines, 2 mois"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-900 mb-1">Degré d'urgence</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none text-xs text-stone-900 font-medium"
              >
                <option value="urgent">Urgent (démarrage sous 7 jours)</option>
                <option value="normal">Normal (sous 2 à 4 semaines)</option>
                <option value="planned">Planifié (anticipation / étude)</option>
              </select>
            </div>
          </div>

          {/* Detailed description */}
          <div>
            <label className="block font-bold text-stone-900 mb-1">
              Description détaillée des travaux *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Précisez la surface, l'accès au terrain, l'eau et électricité sur place..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0e3b27] text-xs text-stone-900"
            />
          </div>

          {/* Requirements lines */}
          <div>
            <label className="block font-bold text-stone-900 mb-1">
              Critères pour les candidats (1 par ligne)
            </label>
            <textarea
              rows={3}
              value={requirementsInput}
              onChange={(e) => setRequirementsInput(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none text-xs text-stone-900 font-mono"
            />
          </div>

          {/* Free Access Notice */}
          <div className="p-2.5 bg-stone-100 rounded-xl border border-stone-200 flex items-center gap-2 text-[11px] text-stone-600">
            <AlertCircle className="w-4 h-4 text-[#c86432] shrink-0" />
            <span>
              La publication est <strong>100% gratuite</strong>. Les artisans et ingénieurs vous contacteront sur l'app et par WhatsApp.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#0e3b27] hover:bg-[#0a291b] text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Publier la demande de travaux</span>
          </button>
        </form>
      </div>
    </div>
  );
};
