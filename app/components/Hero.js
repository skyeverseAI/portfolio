import site from "../../data/site.json";
import Terminal from "./Terminal";

const DOCK = ["about", "stack", "work", "writings", "contact"];

export default function Hero() {
  const { masthead, wordmark, entry, terminal } = site;
  const [name, tld] = wordmark.split(".");

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="masthead">
          <span>{masthead.name}</span>
          <span className="masthead-rule" />
          <span>{masthead.meta}</span>
        </div>
        <h1 className="wordmark">
          {name}
          <span className="wordmark-dot">.</span>
          {tld}
        </h1>
      </div>

      <div className="hero-rule" />

      <div className="wrap hero-body">
        <div className="entry-grid">
          <div>
            <h2 className="headword">
              {entry.headword}
              <em className="pos">{entry.partOfSpeech}</em>
            </h2>
            <p className="phonetic">{entry.phonetic}</p>
            {entry.senses.map((sense) => (
              <div
                className={`sense${sense.prev ? " sense-prev" : ""}`}
                key={sense.label}
              >
                <span className="sense-num">{sense.label}</span>
                <p className="sense-text">{sense.text}</p>
              </div>
            ))}
          </div>

          <Terminal
            title={terminal.title}
            intro={terminal.intro}
            registers={terminal.registers}
          />
        </div>

        <div className="dock">
          <p className="dock-label">EXPLORE</p>
          <div className="dock-row">
            {DOCK.map((id) => (
              <a className="dock-pill" href={`#${id}`} key={id}>
                /{id}
              </a>
            ))}
          </div>
          <p className="dock-hint">
            ls · whoami · clear — or click a command above
          </p>
        </div>
      </div>
    </header>
  );
}
