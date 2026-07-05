"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STATS = [
  { value: "950+", label: "Original Works" },
  { value: "40+", label: "Québécois Artists" },
  { value: "30", label: "Years of Curation" },
  { value: "0%", label: "Sales Tax" },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(textRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--charcoal)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image */}
          <div className="relative order-2 lg:order-1">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "3/4", maxHeight: "620px" }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=85&fit=crop"
                alt="Gallery interior"
                className="w-full h-full object-cover"
                style={{ y: imgY, scale: 1.12 }}
              />
              {/* Gold frame accent */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ border: "1px solid rgba(184,150,90,0.2)" }}
              />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -right-6 md:-right-10 bottom-12 p-6 md:p-8"
              style={{
                background: "var(--charcoal-mid)",
                border: "1px solid rgba(184,150,90,0.25)",
                maxWidth: "220px",
              }}
            >
              <p
                className="font-serif text-2xl mb-1"
                style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 300 }}
              >
                "Art is not what you see, but what you make others see."
              </p>
              <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(247,244,239,0.35)" }}>
                — Edgar Degas
              </span>
            </motion.div>
          </div>

          {/* Right — Text */}
          <div ref={textRef} className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 mb-6"
              style={{ color: "var(--gold)" }}
            >
              <span className="h-px w-8 inline-block" style={{ background: "var(--gold)" }} />
              Our Philosophy
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-serif mb-8"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--ivory)",
                lineHeight: 1.15,
              }}
            >
              Where art finds its rightful home
            </motion.h2>

            {["For over three decades, we have dedicated ourselves to presenting the finest works of Québécois artists — from seasoned masters to emerging voices shaping tomorrow's canon.",
              "Our gallery in Sherbrooke is not merely a place of transaction, but a sanctuary of culture. We believe that exceptional art should be accessible to those who truly appreciate it — which is why we absorb all applicable taxes on every acquisition.",
              "Each work in our collection is carefully selected for its artistic merit, emotional resonance, and enduring cultural significance."
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                className="mb-5 leading-relaxed"
                style={{
                  color: "rgba(247,244,239,0.6)",
                  fontSize: "15px",
                  lineHeight: 1.85,
                }}
              >
                {text}
              </motion.p>
            ))}

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="inline-flex items-center gap-3 mt-6 text-[10px] tracking-[0.3em] uppercase group"
              style={{ color: "var(--gold)" }}
            >
              Discover Our Story
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                <path d="M0 4H18M14 1L18 4L14 7" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-24 md:mt-32">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="py-8 px-6 text-center"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(184,150,90,0.15)" : "none",
                borderTop: i >= 2 ? "1px solid rgba(184,150,90,0.15)" : "none",
              }}
            >
              <div
                className="font-serif text-4xl md:text-5xl mb-2"
                style={{ color: "var(--gold)", fontWeight: 300, fontStyle: "italic" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(247,244,239,0.4)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
