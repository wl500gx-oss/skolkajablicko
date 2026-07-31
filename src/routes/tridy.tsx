import { createFileRoute } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";

export const Route = createFileRoute("/tridy")({
  head: () => ({
    meta: [
      { title: "Třídy — Mateřídouška" },
      {
        name: "description",
        content:
          "Přehled tříd, věkového složení a denního režimu v Mateřídoušce.",
      },
      { property: "og:title", content: "Třídy — Mateřídouška" },
      {
        property: "og:description",
        content:
          "Přehled tříd, věkového složení a denního režimu v Mateřídoušce.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ClassesPage,
});

function ClassesPage() {
  const classes = [
    {
      name: "Berušky",
      age: "2–3 roky",
      capacity: "12 dětí",
      description:
        "První kroky mimo domov. Klademe důraz na adaptaci, jemnou motoriku a řečový rozvoj.",
    },
    {
      name: "Motýlci",
      age: "3–4 roky",
      capacity: "12 dětí",
      description:
        "Tvořivé hry, výlety do přírody a první kamarádství. Děti se učí spolupracovat a sdílet.",
    },
    {
      name: "Včelky",
      age: "4–6 let",
      capacity: "15 dětí",
      description:
        "Příprava na školu s předškolními dovednostmi, ale stále s dostatkem hry a pohybu.",
    },
  ];

  const schedule = [
    { time: "7:00–8:30", activity: "Příchod, volná hra" },
    { time: "8:30–9:00", activity: "Svačina" },
    { time: "9:00–10:30", activity: "Výuka hrou, tvořivé dílny" },
    { time: "10:30–12:00", activity: "Pobyt venku / zahrada" },
    { time: "12:00–13:00", activity: "Oběd" },
    { time: "13:00–14:30", activity: "Odpočinek / spánek" },
    { time: "14:30–16:00", activity: "Odpolední hry, odchod domů" },
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Třídy a denní režim
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Děti dělíme do tříd podle věku, aby se každý program mohl přizpůsobit
            jejich potřebám.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {classes.map((cls) => (
            <div
              key={cls.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {cls.name}
                </h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {cls.age}
                </span>
              </div>
              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users size={16} /> {cls.capacity}
                </span>
              </div>
              <p className="text-muted-foreground">{cls.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-secondary p-6 sm:p-10">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            Denní režim
          </h2>
          <div className="divide-y divide-border">
            {schedule.map((item) => (
              <div
                key={item.time}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
              >
                <span className="flex items-center gap-2 font-semibold text-foreground sm:w-32">
                  <Clock size={16} className="text-primary" />
                  {item.time}
                </span>
                <span className="text-muted-foreground">{item.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
