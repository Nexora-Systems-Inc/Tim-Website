"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function CallToAction() {
  const { t } = useI18n();
  const c = t.cta;

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "72vh" }}
    >
      {/* Full-bleed bg */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/collection-art.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          style={{ y: imgY, scale: 1.18 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to right,  rgba(20,20,18,0.92) 0%, rgba(20,20,18,0.6) 55%, rgba(20,20,18,0.4) 100%)",
              "linear-gradient(to bottom, rgba(20,20,18,0.35) 0%, transparent 30%)",
              "linear-gradient(to top,    rgba(20,20,18,0.5) 0%, transparent 35%)",
            ].join(", "),
          }}
        />
      </div>

      {/* Centred editorial text block */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-[72vh] py-28"
        style={{ paddingInline: "var(--container-padding)" }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-9"
        >
          <div
            className="h-px w-10"
            style={{ background: "var(--gold)", opacity: 0.7 }}
          />
          <span
            className="text-[9.5px] tracking-[0.45em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            {c.eyebrow}
          </span>
          <div
            className="h-px w-10"
            style={{ background: "var(--gold)", opacity: 0.7 }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.05, delay: 0.1 }}
          className="font-serif mb-7"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5.8rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--ivory)",
            lineHeight: 1.02,
            maxWidth: "860px",
          }}
        >
          {c.heading}
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.22 }}
          style={{
            color: "rgba(247,244,239,0.55)",
            fontSize: "14.5px",
            lineHeight: 1.9,
            maxWidth: "480px",
            marginBottom: "3rem",
          }}
        >
          {c.body}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.34 }}
          className="flex flex-col sm:flex-row items-center gap-3.5"
        >
          <a href="/collections" className="btn-gold">
            {c.cta_primary}
          </a>
          <a
            href={`tel:${c.cta_phone.replace(/-/g, "")}`}
            className="btn-outline"
          >
            {c.cta_phone}
          </a>
        </motion.div>

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="text-[9.5px] tracking-[0.36em] uppercase mt-12"
          style={{ color: "rgba(184,150,90,0.52)" }}
        >
          {c.badge}
        </motion.p>
      </div>
    </section>
  );
}
