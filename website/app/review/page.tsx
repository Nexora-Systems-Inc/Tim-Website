import type { Metadata } from "next";
import ReviewPresentation from "@/components/review/ReviewPresentation";
import { PRODUCTION_SITE_URL, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Website Review — ${SITE_TITLE}`,
  description: "Private client review page for the latest website presentation.",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>
      <section
        className="pt-10 pb-12 md:pt-12 md:pb-14"
        style={{ paddingInline: "var(--container-padding)" }}
      >
        <div className="container max-w-[960px] mx-auto">
          <ReviewPresentation />
        </div>
      </section>

      {/* CTA + closing note */}
      <section
        className="py-12 md:py-14 border-t"
        style={{
          background: "var(--cream)",
          borderColor: "rgba(184,150,90,0.14)",
        }}
      >
        <div className="container max-w-[640px] mx-auto text-center">
          <h2
            className="font-serif mb-7"
            style={{
              fontSize: "clamp(1.45rem, 2.8vw, 1.9rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--charcoal)",
            }}
          >
            Review the Website
          </h2>

          <a
            href={PRODUCTION_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Open production website
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
              <path d="M0 4.5H12M8.5 1L12 4.5L8.5 8" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>

          <p
            className="mt-9"
            style={{
              color: "rgba(28,28,26,0.45)",
              fontSize: "13.5px",
              lineHeight: 1.8,
              maxWidth: "480px",
              marginInline: "auto",
            }}
          >
            If you have any questions or would like any adjustments, simply reply to the
            review email.
          </p>
        </div>
      </section>

      {/* Nexora signature */}
      <footer
        className="py-10 md:py-12 border-t"
        style={{
          background: "var(--ivory)",
          borderColor: "rgba(184,150,90,0.1)",
        }}
      >
        <div className="container max-w-[480px] mx-auto text-center">
          <div
            className="mx-auto mb-6"
            style={{
              height: "1px",
              width: "min(200px, 40vw)",
              background: "linear-gradient(90deg, transparent, rgba(184,150,90,0.35), transparent)",
            }}
          />

          <p
            className="text-[9.5px] tracking-[0.38em] uppercase mb-2"
            style={{ color: "rgba(28,28,26,0.38)" }}
          >
            Presented by Nexora Systems
          </p>

          <p
            className="font-serif text-[1.05rem]"
            style={{
              color: "rgba(28,28,26,0.32)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}
          >
            Where intelligence comes to life.
          </p>

          <div
            className="mx-auto mt-6"
            style={{
              height: "1px",
              width: "min(200px, 40vw)",
              background: "linear-gradient(90deg, transparent, rgba(184,150,90,0.35), transparent)",
            }}
          />
        </div>
      </footer>
    </main>
  );
}
