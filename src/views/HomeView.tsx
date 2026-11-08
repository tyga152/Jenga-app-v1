import React from 'react';
import { 
  HardHat, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Store, 
  Plus, 
  CheckCircle,
  FileText,
  Clock,
  Layers,
  Zap
} from 'lucide-react';
import { ProfessionalProfile, ProjectListing, TradeCategory, UserRole } from '../types';
import { TRADE_CATEGORIES, USD_TO_CDF } from '../data/mockData';

interface HomeViewProps {
  currentCity: string;
  currentNeighborhood: string;
  professionals: ProfessionalProfile[];
  projects: ProjectListing[];
  onSelectCategory: (category: TradeCategory) => void;
  onSelectProfessional: (pro: ProfessionalProfile) => void;
  onSelectProject: (proj: ProjectListing) => void;
  onOpenCreateProject: () => void;
  onOpenMaterialsCatalog: () => void;
  onNavigateToTab: (tab: 'directory' | 'projects' | 'quotes' | 'messages') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentCity,
  currentNeighborhood,
  professionals,
  projects,
  onSelectCategory,
  onSelectProfessional,
  onSelectProject,
  onOpenCreateProject,
  onOpenMaterialsCatalog,
  onNavigateToTab
}) => {
  const featuredPros = professionals.slice(0, 4);
  const urgentProjects = projects.filter((p) => p.status === 'open').slice(0, 3);

  return (
    <div className="flex-1 overflow-y-auto bg-[#faf8f5] pb-6 space-y-5">
      {/* Hero Congolese Banner */}
      <div className="relative bg-[#0e3b27] text-white px-4 pt-5 pb-7 rounded-b-3xl shadow-md overflow-hidden">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#c86432_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-2 py-0.5 rounded-full">
              Écosystème BTP RDC · 100% Gratuit
            </span>
            <span className="text-[11px] text-stone-300">·</span>
            <span className="text-[11px] text-stone-200">{currentCity}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
            Construisez en toute confiance en République Démocratique du Congo
          </h1>

          <p className="text-xs text-stone-200 leading-relaxed max-w-md">
            Trouvez les meilleurs artisans maçons, électriciens, architectes agréés et dépôts de matériaux près de vos parcelles.
          </p>

          {/* Quick Action Pill Bar */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={onOpenCreateProject}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#c86432] hover:bg-[#b35222] text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Publier un besoin</span>
            </button>
            <button
              onClick={() => onNavigateToTab('directory')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold backdrop-blur-xs transition-colors border border-white/20"
            >
              <Search className="w-4 h-4" />
              <span>Trouver un pro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Baromètre Prix des Matériaux Express */}
      <div className="px-4">
        <div
          onClick={onOpenMaterialsCatalog}
          className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#0e3b27] transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e3b27]/10 flex items-center justify-center text-[#0e3b27] shrink-0">
              <Store className="w-5 h-5 text-[#0e3b27]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#c86432] uppercase tracking-wider">
                  Baromètre des Prix Matériaux
                </span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                  En direct
                </span>
              </div>
              <h4 className="font-bold text-xs text-stone-900 leading-tight">
                Ciment Lukala : 10.50 $ · Fer Ø12 : 13.80 $
              </h4>
              <span className="text-[11px] text-stone-500">
                Consulter les tarifs des dépôts de {currentCity}
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
        </div>
      </div>

      {/* Trade Category Quick Grid */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-bold text-sm text-stone-900 tracking-tight">
            Corps d’état & Métiers
          </h3>
          <button
            onClick={() => onNavigateToTab('directory')}
            className="text-xs font-semibold text-[#0e3b27] hover:text-[#0a291b] flex items-center gap-0.5"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {TRADE_CATEGORIES.filter((t) => t.id !== 'all').slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id as TradeCategory);
                onNavigateToTab('directory');
              }}
              className="p-2.5 bg-white hover:bg-[#0e3b27]/5 border border-stone-200 hover:border-[#0e3b27]/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0e3b27]/10 text-[#0e3b27] flex items-center justify-center">
                <HardHat className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-stone-800 leading-tight line-clamp-2">
                {cat.label.split('&')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Verified Professionals */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="font-bold text-sm text-stone-900 tracking-tight">
              Professionnels Recommandés
            </h3>
            <span className="text-[11px] text-stone-500">
              Vérifiés à {currentCity} et alentours
            </span>
          </div>
          <button
            onClick={() => onNavigateToTab('directory')}
            className="text-xs font-semibold text-[#0e3b27] hover:text-[#0a291b]"
          >
            Tous les pros
          </button>
        </div>

        <div className="space-y-3">
          {featuredPros.map((pro) => {
            const whatsappUrl = `https://wa.me/${pro.whatsapp}?text=${encodeURIComponent(
              `Bonjour ${pro.name}, j'ai vu votre profil sur Jenga RDC pour ${pro.trade}.`
            )}`;

            return (
              <div
                key={pro.id}
                className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-2.5"
              >
                <div
                  onClick={() => onSelectProfessional(pro)}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 bg-stone-100"
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
                      </div>
                    </div>

                    <span className="text-[11px] text-[#c86432] font-semibold block truncate">
                      {pro.trade}
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{pro.city} · {pro.neighborhood.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Rates & Direct Action row */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    {pro.dailyRateUSD > 0 ? (
                      <div>
                        <span className="text-xs font-bold text-[#0e3b27] tabular-nums">
                          {pro.dailyRateUSD} $ / jour
                        </span>
                        <span className="text-[10px] text-stone-400 block tabular-nums">
                          ≈ {(pro.dailyRateUSD * USD_TO_CDF).toLocaleString()} CDF
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Sur devis
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
                      Voir profil
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Urgent Projects & Tenders */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="font-bold text-sm text-stone-900 tracking-tight">
              Chantiers & Demandes Récentes
            </h3>
            <span className="text-[11px] text-stone-500">
              Appels d'offres ouverts aux artisans et entreprises
            </span>
          </div>
          <button
            onClick={() => onNavigateToTab('projects')}
            className="text-xs font-semibold text-[#0e3b27] hover:text-[#0a291b]"
          >
            Tous les chantiers
          </button>
        </div>

        <div className="space-y-3">
          {urgentProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#0e3b27] transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c86432]">
                    {proj.tradeLabel}
                  </span>
                  <h4 className="font-bold text-stone-900 text-xs leading-snug">
                    {proj.title}
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-black text-xs text-[#0e3b27] block tabular-nums">
                    {proj.budgetUSD.toLocaleString()} $
                  </span>
                  <span className="text-[9px] text-stone-400 tabular-nums">
                    ≈ {proj.budgetCDF.toLocaleString()} CDF
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{proj.city} · {proj.neighborhood.split(' ')[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{proj.quotesCount} devis</span>
                  <span className="text-[#0e3b27] font-bold">Consulter</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Local Economy Section */}
      <div className="px-4">
        <div className="p-4 bg-[#f4eee3] rounded-2xl border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
            <ShieldCheck className="w-4 h-4 text-[#0e3b27]" />
            <span>Pourquoi choisir Jenga en RDC ?</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-700">
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#0e3b27] shrink-0 mt-0.5" />
              <span>Contrôle des agréments (ONAR, ONIC, INPP)</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#0e3b27] shrink-0 mt-0.5" />
              <span>Lien direct WhatsApp & numéro de téléphone</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#0e3b27] shrink-0 mt-0.5" />
              <span>Devis comparables et négociation transparente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
