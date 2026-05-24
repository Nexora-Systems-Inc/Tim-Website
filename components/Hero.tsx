"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1800&q=85&fit=crop",
];

// Animated counter for slide index display
function SlideNumber({ n }: { n: number }) {
  return (
    <motion.span
      key={n}
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -8, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="font-serif text-sm"
      style={{ color: "rgba(247,244,239,0.45)", fontStyle: "italic" }}
    >
      {String(n + 1).padStart(2, "0")}
    </motion.span>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 240]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveIndex((p) => (p + 1) % h.works.length), 6500);
    return () => clearInterval(id);
  }, [h.works.length]);

  const current = h.works[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background slides */}
      {HERO_IMAGES.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y, scale: 1.06 }}>
            <img src={src} alt="" className="w-full h-full object-cover" aria-hidden />
          </motion.div>
        </motion.div>
      ))}

      {/* Cinematic gradient — heavier left vignette, soft bottom */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: [
            "linear-gradient(to right,  rgba(20,20,18,0.82) 0%, rgba(20,20,18,0.42) 45%, rgba(20,20,18,0.18) 100%)",
            "linear-gradient(to top,    rgba(20,20,18,0.65) 0%, transparent 40%)",
            "linear-gradient(to bottom, rgba(20,20,18,0.30) 0%, transparent 18%)",
          ].join(", "),
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col justify-end"
      >
        <div className="container pb-20 md:pb-28">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="eyebrow mb-7"
            style={{ color: "var(--gold-light)" }}
          >
            <span style={{ background: "var(--gold-light)" }} />
            {h.eyebrow}
          </motion.div>

          {/* Title — animated per slide */}
          <div className="overflow-hidden mb-4" style={{ maxWidth: "min(820px, 90vw)" }}>
            <motion.h1
              key={current.title}
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.95, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif"
              style={{
                color: "var(--ivory)",
                fontSize: "clamp(3rem, 7.5vw, 7rem)",
                lineHeight: 0.96,
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "-0.015em",
              }}
            >
              {current.title}
            </motion.h1>
          </div>

          {/* Artist + year */}
          <motion.div
            key={current.artist}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="flex items-center gap-3 mb-12"
          >
            <span
              className="text-[12px] tracking-[0.22em] uppercase"
              style={{ color: "rgba(247,244,239,0.62)" }}
            >
              {current.artist}
            </span>
            <span style={{ color: "var(--gold)", fontSize: 10 }}>–</span>
            <span
              className="font-serif text-[15px]"
              style={{ color: "rgba(247,244,239,0.38)", fontStyle: "italic" }}
            >
              {current.year}
            </span>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <a href="/collections" className="btn-gold">
              {h.cta_primary}
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
                <path d="M0 4.5H12M8.5 1L12 4.5L8.5 8" stroke="currentColor" strokeWidth="1" />
              </svg>
            </a>
            <a href="#about" className="btn-outline">
              {h.cta_secondary}
            </a>
          </motion.div>
        </div>

        {/* Slide counter + indicators — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 right-[var(--container-padding)] flex flex-col items-end gap-3"
        >
          <div className="flex items-center gap-2">
            <SlideNumber n={activeIndex} />
            <span className="text-[10px]" style={{ color: "rgba(247,244,239,0.22)" }}>/</span>
            <span className="font-serif text-sm" style={{ color: "rgba(247,244,239,0.22)", fontStyle: "italic" }}>
              {String(h.works.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {h.works.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Diapositive ${i + 1}`}
                className="transition-all duration-600"
                style={{
                  width: i === activeIndex ? "28px" : "5px",
                  height: "1px",
                  background: i === activeIndex ? "var(--gold)" : "rgba(247,244,239,0.28)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute right-[var(--container-padding)] md:right-auto md:left-[var(--container-padding)] bottom-9 hidden md:flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-11"
          style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }}
        />
        <span
          className="text-[8.5px] tracking-[0.4em] uppercase"
          style={{ color: "rgba(247,244,239,0.32)", writingMode: "vertical-rl" }}
        >
          {h.scroll_label}
        </span>
      </motion.div>
    </section>
  );
}
