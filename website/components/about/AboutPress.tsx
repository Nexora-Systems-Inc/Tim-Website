"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function AboutPress() {
  const { t } = useI18n();
  const a = t.aboutPage;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="section-pad overflow-hidden"
      style={{ background: "var(--charcoal-mid)" }}
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-16 md:mb-20 justify-center"
        >
          {a.press_eyebrow}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {(a.press_quotes as unknown as Array<{ quote: string; source: string; year: string }>).map((q, i) => {
            const itemRef = useRef(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-60px" });
            return (
              <motion.blockquote
                key={i}
                ref={itemRef}
                initial={{ opacity: 0, y: 24 }}
                animate={itemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: i * 0.12 }}
                className="px-8 md:px-10 py-8"
                style={{
                  borderLeft: i > 0 ? "1px solid rgba(184,150,90,0.12)" : undefined,
                }}
              >
                {/* Opening mark */}
                <span className="font-serif text-5xl block mb-4 leading-none"
                  style={{ color: "rgba(184,150,90,0.25)", fontStyle: "normal" }}>
                  &ldquo;
                </span>

                <p className="font-serif mb-6"
                  style={{
                    color: "rgba(247,244,239,0.72)",
                    fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 1.6,
                  }}
                >
                  {q.quote}
                </p>

                <footer className="flex items-center gap-3">
                  <div className="h-px w-6" style={{ background: "var(--gold)" }} />
                  <cite className="not-italic">
                    <span className="text-[11px] tracking-[0.22em] uppercase"
                      style={{ color: "var(--gold)" }}>
                      {q.source}
                    </span>
                    <span className="text-[10px] ml-2" style={{ color: "rgba(247,244,239,0.28)" }}>
                      {q.year}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
