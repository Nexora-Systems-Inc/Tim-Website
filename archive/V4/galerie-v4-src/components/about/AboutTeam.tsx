"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type TeamMember = { name: string; role: string; bio: string; image: string };

export default function AboutTeam() {
  const { t } = useI18n();
  const a = t.aboutPage;
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section className="section-pad-lg" style={{ background: "var(--cream)" }}>
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5"
          >
            {a.team_eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.1 }}
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--charcoal)",
              lineHeight: 1.1,
            }}
          >
            {a.team_heading}
          </motion.h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {(a.team as unknown as TeamMember[]).map((member, i) => {
            const ref = useRef(null);
            const memberInView = useInView(ref, { once: true, margin: "-60px" });
            return (
              <motion.div
                key={member.name}
                ref={ref}
                initial={{ opacity: 0, y: 36 }}
                animate={memberInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className="group"
              >
                {/* Portrait */}
                <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "3/4" }}>
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-500"
                    style={{ background: "rgba(20,20,18,0.12)" }} />
                  <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.1)" }} />
                </div>

                {/* Name */}
                <h3 className="font-serif text-xl mb-1"
                  style={{ color: "var(--charcoal)", fontWeight: 400, fontStyle: "italic" }}>
                  {member.name}
                </h3>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: "var(--gold)" }}>
                  {member.role}
                </p>
                <p style={{ color: "var(--warm-gray)", fontSize: "13.5px", lineHeight: 1.85 }}>
                  {member.bio}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
