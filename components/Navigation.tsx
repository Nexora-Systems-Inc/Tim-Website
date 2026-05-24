"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { t } = useI18n();
  const n = t.nav;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // On dark pages (homepage), nav starts transparent; on inner pages start solid
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const forceLight = !isHomePage || scrolled;

  const ivoryAlpha  = (a: number) => `rgba(247,244,239,${a})`;
  const goldAlpha   = (a: number) => `rgba(184,150,90,${a})`;

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: forceLight ? "rgba(247,244,239,0.95)" : "transparent",
          backdropFilter: forceLight ? "blur(24px) saturate(180%)" : "none",
          boxShadow: forceLight ? "0 1px 0 rgba(184,150,90,0.12)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none select-none">
            <span
              className="font-serif text-[1.15rem] tracking-[0.07em] transition-colors duration-500"
              style={{ color: forceLight ? "var(--charcoal)" : ivoryAlpha(0.96), fontWeight: 400 }}
            >
              Galerie à Manon
            </span>
            <span
              className="text-[8.5px] tracking-[0.4em] uppercase transition-colors duration-500"
              style={{ color: forceLight ? "var(--gold)" : goldAlpha(0.85) }}
            >
              {n.gallery_subtitle}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9">
            {n.links.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("#")[0]));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-[10.5px] tracking-[0.24em] uppercase transition-colors duration-300 group"
                    style={{ color: forceLight ? "var(--charcoal)" : ivoryAlpha(0.8) }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-px left-0 h-px transition-all duration-500"
                      style={{
                        width: active ? "100%" : "0%",
                        background: "var(--gold)",
                      }}
                    />
                    {!active && (
                      <span className="absolute -bottom-px left-0 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: "var(--gold)" }} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/collections"
              className="text-[10px] tracking-[0.28em] uppercase px-5 py-2 transition-all duration-450 border"
              style={{
                borderColor: forceLight ? goldAlpha(0.55) : goldAlpha(0.45),
                color: forceLight ? "var(--gold)" : goldAlpha(0.88),
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--ivory)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = forceLight ? "var(--gold)" : goldAlpha(0.88);
                (e.currentTarget as HTMLElement).style.borderColor = forceLight ? goldAlpha(0.55) : goldAlpha(0.45);
              }}
            >
              {n.cta}
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-px transition-all duration-300"
                style={{
                  width: i === 1 ? (menuOpen ? "24px" : "16px") : "24px",
                  background: forceLight ? "var(--charcoal)" : "var(--ivory)",
                  transform: menuOpen && i === 0 ? "rotate(45deg) translate(4px,4px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: "var(--charcoal)" }}
          >
            <ul className="flex flex-col items-center gap-7">
              {n.links.map((link, i) => (
                <motion.li key={link.href}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.5 }}
                >
                  <Link href={link.href}
                    className="font-serif text-[2.2rem] tracking-[0.02em]"
                    style={{ color: "var(--ivory)", fontWeight: 300, fontStyle: "italic" }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="absolute bottom-10 text-[9px] tracking-[0.38em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              {n.mobile_location}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
