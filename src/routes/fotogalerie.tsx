import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../components/PageHeader";

import img8783 from "../assets/gallery-IMG_8783-4.jpeg.asset.json";
import img8782 from "../assets/gallery-IMG_8782-2.jpeg.asset.json";
import img8773 from "../assets/gallery-IMG_8773.jpeg.asset.json";
import img8786 from "../assets/gallery-IMG_8786.jpeg.asset.json";
import img8774 from "../assets/gallery-IMG_8774.jpeg.asset.json";
import img8777 from "../assets/gallery-IMG_8777.jpeg.asset.json";
import img8780 from "../assets/gallery-IMG_8780.jpeg.asset.json";
import img8779 from "../assets/gallery-IMG_8779.jpeg.asset.json";
import cb072v2 from "../assets/gallery-CB072-2.jpeg.asset.json";

export const Route = createFileRoute("/fotogalerie")({
  head: () => ({
    meta: [
      { title: "Fotogalerie — Červené Jablíčko" },
      {
        name: "description",
        content: "Fotografie z běžného dne dětské skupiny Červené Jablíčko.",
      },
    ],
  }),
  component: Page,
});

const photos = [
  { src: img8782.url, alt: "Vchod do školky" },
  { src: img8783.url, alt: "Zahrada a hřiště" },
  { src: img8773.url, alt: "Třída s hračkami" },
  { src: img8777.url, alt: "Prostorná herna" },
  { src: img8774.url, alt: "Stolky a odpočinkový kout" },
  { src: img8786.url, alt: "Piano ve třídě" },
  { src: img8780.url, alt: "Dětská koupelna" },
  { src: img8779.url, alt: "Šatna dětí" },
  { src: cb072v2.url, alt: "Děti na zahradě" },
];

function Page() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : i === photos.length - 1 ? 0 : i + 1
    );
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : i === 0 ? photos.length - 1 : i - 1
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Fotogalerie"
        subtitle="Fotografie z běžného dne v naší školce."
      />
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(i)}
              className="group overflow-hidden rounded-2xl border border-border shadow-sm text-left"
              aria-label={`Zvětšit fotku: ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                width={1600}
                height={1200}
              />
            </button>
          ))}
        </div>
        </div>
      </div>


      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Zvětšená fotografie"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Zavřít"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-4"
            aria-label="Předchozí fotka"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-4"
            aria-label="Další fotka"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
              loading="eager"
            />
            <p
              className="mt-3 text-center text-lg text-white"
              style={{ fontFamily: '"Jakarta", sans-serif' }}
            >
              {photos[lightboxIndex].alt}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
