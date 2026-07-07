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
      {/* Intro */}
      <section className="section-pad-lg">
        <div className="container max-w-[820px] mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.42em] uppercase mb-8"
            style={{ color: "var(--gold)" }}
          >
            {SITE_TITLE}
          </p>

          <h1
            className="font-serif mb-8"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--charcoal)",
              lineHeight: 1.05,
            }}
          >
            Website Review
          </h1>

          <div className="gold-rule w-24 mx-auto mb-10" />

          <p
            className="mb-4"
            style={{
              color: "var(--warm-gray)",
              fontSize: "15px",
              lineHeight: 1.9,
              maxWidth: "560px",
              marginInline: "auto",
            }}
          >
            Thank you for taking the time to review the latest version of your website.
          </p>

          <p
            style={{
              color: "rgba(28,28,26,0.55)",
              fontSize: "14.5px",
              lineHeight: 1.9,
              maxWidth: "560px",
              marginInline: "auto",
            }}
          >
            The short presentation below walks through the major improvements made since the
            original version.
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="pb-16 md:pb-20">
        <div className="container max-w-[960px] mx-auto">
          <ReviewVideo />
        </div>
      </section>

      {/* CTA + closing note */}
      <section
        className="section-pad border-t"
        style={{
          background: "var(--cream)",
          borderColor: "rgba(184,150,90,0.14)",
        }}
      >
        <div className="container max-w-[640px] mx-auto text-center">
          <h2
            className="font-serif mb-8"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
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
            className="mt-12"
            style={{
              color: "rgba(28,28,26,0.45)",
              fontSize: "13.5px",
              lineHeight: 1.85,
              maxWidth: "480px",
              marginInline: "auto",
            }}
          >
            If you have any questions or would like any adjustments, simply reply to the
            review email.
          </p>
        </div>
      </section>
    </main>
  );
}
