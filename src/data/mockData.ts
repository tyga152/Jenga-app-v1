import { ProfessionalProfile, ProjectListing, QuoteRequest, MaterialItem, Conversation, UserRole } from '../types';

export const USD_TO_CDF = 2800;

export const DRC_CITIES_AND_NEIGHBORHOODS: Record<string, string[]> = {
  'Kinshasa': [
    'Toutes les communes',
    'Gombe',
    'Ngaliema (Macampagne, Binza)',
    'Limete (Industriel & Résidentiel)',
    'Bandalungwa',
    'Kintambo',
    'Barumbu',
    'Mont-Ngafula',
    'Lemba',
    'Kalamu (Matonge)',
    'Kasa-Vubu',
    'Masina'
  ],
  'Lubumbashi': [
    'Toutes les communes',
    'Golf (Météo, Plateau)',
    'Lubumbashi-Centre',
    'Kenya',
    'Kamalondo',
    'Kampemba',
    'Ruashi'
  ],
  'Goma': [
    'Toutes les communes',
    'Goma Centre',
    'Himbi',
    'Kyeshero',
    'Karisimbi',
    'Katindo'
  ],
  'Kolwezi': [
    'Toutes les communes',
    'Dilala',
    'Manika'
  ],
  'Matadi': [
    'Toutes les communes',
    'Matadi Centre',
    'Mvuzi',
    'Nzanza'
  ]
};

export const TRADE_CATEGORIES = [
  { id: 'all', label: 'Tous les corps d’état' },
  { id: 'masonry', label: 'Maçonnerie & Gros Œuvre' },
  { id: 'architecture', label: 'Architecture & Plans 3D' },
  { id: 'engineering', label: 'Génie Civil & Structure' },
  { id: 'electrical', label: 'Électricité & Solaire' },
  { id: 'plumbing', label: 'Plomberie & Assainissement' },
  { id: 'carpentry', label: 'Menuiserie Bois & Alu' },
  { id: 'painting_finishing', label: 'Peinture & Décoration' },
  { id: 'tiling', label: 'Carrelage & Revêtement' },
  { id: 'roofing', label: 'Charpente & Toiture' },
  { id: 'general_contractor', label: 'Entreprises BTP' },
  { id: 'materials_supplier', label: 'Dépôts & Matériaux' }
];

