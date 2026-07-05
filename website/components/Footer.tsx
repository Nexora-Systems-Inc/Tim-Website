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

  const colLabels = Object.keys(f.columns) as Array<keyof typeof f.columns>;

  return (
    <footer
      style={{
        background: "var(--charcoal-mid)",
        borderTop: "1px solid rgba(184,150,90,0.1)",
      }}
    >
      <div className="container pt-20 pb-10">

        {/* Top grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-12 lg:gap-8 pb-16"
          style={{ borderBottom: "1px solid rgba(184,150,90,0.08)" }}
        >
          {/* Brand column — lg:col-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <div className="mb-6">
              <p className="font-serif text-[1.3rem] tracking-[0.06em] mb-0.5"
                style={{ color: "var(--ivory)", fontWeight: 300 }}>
                {n.gallery_title}
              </p>
              <p className="text-[8.5px] tracking-[0.42em] uppercase" style={{ color: "var(--gold)" }}>
                {n.gallery_subtitle}
              </p>
            </div>

            <p className="text-[13px] leading-relaxed mb-8" style={{ color: "rgba(247,244,239,0.36)", lineHeight: 1.85 }}>
              {f.tagline}
            </p>

            {/* Address */}
            <div className="space-y-4 text-[12px]">
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
                <p style={{ color: "rgba(247,244,239,0.3)" }}>450-555-5555</p>
                <p style={{ color: "rgba(247,244,239,0.3)" }}>galerie@artistes-peintres.ca</p>
              </div>
            </div>
          </motion.div>

          {/* Link columns */}
          {colLabels.map((col, ci) => (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 * (ci + 1) }}
            >
              <h4 className="text-[9px] tracking-[0.38em] uppercase mb-5" style={{ color: "var(--gold)" }}>
                {col}
              </h4>
              <ul className="space-y-3">
                {f.columns[col].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[12px] transition-colors duration-300"
                      style={{ color: "rgba(247,244,239,0.34)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.72)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.34)"; }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
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

          <div className="flex w-full md:w-auto md:min-w-[360px]">
            <input
              type="email"
              placeholder={f.newsletter_placeholder}
              className="flex-1 px-5 py-3 text-[12px] bg-transparent outline-none"
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

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
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
