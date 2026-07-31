import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";


export const Route = createFileRoute("/cenik")({
  head: () => ({
    meta: [
      { title: "Ceník — Červené Jablíčko" },
      {
        name: "description",
        content: "Ceník docházky do dětské skupiny Červené Jablíčko.",
      },
    ],
  }),
  component: Page,
});

const rows: [string, string][] = [
  ["2 dny v týdnu", "6 800 Kč"],
  ["3 dny v týdnu", "8 900 Kč"],
  ["4 dny v týdnu", "10 800 Kč"],
  ["5 dní v týdnu", "12 400 Kč"],
];

function Page() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Ceník"
        subtitle=""
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">Typ docházky</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    Cena / měsíc
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, price], i) => (
                  <tr
                    key={label}
                    className={
                      i % 2 === 0
                        ? "bg-card"
                        : "bg-[color:var(--sage-light)]"
                    }
                  >
                    <td className="px-6 py-5 text-foreground">{label}</td>
                    <td className="px-6 py-5 text-right font-semibold text-[color:var(--brand-red)]">
                      {price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 rounded-2xl bg-[color:var(--sage-light)] px-6 py-6">
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
              V ceně je zahrnuta celodenní strava (dopolední svačina, oběd,
              odpolední svačina), pitný režim a všechny aktivity v rámci
              programu školky.
            </p>
          </div>
        </div>
      </section>

    </main>

  );
}
