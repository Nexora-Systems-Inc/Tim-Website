import type { Translations } from "./fr";

const en: Translations = {
  nav: {
    home: "Home",
    collections: "Collections",
    artists: "Artists",
    exhibitions: "Exhibitions",
    about: "About",
    contact: "Contact",
    cta: "View Collection",
    gallery_title: "M Lalonde",
    gallery_subtitle: "Artiste Peintre",
    mobile_location: "Sherbrooke, Québec",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/a-propos" },
      { label: "Collections", href: "/collections" },
      { label: "Contact", href: "/contact" },
    ],
  },
  hero: {
    eyebrow: "Featured Exhibition",
    cta_primary: "Explore Collection",
    cta_secondary: "Our Story",
    scroll_label: "Scroll",
    exhibitions: [
      {
        title: "West Palm Beach",
        location: "Florida, 2021",
        description:
          "Exhibition in West Palm Beach, Florida — 2021.",
      },
      {
        title: "Boca Raton",
        location: "Florida, 2020",
        description:
          "Exhibition in Boca Raton, Florida — 2020.",
      },
    ],
  },
  collections: {
    eyebrow: "Thematic Collections",
    heading: "Works of Distinction",
    cta_all: "All Collections",
    explore: "Explore",
    cta_atelier: "VISITE EN ATELIER POSSIBLE",
  },
  philosophy: {
    eyebrow: "The Artist",
    heading: "A creativity revealed, then cultivated",
    body_1:
      "Painting entered my life in my forties — thanks to a friend who saw abilities in me that I did not yet know I had.",
    body_2:
      "Over the years, encounters and workshops nurtured my practice: learning alongside Rosita Salvador, winters in Florida, and the discovery of creativity without limits.",
    body_3:
      "Today, I am still exploring new ways to express myself on canvas. Discover the path that brought me here.",
    cta: "Read my story",
    quote: "I am still exploring new ways to express myself on canvas.",
    quote_author: "— Manon Lalonde",
    portrait_alt: "Manon Lalonde painting in her studio",
  },
  showcase: {
    eyebrow: "Private Collections",
    heading_line1: "Acquired Works",
    heading_line2: "Now in private collections.",
    body: "These paintings continue their story with their collectors — each one marks a completed dialogue between the artist and those who chose to give it a home.",
    cta_all: "View All Sold Works",
  },
  cta: {
    eyebrow: "Private Viewings by Appointment",
    heading: "A Personal Collection to Discover",
    body: "Each creation reflects a sensitive, warm, and deeply human artistic vision. Contact us directly for any inquiry or acquisition.",
    cta_primary: "View Collection",
    badge: "All taxes included — no hidden fees",
  },
  footer: {
    location_label: "Address",
    location_value: "St-Jean-Baptiste, Québec, Canada",
    contact_label: "Contact",
    newsletter_heading: "Stay Informed",
    newsletter_body:
      "New acquisitions, exhibition openings, and collector insights.",
    newsletter_placeholder: "Your email address",
    newsletter_cta: "Subscribe",
    copyright:
      "© 2025 M Lalonde Artiste Peintre, Sherbrooke. All rights reserved.",
    legal: ["Privacy", "Terms", "Accessibility"],
  },
  collectionsPage: {
    meta_title: "Collections — M Lalonde Artiste Peintre",
    hero_eyebrow: "Complete Catalogue",
    hero_heading: "The Collection",
    hero_sub:
      "Over 950 original works by Québécois painters, carefully selected.",
    filter_all: "All",
    filter_label: "Filter by",
    sort_label: "Sort",
    sort_recent: "Most recent",
    sort_price_asc: "Price ascending",
    sort_price_desc: "Price descending",
    works_count_suffix: "works",
    view_detail: "View Work",
    inquiry: "Enquire",
    inquiry_heading: "Interested in this artwork?",
    inquiry_cta: "Contact the Artist",
    inquiry_message:
      "Hello,\n\nI am interested in the artwork “{title}” (ref. {ref}).\n\nCould you please share more information?\n\nThank you.",
    close_label: "Close",
    prev_artwork: "Previous painting",
    next_artwork: "Next painting",
    sold: "Sold",
    sold_label: "Sold",
    sold_acquired: "Work acquired",
    featured_label: "Featured",
    categories: [
      { id: "all", label: "All", count: 28 },
      { id: "featured", label: "Featured", count: 5 },
      { id: "sold", label: "Sold", count: 5 },
    ],
    artworks: [],
  },
  contactPage: {
    meta_title: "Contact — M Lalonde Artiste Peintre",
    hero_eyebrow: "Get in Touch",
    hero_heading: "Let's Begin\nthe Conversation",
    hero_sub:
      "Whether you wish to acquire a work, arrange a private viewing, ask about an exhibition, a commission, or any other enquiry — we would be delighted to hear from you.",
  },
  aboutPage: {
    meta_title: "About — M Lalonde Artiste Peintre",
    hero_eyebrow: "The Artist",
    hero_heading: "Manon Lalonde",
    hero_sub:
      "A painting journey born of an encounter, nourished by learning, and carried by a curiosity that never fades.",
    parcours_eyebrow: "My path",
    parcours_heading: "Abilities revealed",
    parcours_body_1:
      "I began taking an interest in painting in my forties. My friend Rosita Salvador convinced me to take classes with her, because she saw abilities in me that I did not know I had.",
    parcours_body_2:
      "For more than three years, I followed her guidance and let creativity grow within me. After her passing, I continued learning over several winters in Florida, taking watercolour classes with Laurie Kirsch, as well as with two friends.",
    parcours_body_3:
      "Each week, we exchanged techniques to improve — a living dialogue that deeply shaped the way I paint.",
    demarche_eyebrow: "My artistic approach",
    demarche_heading: "Creativity without limits",
    demarche_body_1:
      "Through Micheline de Grâce, I discovered the boundless possibilities of creativity. That openness transformed my relationship to the canvas: each work becomes a space for exploration.",
    demarche_body_2:
      "Today, I am still exploring new ways to express myself on canvas — attentive to what gesture, colour, and material can still reveal.",
    portrait_alt: "Manon Lalonde, painter",
    portrait_caption_title: "Manon Lalonde",
    portrait_caption_sub: "Painter",
    contact_eyebrow: "Write to Us",
    contact_heading: "Let's Begin the Conversation",
    contact_sub:
      "Whether you wish to acquire a work, arrange a private viewing, or simply learn more about my practice, I would be delighted to hear from you.",
    contact_info: [
      { label: "Phone", value: "514-710-4230" },
      { label: "Email", value: "info@mlalondeartistepeintre.ca" },
    ],
    form_name: "Full name",
    form_email: "Email address",
    form_phone: "Phone (optional)",
    form_subject: "Subject",
    form_subjects: [
      "Acquire a Work",
      "Private Viewing",
      "General Enquiry",
      "Partnership or Press",
      "Other",
    ],
    form_message: "Your message",
    form_submit: "Send Message",
    form_note: "We will respond within 24 business hours.",
    form_artwork_context: "Regarding: {title} ({ref})",
  },
};

export default en;
