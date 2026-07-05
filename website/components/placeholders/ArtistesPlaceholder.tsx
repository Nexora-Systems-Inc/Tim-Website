"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_TITLE } from "@/lib/site";
import Link from "next/link";

const ARTIST_IMAGES = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80&fit=crop",
];

// Floating ambient image — drifts very slowly
function AmbientImage({
  src, style, delay,
}: {
  src: string;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute overflow-hidden pointer-events-none select-none"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.img
        src={src}
        alt=""
        aria-hidden
        className="w-full h-full object-cover"
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 8 + delay * 2,
          ease: "easeInOut",
          delay: delay * 1.5,
        }}
        style={{ filter: "grayscale(35%) brightness(0.6)" }}
      />
      {/* Inner veil */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(20,20,18,0.35)", boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.12)" }}
      />
    </motion.div>
  );
}

export default function ArtistesPlaceholder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--charcoal)" }}
    >
      {/* ── Slow-drifting background wash ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 80% 60% at 15% 40%, rgba(184,150,90,0.045) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 50% at 85% 70%, rgba(28,28,26,0.8) 0%, transparent 80%)",
            ].join(", "),
          }}
        />
      </motion.div>

      {/* ── Floating ambient artwork fragments ── */}
      <AmbientImage
        src={ARTIST_IMAGES[0]}
        delay={0.6}
        style={{
          width: "clamp(160px, 18vw, 280px)",
          height: "clamp(200px, 24vw, 360px)",
          top: "12%",
          right: "6%",
          opacity: 0.55,
        }}
      />
      <AmbientImage
        src={ARTIST_IMAGES[1]}
        delay={1.0}
        style={{
          width: "clamp(110px, 12vw, 190px)",
          height: "clamp(140px, 16vw, 250px)",
          bottom: "18%",
          right: "22%",
          opacity: 0.35,
        }}
      />
      <AmbientImage
        src={ARTIST_IMAGES[2]}
        delay={1.4}
        style={{
          width: "clamp(90px, 10vw, 160px)",
          height: "clamp(110px, 13vw, 210px)",
          top: "30%",
          left: "2%",
          opacity: 0.28,
        }}
      />
      <AmbientImage
        src={ARTIST_IMAGES[3]}
        delay={1.8}
        style={{
          width: "clamp(70px, 7vw, 120px)",
          height: "clamp(90px, 9vw, 155px)",
          bottom: "28%",
          left: "14%",
          opacity: 0.22,
        }}
      />

      {/* ── Main content — centred ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center container py-32 md:py-40">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={mounted ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ height: "1px", width: "36px", background: "var(--gold)", transformOrigin: "right" }}
          />
          <span
            className="text-[9.5px] tracking-[0.46em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            Accès Privé
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={mounted ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{ height: "1px", width: "36px", background: "var(--gold)", transformOrigin: "left" }}
          />
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "108%", opacity: 0 }}
            animate={mounted ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 1.05, delay: 0.45, ease: [0.22, 0.1, 0.22, 1] }}
            className="font-serif"
            style={{
              fontSize: "clamp(3.4rem, 8vw, 7.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--ivory)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Accès Privé
          </motion.h1>
        </div>

        {/* Ornamental gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={mounted ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.85 }}
          className="mb-10"
          style={{
            height: "1px",
            width: "clamp(60px, 8vw, 100px)",
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          }}
        />

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.95 }}
          style={{
            color: "rgba(247,244,239,0.5)",
            fontSize: "clamp(14px, 1.6vw, 16px)",
            lineHeight: 1.9,
            maxWidth: "520px",
            marginBottom: "1rem",
          }}
        >
          Cette section sera prochainement dédiée à l&rsquo;accès exclusif aux collections,
          aux événements privés et aux expériences personnalisées de la galerie.
        </motion.p>

        {/* Sub-copy / CTA text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mb-14"
          style={{
            color: "rgba(247,244,239,0.28)",
            fontSize: "13px",
            letterSpacing: "0.05em",
            lineHeight: 1.7,
          }}
        >
          Revenez bientôt pour découvrir cette expérience.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/a-propos#contact" className="btn-gold">
            Nous contacter
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
              <path d="M0 4.5H12M8.5 1L12 4.5L8.5 8" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
          <Link href="/collections" className="btn-outline">
            Explorer la collection
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom progress indicator — animated gold line ── */}
      <motion.div
        className="relative z-10 container pb-12 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.7 }}
      >
        <div style={{ height: "1px", flex: 1, background: "rgba(184,150,90,0.12)" }} />
        <span
          className="text-[9px] tracking-[0.38em] uppercase"
          style={{ color: "rgba(184,150,90,0.35)" }}
        >
          {SITE_TITLE} · Sherbrooke
        </span>
        <div style={{ height: "1px", flex: 1, background: "rgba(184,150,90,0.12)" }} />
      </motion.div>
    </section>
  );
}
