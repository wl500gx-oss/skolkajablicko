import { createFileRoute } from "@tanstack/react-router";
import playgroundImg from "../assets/best-for-your-child-playground.jpeg.asset.json";
import { PageHeader } from "../components/PageHeader";


export const Route = createFileRoute("/the-best-for-your-child")({
  head: () => ({
    meta: [
      { title: "The Best for Your Child — Červené Jablíčko" },
      {
        name: "description",
        content:
          "Babyland – The Best for Your Child. Angličtina jako přirozená součást každého dne.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Babyland – The Best for Your Child"
        subtitle="Přirozeně dvojjazyčné prostředí pro každé dítě."
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">


        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={playgroundImg.url}
            alt="Děti na zahradě školky"
            className="rounded-2xl shadow-lg"
            loading="lazy"
            width={1600}
            height={1200}
          />
          <div className="space-y-4 text-foreground/80">
            <p>
              U nás děti neučíme anglicky, ale dáváme jim možnost vyrůstat
              v dvojjazyčném prostředí, přestože se nenarodily do bilingvní
              rodiny.
            </p>
            <p>
              Jazyk je u nás prostředkem komunikace. Neučíme děti slovíčka,
              ale umožňujeme jim nalézt přirozenou cestu, jak se domluvit
              s rodilým mluvčím či kamarádem, který český jazyk neovládá.
            </p>
            <p>
              Angličtina je u nás přirozenou součástí každého dne. Dětem se
              věnují anglicky mluvící lektoři z různých zemí, kteří jsou
              plnohodnotnou součástí našeho týmu.
            </p>
            <p>
              Spolupracujeme s agenturou <strong>English Time</strong>,
              která nám zajišťuje kvalifikované lektory a podílí se s námi
              na tvorbě vzdělávacích plánů.
            </p>
          </div>
        </div>
        </div>
      </section>
    </main>

  );
}
