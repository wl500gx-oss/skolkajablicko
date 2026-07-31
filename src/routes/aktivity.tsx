import { createFileRoute } from "@tanstack/react-router";
import img1Asset from "../assets/IMG_8776-3.jpeg.asset.json";
import img2Asset from "../assets/img8783-3.jpeg.asset.json";
import img3Asset from "../assets/aktivity-projekty.jpg.asset.json";
import { PageHeader } from "../components/PageHeader";


const img1 = img1Asset.url;
const img2 = img2Asset.url;
const img3 = img3Asset.url;

export const Route = createFileRoute("/aktivity")({
  head: () => ({
    meta: [
      { title: "Aktivity — Červené Jablíčko" },
      {
        name: "description",
        content:
          "Vzdělávání, výlety a projekty dětské skupiny Červené Jablíčko.",
      },
    ],
  }),
  component: Page,
});

const sections = [
  {
    img: img1,
    title: "Vzdělávání",
    text: "Kromě běžných vzdělávacích aktivit v českém a anglickém jazyce nabízíme dětem jednou týdně možnost výuky plavání, všesportovní přípravu ve velké tělocvičně pod vedením zkušeného instruktora, výuku hry na flétnu a na klavír.",
  },
  {
    img: img2,
    title: "Výlety",
    text: "V průběhu roku jezdíme s dětmi velmi často na výlety jak do přírody, tak za kulturou. Pravidelně navštěvujeme solnou jeskyni. Jednou za rok mají možnost děti absolvovat lyžařský výcvik a školku v přírodě.",
  },
  {
    img: img3,
    title: "Projekty",
    text: "Nadšeně se účastníme různých kratších i delších projektů, například líhnutí kuřátek ve školce a mnohé další.",
  },
];

function Page() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Aktivity"
        subtitle="Vzdělávání, výlety a projekty, které děti obohacují každý den."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">


        <div className="space-y-16">
          {sections.map((s, i) => (
            <div
              key={s.title}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <img
                src={s.img}
                alt={s.title}
                className={`rounded-2xl shadow-lg ${i % 2 === 1 ? "lg:order-2" : ""} ${i === 2 ? "aspect-[4/3] w-full object-cover" : ""}`}
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className={`space-y-4 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2
                  className="text-3xl font-bold text-[color:var(--brand-red)]"
                  style={{ fontFamily: '"Baloo 2", sans-serif' }}
                >
                  {s.title}
                </h2>
                <p className="text-foreground/80">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </main>

  );
}
