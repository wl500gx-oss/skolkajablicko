import { createFileRoute } from "@tanstack/react-router";
import { FileText, Newspaper } from "lucide-react";
import souhlasFotoVideo from "../assets/souhlas-fotografie-a-videa-od-zakonneho-zastupce.pdf.asset.json";
import { PageHeader } from "../components/PageHeader";


export const Route = createFileRoute("/pro-rodice")({
  head: () => ({
    meta: [
      { title: "Pro rodiče — Červené Jablíčko" },
      {
        name: "description",
        content:
          "Aktuality a dokumenty GDPR ke stažení pro rodiče dětské skupiny Červené Jablíčko.",
      },
    ],
  }),
  component: Page,
});

const news = [
  {
    date: "20. 7. 2026",
    title: "Vítáme vás na nových webových stránkách",
    text: "Právě jsme spustili nové webové stránky. Postupně doplníme fotografie a aktuální informace.",
  },
  {
    date: "1. 9. 2025",
    title: "Zahájení nového školního roku",
    text: "Těšíme se na nové i stávající kamarády. Podrobný harmonogram najdete v e-mailu.",
  },
];

const gdprDocs = [
  { title: "Informace o zpracování osobních údajů (GDPR)", file: "#" },
  { title: "Souhlas se zpracováním osobních údajů", file: "#" },
  { title: "Souhlas s pořizováním fotografií a videí od zákonného zástupce", file: souhlasFotoVideo.url },
];

function Page() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Pro rodiče"
        subtitle="Aktuality ze školky a dokumenty ke stažení."
      />
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">



        {/* Aktuality */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Newspaper className="text-[color:var(--brand-red)]" size={28} />
            <h2
              className="text-3xl font-bold text-[color:var(--brand-red)]"
              style={{ fontFamily: '"Baloo 2", sans-serif' }}
            >
              Aktuality
            </h2>
          </div>
          <div className="space-y-4">
            {news.map((n) => (
              <article
                key={n.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {n.date}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                  {n.title}
                </h3>
                <p className="mt-2 text-foreground/80">{n.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* GDPR */}
        <section className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <FileText className="text-[color:var(--brand-red)]" size={28} />
            <h2
              className="text-3xl font-bold text-[color:var(--brand-red)]"
              style={{ fontFamily: '"Baloo 2", sans-serif' }}
            >
              GDPR – dokumenty ke stažení
            </h2>
          </div>
          <ul className="space-y-3">
            {gdprDocs.map((d) => (
              <li key={d.title}>
              <a
                  href={d.file}
                  target={d.file !== "#" ? "_blank" : undefined}
                  rel={d.file !== "#" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-2xl bg-[color:var(--sage-light)] px-4 py-3 shadow-sm transition-colors hover:bg-[color:var(--sage)]"
                >
                  <FileText className="text-[color:var(--brand-red)]" size={20} />
                  <span className="font-medium text-foreground">{d.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Skutečné PDF dokumenty vložíme na místo těchto odkazů, jakmile
            nám je pošlete.
          </p>
        </section>
        </div>
      </div>
    </main>

  );
}
