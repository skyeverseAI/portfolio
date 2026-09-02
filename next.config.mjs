/** @type {import('next').NextConfig} */
const nextConfig = {
  // `npm run build:single` sets this to emit a static export into out/, which
  // scripts/build-single-file.mjs folds into one shareable .html file.
  ...(process.env.STATIC_EXPORT
    ? { output: "export", images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
