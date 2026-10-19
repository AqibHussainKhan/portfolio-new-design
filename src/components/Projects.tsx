import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  contactEmail,
  githubUrl,
  projectFilters,
  projects,
} from "../data/portfolio";
import type { Project, ProjectFilter } from "../data/portfolio";
import { Icon } from "./Icon";
import Modal, { CloseButton } from "./Modal";
import RailControls from "./RailControls";

interface SavedProjectProps {
  project: Project;
  saved: boolean;
  onToggle: (id: string) => void;
  compact?: boolean;
}
export function SaveProjectButton({
  project,
  saved,
  onToggle,
  compact = false,
}: SavedProjectProps) {
  return (
    <button
      type="button"
      className={`${compact ? "round-button save-button" : "button button-glass"}${saved ? " saved" : ""}`}
      onClick={() => onToggle(project.id)}
      aria-label={`${saved ? "Remove" : "Save"} ${project.title} ${saved ? "from" : "to"} My List`}
      aria-pressed={saved}
    >
      <Icon name={saved ? "check" : "plus"} />
      {!compact && (saved ? "In My List" : "My List")}
    </button>
  );
}

interface GalleryProps {
  saved: string[];
  onToggle: (id: string) => void;
  onOpen: (project: Project) => void;
  motion: boolean;
}
export function ProjectGallery({
  saved,
  onToggle,
  onOpen,
  motion,
}: GalleryProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const railRef = useRef<HTMLDivElement>(null);
  const visible = projects.filter(
    (project) => filter === "all" || project.categories.includes(filter),
  );
  useEffect(() => {
    if (railRef.current) railRef.current.scrollLeft = 0;
  }, [filter]);
  return (
    <section
      className="originals-section page-width section-space"
      id="originals"
      aria-labelledby="originals-title"
    >
      <div className="section-toolbar reveal">
        <div>
          <p className="eyebrow">
            <span className="small-a">A</span> CREATED &amp; CODED
          </p>
          <h2 className="display-title" id="originals-title">
            THE ORIGINALS
          </h2>
        </div>
        <div className="originals-caption">
          <p>Different ideas. Same attention to detail.</p>
          <span>SELECT A TITLE TO EXPLORE</span>
        </div>
      </div>
      <div className="projects-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {projectFilters.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`filter${filter === item.id ? " active" : ""}`}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <RailControls
          railRef={railRef}
          label="projects"
          motion={motion}
          refreshKey={filter}
        >
          <span className="project-count">
            {String(visible.length).padStart(2, "0")} TITLES
          </span>
        </RailControls>
      </div>
      <div className="projects-rail" ref={railRef}>
        {visible.map((project, index) => (
          <article
            className="project-card"
            key={project.id}
            style={
              {
                "--poster-color": project.color,
                animationDelay: `${index * 45}ms`,
              } as CSSProperties
            }
          >
            <button
              type="button"
              className="poster"
              onClick={() => onOpen(project)}
              aria-label={`Explore ${project.title} — ${project.subtitle}`}
            >
              <img
                src={project.cover}
                alt=""
                width="720"
                height="900"
                loading="lazy"
              />
              <span className="poster-hover" aria-hidden="true">
                <span>
                  <Icon name="play" />
                </span>
              </span>
            </button>
            <SaveProjectButton
              project={project}
              saved={saved.includes(project.id)}
              onToggle={onToggle}
              compact
            />
            <div className="project-card-footer">
              <h3>{project.title}</h3>
              <p className="project-card-meta">
                <span>{project.tech[0]}</span>
                <span>{project.subtitle}</span>
              </p>
              {(project.liveUrl || project.id === "portfolio" || project.sourceUrl) && (
                <a
                  className="project-card-direct-link"
                  href={project.liveUrl || (project.id === "portfolio" ? window.location.href.split("#")[0] : project.sourceUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.liveUrl || project.id === "portfolio" ? "Open live project" : "Open source repository"}: ${project.title}`}
                >
                  {project.liveUrl || project.id === "portfolio" ? "Live site" : "Source code"} <Icon name="up-right" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="originals-footnote">
        <span>
          <Icon name="info" />
          Project covers are illustrated interface studies.
        </span>
        <a
          href={`${githubUrl}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub <Icon name="up-right" />
        </a>
      </div>
    </section>
  );
}

export function ProjectDetails({
  project,
  saved,
  onToggle,
  onClose,
}: {
  project: Project | null;
  saved: string[];
  onToggle: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      open={Boolean(project)}
      onClose={onClose}
      labelledBy="project-dialog-title"
      className="project-dialog surface-dialog"
    >
      <CloseButton onClose={onClose} label="Close project details" floating />
      {project && (
        <>
          <div
            className="project-banner"
            style={{ "--poster-color": project.color } as CSSProperties}
          >
            <img src={project.cover} alt="" />
            <div>
              <p className="eyebrow">{project.label}</p>
              <h2 id="project-dialog-title">{project.title}</h2>
            </div>
          </div>
          <div className="project-detail-content">
            <div className="project-detail-meta">
              {project.tech.map((tech) => (
                <span className="tech-tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <p>{project.description}</p>
            <h3>Inside the project</h3>
            <ul className="project-detail-list">
              {project.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="project-detail-actions">
              {(project.liveUrl || project.id === "portfolio") && (
                <a
                  href={project.liveUrl || window.location.href.split("#")[0]}
                  className="button button-live-project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="up-right" />
                  Visit Live Website
                </a>
              )}
              <a
                href={project.sourceUrl || githubUrl}
                className="button button-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" />
                {project.sourceUrl ? "View Project Code" : "GitHub profile"}
              </a>
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`}
                className="button button-glass"
              >
                <Icon name="mail" />
                Discuss this project
              </a>
              <SaveProjectButton
                project={project}
                saved={saved.includes(project.id)}
                onToggle={onToggle}
              />
            </div>
            <p className="project-source-note">
              The cover is a stylized interface illustration.
              {!project.liveUrl && project.id !== "portfolio"
                ? " A verified live deployment link has not been added for this project yet."
                : " The live website opens in a new tab."}
            </p>
          </div>
        </>
      )}
    </Modal>
  );
}

export function SavedProjects({
  open,
  onClose,
  saved,
  onToggle,
  onOpen,
  onBrowse,
}: {
  open: boolean;
  onClose: () => void;
  saved: string[];
  onToggle: (id: string) => void;
  onOpen: (project: Project) => void;
  onBrowse: () => void;
}) {
  const selected = saved
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="list-title"
      className="list-dialog surface-dialog"
    >
      <div className="dialog-toolbar">
        <div>
          <p className="eyebrow">SAVED FOR LATER</p>
          <h2 className="display-title medium" id="list-title">
            MY LIST
          </h2>
        </div>
        <CloseButton onClose={onClose} label="Close my list" />
      </div>
      <p className="list-description">
        A few favorites, ready for a closer look.
      </p>
      <div>
        {selected.length ? (
          selected.map((project) => (
            <article className="saved-row" key={project.id}>
              <button type="button" onClick={() => onOpen(project)}>
                <img src={project.cover} alt="" width="62" height="78" />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                </div>
              </button>
              <button
                type="button"
                className="round-button"
                onClick={() => onToggle(project.id)}
                aria-label={`Remove ${project.title} from My List`}
              >
                <Icon name="close" />
              </button>
            </article>
          ))
        ) : (
          <div className="empty-list">
            <Icon name="bookmark" />
            <h3>A good story is worth saving.</h3>
            <p>Tap + on any project to keep it here.</p>
            <button
              type="button"
              className="button button-white"
              onClick={onBrowse}
            >
              Explore the originals <Icon name="arrow" />
            </button>
          </div>
        )}
      </div>
      <p className="dialog-footnote">Your list is saved in this browser.</p>
    </Modal>
  );
}
