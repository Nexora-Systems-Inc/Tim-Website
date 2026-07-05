import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import Philosophy from "@/components/Philosophy";
import ArtworkShowcase from "@/components/ArtworkShowcase";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Collections />
      <Philosophy />
      <ArtworkShowcase />
      <CallToAction />
      <Footer />
    </main>
  );
}
