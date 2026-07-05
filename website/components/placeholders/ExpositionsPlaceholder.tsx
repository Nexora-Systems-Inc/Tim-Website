"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// Fake upcoming show cards for visual richness
const UPCOMING = [
  {
    season: "Automne 2025",
    title: "Lumières du Nord",
    artist: "Stefan Hagiu & Rajka Kupesic",
    medium: "Huiles & techniques mixtes",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=700&q=80&fit=crop",
  },
  {
    season: "Hiver 2026",
    title: "Territoire Intérieur",
    artist: "Jules Michel",
    medium: "Grande salle — Œuvres monumentales",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=700&q=80&fit=crop",
  },
  {
    season: "Printemps 2026",
    title: "Voix Émergentes",
    artist: "Collectif de sept artistes",
    medium: "Exposition de groupe",
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=700&q=80&fit=crop",
  },
];

function UpcomingCard({
  show,
  index,
}: {
  show: (typeof UPCOMING)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 1.1 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative cursor-default group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "3/2" }}>
        <motion.img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ filter: "grayscale(20%) brightness(0.75)" }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: hovered
              ? "linear-gradient(to top, rgba(20,20,18,0.82) 0%, rgba(20,20,18,0.2) 60%, transparent 100%)"
              : "linear-gradient(to top, rgba(20,20,18,0.65) 0%, rgba(20,20,18,0.1) 70%, transparent 100%)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Season badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 text-[8.5px] tracking-[0.38em] uppercase"
          style={{ background: "rgba(20,20,18,0.7)", color: "var(--gold)", backdropFilter: "blur(8px)", border: "1px solid rgba(184,150,90,0.2)" }}
        >
          {show.season}
        </div>

        {/* À venir tag */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--gold)" }}
            />
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(247,244,239,0.55)" }}>
              À venir
            </span>
          </div>
        </div>

        <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.1)" }} />
      </div>

      {/* Text */}
      <h3
        className="font-serif mb-1.5"
        style={{
          color: "var(--ivory)",
          fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.15,
        }}
      >
        {show.title}
      </h3>
      <p className="text-[10.5px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--gold)" }}>
        {show.artist}
      </p>
      <p className="text-[12px]" style={{ color: "rgba(247,244,239,0.32)" }}>
        {show.medium}
      </p>

      {/* Animated underline */}
      <motion.div
        className="h-px mt-4"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45 }}
        style={{ background: "var(--gold)", transformOrigin: "left" }}
      />
    </motion.div>
  );
}

export default function ExpositionsPlaceholder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--charcoal)", minHeight: "100vh" }}
    >
      {/* Ambient gradient layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 70% 55% at 80% 20%, rgba(184,150,90,0.04) 0%, transparent 65%)",
              "radial-gradient(ellipse 50% 45% at 10% 85%, rgba(184,150,90,0.03) 0%, transparent 60%)",
            ].join(", "),
          }}
        />
      </motion.div>

      {/* ── Hero text block ── */}
      <div className="relative z-10 container pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-end">

          {/* Left: heading — 7 cols */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={mounted ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.45 }}
                style={{ height: "1px", width: "28px", background: "var(--gold)", transformOrigin: "left" }}
              />
              <span className="text-[9.5px] tracking-[0.44em] uppercase" style={{ color: "var(--gold)" }}>
                Programmation
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "108%", opacity: 0 }}
                animate={mounted ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1.05, delay: 0.5, ease: [0.22, 0.1, 0.22, 1] }}
                className="font-serif"
                style={{
                  fontSize: "clamp(3rem, 7.5vw, 7rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--ivory)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.02em",
                }}
              >
                Expositions
                <br />
                <span style={{ color: "rgba(247,244,239,0.35)" }}>à venir</span>
              </motion.h1>
            </div>
          </div>

          {/* Right: body copy — 4 cols, offset */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="lg:col-span-4 lg:col-start-9 lg:pb-2"
          >
            <p
              style={{
                color: "rgba(247,244,239,0.48)",
                fontSize: "14.5px",
                lineHeight: 1.9,
                marginBottom: "2rem",
              }}
            >
              Les prochaines expositions et présentations exclusives seront annoncées prochainement.
            </p>

            {/* Inline newsletter signup */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
                Inscrivez-vous pour recevoir les prochaines annonces
              </p>

              {!subscribed ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubscribed(true);
                  }}
                  className="flex gap-0"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre courriel"
                    required
                    className="flex-1 bg-transparent outline-none px-4 py-3 text-[12px]"
                    style={{
                      border: "1px solid rgba(184,150,90,0.22)",
                      borderRight: "none",
                      color: "var(--ivory)",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 text-[9px] tracking-[0.3em] uppercase transition-colors duration-400 shrink-0"
                    style={{ background: "var(--gold)", color: "var(--ivory)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
                  >
                    S&rsquo;inscrire
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="w-7 h-7 flex items-center justify-center shrink-0"
                    style={{ border: "1px solid var(--gold)" }}>
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4.5 8L11 1" stroke="#B8965A" strokeWidth="1.1" />
                    </svg>
                  </div>
                  <p className="text-[11px]" style={{ color: "rgba(247,244,239,0.5)" }}>
                    Inscription confirmée. Nous vous écrirons bientôt.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={mounted ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="relative z-10 container"
        style={{ transformOrigin: "left" }}
      >
        <div style={{ height: "1px", background: "rgba(184,150,90,0.15)" }} />
      </motion.div>

      {/* ── Upcoming shows grid ── */}
      <div className="relative z-10 container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex items-center justify-between mb-12 md:mb-14"
        >
          <span
            className="text-[9.5px] tracking-[0.38em] uppercase"
            style={{ color: "rgba(247,244,239,0.32)" }}
          >
            Aperçu de la saison
          </span>
          <span
            className="text-[9.5px] tracking-[0.32em] uppercase"
            style={{ color: "rgba(247,244,239,0.2)" }}
          >
            3 expositions planifiées
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {UPCOMING.map((show, i) => (
            <UpcomingCard key={show.title} show={show} index={i} />
          ))}
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="relative z-10 container pb-14"
      >
        <div style={{ height: "1px", background: "rgba(184,150,90,0.1)", marginBottom: "2rem" }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <span className="text-[9px] tracking-[0.36em] uppercase" style={{ color: "rgba(184,150,90,0.3)" }}>
            Galerie Artistes Peintres · Sherbrooke
          </span>
          <Link
            href="/a-propos#contact"
            className="link-arrow text-[9.5px]"
            style={{ color: "rgba(247,244,239,0.3)" }}
          >
            Demande d&rsquo;information pour les expositions
            <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden>
              <path d="M0 3H14M11 1L14 3L11 5" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
