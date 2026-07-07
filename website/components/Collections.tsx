"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { FEATURED_CLIENT_ARTWORKS, type ClientArtwork } from "@/lib/clientArtworks";

function toCardItem(work: ClientArtwork) {
  return {
    title: work.title,
    subtitle: work.medium,
    count: work.ref,
  };
}

function Card({
  item,
  image,
  index,
  large,
  exploreLabel,
}: {
  item: { title: string; subtitle: string; count: string };
  image: string;
  index: number;
  large?: boolean;
  exploreLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // Large card: taller fixed height on desktop; small cards: auto
        height: large ? "min(580px, 62vw)" : undefined,
        minHeight: large ? "340px" : "220px",
      }}
    >
      {/* Image wrapper */}
      <div className={`relative overflow-hidden w-full ${large ? "h-full" : "aspect-[4/3]"}`}>
        <motion.img
          src={image}
          alt={item.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Gradient veil */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: hovered
              ? "linear-gradient(to top, rgba(20,20,18,0.88) 0%, rgba(20,20,18,0.32) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(20,20,18,0.70) 0%, rgba(20,20,18,0.15) 55%, transparent 100%)",
          }}
          transition={{ duration: 0.55 }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
          <span className="text-[9px] tracking-[0.42em] uppercase mb-2 block" style={{ color: "var(--gold)" }}>
            {item.count}
          </span>
          <h3
            className="font-serif mb-1 leading-[1.05]"
            style={{
              color: "var(--ivory)",
              fontSize: large ? "clamp(1.6rem, 2.8vw, 2.5rem)" : "clamp(1.1rem, 1.8vw, 1.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {item.title}
          </h3>
          <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(247,244,239,0.48)" }}>
            {item.subtitle}
          </span>

          <motion.div
            className="flex items-center gap-2 mt-4 overflow-hidden"
            animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="text-[9.5px] tracking-[0.32em] uppercase" style={{ color: "var(--gold)" }}>
              {exploreLabel}
            </span>
            <svg width="18" height="7" viewBox="0 0 18 7" fill="none" aria-hidden>
              <path d="M0 3.5H16M13 1L16 3.5L13 6" stroke="#B8965A" strokeWidth="0.9" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collections() {
  const { t } = useI18n();
  const c = t.collections;
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });

  const [featuredHero, ...featuredRest] = FEATURED_CLIENT_ARTWORKS;

  return (
    <section id="collections" className="section-pad-lg" style={{ background: "var(--ivory)" }}>
      {/* Thin top rule */}
      <div className="container mb-16 md:mb-20">
        <div className="section-rule" />
      </div>

      <div className="container">
        {/* Section header */}
        <div
          ref={titleRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-5"
            >
              {c.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.08,
              }}
            >
              {c.heading}
            </motion.h2>
          </div>

          <motion.a
            href="/collections"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="link-arrow shrink-0"
            style={{ color: "var(--charcoal)" }}
          >
            {c.cta_all}
            <svg width="18" height="7" viewBox="0 0 18 7" fill="none" aria-hidden>
              <path d="M0 3.5H16M13 1L16 3.5L13 6" stroke="currentColor" strokeWidth="0.9" />
            </svg>
          </motion.a>
        </div>

        {/*
          Asymmetric editorial grid:
          [  Large  ] [ Small ]
          [  Large  ] [ Small ]
                      [ Small ]
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {featuredHero && (
            <div className="lg:row-span-2">
              <Card
                item={toCardItem(featuredHero)}
                image={featuredHero.image}
                index={0}
                large
                exploreLabel={c.explore}
              />
            </div>
          )}

          {featuredRest.map((work, i) => (
            <Card
              key={work.ref}
              item={toCardItem(work)}
              image={work.image}
              index={i + 1}
              exploreLabel={c.explore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
