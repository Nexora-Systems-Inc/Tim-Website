"use client";
import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { CLIENT_ARTWORKS } from "@/lib/clientArtworks";
import { artworkContactHref } from "@/lib/artworkInquiry";
import { adjacentArtwork, isMostlyHorizontalSwipe } from "@/lib/galleryNavigation";
import SoldStamp from "@/components/SoldStamp";

type Artwork = {
  ref: string; title: string; artist: string; year: string;
  medium: string; dimensions: string; price: string;
  category: string; image: string; featured: boolean;
  sold?: boolean;
};

const FILTER_IDS = new Set([
  "all",
  "featured",
  "sold",
]);

function filterArtworks(artworks: Artwork[], categoryId: string) {
  if (categoryId === "all") return artworks;
  if (categoryId === "sold") return artworks.filter((work) => work.sold);
  if (categoryId === "featured") return artworks.filter((work) => work.featured);
  return artworks.filter((work) => work.category === categoryId);
}

function syncCategoryInUrl(categoryId: string) {
  const url = new URL(window.location.href);
  if (categoryId === "all") url.searchParams.delete("category");
  else url.searchParams.set("category", categoryId);
  window.history.replaceState(null, "", url);
}

type Category = { id: string; label: string; count: number };

const MOBILE_PRIORITY_FILTER_IDS = ["all", "featured", "sold"];

function orderCategoriesForMobile(categories: Category[]) {
  const byId = new Map(categories.map((cat) => [cat.id, cat]));
  const prioritized = MOBILE_PRIORITY_FILTER_IDS
    .map((id) => byId.get(id))
    .filter((cat): cat is Category => Boolean(cat));
  const remaining = categories.filter((cat) => !MOBILE_PRIORITY_FILTER_IDS.includes(cat.id));
  return [...prioritized, ...remaining];
}

function CategoryPill({
  cat,
  active,
  onSelect,
}: {
  cat: Category;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(cat.id)}
      className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase transition-all duration-400"
      style={{
        background: active ? "var(--charcoal)" : "transparent",
        color: active ? "var(--ivory)" : "var(--warm-gray)",
        border: `1px solid ${active ? "var(--charcoal)" : "rgba(140,136,128,0.3)"}`,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--charcoal)";
          (e.currentTarget as HTMLElement).style.color = "var(--charcoal)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(140,136,128,0.3)";
          (e.currentTarget as HTMLElement).style.color = "var(--warm-gray)";
        }
      }}
    >
      {cat.label}
      <span style={{ color: active ? "var(--gold)" : "rgba(140,136,128,0.5)", fontSize: "9px" }}>
        {cat.count}
      </span>
    </button>
  );
}

/* ─── Body scroll lock while the lightbox is open ───────── */
function useLightboxScrollLock() {
  useEffect(() => {
    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      htmlOverflow: documentElement.style.overflow,
    };

    documentElement.classList.add("artwork-lightbox-open");
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    // iOS Safari ignores overflow:hidden on body unless it is taken out of flow.
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      documentElement.classList.remove("artwork-lightbox-open");
      body.style.overflow = previous.overflow;
      documentElement.style.overflow = previous.htmlOverflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, []);
}

function NavChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      {direction === "prev" ? (
        <path d="M11.5 3.5L6 9l5.5 5.5" stroke="currentColor" strokeWidth="1.2" />
      ) : (
        <path d="M6.5 3.5L12 9l-5.5 5.5" stroke="currentColor" strokeWidth="1.2" />
      )}
    </svg>
  );
}

