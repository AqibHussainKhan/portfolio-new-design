import { useEffect, useRef, useState } from "react";
import portrait from "../assets/aqib-portrait.jpg";
import { contactEmail, githubUrl, profileNames } from "../data/portfolio";
import type { SectionId, ViewerProfile } from "../data/portfolio";
import { Icon } from "./Icon";

export function Wordmark() {
  return (
    <a className="wordmark" href="#home" aria-label="Aqib — home">
      AQIB<span>®</span>
    </a>
  );
}

interface HeaderProps {
  activeSection: SectionId;
  profile: ViewerProfile;
  savedCount: number;
  onSearch: () => void;
  onSelectProfile: (profile: ViewerProfile) => void;
  onList: () => void;
}
export default function Header({
  activeSection,
  profile,
  savedCount,
  onSearch,
  onSelectProfile,
  onList,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target) &&
        !menuButtonRef.current?.contains(event.target)
      )
        setMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);
  useEffect(() => {
    if (!profileMenuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !profileMenuRef.current?.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
        profileButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [profileMenuOpen]);
  const selectProfile = (selected: ViewerProfile) => {
    setProfileMenuOpen(false);
    setMenuOpen(false);
    onSelectProfile(selected);
    // Keep keyboard focus on the header control after choosing a profile.
    profileButtonRef.current?.focus();
  };
  const viewingProfiles: { id: ViewerProfile; description: string }[] = [
    { id: "aqib", description: "The complete experience" },
    { id: "recruiter", description: "Work, skills & experience" },
    { id: "developer", description: "Code, tools & projects" },
    { id: "explorer", description: "Ideas & creative experiments" },
  ];
  const links: { id: SectionId; title: string }[] = [
    { id: "home", title: "Home" },
    { id: "story", title: profile === "recruiter" ? "Overview" : profile === "developer" ? "Approach" : "My story" },
    { id: "skills", title: profile === "developer" ? "Tech stack" : profile === "explorer" ? "Toolbox" : "Skills" },
    { id: "originals", title: "Originals" },
  ];
  const listCount =
    savedCount > 0 ? <span className="list-count">{savedCount}</span> : null;
  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? "active" : ""}
              aria-current={activeSection === link.id ? "location" : undefined}
            >
              {link.title}
            </a>
          ))}
          <button type="button" className="text-button" onClick={onList}>
            My List {listCount}
          </button>
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={onSearch}
            aria-label="Search portfolio"
          >
            <Icon name="search" />
          </button>
          <div className="profile-switcher" ref={profileMenuRef}>
            <button
              type="button"
              ref={profileButtonRef}
              className={`profile-toggle${profileMenuOpen ? " is-open" : ""}`}
              onClick={() => {
                setMenuOpen(false);
                setProfileMenuOpen((open) => !open);
              }}
              aria-label={`Current view: ${profileNames[profile]}. Switch dashboard`}
              aria-expanded={profileMenuOpen}
              aria-controls="profile-dropdown"
              aria-haspopup="true"
            >
              {profile === "aqib" ? (
                <img src={portrait} alt="" width="32" height="32" />
              ) : (
                <span className={`profile-mini-avatar mini-${profile}`} aria-hidden="true">
                  {profile === "recruiter" ? "R" : <Icon name={profile === "developer" ? "code" : "spark"} />}
                </span>
              )}
              <span className="profile-label">{profileNames[profile]}</span>
              <span className="tiny-caret" />
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown" id="profile-dropdown" role="group" aria-label="Switch portfolio dashboard">
                <div className="profile-dropdown-heading">
                  <span>CHOOSE YOUR VIEW</span>
                  <small>FOUR WAYS TO EXPLORE</small>
                </div>
                {viewingProfiles.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`profile-dropdown-option${profile === option.id ? " selected" : ""}`}
                    onClick={() => selectProfile(option.id)}
                    aria-pressed={profile === option.id}
                  >
                    <span className={`profile-dropdown-avatar avatar-${option.id}`} aria-hidden="true">
                      {option.id === "aqib" ? (
                        <img src={portrait} alt="" />
                      ) : option.id === "recruiter" ? (
                        "R"
                      ) : (
                        <Icon name={option.id === "developer" ? "code" : "spark"} />
                      )}
                    </span>
                    <span className="profile-dropdown-copy">
                      <strong>{profileNames[option.id]}</strong>
                      <small>{option.description}</small>
                    </span>
                    {profile === option.id ? <span className="profile-dropdown-check"><Icon name="check" /></span> : null}
                  </button>
                ))}
                <div className="profile-dropdown-footnote">YOUR PORTFOLIO, YOUR PERSPECTIVE</div>
              </div>
            )}
          </div>
          <button
            type="button"
            ref={menuButtonRef}
            className="icon-button mobile-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <nav
        ref={menuRef}
        className="mobile-nav"
        id="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.title}
          </a>
        ))}
        <button
          type="button"
          className="text-button"
          onClick={() => {
            setMenuOpen(false);
            onList();
          }}
        >
          My List {listCount}
        </button>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Let's talk
        </a>
      </nav>
    </>
  );
}

interface FooterProps {
  motion: boolean;
  onToggleMotion: () => void;
  onNotify: (message: string) => void;
}
export function Footer({
  motion,
  onToggleMotion,
  onNotify,
}: FooterProps) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      onNotify("Email copied. Say hello!");
    } catch {
      onNotify(`Email: ${contactEmail}`);
    }
  };
  return (
    <footer className="site-footer page-width">
      <div className="footer-top">
        <Wordmark />
        <p>
          Designed with curiosity.
          <br />
          Built with code.
        </p>
        <div className="footer-socials">
          <a
            className="round-button"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aqib on GitHub"
          >
            <Icon name="github" />
          </a>
          <a
            className="round-button"
            href={`mailto:${contactEmail}`}
            aria-label="Email Aqib"
          >
            <Icon name="mail" />
          </a>
          <button
            type="button"
            className="round-button"
            onClick={copyEmail}
            aria-label="Copy email address"
          >
            <Icon name="copy" />
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Aqib Hussain Khan</span>
        <div>
          <button
            type="button"
            className="text-button"
            onClick={onToggleMotion}
            aria-pressed={motion}
          >
            Motion: {motion ? "on" : "off"}
          </button>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
