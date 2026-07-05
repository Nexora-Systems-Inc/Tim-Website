"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

function FloatingInput({
  label, type = "text", required = false, textarea = false
}: {
  label: string; type?: string; required?: boolean; textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const base = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "var(--charcoal)" : "rgba(28,28,26,0.2)"}`,
    outline: "none",
    color: "var(--charcoal)",
    fontSize: "14px",
    transition: "border-color 0.35s ease",
    paddingTop: "1.6rem",
    paddingBottom: "0.6rem",
    resize: "none" as const,
  };

  const labelStyle = {
    position: "absolute" as const,
    top: focused || filled ? "2px" : "1.5rem",
    fontSize: focused || filled ? "9px" : "12px",
    letterSpacing: focused || filled ? "0.3em" : "0.1em",
    textTransform: "uppercase" as const,
    color: focused ? "var(--charcoal)" : "rgba(28,28,26,0.38)",
    transition: "all 0.3s ease",
    pointerEvents: "none" as const,
  };

  return (
    <div className="relative">
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          rows={4}
          required={required}
          style={base}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      ) : (
        <input
          type={type}
          required={required}
          style={base}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      )}
    </div>
  );
}

export default function AboutContact() {
  const { t } = useI18n();
  const a = t.aboutPage;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <section id="contact" className="section-pad-lg" style={{ background: "var(--ivory)" }}>
      <div className="container">
        {/* Section header */}
        <div ref={ref} className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5"
          >
            {a.contact_eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.1 }}
            className="font-serif mb-5"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--charcoal)",
              lineHeight: 1.1,
              maxWidth: "560px",
            }}
          >
            {a.contact_heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ color: "var(--warm-gray)", fontSize: "14.5px", maxWidth: "500px", lineHeight: 1.85 }}
          >
            {a.contact_sub}
          </motion.p>
        </div>

        {/* Two-column: form + info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Form — 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FloatingInput label={a.form_name} required />
                    <FloatingInput label={a.form_email} type="email" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FloatingInput label={a.form_phone} type="tel" />
                    {/* Subject select */}
                    <div className="relative">
                      <label
                        className="absolute top-0.5 text-[9px] tracking-[0.3em] uppercase"
                        style={{ color: "rgba(28,28,26,0.38)" }}
                      >
                        {a.form_subject}
                      </label>
                      <select
                        className="w-full bg-transparent outline-none pt-6 pb-2 text-sm appearance-none cursor-pointer"
                        style={{
                          borderBottom: "1px solid rgba(28,28,26,0.2)",
                          color: selectedSubject ? "var(--charcoal)" : "rgba(28,28,26,0.35)",
                          fontSize: "14px",
                        }}
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                      >
                        <option value="" disabled />
                        {(a.form_subjects as string[]).map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                        className="absolute right-0 bottom-3 pointer-events-none"
                        style={{ color: "rgba(28,28,26,0.35)" }}>
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                  <FloatingInput label={a.form_message} textarea required />

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                    <button type="submit" className="btn-gold">
                      {a.form_submit}
                      <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                        <path d="M0 4.5H12M8.5 1L12 4.5L8.5 8" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </button>
                    <p className="text-[10px] tracking-[0.2em]" style={{ color: "rgba(28,28,26,0.38)" }}>
                      {a.form_note}
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 flex flex-col items-start gap-5"
                >
                  <div className="w-10 h-10 flex items-center justify-center"
                    style={{ border: "1px solid var(--gold)" }}>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path d="M1 6L5.5 10.5L15 1" stroke="#B8965A" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl"
                    style={{ color: "var(--charcoal)", fontStyle: "italic", fontWeight: 300 }}>
                    Message envoyé
                  </h3>
                  <p style={{ color: "var(--warm-gray)", fontSize: "14px", lineHeight: 1.8, maxWidth: "380px" }}>
                    Merci pour votre message. Notre équipe vous répondra dans les 24 heures ouvrables.
                  </p>
                  <button
                    className="link-arrow mt-4"
                    style={{ color: "var(--gold)" }}
                    onClick={() => setSubmitted(false)}
                  >
                    Envoyer un autre message
                    <svg width="16" height="7" viewBox="0 0 16 7" fill="none">
                      <path d="M0 3.5H14M11 1L14 3.5L11 6" stroke="currentColor" strokeWidth="0.9" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info — 4 cols (offset 1) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="space-y-0"
              style={{ borderTop: "1px solid rgba(184,150,90,0.18)" }}>
              {(a.contact_info as unknown as Array<{ label: string; value: string }>).map((info, i) => (
                <div
                  key={info.label}
                  className="py-6"
                  style={{ borderBottom: "1px solid rgba(184,150,90,0.12)" }}
                >
                  <p className="text-[9.5px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--gold)" }}>
                    {info.label}
                  </p>
                  <p style={{ color: "var(--charcoal)", fontSize: "13.5px", lineHeight: 1.7 }}>
                    {info.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Map block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 relative overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              {/* Styled map placeholder with address overlay */}
              <div className="w-full h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80&fit=crop"
                  alt="Sherbrooke"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0" style={{ background: "rgba(20,20,18,0.45)" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-8 h-8 mb-4 flex items-center justify-center"
                    style={{ border: "1px solid var(--gold)", background: "rgba(20,20,18,0.7)" }}>
                    <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
                      <path d="M5 0C2.24 0 0 2.24 0 5C0 8.75 5 13 5 13C5 13 10 8.75 10 5C10 2.24 7.76 0 5 0ZM5 6.75C4.03 6.75 3.25 5.97 3.25 5C3.25 4.03 4.03 3.25 5 3.25C5.97 3.25 6.75 4.03 6.75 5C6.75 5.97 5.97 6.75 5 6.75Z" fill="#B8965A"/>
                    </svg>
                  </div>
                  <p className="font-serif text-sm mb-1"
                    style={{ color: "var(--ivory)", fontStyle: "italic", fontWeight: 300 }}>
                    {a.map_heading}
                  </p>
                  <p className="text-[10px] tracking-[0.18em]" style={{ color: "rgba(247,244,239,0.55)", whiteSpace: "pre-line" }}>
                    {a.map_address}
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-[9.5px] tracking-[0.28em] uppercase px-4 py-2 transition-all duration-300"
                    style={{ border: "1px solid rgba(184,150,90,0.5)", color: "var(--gold)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                      (e.currentTarget as HTMLElement).style.color = "var(--ivory)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    }}
                  >
                    {a.map_directions}
                  </a>
                </div>
                <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.18)" }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
