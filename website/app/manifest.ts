import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: "M Lalonde",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    lang: "fr",
    background_color: "#F7F4EF",
    theme_color: "#1C1C1A",
  };
}
