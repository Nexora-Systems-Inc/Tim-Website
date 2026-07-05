"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Collections", "Artists", "Exhibitions", "About", "Contact"];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled
            ? "rgba(247,244,239,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,150,90,0.15)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none group">
            <span
              className="font-serif text-xl tracking-[0.08em]"
              style={{ color: scrolled ? "var(--charcoal)" : "var(--ivory)", fontWeight: 400 }}
            >
              Galerie
            </span>
            <span
              className="text-[9px] tracking-[0.35em] uppercase"
              style={{ color: scrolled ? "var(--gold)" : "rgba(212,176,122,0.9)" }}
            >
              Artistes Peintres
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[11px] tracking-[0.25em] uppercase transition-all duration-300 relative group"
                  style={{ color: scrolled ? "var(--charcoal)" : "rgba(247,244,239,0.85)" }}
                >
                  {link}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-500 group-hover:w-full"
                    style={{ background: "var(--gold)" }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-[10px] tracking-[0.3em] uppercase px-6 py-2.5 transition-all duration-500"
              style={{
                border: `1px solid ${scrolled ? "var(--gold)" : "rgba(212,176,122,0.6)"}`,
                color: scrolled ? "var(--gold)" : "rgba(212,176,122,0.9)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--ivory)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = scrolled ? "var(--gold)" : "rgba(212,176,122,0.9)";
              }}
            >
              View Collection
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="w-6 h-px block transition-all duration-300"
              style={{ background: scrolled ? "var(--charcoal)" : "var(--ivory)", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
            <span className="w-4 h-px block transition-all duration-300"
              style={{ background: scrolled ? "var(--charcoal)" : "var(--ivory)", opacity: menuOpen ? 0 : 1 }} />
            <span className="w-6 h-px block transition-all duration-300"
              style={{ background: scrolled ? "var(--charcoal)" : "var(--ivory)", transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none" }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: "var(--charcoal)" }}
          >
            <ul className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  <a
                    href="#"
                    className="font-serif text-4xl"
                    style={{ color: "var(--ivory)", fontWeight: 300 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="absolute bottom-12" style={{ color: "var(--gold)", fontSize: "10px", letterSpacing: "0.3em" }}>
              SHERBROOKE, QUÉBEC
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
