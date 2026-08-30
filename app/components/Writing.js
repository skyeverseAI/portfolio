export default function Writing() {
  return (
    <section className="writing-section" id="writing">
      <div className="container">
        <p className="section-label">Writing</p>
        <div className="writing-card">
          <div className="writing-card-inner">
            <p className="writing-eyebrow">On Substack</p>
            <h2 className="writing-title">
              Notes on building AI operations systems
            </h2>
            <p className="writing-desc">
              I write about production AI — what works, what breaks, and the
              patterns I pick up shipping agents and automation systems for real
              businesses. No fluff, no hype.
            </p>
            <div className="writing-actions">
              <a
                href="https://skyeverse.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read on Substack →
              </a>
              <span className="writing-status">
                <span className="pulse-dot amber" style={{ marginTop: 0 }} />
                First post coming soon
              </span>
            </div>
          </div>
          <div className="writing-deco" aria-hidden="true">
            <span>/</span>
            <span>/</span>
            <span>/</span>
          </div>
        </div>
      </div>
    </section>
  );
}
