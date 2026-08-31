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
              {about.prose.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
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
            <p className="side-label">&gt; BEFORE THIS</p>
            <p style={{ margin: 0 }}>{about.beforeThis}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
