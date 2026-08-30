const entries = [
  { year: "2019", title: "Mechanical Engineering" },
  { year: "2021", title: "Data Analyst" },
  { year: "2022", title: "Built Internal Tools" },
  { year: "2023", title: "AI Automation Engineer" },
  { year: "Now", title: "Building AI Operations Systems", active: true },
];

export default function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <div className="container">
        <p className="section-label">Operator Progression</p>
        <div className="timeline">
          {entries.map((entry, i) => (
            <div className="timeline-item" key={i}>
              <span className="timeline-year">{entry.year}</span>
              <div className="timeline-spine">
                <span className={`timeline-dot${entry.active ? " active" : ""}`} />
                {i < entries.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <span className="timeline-title">{entry.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
