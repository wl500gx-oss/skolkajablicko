import { createFileRoute } from "@tanstack/react-router";
import outdoorImage from "../assets/CB072.jpeg.asset.json";
import { PageHeader } from "../components/PageHeader";



export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nás — Červené Jablíčko" },
      {
        name: "description",
        content:
          "O naší dětské skupině Červené Jablíčko, naší filozofii, přístupu a týmu.",
      },
      { property: "og:title", content: "O nás — Červené Jablíčko" },
      {
        property: "og:description",
        content: "Seznamte se s naší filozofií a týmem.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="O nás a naše filozofie"
        subtitle="Respektující přístup, přirozené prostředí a bilingvní vzdělávání od roku 2012."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-stretch gap-10 lg:grid-cols-2">
            <img
              src={outdoorImage.url}
              alt="Děti na zahradě školky"
              className="order-1 h-full w-full rounded-2xl object-cover shadow-lg lg:order-2"
              loading="lazy"
              width={1600}
              height={912}
            />
            <div className="order-2 space-y-4 text-foreground/80 lg:order-1">
              <p>
                Jablíčko funguje od roku 2012 a bylo založeno na principech
                pozitivního rodičovství a respektujícího přístupu k dětem,
                kde děti mohou vyrůstat a vzdělávat se přirozeným způsobem.
              </p>
              <p>
                Děti jsou vedeny ke zdravému sebevědomí, asertivitě a
                komunikativnosti. Podporujeme jejich individualitu,
                přirozenou kreativitu a schopnost kritického uvažování.
              </p>
              <p>
                Děti se učí formou hry a prožitků. Od počátku probíhá
                komunikace v českém i anglickém jazyce.
              </p>
              <p>
                Nejdůležitější je pro nás respektující přístup k dětem
                a bezpečné prostředí, kde se každé dítě může rozvíjet svým
                tempem. Tety jsou průvodci, které každému dítěti poskytují
                lásku, respekt i hranice.
              </p>
              <p>
                Vzhledem k bilingvnímu prostředí se děti od začátku učí
                toleranci a rozvíjejí své komunikační schopnosti v českém
                i anglickém jazyce.
              </p>
              <p>
                Děti se učí přirozenou cestou komunikovat s rodilými mluvčími,
                anglicky mluvícími kamarády a mají tak možnost vyrůstat v
                dvojjazyčném prostředí.
              </p>
              <p>
                Naše skupinka je určena pro děti od 2 do 6 let. Každý den
                se dětem věnuje tým zkušených pedagogů (tet) a rodilých
                mluvčích.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

