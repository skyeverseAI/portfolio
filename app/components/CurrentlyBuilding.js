const items = [
  {
    title: "Skyeverse",
    desc: "AI operations platform — end-to-end tooling for building, deploying, and monitoring autonomous agents in production.",
    color: "orange",
  },
  {
    title: "Multi-agent orchestration research",
    desc: "Exploring patterns for reliable multi-agent collaboration: handoff protocols, shared memory, and failure recovery.",
    color: "amber",
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="building-section">
      <div className="container">
        <p className="section-label">Currently Building</p>
        <div className="building-cards">
          {items.map((item) => (
            <div className="building-card" key={item.title}>
              <span className={`pulse-dot ${item.color}`} />
              <div>
                <p className="building-card-title">{item.title}</p>
                <p className="building-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
