"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function AboutValues() {
  const { t } = useI18n();
  const a = t.aboutPage;
  const ref = useRef(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad-lg" style={{ background: "var(--charcoal)" }}>
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5"
          >
            {a.values_eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.1 }}
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--ivory)",
              lineHeight: 1.1,
              maxWidth: "520px",
            }}
          >
            {a.values_heading}
          </motion.h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {(a.values as unknown as Array<{ number: string; title: string; body: string }>).map((v, i) => {
            const itemRef = useRef(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-60px" });
            const isLeft = i % 2 === 0;
            const isTop = i < 2;
            return (
              <motion.div
                key={v.number}
                ref={itemRef}
                initial={{ opacity: 0, y: 28 }}
                animate={itemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: (i % 2) * 0.1 }}
                className="p-10 md:p-12 group relative"
                style={{
                  borderTop: isTop ? undefined : "1px solid rgba(184,150,90,0.1)",
                  borderLeft: isLeft ? undefined : "1px solid rgba(184,150,90,0.1)",
                }}
              >
                {/* Hover fill */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(184,150,90,0.03)" }}
                />

                <div className="relative">
                  {/* Number */}
                  <span className="font-serif text-6xl md:text-7xl block mb-6 leading-none select-none"
                    style={{ color: "rgba(184,150,90,0.18)", fontStyle: "italic", fontWeight: 300 }}>
                    {v.number}
                  </span>

                  <h3 className="font-serif text-xl md:text-2xl mb-4"
                    style={{ color: "var(--ivory)", fontWeight: 300, fontStyle: "italic" }}>
                    {v.title}
                  </h3>

                  <p style={{ color: "rgba(247,244,239,0.5)", fontSize: "14px", lineHeight: 1.85 }}>
                    {v.body}
                  </p>

                  {/* Bottom gold rule reveal */}
                  <div className="mt-8 h-px w-0 group-hover:w-12 transition-all duration-500"
                    style={{ background: "var(--gold)" }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
