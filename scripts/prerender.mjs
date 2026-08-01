// Static site export (SSG).
// Renders every route of the built app to plain HTML and writes a fully
// self-contained static site into .output/public.
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// import.meta.dirname is unavailable on older Node (e.g. Node 18 on some CI hosts),
// so derive the script directory from import.meta.url instead.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const clientDir = join(root, "dist", "client");
const serverEntry = join(root, "dist", "server", "index.mjs");
const outDir = join(root, ".output", "public");

if (!existsSync(serverEntry)) {
  console.warn(
    `[prerender] No server build at ${serverEntry} — skipping prerender and exporting the client build only.`,
  );
  if (existsSync(clientDir)) {
    await rm(join(root, ".output"), { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });
    await cp(clientDir, outDir, { recursive: true });
    const indexHtml = join(outDir, "index.html");
    if (existsSync(indexHtml)) {
      await writeFile(join(outDir, "404.html"), await readFile(indexHtml));
    }
    console.log("[prerender] Copied dist/client -> .output/public");
  }
  process.exit(0);
}

const handler = (await import(pathToFileURL(serverEntry).toString())).default;
const ctx = { waitUntil() {}, passThroughOnException() {} };


async function render(path) {
  const res = await handler.fetch(
    new Request(`http://localhost${path}`),
    {},
    ctx,
  );
  const body = await res.text();
  return { status: res.status, body, contentType: res.headers.get("content-type") ?? "" };
}

function extractLinks(html) {
  const links = new Set();
  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = match[1];
    if (/\.(css|js|mjs|png|jpe?g|webp|svg|ico|pdf|txt|xml|woff2?)$/i.test(href)) continue;
    links.add(href === "" ? "/" : href.replace(/\/$/, "") || "/");
  }
  return links;
}

await rm(join(root, ".output"), { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
// Static assets, images and client bundles
await cp(clientDir, outDir, { recursive: true });

const queue = ["/"];
const seen = new Set(queue);
const rendered = [];

while (queue.length) {
  const path = queue.shift();
  const { status, body, contentType } = await render(path);
  if (status >= 400) {
    console.warn(`[prerender] ${status} ${path} — skipped`);
    continue;
  }
  const isHtml = contentType.includes("text/html");
  const target = isHtml
    ? join(outDir, path === "/" ? "index.html" : `${path}/index.html`)
    : join(outDir, path.replace(/^\//, ""));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, body);
  rendered.push(path);
  console.log(`[prerender] ${path} -> ${target.replace(root + "/", "")}`);

  if (isHtml) {
    for (const link of extractLinks(body)) {
      if (!seen.has(link)) {
        seen.add(link);
        queue.push(link);
      }
    }
  }
}

// Extra non-linked routes
for (const path of ["/sitemap.xml", "/tridy"]) {
  if (rendered.includes(path)) continue;
  const { status, body } = await render(path);
  if (status < 400) {
    await mkdir(join(outDir, path.includes(".") ? "" : path.replace(/^\//, "")), { recursive: true });
    await writeFile(join(outDir, path.includes(".") ? path.replace(/^\//, "") : `${path}/index.html`), body);
    console.log(`[prerender] ${path}`);
  }
}

// Fallback page for static hosts (unknown URLs render the SPA shell)
const notFound = await render("/__prerender_not_found__");
await writeFile(join(outDir, "404.html"), notFound.body);

const robots = join(outDir, "robots.txt");
if (!existsSync(robots)) await writeFile(robots, "User-agent: *\nAllow: /\n");
else await readFile(robots);

console.log(`[prerender] Done — ${rendered.length} pages in .output/public`);