export const INITIAL_PROFILES: ProfessionalProfile[] = [
  {
    id: 'pro-1',
    name: 'Aimé Kalonji',
    companyName: 'Atelier Architecture Kalonji & Associés',
    role: 'architect_engineer',
    trade: 'Architecte DPLG & Urbaniste',
    tradeCategory: 'architecture',
    city: 'Kinshasa',
    neighborhood: 'Gombe',
    phone: '+243 81 500 2345',
    whatsapp: '243815002345',
    email: 'aime.kalonji@atelier-archik.cd',
    avatar: '/src/assets/images/jenga_architect_studio_1794171910536.jpg',
    coverImage: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    bio: 'Architecte inscrit à l’Ordre National des Architectes de la RDC. Plus de 12 ans d’expérience dans la conception de résidences bioclimatiques haut standing, immeubles de bureaux R+5 et centres médicaux à Kinshasa et Lubumbashi.',
    verified: true,
    onclRegistered: true,
    rating: 4.9,
    reviewCount: 38,
    completedProjectsCount: 54,
    yearsOfExperience: 12,
    dailyRateUSD: 180,
    dailyRateCDF: 180 * USD_TO_CDF,
    skills: ['Plans de permis de construire', 'Modélisation 3D Revit & ArchiCAD', 'Suivi de chantier architectural', 'Éco-construction tropicale'],
    certifications: ['Ordre National des Architectes (ONAR-RDC)', 'Certificat Haute Qualité Environnementale Tropicale'],
    portfolio: [
      {
        title: 'Résidence Fleuve R+2',
        description: 'Villa contemporaine avec ventilation naturelle et toiture solaire intégrée.',
        image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
        location: 'Kinshasa, Ngaliema',
        year: '2025'
      },
      {
        title: 'Immeuble Commercial Le Palmier',
        description: 'Immeuble mixte bureaux et galeries commerciales avec façade brise-soleil.',
        image: '/src/assets/images/jenga_architect_studio_1794171910536.jpg',
        location: 'Kinshasa, Gombe',
        year: '2024'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Patrice Ilunga',
        authorRole: 'Propriétaire villa',
        rating: 5,
        comment: 'Aimé a réalisé des plans d’une grande précision qui ont permis d’obtenir le permis de construire sans aucun retard. Très professionnel et disponible.',
        date: '14 Oct 2025',
        projectName: 'Villa Ngaliema'
      },
      {
        id: 'rev-2',
        authorName: 'Solange Mbayo',
        authorRole: 'Directrice Immobilière',
        rating: 4.8,
        comment: 'Excellente vision de l’espace et respect strict du budget prévisionnel. Nous le recommandons vivement pour les projets d’envergure.',
        date: '02 Sept 2025',
        projectName: 'Bureaux Gombe'
      }
    ],
    available: true,
    badgeTier: 'featured_partner'
  },
  {
    id: 'pro-2',
    name: 'Michel Banza',
    companyName: 'Banza Maçonnerie & Coffrage',
    role: 'artisan',
    trade: 'Maçon Chef d’Équipe & Coffreur',
    tradeCategory: 'masonry',
    city: 'Kinshasa',
    neighborhood: 'Limete (Industriel & Résidentiel)',
    phone: '+243 89 744 1122',
    whatsapp: '243897441122',
    email: 'michel.banza.btp@gmail.com',
    avatar: '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
    coverImage: '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
    bio: 'Maçon qualifié avec 15 ans d’expérience sur les chantiers de la capitale. Spécialiste du ferraillage antisismique, béton armé, fondations en zone marécageuse et élévation de briques pleines et blocs ciment.',
    verified: true,
    onclRegistered: false,
    rating: 4.8,
    reviewCount: 47,
    completedProjectsCount: 82,
    yearsOfExperience: 15,
    dailyRateUSD: 45,
    dailyRateCDF: 45 * USD_TO_CDF,
    skills: ['Fondations sur semelles filantes', 'Coulage dalles béton vibré', 'Montage murs blocs & moellons', 'Clôtures sécurisées grande hauteur'],
    certifications: ['Brevet Professionnel INPP Bâtiment & Travaux Publics', 'Attestation de sécurité chantiers'],
    portfolio: [
      {
        title: 'Mur de clôture 180m & Portail lourd',
        description: 'Semelle armée, poteaux 20x20 et chaînage supérieur pour parcelle industrielle.',
        image: '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
        location: 'Kinshasa, Limete Kingabwa',
        year: '2026'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        authorName: 'Jean-Pierre Mutombo',
        authorRole: 'Maître d’ouvrage',
        rating: 5,
        comment: 'Michel et ses ouvriers travaillent avec une ponctualité remarquable. Le dosage du béton et l’aplomb des murs sont impeccables.',
        date: '28 Jan 2026',
        projectName: 'Clôture & Dalle Limete'
      }
    ],
    available: true,
    badgeTier: 'verified_pro'
  },
  {
    id: 'pro-3',
    name: 'Ing. Marcella Mpoyi',
    companyName: 'Mpoyi Calcul & Génie Civil',
    role: 'architect_engineer',
    trade: 'Ingénieure en Génie Civil & Calculateur Béton',
    tradeCategory: 'engineering',
    city: 'Kinshasa',
    neighborhood: 'Ngaliema (Macampagne, Binza)',
    phone: '+243 82 911 8833',
    whatsapp: '243829118833',
    email: 'm.mpoyi@ingenierie-congo.cd',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    coverImage: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    bio: 'Ingénieure Génie Civil agréée. Spécialisée dans les notes de calcul de structures complexes, diagnostic de fissures, études géotechniques et dimensionnement des fondations sur sols instables à Kinshasa et Matadi.',
    verified: true,
    onclRegistered: true,
    rating: 4.95,
    reviewCount: 29,
    completedProjectsCount: 41,
    yearsOfExperience: 9,
    dailyRateUSD: 160,
    dailyRateCDF: 160 * USD_TO_CDF,
    skills: ['Notes de calcul Robot Structural', 'Dimensionnement armatures Eurocode / BAEL', 'Audit de résistance béton', 'Essais au scléromètre'],
    certifications: ['Ordre National des Ingénieurs Civils du Congo (ONIC)', 'Master Génie Civil Polytechnique UNIKIN'],
    portfolio: [
      {
        title: 'Diagnostic & Renforcement Structure R+4',
        description: 'Reprise sous œuvre et chemisage de poteaux métalliques pour mise aux normes.',
        image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
        location: 'Kinshasa, Gombe',
        year: '2025'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Faustin Tshisekedi',
        authorRole: 'Entrepreneur BTP',
        rating: 5,
        comment: 'Rigueur absolue sur les plans de ferraillage. Nous a évité des surcoûts d’acier inutiles sur notre dernier immeuble.',
        date: '19 Nov 2025',
        projectName: 'Tour Résidentielle'
      }
    ],
    available: true,
    badgeTier: 'verified_pro'
  },
  {
    id: 'pro-4',
    name: 'Dieudonné Kasongo',
    companyName: 'Kasongo Énergie & Solaire RDC',
    role: 'artisan',
    trade: 'Électricien Bâtiment & Installateur Solaire Agréé',
    tradeCategory: 'electrical',
    city: 'Lubumbashi',
    neighborhood: 'Golf (Météo, Plateau)',
    phone: '+243 99 823 4567',
    whatsapp: '243998234567',
    email: 'contact@kasongo-solaire.cd',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    bio: 'Expert en électricité générale triphasée et systèmes solaires autonomes hybrides (Victron, Deye, Pylontech). Plus de 120 installations solaires réussies à Lubumbashi, Kolwezi et Likasi pour particuliers et minings.',
    verified: true,
    onclRegistered: false,
    rating: 4.88,
    reviewCount: 52,
    completedProjectsCount: 124,
    yearsOfExperience: 11,
    dailyRateUSD: 60,
    dailyRateCDF: 60 * USD_TO_CDF,
    skills: ['Dimensionnement bancs solaires lithium', 'Câblage tableaux divisionnaires', 'Inverseurs automatiques groupe/SNEL', 'Protection parafoudre et mise à terre'],
    certifications: ['Certificat Schneider Electric Solar Partner', 'Diplôme Électrotechnique ISTA'],
    portfolio: [
      {
        title: 'Système Solaire Hybride 20kVA',
        description: 'Alimentation autonome avec 32 panneaux 550W et 3 batteries Lithium 15kWh.',
        image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
        location: 'Lubumbashi, Golf Météo',
        year: '2025'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        authorName: 'Alain Mwamba',
        authorRole: 'Gérant de société',
        rating: 5,
        comment: 'Finies les coupures de courant ! Installation très propre avec des goulottes impeccables et suivi à distance sur smartphone.',
        date: '04 Jan 2026',
        projectName: 'Villa Golf'
      }
    ],
    available: true,
    badgeTier: 'featured_partner'
  },
  {
    id: 'pro-5',
    name: 'Joseph Mukendi',
    companyName: 'Mukendi Plomberie & Sanitaire',
    role: 'artisan',
    trade: 'Plombier Sanitaire & Spécialiste Forages',
    tradeCategory: 'plumbing',
    city: 'Kinshasa',
    neighborhood: 'Bandalungwa',
    phone: '+243 84 331 9900',
    whatsapp: '243843319900',
    email: 'joseph.mukendi@plomberie-kin.cd',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    bio: 'Artisan plombier expérimenté dans les installations d’alimentation d’eau sous pression, surpresseurs, citernes enterrées et châteaux d’eau, tuyauterie multicouche et évacuations PVC.',
    verified: true,
    onclRegistered: false,
    rating: 4.75,
    reviewCount: 31,
    completedProjectsCount: 65,
    yearsOfExperience: 8,
    dailyRateUSD: 40,
    dailyRateCDF: 40 * USD_TO_CDF,
    skills: ['Installation réservoir & surpresseur', 'Tuyauterie PPR soudée à chaud', 'Réseau d’assainissement et fosses septiques', 'Détection et réparation de fuites cachées'],
    certifications: ['Formation Professionnelle Métiers de l’Eau INPP'],
    portfolio: [
      {
        title: 'Château d’eau 5000L & Circuit sous pression',
        description: 'Pompe automatique immergée avec filtration double cartouche.',
        image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
        location: 'Kinshasa, Kintambo',
        year: '2025'
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        authorName: 'Mireille Kanku',
        authorRole: 'Propriétaire',
        rating: 4.8,
        comment: 'Dépannage ultra-rapide un samedi matin pour une fuite importante, puis remise à neuf de toute notre plomberie.',
        date: '18 Déc 2025',
        projectName: 'Rénovation Bandal'
      }
    ],
    available: true,
    badgeTier: 'verified_pro'
  },
  {
    id: 'pro-6',
    name: 'Congo BTP SARL',
    companyName: 'Entreprise Générale de Construction Congo BTP',
    role: 'contractor',
    trade: 'Entreprise Générale BTP & Clé en Main',
    tradeCategory: 'general_contractor',
    city: 'Kinshasa',
    neighborhood: 'Barumbu',
    phone: '+243 81 222 7788',
    whatsapp: '243812227788',
    email: 'marches@congobtp-sarl.cd',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    coverImage: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    bio: 'Entreprise de construction congolaise agréée catégorie A. Équipe pluridisciplinaire d’ingénieurs, conducteurs de travaux et artisans pour la réalisation de projets immobiliers résidentiels et industriels.',
    verified: true,
    onclRegistered: true,
    rating: 4.92,
    reviewCount: 64,
    completedProjectsCount: 95,
    yearsOfExperience: 18,
    dailyRateUSD: 350,
    dailyRateCDF: 350 * USD_TO_CDF,
    skills: ['Gros œuvre & Second œuvre intégré', 'Direction de chantiers complexes', 'Équipements et engins lourds en propre', 'Respect des délais contractuels'],
    certifications: ['Agrément Ministère des ITPR Catégorie A', 'Assurance Responsabilité Décennale'],
    portfolio: [
      {
        title: 'Immeuble Résidentiel 12 Appartements',
        description: 'Livraison clé en main avec ascenseur, transformateur dédié et finitions marbre.',
        image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
        location: 'Kinshasa, Gombe',
        year: '2025'
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        authorName: 'Groupe Invest RDC',
        authorRole: 'Promoteur',
        rating: 5,
        comment: 'Chantier livré avec 2 semaines d’avance. Transparence totale dans les décomptes mensuels et maîtrise parfaite des équipes.',
        date: '20 Jan 2026',
        projectName: 'Projet Résidence Gombe'
      }
    ],
    available: true,
    badgeTier: 'featured_partner'
  },
  {
    id: 'pro-7',
    name: 'Comptoir Général Aciers & Ciment RDC',
    companyName: 'Dépôt Central Matériaux de Kingabwa',
    role: 'supplier',
    trade: 'Grossiste Matériaux BTP & Quincaillerie Industrielle',
    tradeCategory: 'materials_supplier',
    city: 'Kinshasa',
    neighborhood: 'Limete (Industriel & Résidentiel)',
    phone: '+243 85 999 1100',
    whatsapp: '243859991100',
    email: 'ventes@comptoir-materiaux.cd',
    avatar: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    coverImage: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    bio: 'Distributeur officiel des ciments CIMKO et CILU (Lukala 42.5), fers à béton haute adhérence certifiés FE500 (Ø6 à Ø32), tôles bac galvanisées et gravier concassé avec flotte de camions bennes.',
    verified: true,
    onclRegistered: false,
    rating: 4.85,
    reviewCount: 94,
    completedProjectsCount: 380,
    yearsOfExperience: 14,
    dailyRateUSD: 0,
    dailyRateCDF: 0,
    skills: ['Livraison directe sur chantier', 'Tarifs dégressifs gros volumes', 'Certificats de conformité laboratoire', 'Paiement mobile money accepté'],
    certifications: ['Distributeur Certifié Ciments du Congo', 'Norme Aciers Haute Adhérence'],
    portfolio: [
      {
        title: 'Approvisionnement Chantier Fleuve R+6',
        description: 'Fourniture de 240 tonnes de fer à béton et 12 000 sacs de ciment livrés en flux tendu.',
        image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
        location: 'Kinshasa, Gombe',
        year: '2025'
      }
    ],
    reviews: [
      {
        id: 'rev-8',
        authorName: 'Ing. Marcella Mpoyi',
        authorRole: 'Ingénieure Structure',
        rating: 5,
        comment: 'Fers à béton toujours conformes au diamètre commandé, sans rouille excessive. Pesée exacte et livraison à l’heure sur nos chantiers.',
        date: '10 Fév 2026',
        projectName: 'Chantiers Multiples Kinshasa'
      }
    ],
    available: true,
    badgeTier: 'featured_partner'
  },
  {
    id: 'pro-8',
    name: 'Serge Ilunga',
    companyName: 'Ilunga Finitions & Peinture Goma',
    role: 'artisan',
    trade: 'Artisan Peintre & Applicateur Enduit Déco',
    tradeCategory: 'painting_finishing',
    city: 'Goma',
    neighborhood: 'Himbi',
    phone: '+243 97 112 3344',
    whatsapp: '243971123344',
    email: 'serge.ilunga.peinture@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    coverImage: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    bio: 'Spécialiste de la préparation soignée des supports, enduits de lissage projetés, peintures acryliques anti-moisissures adaptées au climat humide de Goma et pose de faux-plafonds staff.',
    verified: true,
    onclRegistered: false,
    rating: 4.79,
    reviewCount: 22,
    completedProjectsCount: 48,
    yearsOfExperience: 7,
    dailyRateUSD: 35,
    dailyRateCDF: 35 * USD_TO_CDF,
    skills: ['Enduit de lissage haute finition', 'Peinture façade résistante aux intempéries', 'Pose moulures & corniches staff', 'Application résine epoxy de sol'],
    certifications: ['Diplôme Métiers du Second Œuvre'],
    portfolio: [
      {
        title: 'Hôtel du Lac Kivu - Rénovation 16 Chambres',
        description: 'Application peinture satinée lavable et faux plafonds acoustiques.',
        image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
        location: 'Goma, Himbi',
        year: '2025'
      }
    ],
    reviews: [
      {
        id: 'rev-9',
        authorName: 'David Bahati',
        authorRole: 'Gestionnaire hôtelier',
        rating: 5,
        comment: 'Travail très soigné, propreté du chantier après chaque journée de travail. Finitions dignes des grands hôtels.',
        date: '12 Jan 2026',
        projectName: 'Rénovation Kivu'
      }
    ],
    available: true,
    badgeTier: 'free'
  }
];

