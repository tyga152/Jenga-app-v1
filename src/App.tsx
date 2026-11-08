import React, { useState, useEffect } from 'react';
import { AndroidFrame } from './components/AndroidFrame';
import { TopBar } from './components/TopBar';
import { BottomNav, TabType } from './components/BottomNav';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CreateProjectModal } from './components/CreateProjectModal';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { QuoteNegotiationModal } from './components/QuoteNegotiationModal';
import { MaterialCatalogModal } from './components/MaterialCatalogModal';
import { ChatView } from './components/ChatView';
import { ToastNotification, ToastData } from './components/ToastNotification';
import { EscrowPaymentModal } from './components/EscrowPaymentModal';
import { VerifiedBadgeModal } from './components/VerifiedBadgeModal';
import { SponsoredDepotModal } from './components/SponsoredDepotModal';

import { HomeView } from './views/HomeView';
import { DirectoryView } from './views/DirectoryView';
import { ProjectsView } from './views/ProjectsView';
import { QuotesView } from './views/QuotesView';
import { MessagesView } from './views/MessagesView';
import { ProfileSettingsView } from './views/ProfileSettingsView';

import { 
  UserRole, 
  TradeCategory, 
  ProfessionalProfile, 
  ProjectListing, 
  QuoteRequest, 
  MaterialItem, 
  Conversation,
  EscrowContract,
  MobileMoneyProvider
} from './types';

