const SITE = "https://skyeverse.space";

// Required by `output: "export"` (the build:single path) — without it the
// static export refuses to collect this route.
export const dynamic = "force-static";

// One page, so one entry. Sections are anchors on `/`, not routes — don't list them.
export default function sitemap() {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
