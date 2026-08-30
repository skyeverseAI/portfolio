import projects from "../../data/projects.json";

function ProjectMedia({ media }) {
  if (!media) return null;

  if (media.type === "youtube") {
    return (
      <div className="project-media video-embed">
        <iframe
          src={`https://www.youtube.com/embed/${media.videoId}`}
          title={media.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (media.type === "iframe") {
    return (
      <div className="project-media iframe-embed">
        <iframe
          src={media.url}
          title={media.title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-media-link"
        >
          Open full demo →
        </a>
      </div>
    );
  }

  return null;
}

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <p className="section-label">Selected Projects</p>
        <div className="projects-grid">
          {projects
            .filter((p) => p.status !== "hidden")
            .map((project) => {
              const featured = project.flagship || Boolean(project.media);
              const hasTags = project.tags.length > 0 || project.hotTags.length > 0;

              return (
                <article
                  className={`project-card${featured ? " project-card-featured" : ""}`}
                  key={project.id}
                >
                  <div className="project-header">
                    <span className="project-num">{project.id}</span>
                    <h3 className="project-title">{project.title}</h3>
                    {project.status === "in-progress" && (
                      <span className="badge-in-progress">In Progress</span>
                    )}
                  </div>
                  <p className="project-desc">{project.description}</p>
                  <ProjectMedia media={project.media} />
                  {hasTags && (
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span className="tag tag-accent" key={tag}>{tag}</span>
                      ))}
                      {project.hotTags.map((tag) => (
                        <span className="tag tag-hot" key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  {project.impact && (
                    <p className="project-impact">{project.impact}</p>
                  )}
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}
