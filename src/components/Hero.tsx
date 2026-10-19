import portrait from "../assets/aqib-portrait.jpg";
import { profileKickers } from "../data/portfolio";
import type { ViewerProfile } from "../data/portfolio";

type HeroProps = { profile: ViewerProfile; onPlay: () => void };
export default function Hero({ profile, onPlay }: HeroProps) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true"></div>
      <div className="hero-portrait">
        <img
          src={portrait}
          alt="Aqib Hussain Khan"
          fetchPriority="high"
          width="864"
          height="1536"
        />
      </div>
      <div className="hero-content page-width">
        <div className="original-label">
          <b>A</b>
          <span>AN ORIGINAL PORTFOLIO</span>
        </div>
        <p className="hero-kicker" id="hero-kicker">
          {profileKickers[profile]}
        </p>
        <h1 id="hero-title">
          <span className="first-name">AQIB</span>
          <span className="last-name">HUSSAIN KHAN</span>
        </h1>
        <p className="hero-role">THE DEVELOPER</p>
        <div className="hero-meta">
          <span className="match-text">Made to explore</span>
          <span>2026</span>
          <span className="meta-outline">WEB</span>
          <span>Pakistan</span>
        </div>
        <p className="hero-description">
          Turning ideas into responsive websites, thoughtful dashboards and
          experiences that feel good to use. Every project has a story. This is
          mine.
        </p>
        <div className="hero-buttons">
          <button className="button button-white" onClick={onPlay}>
            <svg className="icon">
              <use href="#i-play"></use>
            </svg>
            Play my story
          </button>
          <a className="button button-glass" href="#originals">
            <svg className="icon">
              <use href="#i-info"></use>
            </svg>
            Explore my work
          </a>
        </div>
        <div className="hero-footnote">
          <span className="live-dot"></span>One developer. A world of ideas.
        </div>
      </div>
      <div className="hero-side-note" aria-hidden="true">
        <span>DESIGN. DEVELOP. REFINE.</span>
        <b>VOL. 01</b>
      </div>
      <a
        href="#continue"
        className="scroll-cue"
        aria-label="Scroll to continue exploring"
      >
        <span>SCROLL TO EXPLORE</span>
        <svg className="icon">
          <use href="#i-arrow"></use>
        </svg>
      </a>
    </section>
  );
}
