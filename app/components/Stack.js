import stack from "../../data/stack.json";
import SectionHead from "./SectionHead";

export default function Stack() {
  return (
    <section className="sec" id="stack">
      <div className="wrap">
        <SectionHead slug={stack.slug} num={stack.num} />

        <h2
          className="display"
          style={{ maxWidth: "600px" }}
          dangerouslySetInnerHTML={{ __html: stack.display }}
        />

        <div className="stack-grid">
          {stack.groups.map((group) => (
            <div className="stack-col" key={group.label}>
              <p className="stack-label">{group.label}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
