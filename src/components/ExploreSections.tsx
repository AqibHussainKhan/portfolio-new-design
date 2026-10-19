import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { episodeOrders, episodes, skillTabs, skills } from "../data/portfolio";
import type { SkillCategory, ViewerProfile } from "../data/portfolio";
import { useMediaQuery } from "../hooks/usePortfolioState";
import { Icon } from "./Icon";
import RailControls from "./RailControls";

export function Episodes({
  profile,
  explored,
  motion,
}: {
  profile: ViewerProfile;
  explored: string[];
  motion: boolean;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const order = episodeOrders[profile];
  const sorted = [...episodes].sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );
  useEffect(() => {
    if (railRef.current) railRef.current.scrollLeft = 0;
  }, [profile]);
  return (
    <section
      className="continue-section page-width"
      id="continue"
      aria-labelledby="continue-title"
    >
      <div className="section-toolbar">
        <div>
          <p className="eyebrow">YOUR NEXT EPISODE</p>
          <h2 className="row-title" id="continue-title">
            Continue exploring
          </h2>
        </div>
        <RailControls
          railRef={railRef}
          label="episodes"
          motion={motion}
          refreshKey={profile}
        />
      </div>
      <div className="episode-rail" ref={railRef}>
        {sorted.map((episode) => (
          <a
            key={episode.id}
            href={`#${episode.id}`}
            className={`episode-card episode-${episode.color}${explored.includes(episode.id) ? " viewed" : ""}`}
          >
            <span className="episode-bg" aria-hidden="true">
              {episode.number}
            </span>
            <span className="episode-play">
              <Icon name="play" />
            </span>
            <span className="episode-number">EPISODE {episode.number}</span>
            <h3>{episode.title}</h3>
            <span className="episode-subtitle">{episode.subtitle}</span>
            <span className="episode-progress">
              <i />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection() {
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = skills[category];
  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % skillTabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + skillTabs.length) % skillTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = skillTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setCategory(skillTabs[next].id);
    buttonRefs.current[next]?.focus();
  };
  return (
    <section
      className="skills-section section-space"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="page-width">
        <div className="section-toolbar reveal">
          <div>
            <p className="eyebrow">THE SUPPORTING CAST</p>
            <h2 className="display-title" id="skills-title">
              MY TOOLKIT
            </h2>
          </div>
          <p className="section-aside">
            Different tools.
            <br />
            One thoughtful experience.
          </p>
        </div>
        <div className="skills-layout reveal">
          <div
            className="skill-tabs"
            role="tablist"
            aria-label="Skill categories"
            aria-orientation={isMobile ? "horizontal" : "vertical"}
          >
            {skillTabs.map((tab, index) => (
              <button
                type="button"
                key={tab.id}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                className={`skill-tab${tab.id === category ? " active" : ""}`}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={tab.id === category}
                aria-controls="skill-panel"
                tabIndex={tab.id === category ? 0 : -1}
                onClick={() => setCategory(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {tab.label}
                  <small>{tab.description}</small>
                </div>
                <Icon name="chevron" />
              </button>
            ))}
          </div>
          <div
            className="skill-panel"
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`tab-${category}`}
            tabIndex={0}
          >
            <p className="skill-panel-intro">{selected.intro}</p>
            <div className="skill-grid" key={category}>
              {selected.items.map((skill, index) => (
                <article
                  className="skill-card"
                  key={skill.name}
                  style={
                    {
                      "--skill-color": skill.color,
                      animationDelay: `${index * 35}ms`,
                    } as CSSProperties
                  }
                >
                  <span className="skill-symbol" aria-hidden="true">
                    {skill.symbol}
                  </span>
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
            <p className="skill-note">
              <span className="live-dot" />
              Always building. Always learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
