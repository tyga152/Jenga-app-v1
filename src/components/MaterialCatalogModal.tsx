import React, { useState } from 'react';
import { X, Search, Store, MapPin, Phone, MessageCircle, ShoppingBag, TrendingUp, Check } from 'lucide-react';
import { MaterialItem } from '../types';
import { USD_TO_CDF } from '../data/mockData';

interface MaterialCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: MaterialItem[];
  onOrderMaterial: (material: MaterialItem) => void;
  onOpenSponsoredDepotModal?: () => void;
}

export const MaterialCatalogModal: React.FC<MaterialCatalogModalProps> = ({
  isOpen,
  onClose,
  materials,
  onOrderMaterial,
  onOpenSponsoredDepotModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['all', 'Ciment & Liants', 'Aciers & Fers', 'Carrelage & Finition', 'Électricité & Câblage', 'Toiture & Couverture'];

  const filteredMaterials = materials.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.supplierCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#c86432]" />
            <div>
              <h3 className="font-bold text-base">Dépôt & Baromètre des Matériaux</h3>
              <p className="text-xs text-stone-200">Prix directs chantiers en RDC (USD & CDF)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sponsored Depot CTA for suppliers */}
        {onOpenSponsoredDepotModal && (
          <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#c86432] text-white px-1.5 py-0.2 rounded">
                Dépôts BTP
              </span>
              <span className="text-stone-700 font-semibold truncate max-w-[200px]">
                Vous gérez un dépôt de matériaux ?
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenSponsoredDepotModal();
              }}
              className="py-1 px-2.5 bg-[#0e3b27] hover:bg-[#0a291b] text-white font-bold rounded-lg text-[10px] shadow-xs"
            >
              Devenir Dépôt Sponsorisé
            </button>
          </div>
        )}

        {/* Search & Categories */}
        <div className="p-3 bg-stone-100 border-b border-stone-200 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Rechercher ciment Lukala, fer Ø12, carrelage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0e3b27]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0e3b27] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {cat === 'all' ? 'Tous les matériaux' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Material Cards */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {filteredMaterials.map((mat) => {
            const whatsappUrl = `https://wa.me/${mat.supplierWhatsapp}?text=${encodeURIComponent(
              `Bonjour, je souhaite commander : ${mat.name} (${mat.priceUSD}$ / ${mat.unit}) avec livraison sur mon chantier.`
            )}`;

            return (
              <div
                key={mat.id}
                className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col gap-2.5"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#c86432] uppercase tracking-wider block">
                      {mat.category}
                    </span>
                    <h4 className="font-bold text-stone-900 text-xs leading-snug truncate">
                      {mat.name}
                    </h4>
                    <span className="text-[11px] text-stone-500 block">
                      Marque : {mat.brand}
                    </span>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-black text-sm text-[#0e3b27] tabular-nums">
                        {mat.priceUSD} $
                      </span>
                      <span className="text-[10px] text-stone-400">/ {mat.unit}</span>
                      <span className="text-[10px] text-stone-500 tabular-nums ml-auto">
                        ≈ {mat.priceCDF.toLocaleString()} CDF
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
                  <div className="flex items-center gap-1 truncate max-w-[190px]">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate">{mat.supplierCity} · {mat.supplierNeighborhood.split(' ')[0]}</span>
                  </div>
                  <span className="text-stone-500 text-[10px]">Min : {mat.minOrder}</span>
                </div>

                {/* Direct Action buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${mat.supplierPhone}`}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Appeler dépôt</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-1.5 px-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Taux indicatif : 1 $ = {USD_TO_CDF.toLocaleString()} CDF</span>
          <button
            onClick={onClose}
            className="py-1 px-3 bg-[#0e3b27] text-white text-xs font-semibold rounded-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
