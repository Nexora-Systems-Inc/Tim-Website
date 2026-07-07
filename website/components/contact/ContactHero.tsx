"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function ContactHero() {
  const { t } = useI18n();
  const c = t.contactPage;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: "72vh", minHeight: "520px", background: "var(--charcoal)" }}>
      <motion.div className="absolute inset-0" style={{ y, scale: 1.1 }}>
        <img
          src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1800&q=85&fit=crop"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-40"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(20,20,18,0.55) 0%, rgba(20,20,18,0.25) 40%, rgba(20,20,18,0.7) 100%)",
            "linear-gradient(to right,  rgba(20,20,18,0.6) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end">
        <div className="container pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="eyebrow mb-6"
            style={{ color: "var(--gold-light)" }}
          >
            {c.hero_eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif mb-6"
            style={{
              fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--ivory)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {c.hero_heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.72 }}
            style={{
              color: "rgba(247,244,239,0.52)",
              fontSize: "14.5px",
              maxWidth: "520px",
              lineHeight: 1.85,
            }}
          >
            {c.hero_sub}
          </motion.p>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(184,150,90,0.18)" }} />
    </section>
  );
}
