"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const n = t.nav;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      style={{
        background: "var(--charcoal-mid)",
        borderTop: "1px solid rgba(184,150,90,0.1)",
      }}
    >
      <div className="container pt-12 pb-8 md:pt-14">

        <div
          ref={ref}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 pb-10"
          style={{ borderBottom: "1px solid rgba(184,150,90,0.08)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-serif text-[1.3rem] tracking-[0.06em] mb-0.5"
              style={{ color: "var(--ivory)", fontWeight: 300 }}>
              {n.gallery_title}
            </p>
            <p className="text-[8.5px] tracking-[0.42em] uppercase" style={{ color: "var(--gold)" }}>
              {n.gallery_subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="flex flex-col sm:flex-row gap-8 sm:gap-14 text-[12px]"
          >
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--gold-muted)" }}>
                {f.location_label}
              </p>
              <p style={{ color: "rgba(247,244,239,0.3)" }}>{f.location_value}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: "var(--gold-muted)" }}>
                {f.contact_label}
              </p>
              <p style={{ color: "rgba(247,244,239,0.3)" }}>514-710-4230</p>
              <p style={{ color: "rgba(247,244,239,0.3)" }}>info@mlalondeartistepeintre.ca</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderBottom: "1px solid rgba(184,150,90,0.08)" }}
        >
          <div className="md:max-w-xs">
            <h4 className="font-serif text-lg mb-1" style={{ color: "var(--ivory)", fontStyle: "italic", fontWeight: 300 }}>
              {f.newsletter_heading}
            </h4>
            <p className="text-[12px]" style={{ color: "rgba(247,244,239,0.3)" }}>
              {f.newsletter_body}
            </p>
          </div>

          <div className="flex w-full md:w-auto md:min-w-[360px] max-w-full">
            <input
              type="email"
              placeholder={f.newsletter_placeholder}
              className="flex-1 min-w-0 px-5 py-3 text-[12px] bg-transparent outline-none"
              style={{
                border: "1px solid rgba(184,150,90,0.22)",
                borderRight: "none",
                color: "var(--ivory)",
              }}
            />
            <button
              className="px-5 py-3 text-[9.5px] tracking-[0.28em] uppercase shrink-0 transition-all duration-400"
              style={{ background: "var(--gold)", color: "var(--ivory)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
            >
              {f.newsletter_cta}
            </button>
          </div>
        </motion.div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-wide order-2 sm:order-1" style={{ color: "rgba(247,244,239,0.18)" }}>
            {f.copyright}
          </p>
          <div className="flex items-center gap-5 order-1 sm:order-2">
            {f.legal.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-wide transition-colors duration-300"
                style={{ color: "rgba(247,244,239,0.18)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.18)"; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
