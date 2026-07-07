"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SOLD_CLIENT_ARTWORKS } from "@/lib/clientArtworks";

const ROTATION_MS = 7500;
const GALLERY_SOLD_URL = "/collections?category=sold";

function SoldWatermark({ label }: { label: string }) {
  return (
    <span
      className="absolute top-6 left-5 pointer-events-none select-none font-serif uppercase"
      aria-hidden
      style={{
        transform: "rotate(-30deg)",
        transformOrigin: "top left",
        fontSize: "0.68rem",
        letterSpacing: "0.44em",
        color: "rgba(184,150,90,0.68)",
        fontWeight: 300,
      }}
    >
      {label.toUpperCase()}
    </span>
  );
}

export default function ArtworkShowcase() {
  const { t } = useI18n();
  const s = t.showcase;
  const c = t.collectionsPage;
  const soldWorks = SOLD_CLIENT_ARTWORKS;

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (soldWorks.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % soldWorks.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [soldWorks.length]);

  if (soldWorks.length === 0) return null;

  const work = soldWorks[activeIndex];

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
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-6"
              style={{ color: "var(--gold)" }}
            >
              {s.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="flex flex-col justify-end"
          >
            <p
              className="mb-6 leading-relaxed"
              style={{ color: "var(--warm-gray)", fontSize: "14px", lineHeight: 1.85 }}
            >
              {s.body}
            </p>
            <a href={GALLERY_SOLD_URL} className="link-arrow" style={{ color: "var(--charcoal)" }}>
              {s.cta_all}
              <svg width="18" height="7" viewBox="0 0 18 7" fill="none" aria-hidden>
                <path d="M0 3.5H16M13 1L16 3.5L13 6" stroke="currentColor" strokeWidth="0.9" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Rotating sold work — card-scale footprint */}
        <div className="max-w-[260px] sm:max-w-[300px] md:max-w-[340px] mx-auto">
          <a
            href={GALLERY_SOLD_URL}
            className="group block cursor-pointer"
            aria-label={`${work.title} — ${c.sold_label}`}
          >
            <div
              className="relative overflow-hidden mb-8 md:mb-10"
              style={{ aspectRatio: "3/4" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={work.ref}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </motion.div>
              </AnimatePresence>

              <SoldWatermark label={c.sold_label} />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,20,18,0.58) 0%, rgba(20,20,18,0.06) 50%, transparent 100%)",
                }}
              />

              <span
                className="absolute top-3.5 left-3.5 text-[9px] tracking-[0.22em]"
                style={{ color: "rgba(247,244,239,0.4)" }}
              >
                {work.ref}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={work.ref}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h3
                      className="font-serif mb-2 leading-tight"
                      style={{
                        color: "var(--ivory)",
                        fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
                        fontWeight: 400,
                        fontStyle: "italic",
                      }}
                    >
                      {work.title}
                    </h3>

                    {(work.medium || work.dimensions) && (
                      <p
                        className="text-[10px] tracking-[0.14em] uppercase"
                        style={{ color: "rgba(247,244,239,0.52)", lineHeight: 1.65 }}
                      >
                        {[work.medium, work.dimensions].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </a>

          {soldWorks.length > 1 && (
            <div className="flex items-center justify-center gap-3">
              {soldWorks.map((item, i) => (
                <button
                  key={item.ref}
                  type="button"
                  aria-label={`${item.title} (${i + 1} / ${soldWorks.length})`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  onClick={() => setActiveIndex(i)}
                  className="transition-all duration-500"
                  style={{
                    width: i === activeIndex ? "28px" : "6px",
                    height: "6px",
                    background: i === activeIndex ? "var(--gold)" : "rgba(140,136,128,0.35)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
