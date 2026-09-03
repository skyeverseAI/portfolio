/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next dev` blocks cross-origin requests to /_next/* by default, so opening
  // the dev server from a phone on the LAN (http://192.168.x.x:3000) serves the
  // HTML but 403s every JS chunk: the page renders and never hydrates, which
  // looks like "the buttons don't work". Dev-only — production is unaffected.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],

  // `npm run build:single` sets this to emit a static export into out/, which
  // scripts/build-single-file.mjs folds into one shareable .html file.
  ...(process.env.STATIC_EXPORT
    ? { output: "export", images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
