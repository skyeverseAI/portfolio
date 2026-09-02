// Fold the static export in out/ into one self-contained .html file that opens
// straight off the filesystem — for sending the site to someone who just wants
// to look at it. CSS, JS, fonts and favicon are all inlined; nothing is fetched.
//
//   npm run build:single [dest.html]
//
// Two of the fixes below patch Turbopack's minified runtime by string match. If
// a Next upgrade renames those internals the script throws rather than writing a
// file that renders but never hydrates.

import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const dest = process.argv[2] || "akash-build-portfolio.html";

let html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");

const read = (p) =>
  fs.readFileSync(path.join(OUT, p.replace(/^\//, "").split("?")[0]));
const dataUri = (p, mime) => `data:${mime};base64,${read(p).toString("base64")}`;
const escClose = (s, tag) =>
  s.replace(new RegExp(`</(${tag})`, "gi"), "<\\/$1");

// Stylesheets, with the woff2 files they reference folded in as data URIs.
html = html.replace(
  /<link[^>]*rel="stylesheet"[^>]*href="(\/_next\/[^"]+\.css)"[^>]*>/g,
  (_m, href) => {
    const css = read(href)
      .toString("utf8")
      .replace(
        /url\((\/_next\/static\/media\/[^)]+\.woff2)\)/g,
        (_x, font) => `url(${dataUri(font, "font/woff2")})`,
      );
    return `<style>${escClose(css, "style")}</style>`;
  },
);

// Preload hints point at files that won't exist beside the page.
html = html.replace(/<link[^>]*rel="(?:preload|prefetch|modulepreload)"[^>]*>/g, "");
html = html.replace(
  /href="\/favicon\.ico[^"]*"/g,
  `href="${dataUri("/favicon.ico", "image/x-icon")}"`,
);

// getAssetPrefix() reads document.currentScript.src, which is empty on an inline
// script and makes `new URL(src)` throw. Hand it a detached script that looks right.
const currentScriptShim = `<script>
(function () {
  var fake = document.createElement("script");
  fake.src = "https://inlined.local/_next/static/chunks/inlined.js";
  var desc = Object.getOwnPropertyDescriptor(Document.prototype, "currentScript");
  Object.defineProperty(document, "currentScript", {
    configurable: true,
    get: function () {
      var real = desc.get.call(document);
      return real && !real.src ? fake : real;
    }
  });
})();
<\/script>`;

let shimInserted = false;
let patchedLoader = false;
let patchedRegistry = false;

html = html.replace(
  /<script[^>]*\ssrc="(\/_next\/[^"]+\.js)"[^>]*><\/script>/g,
  (_m, src) => {
    const prefix = shimInserted ? "" : ((shimInserted = true), currentScriptShim);
    let js = read(src).toString("utf8");

    // Each chunk registers itself under document.currentScript's src attribute,
    // which an inline script does not have. Give it the URL it would have had.
    const registry = '"object"==typeof document?document.currentScript:void 0';
    if (js.includes(registry)) {
      patchedRegistry = true;
      js = js.replaceAll(
        registry,
        `{getAttribute:function(){return ${JSON.stringify(src)}}}`,
      );
    }

    // The chunk loader appends a <script src> for chunks it is waiting on. Every
    // chunk is already inline, so waiting on the pending promise is enough — and
    // a fetch would 404. CSS never registers itself (it is a <style> now), so
    // resolve those on sight.
    const loader = "function H(e,t){let r=q(t);";
    if (js.includes(loader)) {
      patchedLoader = true;
      js = js.replace(loader, `${loader}if(M(t))r.resolve();return r.promise;`);
    }

    return `${prefix}<script>\n${escClose(js, "script")}\n</script>`;
  },
);

// Font URLs named inside the RSC payload get re-injected as <link> tags during
// hydration; point them at nothing rather than at a 404.
html = html.replace(/\/_next\/static\/media\/[^"\\]+\.woff2(?=\\")/g, "data:,");

if (!patchedRegistry || !patchedLoader) {
  throw new Error(
    "Turbopack runtime internals did not match — the page would render but not " +
      "hydrate. Re-check scripts/build-single-file.mjs against the new Next build.",
  );
}

fs.writeFileSync(dest, html);
console.log(`${dest} — ${(fs.statSync(dest).size / 1024 / 1024).toFixed(2)} MB`);