export const INITIAL_PROJECTS: ProjectListing[] = [
  {
    id: 'proj-1',
    title: 'Construction Villa R+1 moderne & piscine à débordement',
    clientName: 'Jean-Paul Lukusa',
    clientRole: 'Propriétaire Maître d’ouvrage',
    clientPhone: '+243 81 990 0102',
    clientWhatsapp: '243819900102',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    category: 'masonry',
    tradeLabel: 'Maçonnerie & Gros Œuvre',
    city: 'Kinshasa',
    neighborhood: 'Ngaliema (Macampagne, Binza)',
    budgetUSD: 45000,
    budgetCDF: 45000 * USD_TO_CDF,
    status: 'open',
    datePosted: 'Il y a 2 jours',
    quotesCount: 4,
    estimatedDuration: '4 mois',
    description: 'Recherche équipe qualifiée de maçons et coffreurs pour élévation du rez-de-chaussée et étage 1 d’une villa contemporaine de 280 m². Les plans d’architecte et les notes de ferraillage validées sont disponibles immédiatement.',
    requirements: [
      'Expérience confirmée sur dalles pleines béton armé vibré',
      'Références vérifiables de chantiers à Ngaliema ou Gombe',
      'Équipe complète disponible à partir de la semaine prochaine',
      'Capacité à travailler avec les plans d’ingénieur'
    ],
    image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    urgency: 'urgent'
  },
  {
    id: 'proj-2',
    title: 'Installation système solaire 15kVA & Inverseur SNEL',
    clientName: 'Dr. Chantal Mukeba',
    clientRole: 'Propriétaire clinique',
    clientPhone: '+243 99 711 5544',
    clientWhatsapp: '243997115544',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    category: 'electrical',
    tradeLabel: 'Électricité & Solaire',
    city: 'Lubumbashi',
    neighborhood: 'Golf (Météo, Plateau)',
    budgetUSD: 9500,
    budgetCDF: 9500 * USD_TO_CDF,
    status: 'in_negotiation',
    datePosted: 'Il y a 4 jours',
    quotesCount: 3,
    estimatedDuration: '7 jours',
    description: 'Pour un centre de santé et résidence, besoin d’un électricien / installateur solaire certifié pour dimensionner et poser un onduleur 15kVA avec 2 batteries lithium 10kWh et 24 panneaux sur toiture métallique.',
    requirements: [
      'Garantie écrite sur le montage et matériel',
      'Mise à la terre avec piquet cuivre et mesure de résistance de terre',
      'Configuration application de monitoring sur smartphone'
    ],
    image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    urgency: 'normal'
  },
  {
    id: 'proj-3',
    title: 'Fourniture de 600 sacs ciment Lukala 42.5 & 6 tonnes fers Ø12',
    clientName: 'Faustin Tshisekedi (Congo BTP)',
    clientRole: 'Entrepreneur BTP',
    clientPhone: '+243 81 222 7788',
    clientWhatsapp: '243812227788',
    clientAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    category: 'materials_supplier',
    tradeLabel: 'Fourniture Matériaux',
    city: 'Kinshasa',
    neighborhood: 'Mont-Ngafula',
    budgetUSD: 11200,
    budgetCDF: 11200 * USD_TO_CDF,
    status: 'open',
    datePosted: 'Hier',
    quotesCount: 5,
    estimatedDuration: 'Livraison sous 48h',
    description: 'Demande urgente de cotation pour livraison directe sur chantier à Mont-Ngafula (accès carrossable pour camion 15 tonnes). Matériel de premier choix uniquement avec bon de pesée.',
    requirements: [
      'Ciment CILU ou CIMKO fabrication récente (moins de 20 jours)',
      'Fers à béton lisses et torsadés conformes aux normes',
      'Déchargement sur site inclus dans le devis'
    ],
    image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    urgency: 'urgent'
  },
  {
    id: 'proj-4',
    title: 'Conception architecturale et dossier de permis pour Immeuble R+3',
    clientName: 'Édouard Kabasele',
    clientRole: 'Investisseur immobilier',
    clientPhone: '+243 82 444 8811',
    clientWhatsapp: '243824448811',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    category: 'architecture',
    tradeLabel: 'Architecture & Plans',
    city: 'Kinshasa',
    neighborhood: 'Gombe',
    budgetUSD: 6500,
    budgetCDF: 6500 * USD_TO_CDF,
    status: 'open',
    datePosted: 'Il y a 3 jours',
    quotesCount: 2,
    estimatedDuration: '3 semaines',
    description: 'Parcelle de 450 m² à Gombe. Recherche architecte agréé pour conception de plans d’un immeuble à appartements locatifs modernes (8 appartements T3), avec rendus photo-réalistes 3D et suivi des démarches administratives.',
    requirements: [
      'Inscription active à l’Ordre National des Architectes',
      'Portfolio d’immeubles déjà construits à Kinshasa',
      'Fourniture des fichiers DWG et maquette BIM'
    ],
    image: '/src/assets/images/jenga_architect_studio_1794171910536.jpg',
    urgency: 'planned'
  },
  {
    id: 'proj-5',
    title: 'Plomberie complète, forage et citerne 10 000L',
    clientName: 'Mireille Kanku',
    clientRole: 'Propriétaire',
    clientPhone: '+243 89 200 6677',
    clientWhatsapp: '243892006677',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    category: 'plumbing',
    tradeLabel: 'Plomberie & Forage',
    city: 'Kinshasa',
    neighborhood: 'Bandalungwa',
    budgetUSD: 3800,
    budgetCDF: 3800 * USD_TO_CDF,
    status: 'in_negotiation',
    datePosted: 'Il y a 5 jours',
    quotesCount: 4,
    estimatedDuration: '10 jours',
    description: 'Raccordement d’un nouveau forage artésien existant vers une citerne haute de 10 000 litres, installation pompe de surface automatique et réseau de distribution sanitaire pour 3 logements.',
    requirements: [
      'Garantie sur l’étanchéité des raccords et du clapet anti-retour',
      'Installation filtre à sable et charbon actif'
    ],
    image: '/src/assets/images/jenga_construction_site_1794171908764.jpg',
    urgency: 'normal'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-101',
    projectId: 'proj-1',
    projectTitle: 'Construction Villa R+1 moderne & piscine à débordement',
    professionalId: 'pro-2',
    professionalName: 'Michel Banza (Banza Maçonnerie)',
    professionalAvatar: '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
    professionalTrade: 'Maçon Chef d’Équipe & Coffreur',
    clientId: 'client-lukusa',
    clientName: 'Jean-Paul Lukusa',
    quoteAmountUSD: 41500,
    quoteAmountCDF: 41500 * USD_TO_CDF,
    durationDays: 110,
    message: 'Bonjour Monsieur Lukusa. J’ai analysé le plan de ferraillage. Nous mettons à disposition une équipe de 14 maçons et coffreurs expérimentés avec bétonnière motorisée sur site et vibrateur thermique.',
    items: [
      { description: 'Implantation, fouilles et coulage semelles isolées béton C25/30', quantity: 1, unit: 'Forfait', unitPriceUSD: 8500 },
      { description: 'Élévation maçonnerie rez-de-chaussée & poteaux armés 25x25', quantity: 1, unit: 'Forfait', unitPriceUSD: 11000 },
      { description: 'Coffrage soigné, ferraillage double nappe et coulage dalle R+1', quantity: 280, unit: 'm²', unitPriceUSD: 50 },
      { description: 'Élévation étage 1 et chaînage supérieur antisismique', quantity: 1, unit: 'Forfait', unitPriceUSD: 8000 }
    ],
    status: 'counter_offered',
    counterOfferUSD: 38500,
    counterOfferCDF: 38500 * USD_TO_CDF,
    counterOfferNote: 'Offre reçue avec intérêt. Pouvons-nous nous accorder sur 38 500 $ avec un acompte de démarrage de 30% et paiement par tranche d’avancement certifiée par notre ingénieur ?',
    createdAt: '06 Nov 2026',
    updatedAt: '07 Nov 2026',
    includesMaterials: false
  },
  {
    id: 'quote-102',
    projectId: 'proj-1',
    projectTitle: 'Construction Villa R+1 moderne & piscine à débordement',
    professionalId: 'pro-6',
    professionalName: 'Congo BTP SARL',
    professionalAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    professionalTrade: 'Entreprise Générale BTP',
    clientId: 'client-lukusa',
    clientName: 'Jean-Paul Lukusa',
    quoteAmountUSD: 46000,
    quoteAmountCDF: 46000 * USD_TO_CDF,
    durationDays: 90,
    message: 'Proposition clé en main avec conducteur de travaux diplômé permanent, assurance décennale et engins de levage.',
    items: [
      { description: 'Gros œuvre complet conforme au bordereau d’ingénieur', quantity: 1, unit: 'Forfait', unitPriceUSD: 42000 },
      { description: 'Assurance responsabilité décennale & suivi topographe', quantity: 1, unit: 'Forfait', unitPriceUSD: 4000 }
    ],
    status: 'under_review',
    createdAt: '07 Nov 2026',
    updatedAt: '07 Nov 2026',
    includesMaterials: false
  },
  {
    id: 'quote-103',
    projectId: 'proj-2',
    projectTitle: 'Installation système solaire 15kVA & Inverseur SNEL',
    professionalId: 'pro-4',
    professionalName: 'Dieudonné Kasongo (Kasongo Solaire)',
    professionalAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    professionalTrade: 'Électricien Bâtiment & Solaire',
    clientId: 'client-mukeba',
    clientName: 'Dr. Chantal Mukeba',
    quoteAmountUSD: 9100,
    quoteAmountCDF: 9100 * USD_TO_CDF,
    durationDays: 6,
    message: 'Devis complet incluant fourniture onduleur hybride Deye 16kW, 2 batteries LiFePO4 5.12kWh 48V, structures aluminium toiture et main-d’œuvre certifiée.',
    items: [
      { description: 'Onduleur Hybride Deye 16kW Triphasé garantie 5 ans', quantity: 1, unit: 'Pièce', unitPriceUSD: 2800 },
      { description: 'Module Batterie Lithium LiFePO4 5.12kWh Rackable', quantity: 2, unit: 'Pièce', unitPriceUSD: 1650 },
      { description: 'Panneaux solaires monocristallins 550W Tier 1', quantity: 18, unit: 'Unité', unitPriceUSD: 110 },
      { description: 'Coffret AC/DC parafoudre, câblage solaire 6mm² & Pose', quantity: 1, unit: 'Forfait', unitPriceUSD: 1020 }
    ],
    status: 'accepted',
    createdAt: '05 Nov 2026',
    updatedAt: '07 Nov 2026',
    includesMaterials: true
  }
];

