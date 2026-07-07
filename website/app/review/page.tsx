import type { Metadata } from "next";
import ReviewVideo from "@/components/review/ReviewVideo";
import { PRODUCTION_SITE_URL, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Website Review — ${SITE_TITLE}`,
  description: "Private client review page for the latest website presentation.",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <main style={{ background: "var(--ivory)" }}>
      {/* Branding, intro & video — compact presentation header */}
      <section
        className="pt-10 pb-12 md:pt-12 md:pb-14"
        style={{ paddingInline: "var(--container-padding)" }}
      >
        <div className="container max-w-[960px] mx-auto">
          <div className="text-center mb-6 md:mb-7">
            <h1
              className="font-serif mb-3"
              style={{
                fontSize: "clamp(3.2rem, 8vw, 5.75rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              M Lalonde
            </h1>

            <p
              className="text-[10px] tracking-[0.42em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Artiste Peintre
            </p>
          </div>

          <h2
            className="font-serif text-center mb-4"
            style={{
              fontSize: "clamp(1.35rem, 2.6vw, 1.85rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--warm-gray-lt)",
              lineHeight: 1.15,
            }}
          >
            Website Review
          </h2>

          <div className="max-w-[540px] mx-auto text-center mb-7 md:mb-8">
            <p
              className="mb-2.5"
              style={{
                color: "var(--warm-gray)",
                fontSize: "14.5px",
                lineHeight: 1.75,
              }}
            >
              Thank you for taking the time to review the latest version of your website.
            </p>

            <p
              style={{
                color: "rgba(28,28,26,0.52)",
                fontSize: "14px",
                lineHeight: 1.75,
              }}
            >
              The short presentation below walks through the major improvements made since the
              original version.
            </p>
          </div>

          <ReviewVideo />
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
