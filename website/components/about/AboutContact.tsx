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
        {/* Two-column: form + info */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
