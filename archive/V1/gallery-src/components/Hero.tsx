"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Artwork data using Unsplash for hero imagery
const HERO_WORKS = [
  {
    id: 1,
    title: "L'Aube Dorée",
    artist: "Jules Michel",
    year: "1977",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1800&q=85&fit=crop",
  },
  {
    id: 2,
    title: "Marché Persan",
    artist: "Stefan Hagiu",
    year: "2019",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1800&q=85&fit=crop",
  },
  {
    id: 3,
    title: "Pastoral Winter",
    artist: "Rajka Kupesic",
    year: "2024",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1800&q=85&fit=crop",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_WORKS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = HERO_WORKS[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background images */}
      {HERO_WORKS.map((work, i) => (
        <motion.div
          key={work.id}
          className="absolute inset-0"
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div className="absolute inset-0 scale-105" style={{ y }}>
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(28,28,26,0.75) 0%, rgba(28,28,26,0.35) 50%, rgba(28,28,26,0.2) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10"
        style={{
          background: "linear-gradient(to top, rgba(28,28,26,0.6), transparent)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col justify-end pb-24 px-8 md:px-20 lg:px-28 max-w-[1400px] mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="h-px w-12" style={{ background: "var(--gold)" }} />
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--gold-light)" }}
          >
            Featured Work
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          key={current.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif mb-3"
          style={{
            color: "var(--ivory)",
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            lineHeight: 1,
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          {current.title}
        </motion.h1>

        {/* Artist + Year */}
        <motion.div
          key={current.artist}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-baseline gap-3 mb-10"
        >
          <span
            className="text-[13px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(247,244,239,0.7)" }}
          >
            {current.artist}
          </span>
          <span style={{ color: "var(--gold)", fontSize: "10px" }}>—</span>
          <span
            className="font-serif text-base"
            style={{ color: "rgba(247,244,239,0.5)", fontStyle: "italic" }}
          >
            {current.year}
          </span>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-end justify-between"
        >
          {/* CTA */}
          <div className="flex gap-4">
            <a
              href="#collections"
              className="group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-500 px-7 py-3.5"
              style={{
                background: "var(--gold)",
                color: "var(--ivory)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--gold)";
              }}
            >
              Explore Collection
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M0 5H12M8 1L12 5L8 9" stroke="currentColor" strokeWidth="1" />
              </svg>
            </a>
            <a
              href="#about"
              className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase px-7 py-3.5 transition-all duration-500"
              style={{
                border: "1px solid rgba(247,244,239,0.3)",
                color: "rgba(247,244,239,0.85)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,244,239,0.3)";
                (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.85)";
              }}
            >
              Our Story
            </a>
          </div>

          {/* Slide indicators */}
          <div className="hidden md:flex items-center gap-3">
            {HERO_WORKS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-500"
                style={{
                  width: i === activeIndex ? "32px" : "6px",
                  height: "1px",
                  background: i === activeIndex ? "var(--gold)" : "rgba(247,244,239,0.35)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute right-10 bottom-10 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "rgba(247,244,239,0.4)", writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
