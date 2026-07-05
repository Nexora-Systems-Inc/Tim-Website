"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="relative py-0 overflow-hidden" style={{ minHeight: "70vh" }}>
      {/* Full-bleed background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1800&q=85&fit=crop"
          alt="Gallery space"
          className="w-full h-full object-cover"
          style={{ y: imgY, scale: 1.15 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(28,28,26,0.88) 0%, rgba(28,28,26,0.65) 50%, rgba(28,28,26,0.45) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-[70vh] px-8 md:px-16 py-28"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-[10px] tracking-[0.45em] uppercase flex items-center gap-4 mb-8"
          style={{ color: "var(--gold)" }}
        >
          <span className="h-px w-8 inline-block" style={{ background: "var(--gold)" }} />
          Private Viewings Available
          <span className="h-px w-8 inline-block" style={{ background: "var(--gold)" }} />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--ivory)",
            lineHeight: 1.05,
            maxWidth: "900px",
          }}
        >
          Begin Your Collection Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-lg mb-12 leading-relaxed"
          style={{ color: "rgba(247,244,239,0.6)", fontSize: "15px", lineHeight: 1.85 }}
        >
          Our curators are available by appointment to guide you through our collection and help you find the work that speaks to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#"
            className="px-10 py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-500"
            style={{ background: "var(--gold)", color: "var(--ivory)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
          >
            Schedule a Visit
          </a>
          <a
            href="tel:8195722099"
            className="px-10 py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-500"
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
            819-572-2099
          </a>
        </motion.div>

        {/* Tax badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-14 flex items-center gap-3"
        >
          <div className="h-px w-8" style={{ background: "var(--gold)", opacity: 0.5 }} />
          <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "rgba(184,150,90,0.7)" }}>
            All taxes included — No hidden fees
          </span>
          <div className="h-px w-8" style={{ background: "var(--gold)", opacity: 0.5 }} />
        </motion.div>
      </div>
    </section>
  );
}
