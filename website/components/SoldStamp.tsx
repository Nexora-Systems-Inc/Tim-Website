type SoldStampProps = {
  label: string;
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
};

const SIZE = {
  sm: { font: "1.74rem", pad: "0.1rem 0.28rem", top: "12%", left: "8%", border: "3px", radius: "7px" },
  md: { font: "2.16rem", pad: "0.12rem 0.34rem", top: "14%", left: "10%", border: "3.5px", radius: "8px" },
} as const;

export default function SoldStamp({
  label,
  size = "md",
  className = "",
  style,
}: SoldStampProps) {
  const text = label.toUpperCase();
  const dims = SIZE[size];
  const fontSize = text.length > 4 ? `calc(${dims.font} - 0.18rem)` : dims.font;

  return (
    <span
      className={`absolute pointer-events-none select-none z-[2] ${className}`}
      aria-hidden
      style={{
        top: dims.top,
        left: dims.left,
        transform: "rotate(-12deg)",
        transformOrigin: "center",
        ...style,
      }}
    >
      <span
        className="inline-block font-serif uppercase relative overflow-hidden"
        style={{
          backgroundColor: "#c41e24",
          color: "#ffffff",
          fontSize,
          fontWeight: 700,
          letterSpacing: "0.1em",
          padding: dims.pad,
          borderRadius: dims.radius,
          border: `${dims.border} solid #ffffff`,
          lineHeight: 1.1,
          opacity: 0.9,
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <span
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            opacity: 0.18,
            mixBlendMode: "soft-light",
          }}
        />
        <span className="relative">{text}</span>
      </span>
    </span>
  );
}
