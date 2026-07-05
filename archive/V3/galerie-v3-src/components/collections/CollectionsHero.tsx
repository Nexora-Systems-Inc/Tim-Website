"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function CollectionsHero() {
  const { t } = useI18n();
  const c = t.collectionsPage;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: "60vh", minHeight: "460px" }}>
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y, scale: 1.12 }}>
        <img
          src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1800&q=85&fit=crop"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0" style={{
        background: [
          "linear-gradient(to right, rgba(20,20,18,0.85) 0%, rgba(20,20,18,0.5) 60%, rgba(20,20,18,0.3) 100%)",
          "linear-gradient(to top, rgba(20,20,18,0.6) 0%, transparent 45%)",
        ].join(", ")
      }} />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end"
      >
        <div className="container pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="eyebrow mb-5"
            style={{ color: "var(--gold-light)" }}
          >
            {c.hero_eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--ivory)",
              lineHeight: 0.97,
              letterSpacing: "-0.015em",
              marginBottom: "1.2rem",
            }}
          >
            {c.hero_heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{
              color: "rgba(247,244,239,0.55)",
              fontSize: "14px",
              maxWidth: "440px",
              lineHeight: 1.8,
            }}
          >
            {c.hero_sub}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
