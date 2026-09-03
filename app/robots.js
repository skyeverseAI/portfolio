const SITE = "https://skyeverse.space";

// Required by `output: "export"` (the build:single path) — without it the
// static export refuses to collect this route.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
