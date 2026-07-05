"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const COLLECTIONS = [
  {
    id: 1,
    title: "Maîtres Contemporains",
    subtitle: "Contemporary Masters",
    count: "47 Works",
    image: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=900&q=80&fit=crop",
    span: "lg:col-span-2 lg:row-span-2",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: 2,
    title: "Paysage Québécois",
    subtitle: "Québec Landscape",
    count: "83 Works",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=700&q=80&fit=crop",
    span: "lg:col-span-1",
    aspectRatio: "aspect-[5/4]",
  },
  {
    id: 3,
    title: "Abstraction Lyrique",
    subtitle: "Lyrical Abstraction",
    count: "31 Works",
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=700&q=80&fit=crop",
    span: "lg:col-span-1",
    aspectRatio: "aspect-[5/4]",
  },
  {
    id: 4,
    title: "Natures Mortes",
    subtitle: "Still Life",
    count: "24 Works",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700&q=80&fit=crop",
    span: "lg:col-span-1",
    aspectRatio: "aspect-[4/3]",
  },
];

function CollectionCard({ item, index }: { item: typeof COLLECTIONS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative overflow-hidden cursor-pointer ${item.span}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`w-full ${item.aspectRatio} lg:h-full relative overflow-hidden`}
        style={{ minHeight: index === 0 ? "min(560px, 60vw)" : "min(260px, 35vw)" }}>
        {/* Image */}
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: hovered
              ? "linear-gradient(to top, rgba(28,28,26,0.85) 0%, rgba(28,28,26,0.3) 50%, transparent 100%)"
              : "linear-gradient(to top, rgba(28,28,26,0.65) 0%, rgba(28,28,26,0.1) 60%, transparent 100%)",
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
          <motion.span
            className="text-[9px] tracking-[0.4em] uppercase mb-2 block"
            style={{ color: "var(--gold)" }}
            animate={{ opacity: hovered ? 1 : 0.7 }}
          >
            {item.count}
          </motion.span>

          <h3
            className="font-serif mb-1"
            style={{
              color: "var(--ivory)",
              fontSize: index === 0 ? "clamp(1.8rem, 3vw, 2.8rem)" : "clamp(1.3rem, 2vw, 1.8rem)",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h3>

          <span
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{ color: "rgba(247,244,239,0.55)" }}
          >
            {item.subtitle}
          </span>

          {/* Arrow */}
          <motion.div
            className="flex items-center gap-2 mt-4"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
              Explore
            </span>
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
              <path d="M0 4H18M14 1L18 4L14 7" stroke="#B8965A" strokeWidth="0.8" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collections() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="collections" className="py-28 md:py-36" style={{ background: "var(--ivory)" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 mb-4"
              style={{ color: "var(--gold)" }}
            >
              <span className="h-px w-8" style={{ background: "var(--gold)", display: "inline-block" }} />
              Curated Collections
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--charcoal)",
                lineHeight: 1.1,
              }}
            >
              Works of Distinction
            </motion.h2>
          </div>

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 md:mt-0 text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 transition-all duration-300 group"
            style={{ color: "var(--charcoal)" }}
          >
            All Collections
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
              <path d="M0 4H18M14 1L18 4L14 7" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {COLLECTIONS.map((item, i) => (
            <CollectionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
