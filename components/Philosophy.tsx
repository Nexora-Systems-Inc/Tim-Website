"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Philosophy() {
  const { t } = useI18n();
  const p = t.philosophy;

  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(textRef, { once: true, margin: "-90px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-70px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad-lg overflow-hidden"
      style={{ background: "var(--charcoal)" }}
    >
      <div className="container">
        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">

          {/* LEFT — image column: 5/12 */}
          <div className="lg:col-span-5 order-2 lg:order-1 lg:sticky lg:top-28">
            {/* Image frame */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5", maxHeight: "580px" }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=85&fit=crop"
                alt="Intérieur de la galerie"
                className="w-full h-full object-cover"
                style={{ y: imgY, scale: 1.14 }}
              />
              {/* Subtle inner border */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.15)" }}
              />
            </div>

            {/* Floating quote block — partially outside the image */}
            <motion.blockquote
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.55 }}
              className="relative mt-0 -translate-y-8 ml-auto mr-0 p-6"
              style={{
                maxWidth: "230px",
                background: "var(--charcoal-soft)",
                border: "1px solid rgba(184,150,90,0.22)",
              }}
            >
              <p
                className="font-serif text-[1.05rem] leading-snug mb-3"
                style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 300 }}
              >
                &ldquo;{p.quote}&rdquo;
              </p>
              <cite
                className="text-[9px] tracking-[0.32em] uppercase not-italic"
                style={{ color: "rgba(247,244,239,0.3)" }}
              >
                {p.quote_author}
              </cite>
            </motion.blockquote>
          </div>

          {/* RIGHT — text column: 6/12 (offset by 1) */}
          <div ref={textRef} className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 pt-0 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-7"
            >
              {p.eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-serif mb-10"
              style={{
                fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--ivory)",
                lineHeight: 1.12,
                maxWidth: "520px",
              }}
            >
              {p.heading}
            </motion.h2>

            {/* Decorative gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-9"
              style={{ height: "1px", background: "var(--gold)", opacity: 0.3, transformOrigin: "left", width: "48px" }}
            />

            {[p.body_1, p.body_2, p.body_3].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.13 }}
                className="mb-6"
                style={{
                  color: "rgba(247,244,239,0.55)",
                  fontSize: "14.5px",
                  lineHeight: 1.9,
                  maxWidth: "var(--text-max)",
                }}
              >
                {text}
              </motion.p>
            ))}

            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="link-arrow mt-4"
              style={{ color: "var(--gold)" }}
            >
              {p.cta}
              <svg width="18" height="7" viewBox="0 0 18 7" fill="none" aria-hidden>
                <path d="M0 3.5H16M13 1L16 3.5L13 6" stroke="currentColor" strokeWidth="0.9" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Stats band */}
        <div
          ref={statsRef}
          className="mt-24 md:mt-32 pt-12 border-t"
          style={{ borderColor: "rgba(184,150,90,0.1)" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {p.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.09 }}
                className="py-8 px-4 md:px-8 text-center"
                style={{
                  borderLeft: i % 2 !== 0 || i > 0 ? "1px solid rgba(184,150,90,0.1)" : undefined,
                  borderTop: i >= 2 ? "1px solid rgba(184,150,90,0.1)" : undefined,
                }}
              >
                <div
                  className="font-serif text-[2.8rem] md:text-[3.5rem] leading-none mb-3"
                  style={{ color: "var(--gold)", fontWeight: 300, fontStyle: "italic" }}
                >
                  {stat.value}
                </div>
                <div className="text-[9.5px] tracking-[0.32em] uppercase" style={{ color: "rgba(247,244,239,0.35)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
