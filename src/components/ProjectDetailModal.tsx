import React from 'react';
import { X, MapPin, Calendar, Clock, DollarSign, MessageCircle, Phone, FileCheck, CheckCircle2 } from 'lucide-react';
import { ProjectListing } from '../types';

interface ProjectDetailModalProps {
  project: ProjectListing | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuote: (project: ProjectListing) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onSubmitQuote
}) => {
  if (!isOpen || !project) return null;

  const whatsappUrl = `https://wa.me/${project.clientWhatsapp}?text=${encodeURIComponent(
    `Bonjour ${project.clientName}, j'ai vu votre chantier sur Jenga RDC : "${project.title}" à ${project.city}. Je souhaite vous proposer mes services.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header with image */}
        <div className="relative h-44 bg-stone-900 overflow-hidden shrink-0">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-75"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-[#0e3b27]"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/50 px-2 py-0.5 rounded">
                {project.tradeLabel}
              </span>
              {project.urgency === 'urgent' && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded">
                  Urgent
                </span>
              )}
            </div>
            <h3 className="font-extrabold text-base leading-snug drop-shadow-sm">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Client & Budget strip */}
        <div className="p-3.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <img
              src={project.clientAvatar}
              alt={project.clientName}
              className="w-8 h-8 rounded-full object-cover border border-stone-300"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-bold text-stone-900 block">{project.clientName}</span>
              <span className="text-[11px] text-stone-500">{project.clientRole}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-black text-sm text-[#0e3b27] block tabular-nums">
              {project.budgetUSD.toLocaleString()} $
            </span>
            <span className="text-[10px] text-stone-500 tabular-nums">
              ≈ {project.budgetCDF.toLocaleString()} CDF
            </span>
          </div>
        </div>

        {/* Body content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          {/* Metadata chips */}
          <div className="grid grid-cols-2 gap-2 text-stone-700">
            <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c86432] shrink-0" />
              <div>
                <span className="text-[10px] text-stone-400 block font-medium">Localisation</span>
                <span className="font-semibold text-stone-900 truncate block">
                  {project.city} · {project.neighborhood}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0e3b27] shrink-0" />
              <div>
                <span className="text-[10px] text-stone-400 block font-medium">Durée estimée</span>
                <span className="font-semibold text-stone-900">{project.estimatedDuration}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
              Description du besoin
            </h4>
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 leading-relaxed">
              {project.description}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
              Exigences & Conditions du chantier
            </h4>
            <div className="space-y-1.5">
              {project.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 bg-stone-50 rounded-lg text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0e3b27] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-200">
            <span>Publié : {project.datePosted}</span>
            <span className="font-semibold text-[#0e3b27]">{project.quotesCount} devis déjà reçus</span>
          </div>
        </div>

        {/* Contact & Submit Quote CTA */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex flex-col gap-2 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${project.clientPhone}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-bold border border-stone-300 shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#0e3b27]" />
              <span>Appeler le client</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <button
            onClick={() => onSubmitQuote(project)}
            className="w-full py-2.5 px-4 bg-[#0e3b27] hover:bg-[#0a291b] text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <FileCheck className="w-4 h-4" />
            <span>Soumettre un devis / Offre de prix</span>
          </button>
        </div>
      </div>
    </div>
  );
};
