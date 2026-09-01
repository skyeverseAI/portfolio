import site from "../../data/site.json";
import SectionHead from "./SectionHead";

export default function About() {
  const { about } = site;

  return (
    <section className="sec" id="about">
      <div className="wrap">
        <SectionHead slug={about.slug} num={about.num} />

        <div className="about-grid">
          <div>
            <h2 className="display">
              {about.display.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < about.display.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className="about-prose">
              {about.prose.map((block, i) =>
                typeof block === "string" ? (
                  <p key={i}>{block}</p>
                ) : (
                  <p className="about-pull" key={i}>
                    {block.pull.map((line, j) => (
                      <span key={line}>
                        {line}
                        {j < block.pull.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )
              )}
            </div>
          </div>

          <div className="about-side">
            <p className="side-label">&gt; CURRENTLY</p>
            <ul className="side-list">
              {about.currently.map((item) => (
                <li key={item}>
                  <span className="side-arrow">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="side-divider" />
            <p className="side-label">&gt; TRACE</p>
            <ol className="trace">
              {about.timeline.map((entry) => (
                <li
                  className={`trace-item${entry.current ? " trace-now" : ""}`}
                  key={entry.year}
                >
                  <span className="trace-year">{entry.year}</span>
                  <span className="trace-role">{entry.role}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
