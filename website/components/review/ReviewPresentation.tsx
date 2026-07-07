"use client";

import { useRef, useState, useCallback } from "react";
import { REVIEW_VIDEO_SRC } from "@/lib/site";

function PlayIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
      <path d="M0 0v14l12-7z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12a8 8 0 0 1 13.66-5.66M20 4v5h-5M20 12a8 8 0 0 1-13.66 5.66M4 20v-5h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReviewPresentation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  const [started, setStarted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const scrollToVideo = useCallback(() => {
    videoWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const playWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    try {
      await video.play();
      return;
    } catch {
      video.muted = true;
      await video.play().catch(() => {});
    }
  }, []);

  const beginPresentation = useCallback(async () => {
    setStarted(true);
    scrollToVideo();
    await new Promise((r) => setTimeout(r, 480));
    await playWithSound();
  }, [playWithSound, scrollToVideo]);

  const watchAgain = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    scrollToVideo();
    video.currentTime = 0;
    await playWithSound();
  }, [playWithSound, scrollToVideo]);

  return (
    <div className="max-w-[720px] mx-auto">
      {/* Presentation invite panel */}
      <div
        className="text-center transition-all duration-700 ease-out"
        style={{
          padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.75rem)",
          background: "linear-gradient(180deg, var(--cream) 0%, rgba(240,235,227,0.45) 100%)",
          border: "1px solid rgba(184,150,90,0.22)",
          boxShadow: "0 20px 56px rgba(20,20,18,0.06)",
          opacity: hasPlayed && isPlaying ? 0.72 : 1,
        }}
      >
        <h1
          className="font-serif mb-3"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
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
          className="text-[10px] tracking-[0.42em] uppercase mb-8"
          style={{ color: "var(--gold)" }}
        >
          Artiste Peintre
        </p>

        <h2
          className="font-serif mb-6"
          style={{
            fontSize: "clamp(1.35rem, 2.8vw, 1.9rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--warm-gray-lt)",
            lineHeight: 1.15,
          }}
        >
          Website Presentation
        </h2>

        <div
          className="mx-auto mb-7 transition-opacity duration-500"
          style={{
            height: "1px",
            width: "min(120px, 28vw)",
            background: "linear-gradient(90deg, transparent, rgba(184,150,90,0.45), transparent)",
            opacity: hasPlayed ? 0.5 : 1,
          }}
        />

        <div
          className="transition-all duration-500"
          style={{
            maxHeight: hasPlayed && isPlaying ? 0 : 200,
            opacity: hasPlayed && isPlaying ? 0 : 1,
            overflow: "hidden",
            marginBottom: hasPlayed && isPlaying ? 0 : "1.75rem",
          }}
        >
          <p
            className="mb-3"
            style={{
              color: "var(--warm-gray)",
              fontSize: "14.5px",
              lineHeight: 1.75,
              maxWidth: "460px",
              marginInline: "auto",
            }}
          >
            Thank you for taking the time to review the latest version of your website.
          </p>

          <p
            style={{
              color: "rgba(28,28,26,0.52)",
              fontSize: "14px",
              lineHeight: 1.75,
              maxWidth: "460px",
              marginInline: "auto",
            }}
          >
            When you&apos;re ready, click below to begin your personalized walkthrough.
          </p>
        </div>

        {!hasPlayed ? (
          <button
            type="button"
            onClick={beginPresentation}
            className="btn-gold"
            style={{
              padding: "1.05rem 2.6rem",
              fontSize: "10.5px",
              letterSpacing: "0.34em",
            }}
          >
            <PlayIcon />
            Begin Presentation
          </button>
        ) : !isPlaying ? (
          <button
            type="button"
            onClick={watchAgain}
            className="btn-outline-dark"
            style={{
              padding: "0.85rem 2rem",
              fontSize: "10px",
              letterSpacing: "0.3em",
              transition: "opacity 0.5s ease",
            }}
          >
            <ReplayIcon />
            Watch Again
          </button>
        ) : null}
      </div>

      {/* Video — revealed on begin */}
      <div
        ref={videoWrapRef}
        className="transition-all duration-700 ease-out"
        style={{
          marginTop: started ? "1.75rem" : 0,
          maxHeight: started ? 1200 : 0,
          opacity: started ? 1 : 0,
          overflow: "hidden",
          pointerEvents: started ? "auto" : "none",
        }}
        aria-hidden={!started}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            boxShadow: started ? "0 24px 64px rgba(20,20,18,0.12)" : "none",
            border: "1px solid rgba(140,136,128,0.18)",
          }}
        >
          {started && !videoReady && !failed && (
            <div
              className="flex items-center justify-center w-full aspect-video"
              style={{ background: "var(--charcoal-mid)" }}
            >
              <div
                className="w-8 h-8 rounded-full border animate-pulse"
                style={{ borderColor: "rgba(184,150,90,0.35)" }}
              />
            </div>
          )}

          {failed && (
            <div
              className="flex flex-col items-center justify-center text-center w-full aspect-video px-6"
              style={{
                background: "var(--charcoal-mid)",
                border: "1px solid rgba(184,150,90,0.22)",
              }}
            >
              <p
                className="font-serif text-lg mb-2"
                style={{ color: "var(--ivory)", fontWeight: 300, fontStyle: "italic" }}
              >
                Presentation unavailable
              </p>
              <p
                className="text-[11px] tracking-[0.18em] uppercase"
                style={{ color: "rgba(247,244,239,0.42)" }}
              >
                Please contact us if this persists
              </p>
            </div>
          )}

          {!failed && (
            <video
              ref={videoRef}
              className={`w-full h-auto bg-black ${videoReady ? "block" : "hidden"}`}
              controls
              playsInline
              preload="metadata"
              onLoadedData={() => setVideoReady(true)}
              onPlay={() => {
                setIsPlaying(true);
                setHasPlayed(true);
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={() => setFailed(true)}
            >
              <source src={REVIEW_VIDEO_SRC} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
