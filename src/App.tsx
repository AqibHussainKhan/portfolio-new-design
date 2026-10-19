import { useCallback, useEffect, useRef, useState } from "react";
import { projects, profileNames } from "./data/portfolio";
import type { Project, SectionId, ViewerProfile } from "./data/portfolio";
import { useMediaQuery, usePortfolioState } from "./hooks/usePortfolioState";
import { IconLibrary } from "./components/Icon";
import Header, { Footer } from "./components/Header";
import Hero from "./components/Hero";
import RoleDashboard from "./components/RoleDashboards";
import { Episodes, SkillsSection } from "./components/ExploreSections";
import {
  AboutSection,
  ContactSection,
  HighlightsSection,
} from "./components/StorySections";
import {
  ProjectDetails,
  ProjectGallery,
  SavedProjects,
} from "./components/Projects";
import SearchDialog from "./components/SearchDialog";
import StoryPlayer from "./components/StoryPlayer";
import "./App.css";

type Overlay = "search" | "list" | "story" | null;

export default function App() {
  const [preferences, setPreferences] = usePortfolioState();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const motion = preferences.motion && !reducedMotion;
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profile = preferences.profile;

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2700);
  }, []);
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [motion]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));
    document.documentElement.classList.add("motion-ready");
    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id as SectionId;
          setActiveSection(id);
          if (id !== "home")
            setPreferences((old) =>
              old.explored.includes(id)
                ? old
                : { ...old, explored: [...old.explored, id] },
            );
        });
      },
      { rootMargin: "-15% 0px -45% 0px", threshold: 0 },
    );
    (
      ["home", "story", "skills", "originals", "contact"] as SectionId[]
    ).forEach((id) => {
      const section = document.getElementById(id);
      if (section) sections.observe(section);
    });
    return () => {
      revealObserver.disconnect();
      sections.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [setPreferences, profile]);

  const openOverlay = (next: Overlay) => {
    setActiveProject(null);
    setOverlay(next);
  };
  const closeOverlay = () => setOverlay(null);
  const openProject = (project: Project) => {
    setOverlay(null);
    setActiveProject(project);
  };
  const navigate = (id: SectionId) => {
    setOverlay(null);
    setActiveProject(null);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({
        behavior: motion ? "smooth" : "auto",
        block: "start",
      });
      history.replaceState(null, "", `#${id}`);
      target?.setAttribute("tabindex", "-1");
      target?.focus({ preventScroll: true });
    });
  };
  const chooseProfile = (selected: ViewerProfile) => {
    setPreferences((old) => ({ ...old, profile: selected }));
    setOverlay(null);
    setActiveSection("home");
    history.replaceState(null, "", "#home");
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    notify(`${profileNames[selected]} dashboard selected`);
  };
  const toggleSaved = (id: string) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    const saved = preferences.saved.includes(id);
    setPreferences((old) => ({
      ...old,
      saved: old.saved.includes(id)
        ? old.saved.filter((item) => item !== id)
        : [...old.saved, id],
    }));
    notify(`${project.title} ${saved ? "removed from" : "added to"} My List`);
  };

  return (
    <>
      <IconLibrary />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        activeSection={activeSection}
        profile={profile}
        savedCount={preferences.saved.length}
        onSearch={() => openOverlay("search")}
        onSelectProfile={chooseProfile}
        onList={() => openOverlay("list")}
      />
      <main id="main" tabIndex={-1}>
        {profile === "aqib" ? (
          <>
            <Hero profile={profile} onPlay={() => openOverlay("story")} />
            <Episodes profile={profile} explored={preferences.explored} motion={motion} />
            <AboutSection />
            <HighlightsSection />
            <SkillsSection />
            <ProjectGallery saved={preferences.saved} onToggle={toggleSaved} onOpen={openProject} motion={motion} />
            <ContactSection />
          </>
        ) : (
          <RoleDashboard key={profile} profile={profile} saved={preferences.saved} onToggle={toggleSaved} onOpen={openProject} motion={motion} />
        )}
      </main>
      <Footer
        motion={preferences.motion}
        onToggleMotion={() => {
          setPreferences((old) => ({ ...old, motion: !old.motion }));
          notify(`Motion ${preferences.motion ? "disabled" : "enabled"}`);
        }}
        onNotify={notify}
      />
      <SearchDialog
        open={overlay === "search"}
        onClose={closeOverlay}
        onOpenProject={openProject}
        onNavigate={navigate}
      />
      <SavedProjects
        open={overlay === "list"}
        onClose={closeOverlay}
        saved={preferences.saved}
        onToggle={toggleSaved}
        onOpen={openProject}
        onBrowse={() => navigate("originals")}
      />
      <ProjectDetails
        project={activeProject}
        saved={preferences.saved}
        onToggle={toggleSaved}
        onClose={() => setActiveProject(null)}
      />
      <StoryPlayer
        open={overlay === "story"}
        onClose={closeOverlay}
        motion={motion}
      />
      <div
        className={`toast${toast ? " visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </>
  );
}
