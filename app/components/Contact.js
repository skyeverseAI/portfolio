import site from "../../data/site.json";
import SectionHead from "./SectionHead";

export default function Contact() {
  const { contact } = site;

  return (
    <section className="sec sec-dark" id="contact">
      <div className="wrap">
        <SectionHead slug={contact.slug} num={contact.num} />

        <div className="contact-grid">
          <div>
            <h2 className="display">{contact.display}</h2>
            <p className="contact-lede">{contact.lede}</p>
            <a className="btn-mail" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>

          <div className="link-list">
            {contact.links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  className="link-row"
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <span>{link.label}</span>
                  <span>{link.icon}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
