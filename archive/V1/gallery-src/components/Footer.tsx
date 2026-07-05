"use client";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  Collection: ["All Works", "Under $500", "Over $500", "New Arrivals", "Sold Works"],
  Artists: ["Jules Michel", "Stefan Hagiu", "Rajka Kupesic", "Elena Carla", "All Artists"],
  Gallery: ["Our Philosophy", "Exhibitions", "Private Events", "Press", "Careers"],
  Services: ["Private Viewings", "Art Consulting", "Framing", "Shipping", "Returns"],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", borderTop: "1px solid rgba(184,150,90,0.12)" }}>
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="font-serif text-2xl mb-1" style={{ color: "var(--ivory)", fontWeight: 300, letterSpacing: "0.06em" }}>
                Galerie
              </div>
              <div className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>
                Artistes Peintres
              </div>
            </div>

            <p className="text-[13px] leading-relaxed mb-8" style={{ color: "rgba(247,244,239,0.4)", lineHeight: 1.8 }}>
              A sanctuary for Québécois art since 1994. Presenting over 950 original works by the province's most distinguished painters.
            </p>

            <div className="space-y-2">
              <div className="text-[11px]" style={{ color: "rgba(247,244,239,0.35)" }}>
                <span className="tracking-wider" style={{ color: "var(--gold-muted)" }}>Location</span>
                <div className="mt-1 leading-relaxed">Sherbrooke, Québec, Canada</div>
              </div>
              <div className="text-[11px] mt-3" style={{ color: "rgba(247,244,239,0.35)" }}>
                <span className="tracking-wider" style={{ color: "var(--gold-muted)" }}>Contact</span>
                <div className="mt-1">819-572-2099</div>
                <div>galerie@artdeco.com</div>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-[10px] tracking-[0.35em] uppercase mb-5"
                style={{ color: "var(--gold)" }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12px] transition-colors duration-300"
                      style={{ color: "rgba(247,244,239,0.4)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ivory)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.4)"; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mt-16 pt-12 pb-10 px-0 md:px-0 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ borderColor: "rgba(184,150,90,0.1)" }}
        >
          <div>
            <h4 className="font-serif text-xl mb-1" style={{ color: "var(--ivory)", fontStyle: "italic", fontWeight: 300 }}>
              Stay Informed
            </h4>
            <p className="text-[12px]" style={{ color: "rgba(247,244,239,0.35)" }}>
              New acquisitions, exhibition openings, and collector insights.
            </p>
          </div>
          <div className="flex gap-0 w-full md:w-auto md:min-w-[380px]">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 text-[12px] outline-none bg-transparent"
              style={{
                border: "1px solid rgba(184,150,90,0.25)",
                borderRight: "none",
                color: "var(--ivory)",
              }}
            />
            <button
              className="px-6 py-3.5 text-[10px] tracking-[0.25em] uppercase shrink-0 transition-all duration-400"
              style={{ background: "var(--gold)", color: "var(--ivory)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(184,150,90,0.08)" }}
        >
          <p className="text-[10px] tracking-wider" style={{ color: "rgba(247,244,239,0.2)" }}>
            © 2025 Galerie Artistes Peintres, Sherbrooke. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-wider transition-colors duration-300"
                style={{ color: "rgba(247,244,239,0.2)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,244,239,0.2)"; }}
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
