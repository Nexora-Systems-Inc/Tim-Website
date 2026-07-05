"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ARTWORKS = [
  {
    id: 1,
    ref: "G-0963",
    title: "Tirlata Sturt Pers",
    artist: "Jules Michel",
    year: "1977",
    medium: "Mixed Media — Oil on Canvas",
    dimensions: '46" × 34"',
    price: "10,000",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=85&fit=crop",
  },
  {
    id: 2,
    ref: "G-0228",
    title: "Urbanisation",
    artist: "Stefan Hagiu",
    year: "2019",
    medium: "Oil on Canvas",
    dimensions: '96" × 48"',
    price: "4,995",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=85&fit=crop",
  },
  {
    id: 3,
    ref: "G-0967",
    title: "Pastoral Winter",
    artist: "Rajka Kupesic",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: '16½" × 12½"',
    price: "2,995",
    image: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=85&fit=crop",
  },
  {
    id: 4,
    ref: "G-1030",
    title: "Portrait de Femme",
    artist: "Elena Carla",
    year: "2023",
    medium: "Oil on Canvas",
    dimensions: '31" × 46"',
    price: "2,995",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=85&fit=crop",
  },
  {
    id: 5,
    ref: "G-0192",
    title: "Le Fleuve de la Vie",
    artist: "Liguori Vachon",
    year: "2020",
    medium: "Acrylic on Canvas — Triptych",
    dimensions: '72" × 48"',
    price: "2,995",
    image: "https://images.unsplash.com/photo-1509839862426-cfed742f4e23?w=800&q=85&fit=crop",
  },
];

function ArtworkCard({ work, index }: { work: typeof ARTWORKS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden mb-6"
        style={{ aspectRatio: "3/4" }}
      >
        <motion.img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            background: hovered ? "rgba(28,28,26,0.45)" : "rgba(28,28,26,0)",
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-3 text-[10px] tracking-[0.3em] uppercase"
            style={{
              border: "1px solid rgba(247,244,239,0.6)",
              color: "var(--ivory)",
            }}
          >
            View Work
          </motion.div>
        </motion.div>

        {/* Reference */}
        <div
          className="absolute top-4 left-4 text-[9px] tracking-[0.25em]"
          style={{ color: "rgba(247,244,239,0.5)" }}
        >
          {work.ref}
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3
            className="font-serif"
            style={{
              color: "var(--charcoal)",
              fontSize: "1.2rem",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.2,
            }}
          >
            {work.title}
          </h3>
          <span
            className="font-serif text-base ml-4 shrink-0"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            ${work.price}
          </span>
        </div>

        <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--warm-gray)" }}>
          {work.artist} — {work.year}
        </p>

        <p className="text-[11px]" style={{ color: "rgba(28,28,26,0.45)" }}>
          {work.medium} · {work.dimensions}
        </p>

        {/* Underline on hover */}
        <motion.div
          className="h-px mt-4"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: "var(--gold)", transformOrigin: "left" }}
        />
      </div>
    </motion.article>
  );
}

export default function ArtworkShowcase() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section className="py-28 md:py-36" style={{ background: "var(--cream)" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div ref={titleRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 mb-5"
              style={{ color: "var(--gold)" }}
            >
              <span className="h-px w-8 inline-block" style={{ background: "var(--gold)" }} />
              Featured Acquisitions
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.1,
              }}
            >
              Selected Works
              <br />
              <span style={{ color: "var(--warm-gray)" }}>Available Now</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-end"
          >
            <p className="mb-6 leading-relaxed" style={{ color: "var(--warm-gray)", fontSize: "14px", lineHeight: 1.8 }}>
              Each work has been individually authenticated and curated from the ateliers of Québec's most compelling artistic voices.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase group transition-colors duration-300"
              style={{ color: "var(--charcoal)" }}
            >
              Browse All 950+ Works
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                <path d="M0 4H18M14 1L18 4L14 7" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Artwork grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {ARTWORKS.map((work, i) => (
            <ArtworkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
