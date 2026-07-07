"use client";

import { useState } from "react";
import { REVIEW_VIDEO_SRC } from "@/lib/site";

function VideoPlaceholder() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center w-full aspect-video"
      style={{
        background: "var(--charcoal-mid)",
        border: "1px solid rgba(184,150,90,0.22)",
      }}
    >
      <div
        className="mb-5 flex items-center justify-center rounded-full"
        style={{
          width: "4.5rem",
          height: "4.5rem",
          border: "1px solid rgba(184,150,90,0.35)",
          color: "var(--gold)",
        }}
        aria-hidden
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p
        className="font-serif text-xl md:text-2xl mb-2"
        style={{ color: "var(--ivory)", fontWeight: 300, fontStyle: "italic" }}
      >
        Review video
      </p>
      <p
        className="text-[11px] tracking-[0.22em] uppercase max-w-xs"
        style={{ color: "rgba(247,244,239,0.42)", lineHeight: 1.7 }}
      >
        Video will appear here once the file is added
      </p>
    </div>
  );
}

export default function ReviewVideo() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        boxShadow: "0 24px 64px rgba(20,20,18,0.12)",
        border: "1px solid rgba(140,136,128,0.18)",
      }}
    >
      {(!ready || failed) && <VideoPlaceholder />}

      {!failed && (
        <video
          className={`w-full h-auto bg-black ${ready ? "block" : "sr-only"}`}
          controls
          preload="metadata"
          playsInline
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={REVIEW_VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
