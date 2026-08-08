import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FB_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "./Header";
import { FacebookIcon } from "./FacebookIcon";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-[color:var(--sage-light)] text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3
              className="text-xl font-bold text-[color:var(--brand-red)]"
              style={{ fontFamily: '"Baloo 2", sans-serif' }}
            >
              Červené Jablíčko
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Bilingvní dětská skupina – The Best for Your Child. Bezpečné,
              respektující a přirozené prostředí pro vaše děti.
            </p>
            <div className="mt-3 flex gap-3">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#1877F2] hover:text-[color:var(--brand-red)]"
              >
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Rychlé odkazy</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/o-nas" className="hover:text-[color:var(--brand-red)]">O nás</Link></li>
              <li><Link to="/the-best-for-your-child" className="hover:text-[color:var(--brand-red)]">The Best for Your Child</Link></li>
              <li><Link to="/cenik" className="hover:text-[color:var(--brand-red)]">Ceník</Link></li>
              <li><Link to="/pro-rodice" className="hover:text-[color:var(--brand-red)]">Pro rodiče</Link></li>
              <li><Link to="/kontakt" className="hover:text-[color:var(--brand-red)]">Kontakty</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Kontakt</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link
                  to="/kontakt"
                  className="flex items-center gap-2 text-foreground hover:text-[color:var(--brand-red)]"
                >
                  <MapPin className="text-[color:var(--brand-red)]" size={16} />
                  <span>K Meteoru 757/16, 503 11 Hradec Králové</span>
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_HREF}`}
                  className="flex items-center gap-2 text-foreground hover:text-[color:var(--brand-red)]"
                >
                  <Phone className="text-[color:var(--brand-red)]" size={16} />
                  <span>{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-foreground hover:text-[color:var(--brand-red)]"
                >
                  <Mail className="text-[color:var(--brand-red)]" size={16} />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dětská skupina Červené Jablíčko. Všechna práva vyhrazena.
        </div>
      </div>
    </footer>
  );
}
