import React, { useState } from 'react';
import { Search, MapPin, Star, ShieldCheck, Phone, MessageCircle, Filter, Award, Check } from 'lucide-react';
import { ProfessionalProfile, TradeCategory } from '../types';
import { TRADE_CATEGORIES, USD_TO_CDF } from '../data/mockData';

interface DirectoryViewProps {
  currentCity: string;
  currentNeighborhood: string;
  professionals: ProfessionalProfile[];
  selectedCategory: TradeCategory;
  onSelectCategory: (cat: TradeCategory) => void;
  onSelectProfessional: (pro: ProfessionalProfile) => void;
  onOpenLocationModal: () => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  currentCity,
  currentNeighborhood,
  professionals,
  selectedCategory,
  onSelectCategory,
  onSelectProfessional,
  onOpenLocationModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredPros = professionals.filter((pro) => {
    // City filter: match if currentCity matches pro.city
    const matchesCity = !currentCity || pro.city.toLowerCase() === currentCity.toLowerCase();
    
    // Neighborhood filter if specific
    const matchesNeighborhood =
      !currentNeighborhood ||
      currentNeighborhood === 'Toutes les communes' ||
      pro.neighborhood.toLowerCase().includes(currentNeighborhood.split(' ')[0].toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === 'all' || pro.tradeCategory === selectedCategory;

    // Verified filter
    const matchesVerified = !verifiedOnly || pro.verified;

    // Search query
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      pro.name.toLowerCase().includes(q) ||
      (pro.companyName && pro.companyName.toLowerCase().includes(q)) ||
      pro.trade.toLowerCase().includes(q) ||
      pro.skills.some((s) => s.toLowerCase().includes(q));

    return matchesCity && matchesNeighborhood && matchesCategory && matchesVerified && matchesQuery;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#faf8f5] overflow-hidden">
      {/* Search & Filter Header */}
      <div className="p-3 bg-white border-b border-stone-200 space-y-2.5 shrink-0">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Rechercher maçon, architecte ONAR, électricien, forage..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0e3b27]"
          />
        </div>

        {/* Trade Category Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {TRADE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as TradeCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#0e3b27] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Location & Quick Toggles */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium truncate max-w-[200px]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c86432] shrink-0" />
            <span className="truncate">{currentCity} ({currentNeighborhood})</span>
          </button>

          <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 select-none">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded text-[#0e3b27] focus:ring-[#0e3b27] w-3.5 h-3.5"
            />
            <span className="text-[11px] font-semibold">Vérifiés uniquement</span>
          </label>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>{filteredPros.length} professionnel(s) trouvé(s)</span>
          <span>Accès libre & direct</span>
        </div>

        {filteredPros.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 mt-4 space-y-2">
            <Filter className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="font-bold text-sm text-stone-800">Aucun profil ne correspond</h4>
            <p className="text-xs text-stone-500">
              Essayez de changer de commune ou de réinitialiser le filtre des métiers.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
                setVerifiedOnly(false);
              }}
              className="py-1.5 px-3 bg-[#0e3b27] text-white rounded-lg text-xs font-semibold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          filteredPros.map((pro) => {
            const whatsappUrl = `https://wa.me/${pro.whatsapp}?text=${encodeURIComponent(
              `Bonjour ${pro.name}, j'ai vu votre profil sur Jenga RDC pour des travaux de ${pro.trade}.`
            )}`;

            return (
              <div
                key={pro.id}
                className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#0e3b27] transition-all space-y-2.5"
              >
                <div
                  onClick={() => onSelectProfessional(pro)}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-stone-200 bg-stone-100"
                      referrerPolicy="no-referrer"
                    />
                    {pro.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full border border-white">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-stone-900 text-xs truncate">
                        {pro.name}
                      </h4>
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{pro.rating}</span>
                        <span className="text-[10px] text-stone-400 font-normal">
                          ({pro.reviewCount})
                        </span>
                      </div>
                    </div>

                    {pro.companyName && (
                      <span className="text-[11px] text-stone-500 block truncate">
                        {pro.companyName}
                      </span>
                    )}

                    <span className="text-[11px] text-[#c86432] font-semibold block truncate">
                      {pro.trade}
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{pro.city} · {pro.neighborhood}</span>
                    </div>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1">
                  {pro.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {pro.onclRegistered && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold flex items-center gap-0.5">
                      <Award className="w-2.5 h-2.5" />
                      Agréé Ordre
                    </span>
                  )}
                </div>

                {/* Rates & Actions */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    {pro.dailyRateUSD > 0 ? (
                      <div>
                        <span className="font-bold text-[#0e3b27] tabular-nums">
                          {pro.dailyRateUSD} $ / jour
                        </span>
                        <span className="text-[9px] text-stone-400 block tabular-nums">
                          ≈ {(pro.dailyRateUSD * USD_TO_CDF).toLocaleString()} CDF
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Devis gratuit
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${pro.phone}`}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800"
                      title="Appel direct"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366] text-white hover:brightness-110"
                      title="WhatsApp direct"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onSelectProfessional(pro)}
                      className="py-1.5 px-3 rounded-lg bg-[#0e3b27] hover:bg-[#0a291b] text-white text-xs font-bold shadow-xs"
                    >
                      Profil & Devis
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
