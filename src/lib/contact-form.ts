// ---------------------------------------------------------------------------
// KONFIGURACE ODESÍLÁNÍ KONTAKTNÍHO FORMULÁŘE (Web3Forms)
// ---------------------------------------------------------------------------
// Access Key získáte na https://web3forms.com (zdarma).
// Klíč je veřejný (public access key) – může být přímo v kódu.
// Lze ho přepsat i přes .env:  VITE_WEB3FORMS_ACCESS_KEY="..."
//
// Hlavní příjemce:  radek@smrcka.net
// Kopie (cc):       info@skolka-jablicko.cz
// ---------------------------------------------------------------------------

export const WEB3FORMS_ACCESS_KEY =
  (import.meta.env['VITE_WEB3FORMS_ACCESS_KEY'] as string | undefined) ??
  '39a01de0-3658-4914-8854-616a4a16fbba';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** Hlavní příjemce zprávy. */
export const PRIMARY_RECIPIENT = 'info@skolka-jablicko.cz';
/** Kopie zprávy (cc). */
export const CC_RECIPIENTS = ['radek@smrcka.net'];

export const STORAGE_KEY = 'jablicko:contact-submissions';

export type ContactSubmission = {
  id: string;
  name: string;
  contact: string;
  message: string;
  createdAt: string;
  sent: boolean;
};

const isBrowser = () => typeof window !== 'undefined';

export function loadSubmissions(): ContactSubmission[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ContactSubmission[]) : [];
  } catch {
    return [];
  }
}

export function saveSubmissions(items: ContactSubmission[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* localStorage nedostupný (private mode) – tiše ignorujeme */
  }
}

export function addSubmission(
  data: Pick<ContactSubmission, 'name' | 'contact' | 'message'>,
): ContactSubmission {
  const item: ContactSubmission = {
    id:
      isBrowser() && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...data,
    createdAt: new Date().toISOString(),
    sent: false,
  };
  saveSubmissions([...loadSubmissions(), item]);
  return item;
}

export function markSent(id: string) {
  saveSubmissions(loadSubmissions().map((s) => (s.id === id ? { ...s, sent: true } : s)));
}

export function isConfigured() {
  return WEB3FORMS_ACCESS_KEY.length > 0;
}

/** Pokusí se odeslat jeden záznam přes Web3Forms. Vrací true při úspěchu. */
export async function sendSubmission(item: ContactSubmission): Promise<boolean> {
  if (!isConfigured()) return false;
  if (isBrowser() && navigator.onLine === false) return false;
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nová zpráva z webu Červené Jablíčko – ${item.name}`,
        from_name: 'Web Červené Jablíčko',
        to: PRIMARY_RECIPIENT,
        cc: CC_RECIPIENTS.join(','),
        replyto: item.contact,
        jmeno: item.name,
        kontakt: item.contact,
        zprava: item.message,
        odeslano: item.createdAt,
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (res.ok && data?.success !== false) {
      markSent(item.id);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/** Odešle všechny dosud neodeslané záznamy (volá se při návratu online). */
export async function flushPending(): Promise<void> {
  const pending = loadSubmissions().filter((s) => !s.sent);
  for (const item of pending) {
    // sekvenčně, ať nezahltíme free tier
    // eslint-disable-next-line no-await-in-loop
    await sendSubmission(item);
  }
}
