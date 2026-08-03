import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlideshow } from "../components/HeroSlideshow";
import img8776 from "../assets/img8776.jpeg.asset.json";
import img8782 from "../assets/img8782.jpeg.asset.json";
import img8783 from "../assets/img8783.jpeg.asset.json";
import img8785 from "../assets/img8785.jpeg.asset.json";
import img8787 from "../assets/img8787.jpeg.asset.json";
import jablicka from "../assets/jablicka.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dětská skupina Červené Jablíčko – The Best for Your Child" },
      {
        name: "description",
        content:
          "Bilingvní dětská skupina Červené Jablíčko v Hradci Králové. Respektující přístup, pozitivní rodičovství a přirozené prostředí.",
      },
      { property: "og:title", content: "Dětská skupina Červené Jablíčko" },
      {
        property: "og:description",
        content:
          "Bilingvní dětská skupina, kde děti vyrůstají v bezpečném a podnětném prostředí.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const slides = [
  { src: img8785.url, alt: "Naše třída" },
  { src: img8787.url, alt: "Herna s klavírem" },
  { src: img8783.url, alt: "Zahrada školky" },
  { src: img8782.url, alt: "Vchod do školky" },
  { src: jablicka.url, alt: "Jablíčka" },
];

function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero slideshow */}
      <section className="relative bg-white">
        <HeroSlideshow slides={slides} />
      </section>

      {/* Welcome */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl font-extrabold text-[color:var(--brand-red)] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: '"Baloo 2", sans-serif' }}
          >
            Vítejte v Červeném Jablíčku
          </h1>
          <p className="mt-4 text-base text-foreground/70 sm:text-lg">
            Bilingvní dětská skupina, kde děti mohou vyrůstat radostně,
            přirozeně a bezpečně.
          </p>
          <Link
            to="/kontakt"
            className="mt-6 inline-block rounded-full bg-[color:var(--brand-red)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>


      {/* O nás a naše filozofie */}
      <section className="bg-[color:var(--sage-light)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6 text-foreground/80">
              <h2
                className="text-3xl font-bold text-[color:var(--brand-red)] sm:text-4xl"
                style={{ fontFamily: '"Baloo 2", sans-serif' }}
              >
                O nás a naše filozofie
              </h2>
              <p>
                Jablíčko funguje od roku 2012 a bylo založeno na principech
                pozitivního rodičovství a respektujícího přístupu k dětem, kde
                děti mohou vyrůstat a vzdělávat se přirozeným způsobem.
              </p>
              <p>
                Podporujeme jejich individualitu, přirozenou kreativitu a
                schopnost kritického uvažování. Děti se učí formou hry a
                prožitků – od počátku probíhá komunikace v českém i anglickém
                jazyce.
              </p>
              <Link
                to="/o-nas"
                className="inline-block rounded-full border border-[color:var(--brand-red)] px-5 py-2 text-sm font-semibold text-[color:var(--brand-red)] transition-colors hover:bg-[color:var(--brand-red)] hover:text-white"
              >
                Více informací
              </Link>
            </div>
            <img
              src={img8776.url}
              alt="Třída Červeného Jablíčka"
              className="rounded-2xl shadow-lg"
              loading="lazy"
              width={1920}
              height={1440}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-4 py-14 text-primary-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold text-white"
            style={{ fontFamily: '"Baloo 2", sans-serif' }}
          >
            Chcete nás poznat?
          </h2>
          <p className="mt-3 opacity-95">
            Přijďte se podívat na prohlídku školky – domluvíme individuální
            termín, který vám bude vyhovovat.
          </p>
          <Link
            to="/kontakt"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-[color:var(--brand-red)] transition-transform hover:scale-105"
          >
            Domluvit prohlídku
          </Link>
        </div>
      </section>
    </main>
  );
}
