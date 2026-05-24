const fr = {
  // ── Navigation
  nav: {
    collections: "Collections",
    artists: "Artistes",
    exhibitions: "Expositions",
    about: "À propos",
    contact: "Contact",
    cta: "Voir la collection",
    gallery_subtitle: "Artistes Peintres",
    mobile_location: "Sherbrooke, Québec",
  },

  // ── Hero
  hero: {
    eyebrow: "Œuvre à l'honneur",
    cta_primary: "Explorer la collection",
    cta_secondary: "Notre histoire",
    scroll_label: "Défiler",
    works: [
      {
        title: "L'Aube Dorée",
        artist: "Jules Michel",
        year: "1977",
      },
      {
        title: "Marché Persan",
        artist: "Stefan Hagiu",
        year: "2019",
      },
      {
        title: "Hiver Pastoral",
        artist: "Rajka Kupesic",
        year: "2024",
      },
    ],
  },

  // ── Collections
  collections: {
    eyebrow: "Collections thématiques",
    heading: "Œuvres de distinction",
    cta_all: "Toutes les collections",
    explore: "Explorer",
    items: [
      {
        title: "Maîtres Contemporains",
        subtitle: "Peinture actuelle",
        count: "47 œuvres",
      },
      {
        title: "Paysage Québécois",
        subtitle: "Territoires et lumières",
        count: "83 œuvres",
      },
      {
        title: "Abstraction Lyrique",
        subtitle: "Formes & couleurs",
        count: "31 œuvres",
      },
      {
        title: "Natures Mortes",
        subtitle: "Objets & compositions",
        count: "24 œuvres",
      },
    ],
  },

  // ── Philosophy / About
  philosophy: {
    eyebrow: "Notre philosophie",
    heading: "Là où l'art trouve sa juste demeure",
    body_1:
      "Depuis plus de trois décennies, nous nous consacrons à présenter les œuvres les plus remarquables des artistes québécois — des maîtres reconnus aux voix émergentes qui dessinent le canon de demain.",
    body_2:
      "Notre galerie à Sherbrooke n'est pas simplement un lieu de transaction, mais un véritable sanctuaire de la culture. Nous croyons que l'art exceptionnel devrait être accessible à ceux qui savent véritablement l'apprécier — raison pour laquelle nous absorbons l'ensemble des taxes applicables à chaque acquisition.",
    body_3:
      "Chaque œuvre de notre collection est sélectionnée avec soin pour sa valeur artistique, sa résonance émotionnelle et sa portée culturelle durable.",
    cta: "Découvrir notre histoire",
    quote: "L'art, ce n'est pas ce que vous voyez, mais ce que vous faites voir aux autres.",
    quote_author: "— Edgar Degas",
    stats: [
      { value: "950+", label: "Œuvres originales" },
      { value: "40+", label: "Artistes québécois" },
      { value: "30", label: "Années de curation" },
      { value: "0 %", label: "Taxes incluses" },
    ],
  },

  // ── Artwork Showcase
  showcase: {
    eyebrow: "Acquisitions récentes",
    heading_line1: "Œuvres sélectionnées",
    heading_line2: "Disponibles maintenant",
    body: "Chaque œuvre a été authentifiée individuellement et sélectionnée depuis les ateliers des voix artistiques les plus saisissantes du Québec.",
    cta_all: "Parcourir les 950+ œuvres",
    view_work: "Voir l'œuvre",
    artworks: [
      {
        ref: "G-0963",
        title: "Tirlata Sturt Pers",
        artist: "Jules Michel",
        year: "1977",
        medium: "Techniques mixtes — Huile sur toile",
        dimensions: '46" × 34"',
        price: "10 000",
      },
      {
        ref: "G-0228",
        title: "Urbanisation",
        artist: "Stefan Hagiu",
        year: "2019",
        medium: "Huile sur toile",
        dimensions: '96" × 48"',
        price: "4 995",
      },
      {
        ref: "G-0967",
        title: "Hiver Pastoral",
        artist: "Rajka Kupesic",
        year: "2024",
        medium: "Huile sur toile",
        dimensions: '16½" × 12½"',
        price: "2 995",
      },
      {
        ref: "G-1030",
        title: "Portrait de Femme",
        artist: "Elena Carla",
        year: "2023",
        medium: "Huile sur toile",
        dimensions: '31" × 46"',
        price: "2 995",
      },
      {
        ref: "G-0192",
        title: "Le Fleuve de la Vie",
        artist: "Liguori Vachon",
        year: "2020",
        medium: "Acrylique sur toile — Triptyque",
        dimensions: '72" × 48"',
        price: "2 995",
      },
    ],
  },

  // ── CTA
  cta: {
    eyebrow: "Visites privées sur rendez-vous",
    heading: "Commencez votre collection",
    body: "Nos curateurs sont disponibles sur rendez-vous pour vous guider à travers notre collection et vous aider à trouver l'œuvre qui vous parle.",
    cta_primary: "Planifier une visite",
    cta_phone: "819-572-2099",
    badge: "Toutes taxes incluses — aucuns frais cachés",
  },

  // ── Footer
  footer: {
    tagline:
      "Un sanctuaire de l'art québécois depuis 1994. Plus de 950 œuvres originales présentées par les peintres les plus distingués de la province.",
    location_label: "Adresse",
    location_value: "Sherbrooke, Québec, Canada",
    contact_label: "Contact",
    newsletter_heading: "Restez informé",
    newsletter_body:
      "Nouvelles acquisitions, vernissages et réflexions pour les collectionneurs.",
    newsletter_placeholder: "Votre adresse courriel",
    newsletter_cta: "S'abonner",
    copyright: "© 2025 Galerie Artistes Peintres, Sherbrooke. Tous droits réservés.",
    legal: ["Confidentialité", "Conditions", "Accessibilité"],
    columns: {
      Collection: ["Toutes les œuvres", "Moins de 500 $", "Plus de 500 $", "Nouvelles arrivées", "Œuvres vendues"],
      Artistes: ["Jules Michel", "Stefan Hagiu", "Rajka Kupesic", "Elena Carla", "Tous les artistes"],
      Galerie: ["Notre philosophie", "Expositions", "Événements privés", "Presse", "Carrières"],
      Services: ["Visites privées", "Conseil artistique", "Encadrement", "Expédition", "Retours"],
    },
  },
} as const;

export default fr;

// Widen the inferred literal types so the EN file can use different strings
// for every field without triggering "Type X is not assignable to type Y".
type Widen<T> =
  T extends string ? string
  : T extends number ? number
  : T extends boolean ? boolean
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<Widen<U>>
  : T extends object ? { [K in keyof T]: Widen<T[K]> }
  : T;

export type Translations = Widen<typeof fr>;
