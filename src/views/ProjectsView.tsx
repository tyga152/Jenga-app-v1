import React, { useState } from 'react';
import { HardHat, Plus, MapPin, Clock, DollarSign, Filter, Search } from 'lucide-react';
import { ProjectListing, TradeCategory } from '../types';
import { TRADE_CATEGORIES, USD_TO_CDF } from '../data/mockData';

interface ProjectsViewProps {
  currentCity: string;
  currentNeighborhood: string;
  projects: ProjectListing[];
  onSelectProject: (project: ProjectListing) => void;
  onOpenCreateProject: () => void;
  onOpenLocationModal: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  currentCity,
  currentNeighborhood,
  projects,
  onSelectProject,
  onOpenCreateProject,
  onOpenLocationModal
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'in_negotiation'>('all');
  const [categoryFilter, setCategoryFilter] = useState<TradeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesCity = !currentCity || p.city.toLowerCase() === currentCity.toLowerCase();
    const matchesNeighborhood =
      !currentNeighborhood ||
      currentNeighborhood === 'Toutes les communes' ||
      p.neighborhood.toLowerCase().includes(currentNeighborhood.split(' ')[0].toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tradeLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);

    return matchesCity && matchesNeighborhood && matchesStatus && matchesCategory && matchesQuery;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#faf8f5] overflow-hidden relative">
      {/* Header & Controls */}
      <div className="p-3 bg-white border-b border-stone-200 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-sm text-stone-900 tracking-tight">
              Chantiers & Demandes de Travaux
            </h2>
            <span className="text-[11px] text-stone-500">
              Appels d'offres et besoins à {currentCity}
            </span>
          </div>
          <button
            onClick={onOpenCreateProject}
            className="flex items-center gap-1.5 py-2 px-3 bg-[#c86432] hover:bg-[#b35222] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Publier</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Rechercher par mot-clé (villa, solaire, carrelage...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0e3b27]"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
              statusFilter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tous ({projects.length})
          </button>
          <button
            onClick={() => setStatusFilter('open')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
              statusFilter === 'open'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Ouverts
          </button>
          <button
            onClick={() => setStatusFilter('in_negotiation')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center ${
              statusFilter === 'in_negotiation'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            En négociation
          </button>
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {TRADE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as TradeCategory)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                categoryFilter === cat.id
                  ? 'bg-[#0e3b27] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 mt-4 space-y-2">
            <HardHat className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="font-bold text-sm text-stone-800">Aucun chantier trouvé</h4>
            <p className="text-xs text-stone-500">
              Soyez le premier à publier une demande de travaux dans cette zone !
            </p>
            <button
              onClick={onOpenCreateProject}
              className="py-2 px-4 bg-[#0e3b27] text-white rounded-xl text-xs font-bold"
            >
              Publier un chantier gratuitement
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#0e3b27] transition-all cursor-pointer space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c86432]">
                      {project.tradeLabel}
                    </span>
                    {project.urgency === 'urgent' && (
                      <span className="text-[9px] font-bold uppercase bg-red-100 text-red-700 px-1.5 py-0.2 rounded">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-stone-900 text-xs leading-snug">
                    {project.title}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-sm text-[#0e3b27] block tabular-nums">
                    {project.budgetUSD.toLocaleString()} $
                  </span>
                  <span className="text-[9px] text-stone-400 tabular-nums">
                    ≈ {project.budgetCDF.toLocaleString()} CDF
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5 truncate max-w-[190px]">
                  <MapPin className="w-3.5 h-3.5 text-[#c86432] shrink-0" />
                  <span className="truncate">{project.city} · {project.neighborhood}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-stone-400">·</span>
                  <span className="font-semibold text-stone-700">{project.quotesCount} devis</span>
                  <span className="text-[#0e3b27] font-bold">Détails →</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
