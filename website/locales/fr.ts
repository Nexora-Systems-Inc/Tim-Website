const fr = {
  // ── Navigation
  nav: {
    home: "Accueil",
    collections: "Collections",
    artists: "Artistes",
    exhibitions: "Expositions",
    about: "À propos",
    contact: "Contact",
    cta: "Voir la collection",
    gallery_title: "M Lalonde",
    gallery_subtitle: "Artiste Peintre",
    mobile_location: "Sherbrooke, Québec",
    links: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/a-propos" },
      { label: "Collections", href: "/collections" },
      { label: "Contact", href: "/contact" },
    ],
  },

  // ── Hero
  hero: {
    eyebrow: "Exposition à l'honneur",
    cta_primary: "Explorer la collection",
    cta_secondary: "Notre histoire",
    scroll_label: "Défiler",
    exhibitions: [
      {
        title: "Les Galeries d'Anjou",
        location: "Montréal, Québec",
        description:
          "Description provisoire de l'exposition. Ce texte décrira ultérieurement l'événement, le lieu, les dates ou la collection mise en vedette.",
      },
      {
        title: "Symposium des Arts de Sherbrooke",
        location: "Sherbrooke, Québec",
        description:
          "Description provisoire de l'exposition. Ce texte sera remplacé ultérieurement.",
      },
    ],
  },

  // ── Collections (homepage section)
  collections: {
    eyebrow: "Collections thématiques",
    heading: "Œuvres de distinction",
    cta_all: "Toutes les collections",
    explore: "Explorer",
  },

  // ── Philosophy / About (homepage section)
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
    quote:
      "L'art, ce n'est pas ce que vous voyez, mais ce que vous faites voir aux autres.",
    quote_author: "— Edgar Degas",
  },

  // ── Showcase (homepage section)
  showcase: {
    eyebrow: "Collections privées",
    heading_line1: "Œuvres acquises",
    heading_line2: "Ont trouvé leur place dans des collections privées.",
    body: "Ces toiles poursuivent maintenant leur histoire auprès de leurs collectionneurs — chacune témoigne d'un dialogue accompli entre l'artiste et ceux qui ont choisi de lui confier une demeure.",
    cta_all: "Voir toutes les œuvres vendues",
  },

  // ── CTA (homepage section)
  cta: {
    eyebrow: "Visites privées sur rendez-vous",
    heading: "Une collection personnelle à découvrir",
    body: "Chaque création reflète une vision artistique sensible, chaleureuse et profondément humaine. Communiquez directement pour toute demande d’information ou d’acquisition. ",
    cta_primary: "Voir la collection",
    cta_phone: "819-572-2099",
    badge: "Toutes taxes incluses — aucuns frais cachés",
  },

  // ── Footer
  footer: {
    tagline:
      "Un sanctuaire de l'art québécois depuis 1994. Plus de 950 œuvres originales présentées par les peintres les plus distingués de la province.",
    location_label: "Adresse",
    location_value: "St-Jean-Baptiste, Québec, Canada",
    contact_label: "Contact",
    newsletter_heading: "Restez informé",
    newsletter_body:
      "Nouvelles acquisitions, vernissages et réflexions pour les collectionneurs.",
    newsletter_placeholder: "Votre adresse courriel",
    newsletter_cta: "S'abonner",
    copyright:
      "© 2025 M Lalonde Artiste Peintre, Sherbrooke. Tous droits réservés.",
    legal: ["Confidentialité", "Conditions", "Accessibilité"],
    columns: {
      Collection: [
        "Toutes les œuvres",
        "Œuvres disponibles",
        "Nouvelles créations",
        "Collections privées",
        "Œuvres vendues",
      ],
      Àpropos: [
        "L’artiste",
        "Philosophie",
        "Démarche artistique",
        "Inspiration",
      ],
      Contact: [
        "Demande d’information",
        "Acquisition d’œuvre",
        "Commandes privées",
        "Contact direct",
      ],
    },
  },

  // ══════════════════════════════════════════
  // ── COLLECTIONS PAGE
  // ══════════════════════════════════════════
  collectionsPage: {
    meta_title: "Collections — M Lalonde Artiste Peintre",
    hero_eyebrow: "Catalogue complet",
    hero_heading: "La collection",
    hero_sub:
      "Plus de 950 œuvres originales d'artistes peintres québécois, soigneusement sélectionnées.",
    filter_all: "Tout",
    filter_label: "Filtrer par",
    sort_label: "Trier",
    sort_recent: "Plus récentes",
    sort_price_asc: "Prix croissant",
    sort_price_desc: "Prix décroissant",
    works_count_suffix: "œuvres",
    view_detail: "Voir l'œuvre",
    inquiry: "Demande d'information",
    sold: "Vendue",
    sold_label: "Vendu",
    sold_acquired: "Œuvre acquise",
    featured_label: "Vedette",
    categories: [
      { id: "all", label: "Tout", count: 40 },
      { id: "contemporain", label: "Maîtres contemporains", count: 47 },
      { id: "paysage", label: "Paysage québécois", count: 83 },
      { id: "abstraction", label: "Abstraction lyrique", count: 31 },
      { id: "portrait", label: "Portraits & figures", count: 24 },
      { id: "client", label: "Client", count: 28 },
      { id: "featured", label: "Vedette", count: 7 },
      { id: "sold", label: "Vendu", count: 5 },
    ],
    artworks: [
      {
        ref: "G-0963",
        title: "Tirlata Sturt Pers",
        artist: "Jules Michel",
        year: "1977",
        medium: "Techniques mixtes",
        dimensions: '46" × 34"',
        price: "10 000",
        category: "contemporain",
        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=85&fit=crop",
        featured: true,
      },
      {
        ref: "G-0928",
        title: "Marché Persan",
        artist: "Jules Michel",
        year: "2018",
        medium: "Huile sur toile",
        dimensions: '36" × 24"',
        price: "8 000",
        category: "contemporain",
        image:
          "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=85&fit=crop",
        featured: true,
      },
      {
        ref: "G-0228",
        title: "Urbanisation",
        artist: "Stefan Hagiu",
        year: "2019",
        medium: "Huile sur toile",
        dimensions: '96" × 48"',
        price: "4 995",
        category: "abstraction",
        image:
          "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0967",
        title: "Hiver Pastoral",
        artist: "Rajka Kupesic",
        year: "2024",
        medium: "Huile sur toile",
        dimensions: '16½" × 12½"',
        price: "2 995",
        category: "paysage",
        image:
          "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-1030",
        title: "Portrait de Femme",
        artist: "Elena Carla",
        year: "2023",
        medium: "Huile sur toile",
        dimensions: '31" × 46"',
        price: "2 995",
        category: "portrait",
        image:
          "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0192",
        title: "Le Fleuve de la Vie",
        artist: "Liguori Vachon",
        year: "2020",
        medium: "Acrylique, triptyque",
        dimensions: '72" × 48"',
        price: "2 995",
        category: "abstraction",
        image:
          "https://images.unsplash.com/photo-1509839862426-cfed742f4e23?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0220",
        title: "L'Inévitable",
        artist: "Stefan Hagiu",
        year: "2017",
        medium: "Huile sur toile",
        dimensions: '72" × 48"',
        price: "2 995",
        category: "abstraction",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0845",
        title: "Solitude Boréale",
        artist: "Rajka Kupesic",
        year: "2022",
        medium: "Huile sur toile",
        dimensions: '24" × 36"',
        price: "1 800",
        category: "paysage",
        image:
          "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0912",
        title: "Composition No. 7",
        artist: "Elena Carla",
        year: "2021",
        medium: "Acrylique sur toile",
        dimensions: '40" × 40"',
        price: "1 600",
        category: "abstraction",
        image:
          "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0756",
        title: "La Lumière de Décembre",
        artist: "Liguori Vachon",
        year: "2019",
        medium: "Huile sur toile",
        dimensions: '48" × 36"',
        price: "3 200",
        category: "paysage",
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0634",
        title: "Mémoire Collective",
        artist: "Jules Michel",
        year: "2015",
        medium: "Techniques mixtes",
        dimensions: '60" × 48"',
        price: "5 500",
        category: "contemporain",
        image:
          "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=85&fit=crop",
        featured: false,
      },
      {
        ref: "G-0801",
        title: "Regard Intérieur",
        artist: "Elena Carla",
        year: "2022",
        medium: "Huile sur toile",
        dimensions: '20" × 24"',
        price: "1 200",
        category: "portrait",
        image:
          "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=85&fit=crop",
        featured: false,
      },
    ],
  },

  // ══════════════════════════════════════════
  // ── CONTACT PAGE
  // ══════════════════════════════════════════
  contactPage: {
    meta_title: "Contact — M Lalonde Artiste Peintre",
    hero_eyebrow: "Nous joindre",
    hero_heading: "Entamons\nla conversation",
    hero_sub:
      "Pour acquérir une œuvre, planifier une visite privée, poser une question sur la collection ou toute autre demande — nous serons ravis de vous répondre.",
  },

  // ══════════════════════════════════════════
  // ── ABOUT / CONTACT PAGE
  // ══════════════════════════════════════════
  aboutPage: {
    meta_title: "À propos — M Lalonde Artiste Peintre",

    // Hero
    hero_eyebrow: "Notre histoire",
    hero_heading: "Un demi-siècle\nde passion",
    hero_sub:
      "Fondée en 1994 à Sherbrooke, la Galerie Artistes Peintres est devenue l'une des références incontournables de l'art québécois.",

    // Story section
    story_eyebrow: "La fondation",
    story_heading: "Nés d'une vision",
    story_body_1:
      "La galerie a vu le jour en 1994 dans une ancienne manufacture du centre-ville de Sherbrooke, transformée en espace d'exposition lumineux par son fondateur, Claude Beaumont. Sa conviction était simple : l'art québécois méritait une vitrine digne de son talent.",
    story_body_2:
      "Au fil des années, nous avons développé des relations profondes avec plus de quarante artistes de la province, des maîtres établis comme Jules Michel et Stefan Hagiu aux talents émergents que nous avons eu le privilège de révéler au grand public.",
    story_body_3:
      "Notre engagement envers les collectionneurs se traduit également par une politique tarifaire unique : nous absorbons l'ensemble des taxes applicables sur chaque acquisition, rendant l'art exceptionnel plus accessible à ceux qui l'apprécient vraiment.",

    // Contact
    contact_eyebrow: "Nous écrire",
    contact_heading: "Entamons la conversation",
    contact_sub:
      "Que vous souhaitiez acquérir une œuvre, planifier une visite privée ou simplement en savoir plus sur notre collection, notre équipe est à votre disposition.",
    contact_info: [
      { label: "Galerie", value: "514-710-4230" },
      { label: "Courriel", value: "info@mlalondeartistepeintre.ca" },
    ],
    form_name: "Nom complet",
    form_email: "Adresse courriel",
    form_phone: "Téléphone (optionnel)",
    form_subject: "Objet de votre demande",
    form_subjects: [
      "Acquisition d'une œuvre",
      "Visite privée",
      "Renseignements généraux",
      "Partenariat ou presse",
      "Autre",
    ],
    form_message: "Votre message",
    form_submit: "Envoyer le message",
    form_note: "Nous vous répondrons dans les 24 heures ouvrables.",
  },
} as const;

export default fr;

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<Widen<U>>
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

export type Translations = Widen<typeof fr>;
