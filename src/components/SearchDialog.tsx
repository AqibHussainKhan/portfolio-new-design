import { useEffect, useRef, useState } from "react";
import { projects, searchSections } from "../data/portfolio";
import type { Project, SectionId } from "../data/portfolio";
import { Icon } from "./Icon";
import Modal, { CloseButton } from "./Modal";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onOpenProject: (project: Project) => void;
  onNavigate: (id: SectionId) => void;
}
export default function SearchDialog({
  open,
  onClose,
  onOpenProject,
  onNavigate,
}: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (text: string) =>
    tokens.every((token) => text.toLowerCase().includes(token));
  const matchingProjects = projects.filter((project) =>
    matches(
      `${project.title} ${project.subtitle} ${project.tech.join(" ")} ${project.search}`,
    ),
  );
  const matchingSections = searchSections.filter((section) =>
    matches(`${section.title} ${section.detail} ${section.search}`),
  );
  const count = matchingProjects.length + matchingSections.length;
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="search-title"
      className="search-dialog surface-dialog"
    >
      <div className="dialog-toolbar">
        <p className="eyebrow" id="search-title">
          FIND YOUR NEXT CHAPTER
        </p>
        <CloseButton onClose={onClose} label="Close search" />
      </div>
      <label className="search-field">
        <Icon name="search" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Projects, skills, the full story…"
          autoComplete="off"
          aria-label="Search projects and sections"
          data-autofocus
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              resultsRef.current
                ?.querySelector<HTMLButtonElement>("button")
                ?.click();
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              resultsRef.current
                ?.querySelector<HTMLButtonElement>("button")
                ?.focus();
            }
          }}
        />
      </label>
      <p className="search-hint">
        {tokens.length
          ? `${count} result${count === 1 ? "" : "s"}`
          : "Explore the portfolio"}
      </p>
      <div ref={resultsRef} className="search-results" aria-live="polite">
        {matchingProjects.map((project) => (
          <button
            type="button"
            className="search-result"
            key={project.id}
            onClick={() => onOpenProject(project)}
          >
            <span className="result-symbol" aria-hidden="true">
              A
            </span>
            <span>
              <strong>{project.title}</strong>
              <small>{project.subtitle}</small>
            </span>
            <Icon name="up-right" />
          </button>
        ))}
        {matchingSections.map((section) => (
          <button
            type="button"
            className="search-result"
            key={section.id}
            onClick={() => onNavigate(section.id)}
          >
            <span className="result-symbol" aria-hidden="true">
              {section.symbol}
            </span>
            <span>
              <strong>{section.title}</strong>
              <small>{section.detail}</small>
            </span>
            <Icon name="arrow" />
          </button>
        ))}
        {!count && (
          <p className="empty-search">
            No chapters found. Try “React”, “MediCore” or “contact”.
          </p>
        )}
      </div>
      <p className="dialog-footnote">
        Press Esc to close · Enter to open the first result
      </p>
    </Modal>
  );
}
