const SITE = "https://skyeverse.space";

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
