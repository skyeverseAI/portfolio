"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", path: "~/about" },
  { id: "stack", path: "~/stack" },
  { id: "work", path: "~/work" },
  { id: "writings", path: "~/writings" },
  { id: "contact", path: "~/contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(SECTIONS[0]);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("top");
      const threshold = hero ? hero.offsetHeight - 80 : 600;
      setVisible(window.scrollY > threshold);

      let current = SECTIONS[0];
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 120) current = section;
      }
      setActive(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${visible ? " visible" : ""}`}>
      <span className="nav-prompt">
        <span className="nav-dot" />
        <span className="nav-user">akash@build</span>
        <span className="nav-path">:{active.path}$</span>
      </span>
      <span className="nav-links">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={active.id === section.id ? "active" : undefined}
          >
            /{section.id}
          </a>
        ))}
      </span>
    </nav>
  );
}