/* ─── Lightbox ──────────────────────────────────────────── */
function Lightbox({
  work,
  works,
  onClose,
  onSelect,
}: {
  work: Artwork;
  works: Artwork[];
  onClose: () => void;
  onSelect: (work: Artwork) => void;
}) {
  const { t } = useI18n();
  const c = t.collectionsPage;
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const canBrowse = works.length > 1;
  useLightboxScrollLock();

  const go = (direction: -1 | 1) => {
    const next = adjacentArtwork(works, work.ref, direction);
    if (next && next.ref !== work.ref) onSelect(next);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onSelect, work, works]);

  const closeOnBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="artwork-lightbox-title"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="artwork-lightbox"
      onClick={closeOnBackdrop}
    >
      <div className="artwork-lightbox-frame" onClick={closeOnBackdrop}>
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="artwork-lightbox-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={work.ref}
              className="artwork-lightbox-body"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            >
          {/* Image panel */}
          <div
            className="artwork-lightbox-image"
            onTouchStart={(e: TouchEvent<HTMLDivElement>) => {
              const touch = e.changedTouches[0];
              swipeStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(e: TouchEvent<HTMLDivElement>) => {
              if (!swipeStart.current || !canBrowse) {
                swipeStart.current = null;
                return;
              }
              const touch = e.changedTouches[0];
              const dx = touch.clientX - swipeStart.current.x;
              const dy = touch.clientY - swipeStart.current.y;
              swipeStart.current = null;
              if (!isMostlyHorizontalSwipe(dx, dy)) return;
              go(dx < 0 ? 1 : -1);
            }}
          >
            <img src={work.image} alt={work.title} />
            {/* Ref badge */}
            <span className="absolute top-4 left-4 text-[9px] tracking-[0.28em] px-2.5 py-1"
              style={{ background: "rgba(20,20,18,0.65)", color: "rgba(247,244,239,0.5)", backdropFilter: "blur(8px)" }}>
              {work.ref}
            </span>
          </div>

          {canBrowse && (
            <div className="artwork-lightbox-nav-bar">
              <button
                type="button"
                className="artwork-lightbox-nav"
                onClick={() => go(-1)}
                aria-label={c.prev_artwork}
              >
                <NavChevron direction="prev" />
                {c.prev_artwork}
              </button>
              <button
                type="button"
                className="artwork-lightbox-nav"
                onClick={() => go(1)}
                aria-label={c.next_artwork}
              >
                {c.next_artwork}
                <NavChevron direction="next" />
              </button>
            </div>
          )}

          {/* Info panel */}
          <div className="artwork-lightbox-info">
          <div>
            {/* Artist */}
            <p className="text-[10px] tracking-[0.38em] uppercase mb-3" style={{ color: "var(--gold)" }}>
              {work.artist} — {work.year}
            </p>

            {/* Title */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <h2 id="artwork-lightbox-title" className="font-serif" aria-live="polite"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 300, fontStyle: "italic", color: "var(--ivory)", lineHeight: 1.1 }}>
                {work.title}
              </h2>
              {work.featured && (
                <span
                  className="text-[8px] tracking-[0.34em] uppercase px-3 py-1 shrink-0"
                  style={{ border: "1px solid rgba(184,150,90,0.55)", color: "var(--gold)" }}
                >
                  {c.featured_label}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="mb-6" style={{ height: "1px", background: "rgba(184,150,90,0.2)" }} />

            {/* Details */}
            <dl className="space-y-3">
              {[
                ["Technique", work.medium],
                ["Format",    work.dimensions],
                ["Référence", work.ref],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(247,244,239,0.35)" }}>{label}</dt>
                  <dd className="text-[12px] text-right" style={{ color: "rgba(247,244,239,0.65)" }}>{val}</dd>
                </div>
              ))}
            </dl>

            {/* Divider */}
            <div className="my-6" style={{ height: "1px", background: "rgba(184,150,90,0.2)" }} />

            {/* Price / sold */}
            <div className="flex items-baseline justify-between mb-8">
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(247,244,239,0.35)" }}>
                {work.sold ? c.sold_label : "Prix"}
              </span>
              {work.sold ? (
                <div className="text-right">
                  {work.price ? (
                    <span className="block font-serif text-lg mb-1 line-through"
                      style={{ color: "rgba(247,244,239,0.28)", fontWeight: 300, fontStyle: "italic" }}>
                      {work.price} $
                    </span>
                  ) : null}
                  <span className="font-serif text-2xl tracking-[0.18em] uppercase"
                    style={{ color: "var(--gold)", fontWeight: 300 }}>
                    {c.sold_label}
                  </span>
                  <p className="text-[10px] tracking-[0.24em] uppercase mt-2"
                    style={{ color: "rgba(247,244,239,0.42)" }}>
                    {c.sold_acquired}
                  </p>
                </div>
              ) : (
                <span className="font-serif text-2xl" style={{ color: "var(--gold)", fontWeight: 300, fontStyle: "italic" }}>
                  {work.price} $
                </span>
              )}
            </div>

            {/* Tax note */}
            {!work.sold && (
              <p className="text-[10px] tracking-[0.22em]" style={{ color: "rgba(184,150,90,0.45)" }}>
                Toutes taxes incluses
              </p>
            )}
          </div>

          {/* Contact CTA — every painting, every breakpoint */}
          <div className="flex flex-col gap-4 mt-8">
            <p
              className="font-serif"
              style={{
                color: "rgba(247,244,239,0.72)",
                fontSize: "1.15rem",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.35,
              }}
            >
              {c.inquiry_heading}
            </p>
            <Link
              href={artworkContactHref(work.ref)}
              className="btn-gold justify-center"
            >
              {c.inquiry_cta}
            </Link>
            <button
              onClick={onClose}
              className="text-[10px] tracking-[0.28em] uppercase py-2 text-center transition-colors duration-300"
              style={{ color: "rgba(247,244,239,0.3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.65)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.3)"; }}
            >
              {c.close_label}
            </button>
          </div>
          </div>
            </motion.div>
          </AnimatePresence>

        {/* Close × */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center transition-all duration-300"
          style={{ color: "rgba(247,244,239,0.4)", border: "1px solid rgba(247,244,239,0.12)", background: "rgba(20,20,18,0.35)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,244,239,0.12)"; }}
          aria-label={c.close_label}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        </motion.div>
        {canBrowse && (
          <>
            <button
              type="button"
              className="artwork-lightbox-nav artwork-lightbox-nav-edge prev"
              onClick={() => go(-1)}
              aria-label={c.prev_artwork}
            >
              <NavChevron direction="prev" />
            </button>
            <button
              type="button"
              className="artwork-lightbox-nav artwork-lightbox-nav-edge next"
              onClick={() => go(1)}
              aria-label={c.next_artwork}
            >
              <NavChevron direction="next" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Single artwork card ──────────────────────────────── */
function ArtworkCard({ work, index, onOpen }: { work: Artwork; index: number; onOpen: () => void }) {
  const { t } = useI18n();
  const c = t.collectionsPage;
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Vary card height for editorial masonry rhythm
  const heights = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/5]"];
  const aspectClass = work.featured ? "aspect-[3/4]" : heights[index % heights.length];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden mb-4 ${aspectClass}`}>
        <motion.img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.055 : 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Hover reveal */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5"
          animate={{ background: hovered ? "linear-gradient(to top, rgba(20,20,18,0.75) 0%, rgba(20,20,18,0.1) 55%, transparent 100%)" : "linear-gradient(to top, rgba(20,20,18,0.35) 0%, transparent 60%)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2"
          >
            <span className="text-[9.5px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
              Voir l'œuvre
            </span>
            <svg width="16" height="6" viewBox="0 0 16 6" fill="none">
              <path d="M0 3H14M11 1L14 3L11 5" stroke="#B8965A" strokeWidth="0.8" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Ref tag */}
        <span className="absolute top-3 left-3 text-[8.5px] tracking-[0.22em]"
          style={{ color: "rgba(247,244,239,0.42)" }}>
          {work.ref}
        </span>

        {/* Sold stamp */}
        {work.sold && <SoldStamp label={c.sold_label} size="sm" />}

        {/* Featured badge */}
        {work.featured && !work.sold && (
          <span className="absolute top-3 right-3 text-[8px] tracking-[0.3em] uppercase px-2.5 py-1"
            style={{ background: "var(--gold)", color: "var(--ivory)" }}>
            {c.featured_label}
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="pr-2">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="font-serif leading-tight"
            style={{ color: "var(--charcoal)", fontSize: "1.05rem", fontWeight: 400, fontStyle: "italic" }}>
            {work.title}
          </h3>
          <span className="font-serif text-[0.9rem] shrink-0 pt-0.5"
            style={{ color: work.sold ? "rgba(28,28,26,0.38)" : "var(--gold)", fontWeight: 300, letterSpacing: work.sold ? "0.18em" : undefined, fontSize: work.sold ? "0.72rem" : undefined, textTransform: work.sold ? "uppercase" : undefined }}>
            {work.sold ? c.sold_label : `${work.price} $`}
          </span>
        </div>
        <p className="text-[10px] tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--warm-gray)" }}>
          {work.artist}
        </p>
        <p className="text-[11px]" style={{ color: "rgba(28,28,26,0.38)" }}>
          {work.medium} · {work.year}
        </p>

        {/* Gold reveal line */}
        <motion.div
          className="h-px mt-3"
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          style={{ background: "var(--gold)", transformOrigin: "left" }}
        />
      </div>
    </motion.article>
  );
}

/* ─── Main grid ────────────────────────────────────────── */
export default function CollectionsGrid() {
  const { t } = useI18n();
  const c = t.collectionsPage;
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxWork, setLightboxWork] = useState<Artwork | null>(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const allArtworks = CLIENT_ARTWORKS.filter((work) => {
    const artist = work.artist.trim();
    return /^(m\.?\s*lalonde|manon\s+lalonde)$/i.test(artist);
  }) as Artwork[];

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && FILTER_IDS.has(category)) {
      setActiveCategory(category);
    }

    const artworkRef = searchParams.get("ref");
    if (!artworkRef) return;
    const match = CLIENT_ARTWORKS.find((work) => work.ref === artworkRef);
    if (match) setLightboxWork(match as Artwork);
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    syncCategoryInUrl(categoryId);
  };

  const handleArtworkSelect = (work: Artwork) => {
    setLightboxWork(work);
    const url = new URL(window.location.href);
    url.searchParams.set("ref", work.ref);
    window.history.replaceState(null, "", url);
  };

  const handleLightboxClose = () => {
    setLightboxWork(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("ref")) {
      url.searchParams.delete("ref");
      window.history.replaceState(null, "", url);
    }
  };

  const filtered = filterArtworks(allArtworks, activeCategory);
  const localeCategories = c.categories as unknown as Category[];
  const categories = localeCategories
    .map((cat) => ({
      ...cat,
      count: filterArtworks(allArtworks, cat.id).length,
    }))
    .filter((cat) => cat.id === "all" || cat.count > 0);
  const mobileCategories = orderCategoriesForMobile(categories);

  return (
    <>
      <section className="section-pad-lg" style={{ background: "var(--ivory)" }}>
        <div className="container">

          {/* Filter bar */}
          <div ref={headerRef} className="mb-14 md:mb-18">
            {/* Top row: label + count */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-between mb-8"
            >
              <span className="eyebrow">{c.filter_label}</span>
              <span className="text-[11px] tracking-[0.2em]" style={{ color: "var(--warm-gray)" }}>
                {filtered.length} {(c as { works_count_suffix: string }).works_count_suffix}
              </span>
            </motion.div>

            {/* Category pills — mobile priority order below 641px */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-wrap gap-2 sm:hidden"
            >
              {mobileCategories.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  cat={cat}
                  active={cat.id === activeCategory}
                  onSelect={handleCategoryChange}
                />
              ))}
            </motion.div>

            {/* Category pills — default order on tablet and desktop */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hidden sm:flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  cat={cat}
                  active={cat.id === activeCategory}
                  onSelect={handleCategoryChange}
                />
              ))}
            </motion.div>

            {/* Divider */}
            <div className="mt-8 section-rule" />
          </div>

          {/* Masonry-style grid — 2 col mobile, 3 col tablet, 4 col desktop */}
          {/* We use CSS columns for true masonry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  columns: "4",
                  columnGap: "1.5rem",
                }}
                className="masonry-grid"
              >
                <style>{`
                  @media (max-width: 640px) { .masonry-grid { columns: 2 !important; } }
                  @media (min-width: 641px) and (max-width: 900px) { .masonry-grid { columns: 3 !important; } }
                  .masonry-grid > article { break-inside: avoid; margin-bottom: 1.5rem; }
                `}</style>
                {filtered.map((work, i) => (
                  <ArtworkCard
                    key={work.ref}
                    work={work as unknown as Artwork}
                    index={i}
                    onOpen={() => handleArtworkSelect(work as unknown as Artwork)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxWork && (
          <Lightbox
            work={lightboxWork}
            works={filtered as Artwork[]}
            onClose={handleLightboxClose}
            onSelect={handleArtworkSelect}
          />
        )}
      </AnimatePresence>
    </>
  );
}
