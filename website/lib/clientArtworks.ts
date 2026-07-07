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

export const CLIENT_ARTWORKS = catalog as ClientArtwork[];

export const FEATURED_CLIENT_ARTWORKS = CLIENT_ARTWORKS.filter((artwork) => artwork.featured);
