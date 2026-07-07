"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const ARTWORK_IMAGES = [
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1509839862426-cfed742f4e23?w=800&q=85&fit=crop",
];

function ArtCard({
  work,
  image,
  index,
  viewLabel,
}: {
  work: { ref: string; title: string; artist: string; year: string; medium: string; dimensions: string; price: string };
  image: string;
  index: number;
  viewLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay: index * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
        <motion.img
          src={image}
          alt={work.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ background: hovered ? "rgba(20,20,18,0.42)" : "rgba(20,20,18,0)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="text-[9.5px] tracking-[0.32em] uppercase px-5 py-2.5"
            style={{ border: "1px solid rgba(247,244,239,0.55)", color: "var(--ivory)" }}
          >
            {viewLabel}
          </motion.span>
        </motion.div>

        <span
          className="absolute top-3.5 left-3.5 text-[9px] tracking-[0.22em]"
          style={{ color: "rgba(247,244,239,0.4)" }}
        >
          {work.ref}
        </span>
      </div>

      {/* Metadata */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-serif leading-tight"
            style={{ color: "var(--charcoal)", fontSize: "1.15rem", fontWeight: 400, fontStyle: "italic" }}
          >
            {work.title}
          </h3>
          <span
            className="font-serif text-[0.95rem] shrink-0 pt-0.5"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            {work.price} $
          </span>
        </div>

        <p
          className="text-[10.5px] tracking-[0.18em] uppercase mb-1"
          style={{ color: "var(--warm-gray)" }}
        >
          {work.artist} — {work.year}
        </p>
        <p className="text-[11px]" style={{ color: "rgba(28,28,26,0.38)", lineHeight: 1.5 }}>
          {work.medium}
        </p>

        {/* Animated underline */}
        <motion.div
          className="h-px mt-4"
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: "var(--gold)", transformOrigin: "left" }}
        />
      </div>
    </motion.article>
  );
}

export default function ArtworkShowcase() {
  const { t } = useI18n();
  const s = t.showcase;
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="section-pad-lg"
      style={{
        background: "var(--cream)",
        borderTop: "1px solid var(--ivory-dark)",
      }}
    >
      <div className="container">
        {/* Section header — 3-col editorial layout */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 mb-16 md:mb-20"
        >
          {/* Left: eyebrow + heading */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-6"
              style={{ color: "var(--gold)" }}
            >
              {s.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.1 }}
              className="font-serif"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 3.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.1,
              }}
            >
              {s.heading_line1}
              <br />
              <span style={{ color: "var(--warm-gray-lt)" }}>{s.heading_line2}</span>
            </motion.h2>
          </div>

          {/* Right: body + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="flex flex-col justify-end"
          >
            <p
              className="mb-6 leading-relaxed"
              style={{ color: "var(--warm-gray)", fontSize: "14px", lineHeight: 1.85 }}
            >
              {s.body}
            </p>
            <a href="#" className="link-arrow" style={{ color: "var(--charcoal)" }}>
              {s.cta_all}
              <svg width="18" height="7" viewBox="0 0 18 7" fill="none" aria-hidden>
                <path d="M0 3.5H16M13 1L16 3.5L13 6" stroke="currentColor" strokeWidth="0.9" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Grid of 5 works */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6 lg:gap-7">
          {s.artworks.map((work, i) => (
            <ArtCard
              key={work.ref}
              work={work}
              image={ARTWORK_IMAGES[i]}
              index={i}
              viewLabel={s.view_work}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
