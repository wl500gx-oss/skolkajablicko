import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import kuratka1 from "../assets/kuratka-new1.jpeg.asset.json";
import kuratka2 from "../assets/kuratka-new2.webp.asset.json";
import { PageHeader } from "../components/PageHeader";
import { Lightbox } from "../components/Lightbox";

const photos = [
  { src: kuratka1.url, alt: "Děti s kuřátkem ve školce" },
  { src: kuratka2.url, alt: "Děti drží čerstvě vylíhnutá kuřátka" },
];

export const Route = createFileRoute("/projekty")({
  head: () => ({
    meta: [
      { title: "Projekty — Červené Jablíčko" },
      {
        name: "description",
        content: "Projekty dětské skupiny Červené Jablíčko – líhnutí kuřátek a další.",
      },
    ],
  }),
  component: Page,
});

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

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Projekty"
        subtitle="Kratší i delší projekty, které si s dětmi společně užíváme."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid gap-0 md:grid-cols-2">
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="group relative h-full w-full overflow-hidden text-left"
                aria-label="Zvětšit fotku: Děti s kuřátkem ve školce"
              >
                <img
                  src={photos[0].src}
                  alt={photos[0].alt}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </button>
              <div className="p-6 sm:p-8">
                <h2
                  className="text-2xl font-bold text-[color:var(--brand-red)] sm:text-3xl"
                  style={{ fontFamily: '"Baloo 2", sans-serif' }}
                >
                  Líhnutí kuřátek
                </h2>
                <p className="mt-4 text-foreground/80">
                  Projekt líhnutí kuřátek v naší školce měl velký ohlas.
                  Musíme si ho zopakovat :-)
                </p>
                <button
                  type="button"
                  onClick={() => openLightbox(1)}
                  className="group mt-6 block w-full overflow-hidden rounded-xl text-left"
                  aria-label="Zvětšit fotku: Děti drží čerstvě vylíhnutá kuřátka"
                >
                  <img
                    src={photos[1].src}
                    alt={photos[1].alt}
                    className="w-full rounded-xl shadow transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Lightbox
        items={photos}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />
    </main>
  );
}
