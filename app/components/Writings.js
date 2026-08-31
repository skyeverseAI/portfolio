import writings from "../../data/writings.json";
import SectionHead from "./SectionHead";

export default function Writings() {
  return (
    <section className="sec" id="writings">
      <div className="wrap">
        <SectionHead slug={writings.slug} num={writings.num} />

        <div className="writ-grid">
          <div>
            <h2 className="display">{writings.display}</h2>
            <p className="writ-blurb">{writings.blurb}</p>
            <a
              className="btn-sub"
              href={writings.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read on Substack →
            </a>
          </div>

          <div className="writ-list">
            {writings.posts.map((post) => {
              const external = Boolean(post.href);
              return (
                <a
                  className="writ-item"
                  key={post.title}
                  href={post.href || writings.substackUrl}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <span className="writ-date">{post.date}</span>
                  <span className="writ-title">{post.title}</span>
                  <span className="writ-kind">{post.kind}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
