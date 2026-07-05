"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function AboutStory() {
  const { t } = useI18n();
  const a = t.aboutPage;
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="section-pad-lg overflow-hidden" style={{ background: "var(--ivory)" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* Text — 7 cols */}
          <div ref={textRef} className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-6"
            >
              {a.story_eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.1 }}
              className="font-serif mb-10"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.1,
                maxWidth: "520px",
              }}
            >
              {a.story_heading}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mb-9"
              style={{ height: "1px", background: "var(--gold)", opacity: 0.3, transformOrigin: "left", width: "40px" }}
            />

            {[a.story_body_1, a.story_body_2, a.story_body_3].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                className="mb-6"
                style={{ color: "var(--warm-gray)", fontSize: "14.5px", lineHeight: 1.9 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.58 }}
              className="grid grid-cols-3 mt-14 pt-10"
              style={{ borderTop: "1px solid rgba(184,150,90,0.15)" }}
            >
              {[
                { value: "1994", label: "Fondée à Sherbrooke" },
                { value: "40+",  label: "Artistes représentés" },
                { value: "0 %",  label: "Taxes sur vos acquisitions" },
              ].map((s, i) => (
                <div key={s.label} className={`text-center ${i > 0 ? "border-l" : ""}`}
                  style={{ borderColor: "rgba(184,150,90,0.15)" }}>
                  <div className="font-serif text-3xl md:text-4xl mb-2"
                    style={{ color: "var(--gold)", fontWeight: 300, fontStyle: "italic" }}>
                    {s.value}
                  </div>
                  <div className="text-[9.5px] tracking-[0.26em] uppercase" style={{ color: "var(--warm-gray)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image — 5 cols */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=85&fit=crop"
                alt="La galerie"
                className="w-full h-full object-cover"
                style={{ y: imgY, scale: 1.1 }}
              />
              <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.12)" }} />
            </motion.div>

            {/* Year badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 p-6"
              style={{ border: "1px solid rgba(184,150,90,0.18)", background: "var(--cream)" }}
            >
              <p className="font-serif text-5xl md:text-6xl text-right"
                style={{ color: "var(--ivory-dark)", fontWeight: 300, fontStyle: "italic", lineHeight: 1 }}>
                1994
              </p>
              <p className="text-right text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: "var(--gold)" }}>
                Fondation de la galerie
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