import { 
  INITIAL_PROFILES, 
  INITIAL_PROJECTS, 
  INITIAL_QUOTES, 
  INITIAL_MATERIALS, 
  INITIAL_CONVERSATIONS, 
  CURRENT_USER_OPTIONS, 
  USD_TO_CDF 
} from './data/mockData';

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<TabType | 'profile'>('home');
  const [currentCity, setCurrentCity] = useState<string>('Kinshasa');
  const [currentNeighborhood, setCurrentNeighborhood] = useState<string>('Ngaliema (Macampagne, Binza)');
  const [activeRole, setActiveRole] = useState<UserRole>('client');
  const [selectedCategory, setSelectedCategory] = useState<TradeCategory>('all');

  // Data lists
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>(INITIAL_PROFILES);
  const [projects, setProjects] = useState<ProjectListing[]>(INITIAL_PROJECTS);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);

  // Active items for detailed modals
  const [selectedProfile, setSelectedProfile] = useState<ProfessionalProfile | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectListing | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  // Modals visibility
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isQuoteRequestOpen, setIsQuoteRequestOpen] = useState(false);
  const [isQuoteNegotiationOpen, setIsQuoteNegotiationOpen] = useState(false);
  const [isMaterialsModalOpen, setIsMaterialsModalOpen] = useState(false);

  // Monetization Modals & State
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [isVerifiedBadgeModalOpen, setIsVerifiedBadgeModalOpen] = useState(false);
  const [isSponsoredDepotModalOpen, setIsSponsoredDepotModalOpen] = useState(false);
  const [activeEscrowQuote, setActiveEscrowQuote] = useState<QuoteRequest | null>(null);
  const [escrowContracts, setEscrowContracts] = useState<EscrowContract[]>([]);

  // Active Toast Feedback
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);

  // Quote targets for creation/negotiation
  const [targetQuotePro, setTargetQuotePro] = useState<ProfessionalProfile | null>(null);
  const [targetQuoteProject, setTargetQuoteProject] = useState<ProjectListing | null>(null);
  const [negotiatingQuote, setNegotiatingQuote] = useState<QuoteRequest | null>(null);

  const currentUser = CURRENT_USER_OPTIONS[activeRole];

  // Calculated unread & pending counts
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const pendingQuotesCount = quotes.filter((q) => q.status === 'submitted' || q.status === 'counter_offered').length;

  // Handlers
  const handleSelectLocation = (city: string, neighborhood: string) => {
    setCurrentCity(city);
    setCurrentNeighborhood(neighborhood);
  };

  const handleAddProject = (newProject: ProjectListing) => {
    setProjects([newProject, ...projects]);
    setActiveTab('projects');
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Chantier publié avec succès !',
      message: `Votre demande de travaux "${newProject.title.slice(0, 42)}..." est visible par les artisans et entreprises de ${newProject.city}.`,
      type: 'project'
    });
  };

  const handleOpenRequestQuote = (pro: ProfessionalProfile) => {
    setTargetQuotePro(pro);
    setTargetQuoteProject(null);
    setSelectedProfile(null);
    setIsQuoteRequestOpen(true);
  };

  const handleOpenSubmitProjectQuote = (proj: ProjectListing) => {
    setTargetQuoteProject(proj);
    setTargetQuotePro(null);
    setSelectedProject(null);
    setIsQuoteRequestOpen(true);
  };

  const handleSaveQuote = (newQuote: QuoteRequest) => {
    setQuotes([newQuote, ...quotes]);
    setActiveTab('quotes');
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Devis soumis avec succès !',
      message: `Votre offre chiffrée (${newQuote.quoteAmountUSD.toLocaleString()} $) a été transmise avec la décomposition complète des postes.`,
      type: 'quote'
    });
  };

  const handleOpenNegotiation = (quote: QuoteRequest) => {
    setNegotiatingQuote(quote);
    setIsQuoteNegotiationOpen(true);
  };

  const handleAcceptQuote = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'accepted' } : q))
    );
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Offre de devis acceptée !',
      message: 'L’accord a été enregistré. Vous pouvez convenir de la date de démarrage avec le prestataire par WhatsApp.',
      type: 'success'
    });
  };

  const handleDeclineQuote = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'declined' } : q))
    );
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Devis décliné',
      message: 'Le prestataire a été informé de votre décision.',
      type: 'success'
    });
  };

  const handleCounterOffer = (quoteId: string, amountUSD: number, note: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              status: 'counter_offered',
              counterOfferUSD: amountUSD,
              counterOfferCDF: amountUSD * USD_TO_CDF,
              counterOfferNote: note,
              updatedAt: 'À l’instant'
            }
          : q
      )
    );
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Contre-proposition transmise !',
      message: `Votre proposition révisée à ${amountUSD.toLocaleString()} $ a été notifiée au professionnel.`,
      type: 'quote'
    });
  };

  const handleOpenEscrowForQuote = (quote: QuoteRequest) => {
    setActiveEscrowQuote(quote);
    setIsEscrowModalOpen(true);
  };

  const handleConfirmEscrow = (contract: EscrowContract) => {
    setEscrowContracts([contract, ...escrowContracts]);
    setQuotes((prev) =>
      prev.map((q) => (q.id === contract.quoteId ? { ...q, status: 'accepted' } : q))
    );
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Séquestre Mobile Money consigné !',
      message: `Jalon 1 (${contract.milestones[0].amountUSD} $) consigné via ${contract.provider.toUpperCase()}. Vos fonds sont en sécurité.`,
      type: 'quote'
    });
  };

  const handleReleaseMilestone = (contractId: string, milestoneId: string) => {
    setEscrowContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const updatedMilestones = c.milestones.map((m) =>
          m.id === milestoneId ? { ...m, status: 'released_to_pro' as const, releasedAt: 'À l’instant' } : m
        );
        return { ...c, milestones: updatedMilestones };
      })
    );
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Paiement du jalon décaissé !',
      message: 'Les fonds ont été transférés instantanément sur le compte Mobile Money du professionnel.',
      type: 'success'
    });
  };

  const handleApplyVerification = (details: { address: string; commune: string; city: string; inspectionDate: string }) => {
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Inspection physique programmée !',
      message: `Visite d'audit de votre bureau confirmée le ${details.inspectionDate} à ${details.commune}.`,
      type: 'success'
    });
  };

  const handleSubscribeSponsoredDepot = (details: { depotName: string; city: string; phone: string; provider: MobileMoneyProvider }) => {
    setMaterials((prev) =>
      prev.map((m) =>
        m.supplierCity.toLowerCase() === details.city.toLowerCase()
          ? { ...m, featured: true }
          : m
      )
    );
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: 'Dépôt Sponsorisé Activé !',
      message: `${details.depotName} est maintenant épinglé en tête du baromètre des matériaux à ${details.city}.`,
      type: 'project'
    });
  };

  const handleStartChatWithPro = (pro: ProfessionalProfile) => {
    setSelectedProfile(null);
    let existingConv = conversations.find((c) => c.participantId === pro.id);
    if (!existingConv) {
      existingConv = {
        id: `conv-${Date.now()}`,
        participantId: pro.id,
        participantName: pro.name,
        participantRole: pro.trade,
        participantAvatar: pro.avatar,
        participantPhone: pro.phone,
        participantWhatsapp: pro.whatsapp,
        lastMessage: 'Début de votre conversation sur Jenga RDC',
        lastMessageTime: 'À l’instant',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: 'client-lukusa',
            senderName: currentUser.name,
            text: `Bonjour ${pro.name}, je vous contacte concernant mes travaux de construction à ${currentCity}.`,
            timestamp: 'À l’instant',
            isMe: true
          }
        ]
      };
      setConversations([existingConv, ...conversations]);
    }
    setActiveConversation(existingConv);
    setActiveTab('messages');
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== conversationId) return conv;

        const updatedMessages = [
          ...conv.messages,
          {
            id: `msg-${Date.now()}`,
            senderId: 'me',
            senderName: currentUser.name,
            text,
            timestamp: timeString,
            isMe: true
          }
        ];

        return {
          ...conv,
          lastMessage: text,
          lastMessageTime: timeString,
          messages: updatedMessages
        };
      })
    );

    // Auto-simulation reply after 1 second for engaging Congolese feel
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== conversationId) return conv;

          const replies = [
            'Mbote ! Bien reçu papa, je consulte les plans et vous reviens très vite.',
            'C’est noté avec précision. Mon équipe est disponible pour passer faire la visite du terrain demain.',
            'Parfait ! Je vous ai aussi envoyé un message vocal sur WhatsApp pour confirmer l’adresse exacte.',
            'Très bien, nous pouvons ajuster le calendrier de livraison dès confirmation du premier acompte.'
          ];
          const randomReply = replies[Math.floor(Math.random() * replies.length)];

          const updatedMessages = [
            ...conv.messages,
            {
              id: `msg-${Date.now() + 1}`,
              senderId: conv.participantId,
              senderName: conv.participantName,
              text: randomReply,
              timestamp: 'À l’instant',
              isMe: false
            }
          ];

          return {
            ...conv,
            lastMessage: randomReply,
            lastMessageTime: 'À l’instant',
            messages: updatedMessages
          };
        })
      );
    }, 1200);
  };

  return (
    <AndroidFrame activeRoleTitle={currentUser.roleTitle}>
      {/* Top App Bar */}
      <TopBar
        currentCity={currentCity}
        currentNeighborhood={currentNeighborhood}
        activeRole={activeRole}
        userDisplayName={currentUser.name}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Floating Success Toast Feedback */}
      <ToastNotification toast={activeToast} onDismiss={() => setActiveToast(null)} />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {activeTab === 'home' && (
          <HomeView
            currentCity={currentCity}
            currentNeighborhood={currentNeighborhood}
            professionals={professionals}
            projects={projects}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSelectProfessional={(pro) => setSelectedProfile(pro)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenCreateProject={() => setIsCreateProjectOpen(true)}
            onOpenMaterialsCatalog={() => setIsMaterialsModalOpen(true)}
            onNavigateToTab={(tab) => {
              setActiveConversation(null);
              setActiveTab(tab);
            }}
          />
        )}

        {activeTab === 'directory' && (
          <DirectoryView
            currentCity={currentCity}
            currentNeighborhood={currentNeighborhood}
            professionals={professionals}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSelectProfessional={(pro) => setSelectedProfile(pro)}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            currentCity={currentCity}
            currentNeighborhood={currentNeighborhood}
            projects={projects}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenCreateProject={() => setIsCreateProjectOpen(true)}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesView
            quotes={quotes}
            onOpenNegotiation={handleOpenNegotiation}
            onAcceptQuote={handleAcceptQuote}
            onOpenEscrowModal={handleOpenEscrowForQuote}
            onOpenChat={(proId, proName) => {
              const matched = conversations.find((c) => c.participantId === proId) || conversations[0];
              setActiveConversation(matched);
              setActiveTab('messages');
            }}
          />
        )}

        {activeTab === 'messages' && (
          activeConversation ? (
            <ChatView
              conversation={activeConversation}
              onBack={() => setActiveConversation(null)}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <MessagesView
              conversations={conversations}
              onSelectConversation={(conv) => setActiveConversation(conv)}
            />
          )
        )}

        {activeTab === 'profile' && (
          <ProfileSettingsView
            currentUser={currentUser}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onOpenVerifiedBadge={() => setIsVerifiedBadgeModalOpen(true)}
            onOpenSponsoredDepot={() => setIsSponsoredDepotModalOpen(true)}
            onOpenEscrow={() => handleOpenEscrowForQuote(quotes[0])}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab === 'profile' ? 'home' : activeTab}
        onSelectTab={(tab) => {
          setActiveConversation(null);
          setActiveTab(tab);
        }}
        unreadMessagesCount={unreadMessagesCount}
        pendingQuotesCount={pendingQuotesCount}
      />

      {/* Modals & Dialogs */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedCity={currentCity}
        selectedNeighborhood={currentNeighborhood}
        onSelectLocation={handleSelectLocation}
      />

      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        activeRole={activeRole}
        onSelectRole={(role) => setActiveRole(role)}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartAsRole={(role) => setActiveRole(role)}
      />

      <ProfileDetailModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onRequestQuote={handleOpenRequestQuote}
        onSendMessage={handleStartChatWithPro}
      />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onSubmitQuote={handleOpenSubmitProjectQuote}
      />

      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onAddProject={handleAddProject}
        currentUser={currentUser}
      />

      <QuoteRequestModal
        isOpen={isQuoteRequestOpen}
        onClose={() => setIsQuoteRequestOpen(false)}
        targetProfile={targetQuotePro}
        targetProject={targetQuoteProject}
        onSaveQuote={handleSaveQuote}
        currentUser={currentUser}
      />

      <QuoteNegotiationModal
        quote={negotiatingQuote}
        isOpen={isQuoteNegotiationOpen}
        onClose={() => setIsQuoteNegotiationOpen(false)}
        onAccept={handleAcceptQuote}
        onDecline={handleDeclineQuote}
        onCounterOffer={handleCounterOffer}
        onOpenEscrowModal={handleOpenEscrowForQuote}
        onOpenChat={(proId, proName) => {
          const matched = conversations.find((c) => c.participantId === proId) || conversations[0];
          setIsQuoteNegotiationOpen(false);
          setActiveConversation(matched);
          setActiveTab('messages');
        }}
      />

      <MaterialCatalogModal
        isOpen={isMaterialsModalOpen}
        onClose={() => setIsMaterialsModalOpen(false)}
        materials={materials}
        onOrderMaterial={(mat) => {
          setIsMaterialsModalOpen(false);
        }}
        onOpenSponsoredDepotModal={() => setIsSponsoredDepotModalOpen(true)}
      />

      {/* Monetization Pillar 1: Escrow Mobile Money Modal */}
      <EscrowPaymentModal
        quote={activeEscrowQuote || quotes[0]}
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
        onConfirmEscrow={handleConfirmEscrow}
        existingContract={
          activeEscrowQuote
            ? escrowContracts.find((c) => c.quoteId === activeEscrowQuote.id) || null
            : escrowContracts[0] || null
        }
        onReleaseMilestone={handleReleaseMilestone}
      />

      {/* Monetization Pillar 2: Physical Verification Badge Modal */}
      <VerifiedBadgeModal
        isOpen={isVerifiedBadgeModalOpen}
        onClose={() => setIsVerifiedBadgeModalOpen(false)}
        onApplyForVerification={handleApplyVerification}
      />

      {/* Monetization Pillar 3: Sponsored Depot Modal */}
      <SponsoredDepotModal
        isOpen={isSponsoredDepotModalOpen}
        onClose={() => setIsSponsoredDepotModalOpen(false)}
        onSubscribe={handleSubscribeSponsoredDepot}
      />
    </AndroidFrame>
  );
}