export const INITIAL_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-1',
    name: 'Ciment Lukala CILU CPJ 42.5 (Sac 50kg)',
    category: 'Ciment & Liants',
    brand: 'CILU Ciments du Congo',
    priceUSD: 10.50,
    priceCDF: Math.round(10.50 * USD_TO_CDF),
    unit: 'Sac de 50 kg',
    stockStatus: 'in_stock',
    supplierId: 'pro-7',
    supplierName: 'Comptoir Général Aciers & Ciment RDC',
    supplierCity: 'Kinshasa',
    supplierNeighborhood: 'Limete (Industriel & Résidentiel)',
    supplierWhatsapp: '243859991100',
    supplierPhone: '+243 85 999 1100',
    image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    minOrder: '50 sacs',
    featured: true
  },
  {
    id: 'mat-2',
    name: 'Fer à Béton Haute Adhérence FeE500 Ø12mm (Barre 12m)',
    category: 'Aciers & Fers',
    brand: 'Acier Certifié FE500',
    priceUSD: 13.80,
    priceCDF: Math.round(13.80 * USD_TO_CDF),
    unit: 'Barre de 12 mètres',
    stockStatus: 'in_stock',
    supplierId: 'pro-7',
    supplierName: 'Comptoir Général Aciers & Ciment RDC',
    supplierCity: 'Kinshasa',
    supplierNeighborhood: 'Limete (Industriel & Résidentiel)',
    supplierWhatsapp: '243859991100',
    supplierPhone: '+243 85 999 1100',
    image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    minOrder: '20 barres',
    featured: true
  },
  {
    id: 'mat-3',
    name: 'Fer à Béton Haute Adhérence FeE500 Ø10mm (Barre 12m)',
    category: 'Aciers & Fers',
    brand: 'Acier Certifié FE500',
    priceUSD: 9.60,
    priceCDF: Math.round(9.60 * USD_TO_CDF),
    unit: 'Barre de 12 mètres',
    stockStatus: 'in_stock',
    supplierId: 'pro-7',
    supplierName: 'Comptoir Général Aciers & Ciment RDC',
    supplierCity: 'Kinshasa',
    supplierNeighborhood: 'Limete (Industriel & Résidentiel)',
    supplierWhatsapp: '243859991100',
    supplierPhone: '+243 85 999 1100',
    image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    minOrder: '20 barres'
  },
  {
    id: 'mat-4',
    name: 'Carrelage Grès Cérame Émaillé 60x60 Poli Miroir',
    category: 'Carrelage & Finition',
    brand: 'Porcelaine Sahara Pro',
    priceUSD: 17.50,
    priceCDF: Math.round(17.50 * USD_TO_CDF),
    unit: 'Mètre carré (m²)',
    stockStatus: 'in_stock',
    supplierId: 'pro-7',
    supplierName: 'Comptoir Général Aciers & Ciment RDC',
    supplierCity: 'Kinshasa',
    supplierNeighborhood: 'Limete (Industriel & Résidentiel)',
    supplierWhatsapp: '243859991100',
    supplierPhone: '+243 85 999 1100',
    image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    minOrder: '30 m²',
    featured: true
  },
  {
    id: 'mat-5',
    name: 'Câble Électrique Cuivre Rigide 3x2.5mm² (Couronne 100m)',
    category: 'Électricité & Câblage',
    brand: 'Nexans RDC Câbles',
    priceUSD: 78.00,
    priceCDF: Math.round(78.00 * USD_TO_CDF),
    unit: 'Rouleau 100 mètres',
    stockStatus: 'in_stock',
    supplierId: 'pro-4',
    supplierName: 'Kasongo Énergie & Matériel',
    supplierCity: 'Lubumbashi',
    supplierNeighborhood: 'Golf (Météo, Plateau)',
    supplierWhatsapp: '243998234567',
    supplierPhone: '+243 99 823 4567',
    image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    minOrder: '1 rouleau'
  },
  {
    id: 'mat-6',
    name: 'Tôle Ondulée Bac Aluminium Zinc 0.40mm (Feuille 6m)',
    category: 'Toiture & Couverture',
    brand: 'AluZinc Métal Katanga',
    priceUSD: 24.00,
    priceCDF: Math.round(24.00 * USD_TO_CDF),
    unit: 'Feuille de 6 mètres',
    stockStatus: 'bulk_order',
    supplierId: 'pro-7',
    supplierName: 'Comptoir Général Aciers & Ciment RDC',
    supplierCity: 'Kinshasa',
    supplierNeighborhood: 'Limete (Industriel & Résidentiel)',
    supplierWhatsapp: '243859991100',
    supplierPhone: '+243 85 999 1100',
    image: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    minOrder: '15 feuilles'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'pro-2',
    participantName: 'Michel Banza',
    participantRole: 'Maçon Chef d’Équipe & Coffreur',
    participantAvatar: '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
    participantPhone: '+243 89 744 1122',
    participantWhatsapp: '243897441122',
    lastMessage: 'J’ai bien reçu votre contre-proposition pour la villa de Macampagne. 38 500 $ nous convient avec l’acompte.',
    lastMessageTime: '11:42',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'client-lukusa',
        senderName: 'Moi',
        text: 'Bonjour Michel, j’ai regardé votre devis initial. Nous souhaitons démarrer le 15 du mois.',
        timestamp: 'Hier 16:30',
        isMe: true
      },
      {
        id: 'm2',
        senderId: 'pro-2',
        senderName: 'Michel Banza',
        text: 'Mbote papa ! Pas de problème, mon équipe sera libérée du chantier de Limete d’ici vendredi.',
        timestamp: 'Hier 16:45',
        isMe: false
      },
      {
        id: 'm3',
        senderId: 'client-lukusa',
        senderName: 'Moi',
        text: 'J’ai soumis une contre-proposition formelle sur la plateforme à 38 500 $ avec 30% d’acompte.',
        timestamp: 'Hier 17:10',
        isMe: true
      },
      {
        id: 'm4',
        senderId: 'pro-2',
        senderName: 'Michel Banza',
        text: 'J’ai bien reçu votre contre-proposition pour la villa de Macampagne. 38 500 $ nous convient avec l’acompte. Je confirme dans l’application !',
        timestamp: '11:42',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-2',
    participantId: 'pro-1',
    participantName: 'Archi. Aimé Kalonji',
    participantRole: 'Architecte DPLG',
    participantAvatar: '/src/assets/images/jenga_architect_studio_1794171910536.jpg',
    participantPhone: '+243 81 500 2345',
    participantWhatsapp: '243815002345',
    lastMessage: 'Les esquisses 3D préliminaires sont prêtes, je peux passer vous les présenter.',
    lastMessageTime: 'Hier',
    unreadCount: 0,
    messages: [
      {
        id: 'm201',
        senderId: 'client-lukusa',
        senderName: 'Moi',
        text: 'Bonjour Maître Kalonji, avez-vous pu intégrer la terrasse couverte brise-soleil ?',
        timestamp: 'Hier 09:15',
        isMe: true
      },
      {
        id: 'm202',
        senderId: 'pro-1',
        senderName: 'Aimé Kalonji',
        text: 'Oui tout à fait ! Les esquisses 3D préliminaires sont prêtes, je peux passer vous les présenter ou vous envoyer le lien.',
        timestamp: 'Hier 10:20',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-3',
    participantId: 'pro-7',
    participantName: 'Comptoir Aciers & Ciment',
    participantRole: 'Dépôt Central Kingabwa',
    participantAvatar: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    participantPhone: '+243 85 999 1100',
    participantWhatsapp: '243859991100',
    lastMessage: 'Le camion de 400 sacs de CILU 42.5 est en cours de chargement.',
    lastMessageTime: 'Lun',
    unreadCount: 0,
    messages: [
      {
        id: 'm301',
        senderId: 'pro-7',
        senderName: 'Comptoir Aciers & Ciment',
        text: 'Bonjour, confirmez-vous l’adresse de livraison exacte à Mont-Ngafula vers l’arrêt By-Pass ?',
        timestamp: 'Lun 08:30',
        isMe: false
      },
      {
        id: 'm302',
        senderId: 'client-lukusa',
        senderName: 'Moi',
        text: 'Oui, juste après la station-service, entrée avenue des Bambous.',
        timestamp: 'Lun 08:45',
        isMe: true
      },
      {
        id: 'm303',
        senderId: 'pro-7',
        senderName: 'Comptoir Aciers & Ciment',
        text: 'Le camion de 400 sacs de CILU 42.5 est en cours de chargement. Le chauffeur vous contactera sur WhatsApp à l’approche.',
        timestamp: 'Lun 09:12',
        isMe: false
      }
    ]
  }
];

export const CURRENT_USER_OPTIONS: Record<UserRole, {
  name: string;
  role: UserRole;
  roleTitle: string;
  avatar: string;
  company?: string;
  city: string;
  phone: string;
  whatsapp: string;
}> = {
  client: {
    name: 'Jean-Paul Lukusa',
    role: 'client',
    roleTitle: 'Propriétaire & Maître d’Ouvrage',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    company: 'Particulier & Investisseur Foncier',
    city: 'Kinshasa (Ngaliema)',
    phone: '+243 81 990 0102',
    whatsapp: '243819900102'
  },
  artisan: {
    name: 'Michel Banza',
    role: 'artisan',
    roleTitle: 'Maçon Chef d’Équipe & Coffreur',
    avatar: '/src/assets/images/jenga_artisan_mason_1794171910347.jpg',
    company: 'Banza Maçonnerie & Coffrage',
    city: 'Kinshasa (Limete)',
    phone: '+243 89 744 1122',
    whatsapp: '243897441122'
  },
  architect_engineer: {
    name: 'Aimé Kalonji',
    role: 'architect_engineer',
    roleTitle: 'Architecte DPLG (ONAR)',
    avatar: '/src/assets/images/jenga_architect_studio_1794171910536.jpg',
    company: 'Atelier Kalonji & Associés',
    city: 'Kinshasa (Gombe)',
    phone: '+243 81 500 2345',
    whatsapp: '243815002345'
  },
  contractor: {
    name: 'Faustin Tshisekedi',
    role: 'contractor',
    roleTitle: 'Directeur Général BTP SARL',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    company: 'Congo BTP Entreprise Générale',
    city: 'Kinshasa (Barumbu)',
    phone: '+243 81 222 7788',
    whatsapp: '243812227788'
  },
  supplier: {
    name: 'Vendeur Comptoir Aciers',
    role: 'supplier',
    roleTitle: 'Fournisseur Matériaux & Quincaillerie',
    avatar: '/src/assets/images/jenga_materials_warehouse_1794171910183.jpg',
    company: 'Dépôt Central Aciers & Ciment',
    city: 'Kinshasa (Limete Kingabwa)',
    phone: '+243 85 999 1100',
    whatsapp: '243859991100'
  }
};
