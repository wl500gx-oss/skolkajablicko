import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "../components/Header";
import { PageHeader } from "../components/PageHeader";
import { addSubmission, flushPending, sendSubmission } from "../lib/contact-form";



export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakty — Červené Jablíčko" },
      {
        name: "description",
        content:
          "Kontaktní údaje, adresa a formulář pro rodiče dětské skupiny Červené Jablíčko.",
      },
    ],
  }),
  component: ContactPage,
});

const ADDRESS = "K Meteoru 757/16, 503 11 Hradec Králové";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

function ContactPage() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [queued, setQueued] = useState(false);

  // Po návratu online doodešleme vše, co zůstalo uložené v LocalStorage.
  useEffect(() => {
    void flushPending();
    const onOnline = () => void flushPending();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree || sending) return;
    setSending(true);

    // 1) Vždy uložit lokálně (offline režim)
    const item = addSubmission(form);

    // 2) Pokusit se odeslat e-mailem přes Web3Forms
    const ok = await sendSubmission(item);

    setSending(false);
    setQueued(!ok);
    setSubmitted(true);
  };


  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Kontakty"
        subtitle="Dětská skupina Červené Jablíčko – The Best for Your Child"
      />
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">


        <div className="grid gap-6 sm:grid-cols-3">
          <ContactCard icon={Phone} title="Volejte" lines={[CONTACT_PHONE_DISPLAY, "Po–Pá 7:00 – 17:00"]} href={`tel:${CONTACT_PHONE_HREF}`} />
          <ContactCard icon={Mail} title="Pište" lines={[CONTACT_EMAIL]} href={`mailto:${CONTACT_EMAIL}`} />
          <ContactCard icon={MapPin} title="Navštivte nás" lines={["K Meteoru 757/16", "503 11 Hradec Králové"]} />
        </div>

        {/* Mapa */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm">
          <iframe
            title="Mapa – Červené Jablíčko"
            src={MAP_SRC}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Formulář */}
        <div className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2
            className="mb-6 text-2xl font-bold text-[color:var(--brand-red)]"
            style={{ fontFamily: '"Baloo 2", sans-serif' }}
          >
            Napište nám
          </h2>
          {submitted ? (
            <div className="rounded-xl bg-[color:var(--sage-light)] p-6 text-center">
              <p className="font-semibold text-foreground">Děkujeme za zprávu!</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {queued
                  ? "Zpráva je uložena v zařízení a odešle se automaticky, jakmile budete online."
                  : "Ozveme se vám co nejdříve."}
              </p>
            </div>
          ) : (

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Jméno" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Kontakt (e-mail nebo telefon)" value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} />
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Zpráva</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
                Souhlas se zpracováním osobních údajů
              </label>
              <button
                type="submit"
                disabled={!agree || sending}
                className="rounded-full bg-[color:var(--brand-red)] px-8 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50"
              >
                {sending ? "Odesílám…" : "Odeslat"}

              </button>
            </form>
          )}
        </div>
        </div>
      </div>
    </main>

  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: typeof Phone;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <>
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <Icon className="text-[color:var(--brand-red)]" size={26} />
      </div>
      <h3
        className="text-xl font-bold text-[color:var(--brand-red)]"
        style={{ fontFamily: '"Baloo 2", sans-serif' }}
      >
        {title}
      </h3>
      {lines.map((l) => (
        <p key={l} className="mt-1 text-sm text-foreground/80">
          {l}
        </p>
      ))}
    </>
  );
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-colors hover:border-[color:var(--brand-red)]">
      {href ? <a href={href}>{content}</a> : content}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <input
        required
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
