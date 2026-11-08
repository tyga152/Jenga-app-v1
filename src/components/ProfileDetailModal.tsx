import React, { useState } from 'react';
import { X, MapPin, Phone, MessageCircle, Star, ShieldCheck, Award, Briefcase, Calendar, Check, Send } from 'lucide-react';
import { ProfessionalProfile } from '../types';
import { USD_TO_CDF } from '../data/mockData';

interface ProfileDetailModalProps {
  profile: ProfessionalProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (profile: ProfessionalProfile) => void;
  onSendMessage: (profile: ProfessionalProfile) => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  isOpen,
  onClose,
  onRequestQuote,
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>('about');

  if (!isOpen || !profile) return null;

  const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    `Bonjour ${profile.name}, j'ai vu votre profil sur Jenga RDC pour des travaux de ${profile.trade} à ${profile.city}. Pourrions-nous échanger ?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Profile Hero Header */}
        <div className="relative h-44 bg-[#0e3b27] overflow-hidden shrink-0">
          {profile.coverImage ? (
            <img
              src={profile.coverImage}
              alt={profile.name}
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#0e3b27] to-[#145237]"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Quick Info Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md bg-stone-800"
                  referrerPolicy="no-referrer"
                />
                {profile.verified && (
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full border border-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="text-white">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base leading-tight drop-shadow-sm">{profile.name}</h3>
                </div>
                {profile.companyName && (
                  <span className="text-xs text-stone-200 block truncate max-w-[220px]">
                    {profile.companyName}
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs text-amber-300 mt-0.5">
                  <div className="flex items-center gap-0.5 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{profile.rating}</span>
                  </div>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-200">({profile.reviewCount} avis vérifiés)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subheader info strip */}
        <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs text-stone-700">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c86432] shrink-0" />
            <span className="font-semibold text-stone-900">{profile.city}</span>
            <span>·</span>
            <span className="text-stone-600 truncate max-w-[140px]">{profile.neighborhood}</span>
          </div>
          {profile.dailyRateUSD > 0 ? (
            <div className="text-right">
              <span className="font-bold text-[#0e3b27] text-xs">
                {profile.dailyRateUSD} $ <span className="text-[10px] font-normal text-stone-500">/ jour</span>
              </span>
              <span className="block text-[10px] text-stone-500 tabular-nums">
                ≈ {(profile.dailyRateUSD * USD_TO_CDF).toLocaleString()} CDF
              </span>
            </div>
          ) : (
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Tarif sur devis
            </span>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-white px-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'about'
                ? 'border-[#0e3b27] text-[#0e3b27]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Présentation
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'portfolio'
                ? 'border-[#0e3b27] text-[#0e3b27]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Réalisations ({profile.portfolio.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#0e3b27] text-[#0e3b27]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Avis ({profile.reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'about' && (
            <div className="space-y-4">
              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {profile.onclRegistered && (
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inscrit à l’Ordre National (RDC)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  <Briefcase className="w-3.5 h-3.5 text-[#0e3b27]" />
                  <span>{profile.completedProjectsCount} chantiers menés à terme</span>
                </div>
                <div className="flex items-center gap-1.5 bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-[#c86432]" />
                  <span>{profile.yearsOfExperience} ans d’expérience</span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                  À propos du professionnel
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                  {profile.bio}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                  Spécialités & Compétences
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg border border-stone-200 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {profile.certifications.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                    Diplômes & Certifications
                  </h4>
                  <div className="space-y-1.5">
                    {profile.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#0e3b27]" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-3">
              {profile.portfolio.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-36 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-stone-900">{item.title}</span>
                      <span className="text-[11px] text-stone-500">{item.year}</span>
                    </div>
                    <p className="text-xs text-stone-600 mb-2">{item.description}</p>
                    <span className="text-[11px] text-[#c86432] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-2.5">
              {profile.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 bg-white rounded-xl border border-stone-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900">{rev.authorName}</span>
                      <span className="text-stone-400 text-[10px] ml-1.5">({rev.authorRole})</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-stone-700 italic">"{rev.comment}"</p>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                    <span>Chantier : {rev.projectName}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls / WhatsApp & Quote Bar */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex flex-col gap-2 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-bold border border-stone-300 shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4 text-[#0e3b27]" />
              <span>Appeler ({profile.phone.slice(-4)})</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSendMessage(profile)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Chat interne</span>
            </button>
            <button
              onClick={() => onRequestQuote(profile)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0e3b27] hover:bg-[#0a291b] text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              <span>Demander un devis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
