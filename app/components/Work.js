"use client";

import { useState } from "react";
import work from "../../data/work.json";
import SectionHead from "./SectionHead";

function Project({ project }) {
  const [openCase, setOpenCase] = useState(false);

  return (
    <article className="proj">
      <div>
        <p className="proj-num">{project.num}</p>
        <h3 className="proj-title">{project.title}</h3>
        {project.tags.length > 0 && (
          <div className="proj-tags">
            {project.tags.map((tag) => (
              <span className="proj-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.status && <p className="proj-status">{project.status}</p>}
      </div>

      <div>
        <div className="kv">
          <span className="kv-k">PROBLEM</span>
          <p className="kv-v">{project.problem}</p>
        </div>
        <div className="kv">
          <span className="kv-k">APPROACH</span>
          <p className="kv-v">{project.approach}</p>
        </div>
        <div className="kv kv-result">
          <span className="kv-k">RESULT</span>
          <p className="kv-v">{project.result}</p>
        </div>

        {project.case && (
          <>
            <button
              type="button"
              className="case-btn"
              aria-expanded={openCase}
              onClick={() => setOpenCase((v) => !v)}
            >
              {openCase ? "CLOSE CASE ↑" : "OPEN CASE →"}
            </button>
            {openCase && (
              <div className="case-panel">
                {project.case.map((block) => (
                  <div key={block.heading}>
                    <h4>{block.heading}</h4>
                    <p>{block.body}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const [activeId, setActiveId] = useState(work.tabs[0].id);
  const tab = work.tabs.find((t) => t.id === activeId) ?? work.tabs[0];
  const count = tab.projects.length;

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <SectionHead slug={work.slug} num={work.num} />

        <div className="work-top">
          <h2 className="display" style={{ marginBottom: 0 }}>
            {work.display}
          </h2>
          <div className="toggle" role="tablist" aria-label="Work category">
            {work.tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={t.id === activeId}
                className={t.id === activeId ? "active" : undefined}
                onClick={() => setActiveId(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="work-meta">
          <span className="work-count">
            {String(count).padStart(2, "0")} {count === 1 ? "PROJECT" : "PROJECTS"}
          </span>
          <p className="work-blurb">{tab.blurb}</p>
        </div>

        {count === 0 ? (
          <p className="work-empty">
            No entries here yet — add one to <code>data/work.json</code> under the
            &ldquo;{tab.label}&rdquo; tab.
          </p>
        ) : (
          tab.projects.map((project) => (
            <Project key={project.num + project.title} project={project} />
          ))
        )}
      </div>
    </section>
  );
}
