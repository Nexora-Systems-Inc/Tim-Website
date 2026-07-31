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
        title: "Les Galeries d'Anjou",
        location: "Montreal, Quebec",
        description:
          "Placeholder description for the exhibition. This will later describe the event, location, dates, or featured collection.",
      },
      {
        title: "Symposium des Arts de Sherbrooke",
        location: "Sherbrooke, Quebec",
        description:
          "Placeholder description for the exhibition. This text will be replaced later.",
      },
    ],
  },
  collections: {
    eyebrow: "Thematic Collections",
    heading: "Works of Distinction",
    cta_all: "All Collections",
    explore: "Explore",
  },
  philosophy: {
    eyebrow: "Our Philosophy",
    heading: "Where art finds its rightful home",
    body_1:
      "For over three decades, we have dedicated ourselves to presenting the finest works of Québécois artists — from seasoned masters to emerging voices shaping tomorrow's canon.",
    body_2:
      "Our gallery in Sherbrooke is not merely a place of transaction, but a true sanctuary of culture. We believe exceptional art should be accessible to those who truly appreciate it — which is why we absorb all applicable taxes on every acquisition.",
    body_3:
      "Each work in our collection is carefully selected for its artistic merit, emotional resonance, and enduring cultural significance.",
    cta: "Discover Our Story",
    quote: "Art is not what you see, but what you make others see.",
    quote_author: "— Edgar Degas",
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
    cta_phone: "819-572-2099",
    badge: "All taxes included — no hidden fees",
  },
  footer: {
    tagline:
      "A sanctuary for Québécois art since 1994. Presenting over 950 original works by the province's most distinguished painters.",
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
    columns: {
      Collection: [
        "All Works",
        "Available Works",
        "New Creations",
        "Private Collections",
        "Sold Works",
      ],
      Àpropos: [
        "The Artist",
        "Philosophy",
        "Artistic Approach",
        "Inspiration",
      ],
      Contact: [
        "General Enquiry",
        "Acquire a Work",
        "Private Commissions",
        "Direct Contact",
      ],
    },
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
    hero_eyebrow: "Our Story",
    hero_heading: "Half a century\nof passion",
    hero_sub:
      "Founded in 1994 in Sherbrooke, Galerie Artistes Peintres has become one of the leading references for Québécois art.",
    story_eyebrow: "The Foundation",
    story_heading: "Born of a Vision",
    story_body_1:
      "The gallery was born in 1994 in a former downtown Sherbrooke factory, transformed into a luminous exhibition space by its founder, Claude Beaumont. His conviction was simple: Québécois art deserved a showcase worthy of its talent.",
    story_body_2:
      "Over the years, we have developed deep relationships with over forty artists from across the province, from established masters like Jules Michel and Stefan Hagiu to emerging talents we have had the privilege of introducing to the public.",
    story_body_3:
      "Our commitment to collectors is also reflected in our unique pricing policy: we absorb all applicable taxes on every acquisition, making exceptional art more accessible to those who truly appreciate it.",
    contact_eyebrow: "Write to Us",
    contact_heading: "Let's Begin the Conversation",
    contact_sub:
      "Whether you wish to acquire a work, arrange a private viewing, or simply learn more about our collection, our team is at your disposal.",
    contact_info: [
      { label: "Gallery", value: "514-710-4230" },
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
  },
};

export default en;
