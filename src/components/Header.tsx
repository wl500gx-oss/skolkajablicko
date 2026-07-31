import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Mail, Phone } from "lucide-react";
import { useState } from "react";
import logoAsset from "../assets/cervene-jablicko-logo.png.asset.json";
import { FacebookIcon } from "./FacebookIcon";

const navItems = [
  { to: "/", label: "Domů" },
  { to: "/o-nas", label: "O nás" },
  { to: "/the-best-for-your-child", label: "The Best for Your Child" },
  { to: "/aktivity", label: "Aktivity" },
  { to: "/fotogalerie", label: "Fotogalerie" },
  { to: "/projekty", label: "Projekty" },
  { to: "/cenik", label: "Ceník" },
  { to: "/pro-rodice", label: "Pro rodiče" },
  { to: "/kontakt", label: "Kontakty" },
] as const;

export const FB_URL = "https://www.facebook.com/rodinne.centrum.jablon";
export const CONTACT_EMAIL = "info@skolka-jablicko.cz";
export const CONTACT_PHONE_DISPLAY = "+420 721 405 130";
export const CONTACT_PHONE_HREF = "+420721405130";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      {/* Top white bar */}
      <div className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-4 py-3 sm:px-6 md:grid-cols-3 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-self-start">
            <img
              src={logoAsset.url}
              alt="Dětská skupina Červené Jablíčko"
              className="h-20 w-auto object-contain sm:h-24"
            />
          </Link>

          {/* Center brand */}
          <div className="justify-self-center text-center">
            <span
              className="whitespace-nowrap text-lg font-extrabold text-[color:var(--brand-red)] sm:text-xl md:text-2xl lg:text-3xl"
              style={{ fontFamily: '"Baloo 2", sans-serif' }}
            >
              Babyland – The Best for Your Child
            </span>
          </div>

          {/* Contact right */}
          <div className="flex flex-col items-end gap-1 justify-self-end text-sm text-foreground">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 hover:text-[color:var(--brand-red)]"
            >
              <Mail size={14} /> {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE_HREF}`}
              className="flex items-center gap-2 hover:text-[color:var(--brand-red)]"
            >
              <Phone size={14} /> {CONTACT_PHONE_DISPLAY}
            </a>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#1877F2] hover:text-[color:var(--brand-red)]"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Green nav bar */}
      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="hidden flex-wrap items-center gap-1 py-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  pathname === item.to
                    ? "bg-white text-primary"
                    : "text-primary-foreground hover:bg-white/15"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="ml-auto p-2 text-primary-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/20 bg-primary px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-semibold ${
                    pathname === item.to
                      ? "bg-white text-primary"
                      : "text-primary-foreground hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
