// English translations — mirrors fr.ts structure for future FR/EN toggle.
// NOTE: footer.columns keys intentionally use the same French strings as fr.ts
// so the Translations type (derived from fr.ts) remains satisfied.
// When the EN toggle is wired up, column heading display can be localised
// in the Footer component via a separate heading map.

import type { Translations } from "./fr";

const en: Translations = {
  nav: {
    collections: "Collections",
    artists: "Artists",
    exhibitions: "Exhibitions",
    about: "About",
    contact: "Contact",
    cta: "View Collection",
    gallery_subtitle: "Artistes Peintres",
    mobile_location: "Sherbrooke, Québec",
  },

  hero: {
    eyebrow: "Featured Work",
    cta_primary: "Explore Collection",
    cta_secondary: "Our Story",
    scroll_label: "Scroll",
    works: [
      { title: "The Golden Dawn", artist: "Jules Michel", year: "1977" },
      { title: "Persian Market", artist: "Stefan Hagiu", year: "2019" },
      { title: "Pastoral Winter", artist: "Rajka Kupesic", year: "2024" },
    ],
  },

  collections: {
    eyebrow: "Thematic Collections",
    heading: "Works of Distinction",
    cta_all: "All Collections",
    explore: "Explore",
    items: [
      { title: "Contemporary Masters", subtitle: "Current painting", count: "47 works" },
      { title: "Québec Landscape", subtitle: "Territories & light", count: "83 works" },
      { title: "Lyrical Abstraction", subtitle: "Form & colour", count: "31 works" },
      { title: "Still Life", subtitle: "Objects & compositions", count: "24 works" },
    ],
  },

  philosophy: {
    eyebrow: "Our Philosophy",
    heading: "Where art finds its rightful home",
    body_1:
      "For over three decades, we have dedicated ourselves to presenting the finest works of Québécois artists — from seasoned masters to emerging voices shaping tomorrow's canon.",
    body_2:
      "Our gallery in Sherbrooke is not merely a place of transaction, but a sanctuary of culture. We believe that exceptional art should be accessible to those who truly appreciate it — which is why we absorb all applicable taxes on every acquisition.",
    body_3:
      "Each work in our collection is carefully selected for its artistic merit, emotional resonance, and enduring cultural significance.",
    cta: "Discover Our Story",
    quote: "Art is not what you see, but what you make others see.",
    quote_author: "— Edgar Degas",
    stats: [
      { value: "950+", label: "Original Works" },
      { value: "40+", label: "Québécois Artists" },
      { value: "30", label: "Years of Curation" },
      { value: "0%", label: "Sales Tax" },
    ],
  },

  showcase: {
    eyebrow: "Recent Acquisitions",
    heading_line1: "Selected Works",
    heading_line2: "Available Now",
    body: "Each work has been individually authenticated and curated from the ateliers of Québec's most compelling artistic voices.",
    cta_all: "Browse All 950+ Works",
    view_work: "View Work",
    artworks: [
      { ref: "G-0963", title: "Tirlata Sturt Pers", artist: "Jules Michel", year: "1977", medium: "Mixed Media — Oil on Canvas", dimensions: '46" × 34"', price: "10,000" },
      { ref: "G-0228", title: "Urbanisation", artist: "Stefan Hagiu", year: "2019", medium: "Oil on Canvas", dimensions: '96" × 48"', price: "4,995" },
      { ref: "G-0967", title: "Pastoral Winter", artist: "Rajka Kupesic", year: "2024", medium: "Oil on Canvas", dimensions: '16½" × 12½"', price: "2,995" },
      { ref: "G-1030", title: "Portrait de Femme", artist: "Elena Carla", year: "2023", medium: "Oil on Canvas", dimensions: '31" × 46"', price: "2,995" },
      { ref: "G-0192", title: "Le Fleuve de la Vie", artist: "Liguori Vachon", year: "2020", medium: "Acrylic on Canvas — Triptych", dimensions: '72" × 48"', price: "2,995" },
    ],
  },

  cta: {
    eyebrow: "Private Viewings Available",
    heading: "Begin Your Collection",
    body: "Our curators are available by appointment to guide you through our collection and help you find the work that speaks to you.",
    cta_primary: "Schedule a Visit",
    cta_phone: "819-572-2099",
    badge: "All taxes included — No hidden fees",
  },

  footer: {
    tagline:
      "A sanctuary for Québécois art since 1994. Presenting over 950 original works by the province's most distinguished painters.",
    location_label: "Location",
    location_value: "Sherbrooke, Québec, Canada",
    contact_label: "Contact",
    newsletter_heading: "Stay Informed",
    newsletter_body: "New acquisitions, exhibition openings, and collector insights.",
    newsletter_placeholder: "Your email address",
    newsletter_cta: "Subscribe",
    copyright: "© 2025 Galerie Artistes Peintres, Sherbrooke. All rights reserved.",
    legal: ["Privacy", "Terms", "Accessibility"],
    // Column heading keys must match fr.ts keys exactly (type constraint).
    // In the Footer component, add a headingMap to display localised labels.
    columns: {
      Collection: ["All Works", "Under $500", "Over $500", "New Arrivals", "Sold Works"],
      Artistes: ["Jules Michel", "Stefan Hagiu", "Rajka Kupesic", "Elena Carla", "All Artists"],
      Galerie: ["Our Philosophy", "Exhibitions", "Private Events", "Press", "Careers"],
      Services: ["Private Viewings", "Art Consulting", "Framing", "Shipping", "Returns"],
    },
  },
};

export default en;
