import catalog from "@/data/client-artworks.json";

export type ClientArtwork = {
  ref: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  price: string;
  sold: boolean;
  category: string;
  image: string;
  featured: boolean;
};

const MANON_ARTIST_PATTERN = /^(m\.?\s*lalonde|manon\s+lalonde)$/i;

function isManonArtwork(artwork: ClientArtwork): boolean {
  return MANON_ARTIST_PATTERN.test(artwork.artist.trim());
}

/** Gallery source of truth: Manon Lalonde works only. */
export const CLIENT_ARTWORKS = (catalog as ClientArtwork[]).filter(isManonArtwork);

export const FEATURED_CLIENT_ARTWORKS = CLIENT_ARTWORKS.filter((artwork) => artwork.featured);

export const SOLD_CLIENT_ARTWORKS = CLIENT_ARTWORKS.filter((artwork) => artwork.sold);
