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
