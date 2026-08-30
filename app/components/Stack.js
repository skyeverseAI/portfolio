const groups = [
  {
    label: "AI / LLMs",
    items: ["OpenAI", "Gemini", "OpenRouter", "Sarvam"],
  },
  {
    label: "Automation",
    items: ["n8n", "Apify", "Playwright"],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "Supabase"],
  },
  {
    label: "Voice",
    items: ["LiveKit", "VAPI", "Sarvam"],
  },
];

export default function Stack() {
  return (
    <section className="stack-section" id="stack">
      <div className="container">
        <p className="section-label">AI Stack</p>
        <div className="stack-groups">
          {groups.map((group) => (
            <div className="stack-group" key={group.label}>
              <p className="stack-group-label">{group.label}</p>
              <div className="stack-items">
                {group.items.map((item) => (
                  <span className="stack-item" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
