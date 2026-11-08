import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { DRC_CITIES_AND_NEIGHBORHOODS } from '../data/mockData';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  selectedNeighborhood: string;
  onSelectLocation: (city: string, neighborhood: string) => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  selectedNeighborhood,
  onSelectLocation
}) => {
  const [activeCity, setActiveCity] = useState(selectedCity);

  if (!isOpen) return null;

  const neighborhoods = DRC_CITIES_AND_NEIGHBORHOODS[activeCity] || ['Toutes les communes'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#0e3b27] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#c86432]" />
            <div>
              <h3 className="font-bold text-base">Localisation en RDC</h3>
              <p className="text-xs text-stone-200">Filtrer par ville et commune</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Segmented Selection */}
        <div className="p-3 bg-stone-100 border-b border-stone-200">
          <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
            Sélectionner la ville :
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {Object.keys(DRC_CITIES_AND_NEIGHBORHOODS).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  activeCity === city
                    ? 'bg-[#0e3b27] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Neighborhood / Commune List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <span className="text-xs font-medium text-stone-500 block mb-2">
            Communes à <span className="text-stone-900 font-semibold">{activeCity}</span> :
          </span>

          {neighborhoods.map((neighborhood) => {
            const isSelected = activeCity === selectedCity && neighborhood === selectedNeighborhood;
            return (
              <button
                key={neighborhood}
                onClick={() => {
                  onSelectLocation(activeCity, neighborhood);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors text-sm ${
                  isSelected
                    ? 'bg-[#0e3b27]/10 text-[#0e3b27] font-semibold border border-[#0e3b27]/30'
                    : 'hover:bg-stone-100 text-stone-800 border border-transparent'
                }`}
              >
                <span>{neighborhood}</span>
                {isSelected && <Check className="w-4 h-4 text-[#0e3b27]" />}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => {
              onSelectLocation(activeCity, 'Toutes les communes');
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#0e3b27] hover:bg-[#0a291b] transition-colors"
          >
            Appliquer à toute la ville de {activeCity}
          </button>
        </div>
      </div>
    </div>
  );
};
