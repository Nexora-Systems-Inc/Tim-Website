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
        title: "West Palm Beach",
        location: "Floride, 2021",
        description:
          "Exposition à West Palm Beach, Floride — 2021.",
      },
      {
        title: "Boca Raton",
        location: "Floride, 2020",
        description:
          "Exposition à Boca Raton, Floride — 2020.",
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
    eyebrow: "L'artiste",
    heading: "Une créativité révélée, puis cultivée",
    body_1:
      "C’est dans la quarantaine que la peinture est entrée dans ma vie — grâce à une amie qui a vu en moi des aptitudes que je ne me connaissais pas encore.",
    body_2:
      "Au fil des années, les rencontres et les ateliers ont nourri mon geste : de l’apprentissage auprès de Rosita Salvador aux hivers en Floride, jusqu’à la découverte d’une créativité sans bornes.",
    body_3:
      "Aujourd’hui, j’explore toujours de nouvelles façons de m’exprimer sur toile. Découvrez le chemin qui m’y a menée.",
    cta: "Lire mon histoire",
    quote: "J’explore toujours de nouvelles façons de m’exprimer sur toile.",
    quote_author: "— Manon Lalonde",
    portrait_alt: "Manon Lalonde peignant dans son atelier",
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
      { id: "all", label: "Tout", count: 28 },
      { id: "featured", label: "Vedette", count: 5 },
      { id: "sold", label: "Vendu", count: 5 },
    ],
    artworks: [],
  },

  // ══════════════════════════════════════════
  // ── CONTACT PAGE
  // ══════════════════════════════════════════
  contactPage: {
    meta_title: "Contact — M Lalonde Artiste Peintre",
    hero_eyebrow: "Nous joindre",
    hero_heading: "Entamons\nla conversation",
    hero_sub:
      "Pour acquérir une œuvre, planifier une visite privée, poser une question sur une exposition, une commande ou toute autre demande — nous serons ravis de vous répondre.",
  },

  // ══════════════════════════════════════════
  // ── ABOUT / CONTACT PAGE
  // ══════════════════════════════════════════
  aboutPage: {
    meta_title: "À propos — M Lalonde Artiste Peintre",

    // Hero
    hero_eyebrow: "L'artiste",
    hero_heading: "Manon Lalonde",
    hero_sub:
      "Un parcours de peinture né d’une rencontre, nourri par l’apprentissage, et porté par une curiosité qui ne s’éteint pas.",

    // Mon parcours
    parcours_eyebrow: "Mon parcours",
    parcours_heading: "Des aptitudes révélées",
    parcours_body_1:
      "C’est dans la quarantaine que j’ai commencé à m’intéresser à la peinture. Mon amie Rosita Salvador m’a convaincue de suivre des cours avec elle, parce qu’elle voyait en moi des aptitudes que je ne me connaissais pas.",
    parcours_body_2:
      "Pendant plus de trois ans, j’ai suivi ses conseils et laissé la créativité se développer en moi. Après son décès, j’ai poursuivi mon apprentissage pendant plusieurs hivers en Floride, en suivant des cours d’aquarelle avec Laurie Kirsch, ainsi qu’avec deux amis.",
    parcours_body_3:
      "Chaque semaine, nous échangions nos différentes techniques afin de nous améliorer — un dialogue vivant qui a profondément marqué ma façon de peindre.",

    // Ma démarche artistique
    demarche_eyebrow: "Ma démarche artistique",
    demarche_heading: "Une créativité sans bornes",
    demarche_body_1:
      "C’est au contact de Micheline de Grâce que j’ai découvert les possibilités sans bornes de la créativité. Cette ouverture a transformé mon rapport à la toile : chaque œuvre devient un espace d’exploration.",
    demarche_body_2:
      "Aujourd’hui, j’explore toujours de nouvelles façons de m’exprimer sur toile — attentive à ce que le geste, la couleur et la matière peuvent encore révéler.",

    portrait_alt: "Manon Lalonde, artiste peintre",
    portrait_caption_title: "Manon Lalonde",
    portrait_caption_sub: "Artiste peintre",

    // Contact (shared with contact page form)
    contact_eyebrow: "Nous écrire",
    contact_heading: "Entamons la conversation",
    contact_sub:
      "Pour acquérir une œuvre, planifier une visite privée ou simplement en savoir plus sur mon travail, je serai heureuse de vous répondre.",
    contact_info: [
      { label: "Téléphone", value: "514-710-4230" },
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
