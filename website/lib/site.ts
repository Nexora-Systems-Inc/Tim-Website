import type { Metadata } from "next";

export const SITE_TITLE = "M Lalonde Artiste Peintre";

/** Canonical production domain — used for metadata, canonical URLs, and the private review page CTA. */
export const PRODUCTION_SITE_URL = "https://www.mlalondeartistepeintre.ca";

export const SITE_DESCRIPTION =
  "Une sélection de plus de 950 œuvres d'artistes peintres québécois. Des créations uniques pour compléter votre univers, taxes incluses.";

/** Landscape exhibition photograph used for Open Graph / Twitter cards. */
export const SITE_OG_IMAGE = "/images/hero/exhibition-west-palm-beach.png";

/** Drop `client-review.mp4` in `public/reviews/` — no code changes needed. */
export const REVIEW_VIDEO_SRC = "/reviews/client-review.mp4";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") {
    return PRODUCTION_SITE_URL;
  }
  return `${PRODUCTION_SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title?: string;
  description?: string;
  path?: string;
  index?: boolean;
};

export function createMetadata({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path = "/",
  index = true,
}: PageMetaInput = {}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = {
    url: SITE_OG_IMAGE,
    alt: SITE_TITLE,
    width: 1024,
    height: 608,
  };

  return {
    metadataBase: new URL(PRODUCTION_SITE_URL),
    title,
    description,
    applicationName: SITE_TITLE,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_TITLE,
      locale: "fr_CA",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_OG_IMAGE],
    },
  };
}
