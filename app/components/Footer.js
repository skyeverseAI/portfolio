const links = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Email", href: "mailto:akash.skyeverse@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <span className="footer-copy">akash.build · 2025</span>
        <div className="footer-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer-link"
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
