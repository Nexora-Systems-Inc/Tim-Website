import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutContact from "@/components/about/AboutContact";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${SITE_TITLE}`,
  description:
    "Que vous souhaitiez acquérir une œuvre, planifier une visite privée ou simplement en savoir plus sur notre collection, notre équipe est à votre disposition.",
};

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <AboutContact />
      <Footer />
    </main>
  );
}
