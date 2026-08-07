"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function AboutStory() {
  const { t } = useI18n();
  const a = t.aboutPage;
  const ref = useRef<HTMLDivElement>(null);
  const parcoursRef = useRef(null);
  const demarcheRef = useRef(null);
  const parcoursInView = useInView(parcoursRef, { once: true, margin: "-80px" });
  const demarcheInView = useInView(demarcheRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const parcoursBodies = [a.parcours_body_1, a.parcours_body_2, a.parcours_body_3];
  const demarcheBodies = [a.demarche_body_1, a.demarche_body_2];

  return (
    <section
      ref={ref}
      className="section-pad-lg overflow-hidden"
      style={{ background: "var(--ivory)" }}
    >
      <div className="container">
        {/* Mon parcours — portrait + biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div ref={parcoursRef} className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={parcoursInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-6"
            >
              {a.parcours_eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={parcoursInView ? { opacity: 1, y: 0 } : {}}
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
              {a.parcours_heading}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={parcoursInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mb-9"
              style={{
                height: "1px",
                background: "var(--gold)",
                opacity: 0.3,
                transformOrigin: "left",
                width: "40px",
              }}
            />

            {parcoursBodies.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={parcoursInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                className="mb-6"
                style={{
                  color: "var(--warm-gray)",
                  fontSize: "14.5px",
                  lineHeight: 1.9,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={parcoursInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <motion.img
                src="/manon.jpg"
                alt={a.portrait_alt}
                className="w-full h-full object-cover object-top"
                style={{ y: imgY, scale: 1.1 }}
              />
              <div
                className="absolute inset-0"
                style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.12)" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={parcoursInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 p-6"
              style={{
                border: "1px solid rgba(184,150,90,0.18)",
                background: "var(--cream)",
              }}
            >
              <p
                className="font-serif text-3xl md:text-4xl text-right"
                style={{
                  color: "var(--charcoal)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.1,
                }}
              >
                {a.portrait_caption_title}
              </p>
              <p
                className="text-right text-[10px] tracking-[0.3em] uppercase mt-2"
                style={{ color: "var(--gold)" }}
              >
                {a.portrait_caption_sub}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Ma démarche artistique */}
        <div
          ref={demarcheRef}
          className="mt-24 md:mt-32 pt-16 md:pt-20"
          style={{ borderTop: "1px solid rgba(184,150,90,0.15)" }}
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={demarcheInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-6"
            >
              {a.demarche_eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={demarcheInView ? { opacity: 1, y: 0 } : {}}
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
              {a.demarche_heading}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={demarcheInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mb-9"
              style={{
                height: "1px",
                background: "var(--gold)",
                opacity: 0.3,
                transformOrigin: "left",
                width: "40px",
              }}
            />

            {demarcheBodies.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={demarcheInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                className="mb-6 last:mb-0"
                style={{
                  color: "var(--warm-gray)",
                  fontSize: "14.5px",
                  lineHeight: 1.9,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
