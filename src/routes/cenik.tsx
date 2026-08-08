import { createFileRoute, Link } from "@tanstack/react-router";
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
  ["2 dny v týdnu", "Na vyžádání"],
  ["3 dny v týdnu", "Na vyžádání"],
  ["4 dny v týdnu", "Na vyžádání"],
  ["5 dní v týdnu", "Na vyžádání"],
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
                    <td className="px-6 py-5 text-right text-foreground">
                      <Link
                        to="/kontakt"
                        className="transition-all hover:font-semibold hover:text-[color:var(--brand-red)] hover:underline focus:outline-none"
                      >
                        {price}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>

  );
}
