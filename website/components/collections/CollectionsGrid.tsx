"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Artwork = {
  ref: string; title: string; artist: string; year: string;
  medium: string; dimensions: string; price: string;
  category: string; image: string; featured: boolean;
};

/* ─── Lightbox ──────────────────────────────────────────── */
function Lightbox({ work, onClose }: { work: Artwork; onClose: () => void }) {
  const { t } = useI18n();
  const c = t.collectionsPage;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(20,20,18,0.94)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-5xl flex flex-col md:flex-row gap-0"
        style={{ background: "var(--charcoal-mid)", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image panel */}
        <div className="relative md:w-[58%] overflow-hidden" style={{ minHeight: "300px" }}>
          <img src={work.image} alt={work.title} className="w-full h-full object-cover" style={{ maxHeight: "75vh" }} />
          {/* Ref badge */}
          <span className="absolute top-4 left-4 text-[9px] tracking-[0.28em] px-2.5 py-1"
            style={{ background: "rgba(20,20,18,0.65)", color: "rgba(247,244,239,0.5)", backdropFilter: "blur(8px)" }}>
            {work.ref}
          </span>
        </div>

        {/* Info panel */}
        <div className="md:w-[42%] flex flex-col justify-between p-8 md:p-10">
          <div>
            {/* Artist */}
            <p className="text-[10px] tracking-[0.38em] uppercase mb-3" style={{ color: "var(--gold)" }}>
              {work.artist} — {work.year}
            </p>

            {/* Title */}
            <h2 className="font-serif mb-6"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 300, fontStyle: "italic", color: "var(--ivory)", lineHeight: 1.1 }}>
              {work.title}
            </h2>

            {/* Divider */}
            <div className="mb-6" style={{ height: "1px", background: "rgba(184,150,90,0.2)" }} />

            {/* Details */}
            <dl className="space-y-3">
              {[
                ["Technique", work.medium],
                ["Format",    work.dimensions],
                ["Référence", work.ref],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(247,244,239,0.35)" }}>{label}</dt>
                  <dd className="text-[12px] text-right" style={{ color: "rgba(247,244,239,0.65)" }}>{val}</dd>
                </div>
              ))}
            </dl>

            {/* Divider */}
            <div className="my-6" style={{ height: "1px", background: "rgba(184,150,90,0.2)" }} />

            {/* Price */}
            <div className="flex items-baseline justify-between mb-8">
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(247,244,239,0.35)" }}>Prix</span>
              <span className="font-serif text-2xl" style={{ color: "var(--gold)", fontWeight: 300, fontStyle: "italic" }}>
                {work.price} $
              </span>
            </div>

            {/* Tax note */}
            <p className="text-[10px] tracking-[0.22em]" style={{ color: "rgba(184,150,90,0.45)" }}>
              Toutes taxes incluses
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 mt-8">
            <button className="btn-gold justify-center">{c.inquiry}</button>
            <button
              onClick={onClose}
              className="text-[10px] tracking-[0.28em] uppercase py-2 text-center transition-colors duration-300"
              style={{ color: "rgba(247,244,239,0.3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.65)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.3)"; }}
            >
              Fermer
            </button>
          </div>
        </div>

        {/* Close × */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-all duration-300"
          style={{ color: "rgba(247,244,239,0.4)", border: "1px solid rgba(247,244,239,0.12)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,244,239,0.12)"; }}
          aria-label="Fermer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Single artwork card ──────────────────────────────── */
function ArtworkCard({ work, index, onOpen }: { work: Artwork; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Vary card height for editorial masonry rhythm
  const heights = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/5]"];
  const aspectClass = work.featured ? "aspect-[3/4]" : heights[index % heights.length];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden mb-4 ${aspectClass}`}>
        <motion.img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.055 : 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Hover reveal */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5"
          animate={{ background: hovered ? "linear-gradient(to top, rgba(20,20,18,0.75) 0%, rgba(20,20,18,0.1) 55%, transparent 100%)" : "linear-gradient(to top, rgba(20,20,18,0.35) 0%, transparent 60%)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2"
          >
            <span className="text-[9.5px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
              Voir l'œuvre
            </span>
            <svg width="16" height="6" viewBox="0 0 16 6" fill="none">
              <path d="M0 3H14M11 1L14 3L11 5" stroke="#B8965A" strokeWidth="0.8" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Ref tag */}
        <span className="absolute top-3 left-3 text-[8.5px] tracking-[0.22em]"
          style={{ color: "rgba(247,244,239,0.42)" }}>
          {work.ref}
        </span>

        {/* Featured badge */}
        {work.featured && (
          <span className="absolute top-3 right-3 text-[8px] tracking-[0.3em] uppercase px-2.5 py-1"
            style={{ background: "var(--gold)", color: "var(--ivory)" }}>
            Vedette
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="pr-2">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="font-serif leading-tight"
            style={{ color: "var(--charcoal)", fontSize: "1.05rem", fontWeight: 400, fontStyle: "italic" }}>
            {work.title}
          </h3>
          <span className="font-serif text-[0.9rem] shrink-0 pt-0.5"
            style={{ color: "var(--gold)", fontWeight: 300 }}>
            {work.price} $
          </span>
        </div>
        <p className="text-[10px] tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--warm-gray)" }}>
          {work.artist}
        </p>
        <p className="text-[11px]" style={{ color: "rgba(28,28,26,0.38)" }}>
          {work.medium} · {work.year}
        </p>

        {/* Gold reveal line */}
        <motion.div
          className="h-px mt-3"
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          style={{ background: "var(--gold)", transformOrigin: "left" }}
        />
      </div>
    </motion.article>
  );
}

/* ─── Main grid ────────────────────────────────────────── */
export default function CollectionsGrid() {
  const { t } = useI18n();
  const c = t.collectionsPage;

  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxWork, setLightboxWork] = useState<Artwork | null>(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const filtered = activeCategory === "all"
    ? (c.artworks as unknown as Artwork[])
    : (c.artworks as unknown as Artwork[]).filter((w) => w.category === activeCategory);

  return (
    <>
      <section className="section-pad-lg" style={{ background: "var(--ivory)" }}>
        <div className="container">

          {/* Filter bar */}
          <div ref={headerRef} className="mb-14 md:mb-18">
            {/* Top row: label + count */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-between mb-8"
            >
              <span className="eyebrow">{c.filter_label}</span>
              <span className="text-[11px] tracking-[0.2em]" style={{ color: "var(--warm-gray)" }}>
                {filtered.length} {(c as { works_count_suffix: string }).works_count_suffix}
              </span>
            </motion.div>

            {/* Category pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {(c.categories as unknown as Array<{ id: string; label: string; count: number }>).map((cat) => {
                const active = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase transition-all duration-400"
                    style={{
                      background: active ? "var(--charcoal)" : "transparent",
                      color: active ? "var(--ivory)" : "var(--warm-gray)",
                      border: `1px solid ${active ? "var(--charcoal)" : "rgba(140,136,128,0.3)"}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--charcoal)";
                        (e.currentTarget as HTMLElement).style.color = "var(--charcoal)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(140,136,128,0.3)";
                        (e.currentTarget as HTMLElement).style.color = "var(--warm-gray)";
                      }
                    }}
                  >
                    {cat.label}
                    <span style={{ color: active ? "var(--gold)" : "rgba(140,136,128,0.5)", fontSize: "9px" }}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Divider */}
            <div className="mt-8 section-rule" />
          </div>

          {/* Masonry-style grid — 2 col mobile, 3 col tablet, 4 col desktop */}
          {/* We use CSS columns for true masonry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  columns: "4",
                  columnGap: "1.5rem",
                }}
                className="masonry-grid"
              >
                <style>{`
                  @media (max-width: 640px) { .masonry-grid { columns: 2 !important; } }
                  @media (min-width: 641px) and (max-width: 900px) { .masonry-grid { columns: 3 !important; } }
                  .masonry-grid > article { break-inside: avoid; margin-bottom: 1.5rem; }
                `}</style>
                {filtered.map((work, i) => (
                  <ArtworkCard
                    key={work.ref}
                    work={work as unknown as Artwork}
                    index={i}
                    onOpen={() => setLightboxWork(work as unknown as Artwork)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Load more hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex flex-col items-center gap-5 text-center"
          >
            <div className="gold-rule w-24 mx-auto" />
            <p className="text-[11px] tracking-[0.22em]" style={{ color: "var(--warm-gray)" }}>
              Affichant {filtered.length} œuvres sur {c.categories[0].count}+
            </p>
            <button className="btn-outline-dark mt-2">
              Charger plus d'œuvres
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxWork && (
          <Lightbox work={lightboxWork} onClose={() => setLightboxWork(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
