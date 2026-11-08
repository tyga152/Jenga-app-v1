export type UserRole = 
  | 'client'              // Propriétaire / Particulier / Investisseur
  | 'artisan'             // Artisan & Technicien (Maçon, Électricien, Plombier, Menuisier, Carreleur)
  | 'architect_engineer'  // Architecte & Ingénieur Structure/Génie Civil
  | 'contractor'          // Entrepreneur Général BTP & Entreprise de construction
  | 'supplier';           // Fournisseur de matériaux (Ciment, Fer, Gravier, Finition)

export type TradeCategory = 
  | 'all'
  | 'masonry'             // Maçonnerie & Gros Œuvre
  | 'architecture'        // Architecture & Conception 3D
  | 'engineering'         // Ingénierie civile & Études de sol
  | 'electrical'          // Électricité & Énergie Solaire
  | 'plumbing'            // Plomberie & Assainissement
  | 'carpentry'           // Menuiserie Bois & Aluminium
  | 'painting_finishing'  // Peinture & Décoration
  | 'tiling'              // Carrelage & Revêtement
  | 'roofing'             // Toiture & Étanchéité
  | 'general_contractor'  // Entreprise BTP clé en main
  | 'materials_supplier'; // Fournisseur de matériaux

export interface ProfessionalProfile {
  id: string;
  name: string;
  companyName?: string;
  role: UserRole;
  trade: string;
  tradeCategory: TradeCategory;
  city: string;
  neighborhood: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  verified: boolean;
  onclRegistered?: boolean; // Ordre National des Architectes / Ingénieurs RDC
  rating: number;
  reviewCount: number;
  completedProjectsCount: number;
  yearsOfExperience: number;
  dailyRateUSD: number;
  dailyRateCDF: number;
  skills: string[];
  certifications: string[];
  portfolio: {
    title: string;
    description: string;
    image: string;
    location: string;
    year: string;
  }[];
  reviews: {
    id: string;
    authorName: string;
    authorRole: string;
    rating: number;
    comment: string;
    date: string;
    projectName: string;
  }[];
  available: boolean;
  badgeTier: 'free' | 'verified_pro' | 'featured_partner';
}

export interface ProjectListing {
  id: string;
  title: string;
  clientName: string;
  clientRole: string;
  clientPhone: string;
  clientWhatsapp: string;
  clientAvatar: string;
  category: TradeCategory;
  tradeLabel: string;
  city: string;
  neighborhood: string;
  budgetUSD: number;
  budgetCDF: number;
  status: 'open' | 'in_negotiation' | 'assigned' | 'completed';
  datePosted: string;
  quotesCount: number;
  estimatedDuration: string;
  description: string;
  requirements: string[];
  image?: string;
  urgency: 'normal' | 'urgent' | 'planned';
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unit: string;
  unitPriceUSD: number;
}

export interface QuoteRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  professionalTrade: string;
  clientId: string;
  clientName: string;
  quoteAmountUSD: number;
  quoteAmountCDF: number;
  durationDays: number;
  message: string;
  items: QuoteItem[];
  status: 'submitted' | 'under_review' | 'counter_offered' | 'accepted' | 'declined';
  counterOfferUSD?: number;
  counterOfferCDF?: number;
  counterOfferNote?: string;
  createdAt: string;
  updatedAt: string;
  includesMaterials: boolean;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  priceUSD: number;
  priceCDF: number;
  unit: string;
  stockStatus: 'in_stock' | 'limited' | 'bulk_order';
  supplierId: string;
  supplierName: string;
  supplierCity: string;
  supplierNeighborhood: string;
  supplierWhatsapp: string;
  supplierPhone: string;
  image: string;
  minOrder: string;
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  attachmentType?: 'quote' | 'image' | 'contact';
  attachmentData?: any;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  participantPhone: string;
  participantWhatsapp: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export type MobileMoneyProvider = 'mpesa' | 'orange' | 'airtel';

export interface EscrowMilestone {
  id: string;
  title: string;
  percentage: number;
  amountUSD: number;
  amountCDF: number;
  status: 'pending_deposit' | 'held_in_escrow' | 'work_completed_pending_review' | 'released_to_pro';
  description: string;
  releasedAt?: string;
}

export interface EscrowContract {
  id: string;
  quoteId: string;
  projectTitle: string;
  clientName: string;
  clientPhone: string;
  professionalName: string;
  professionalPhone: string;
  totalAmountUSD: number;
  totalAmountCDF: number;
  provider: MobileMoneyProvider;
  providerAccountNumber: string;
  milestones: EscrowMilestone[];
  status: 'active' | 'completed' | 'disputed';
  createdAt: string;
}

export interface PhysicalVerificationRequest {
  id: string;
  applicantName: string;
  trade: string;
  companyName?: string;
  city: string;
  neighborhood: string;
  workshopAddress: string;
  scheduledInspectionDate: string;
  status: 'pending_payment' | 'scheduled' | 'audited_approved';
  auditFeeUSD: number;
  inspectorName?: string;
}

export interface SponsoredDepotSubscription {
  id: string;
  depotName: string;
  city: string;
  plan: 'starter_free' | 'sponsored_pro';
  monthlyUSD: number;
  priorityRank: number;
  activeUntil: string;
  featuredItemsCount: number;
}

