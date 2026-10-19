export function AboutSection() {
  return (
    <section
      className="story-section page-width section-space"
      id="story"
      aria-labelledby="story-title"
    >
      <div className="story-copy reveal">
        <p className="eyebrow">
          <span className="small-a">A</span> THE FULL STORY
        </p>
        <h2 className="display-title" id="story-title">
          CURIOUS MIND.
          <br />
          HANDS-ON
          <br />
          <span className="muted-word">BUILDER.</span>
        </h2>
        <p>
          Hi, I'm Aqib. I enjoy taking a rough idea and shaping it into
          something you can open, explore and actually use.
        </p>
        <p>
          My work moves between responsive layouts, interactive interfaces and
          dashboards. I care about the details: clear navigation, useful
          feedback, smooth motion and a layout that works on the screen in your
          hand.
        </p>
        <a
          className="inline-link"
          href="https://github.com/AqibHussainKhan"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meet me on GitHub{" "}
          <svg className="icon">
            <use href="#i-up-right"></use>
          </svg>
        </a>
      </div>
      <div className="story-chapters reveal">
        <div className="chapters-heading">
          <span>INSIDE THIS SEASON</span>
          <span>3 CHAPTERS</span>
        </div>
        <article className="chapter">
          <span className="chapter-index">01</span>
          <div>
            <p className="chapter-tag">THE FOCUS</p>
            <h3>Good ideas deserve good interfaces.</h3>
            <p>Frontend development with HTML, CSS, JavaScript and React.</p>
          </div>
          <svg className="icon">
            <use href="#i-code"></use>
          </svg>
        </article>
        <article className="chapter">
          <span className="chapter-index">02</span>
          <div>
            <p className="chapter-tag">THE WORK</p>
            <h3>From everyday tasks to useful tools.</h3>
            <p>
              Hospital operations, lab records and personal web experiences.
            </p>
          </div>
          <svg className="icon">
            <use href="#i-spark"></use>
          </svg>
        </article>
        <article className="chapter">
          <span className="chapter-index">03</span>
          <div>
            <p className="chapter-tag">THE APPROACH</p>
            <h3>Build it. Use it. Make it better.</h3>
            <p>
              Refining the flow, the responsiveness and the little interactions.
            </p>
          </div>
          <svg className="icon">
            <use href="#i-arrow"></use>
          </svg>
        </article>
        <div className="chapter-end">
          <span className="live-dot"></span>THE STORY IS STILL BEING WRITTEN.
        </div>
      </div>
    </section>
  );
}

export function HighlightsSection() {
  return (
    <section
      className="highlights-section page-width section-space"
      aria-labelledby="highlights-title"
    >
      <div className="section-toolbar reveal">
        <div>
          <p className="eyebrow">IT'S IN THE DETAILS</p>
          <h2 className="display-title medium" id="highlights-title">
            BEHIND THE BUILD
          </h2>
        </div>
        <p className="section-aside">A few things I bring to every project.</p>
      </div>
      <div className="highlights-grid">
        <article className="highlight reveal">
          <span className="highlight-mark">
            01<span>✦</span>
          </span>
          <p className="eyebrow">THE EXPERIENCE</p>
          <h3>
            USEFUL
            <br />
            BY DESIGN.
          </h3>
          <p>
            Patient records, search, editing and clear navigation. Interfaces
            built around the task at hand.
          </p>
          <span className="highlight-footer">PURPOSE BEFORE PIXELS</span>
        </article>
        <article className="highlight reveal">
          <span className="highlight-mark">
            02<span>↗</span>
          </span>
          <p className="eyebrow">THE LAYOUT</p>
          <h3>
            EVERY SCREEN.
            <br />
            EVERY DETAIL.
          </h3>
          <p>
            A comfortable experience from phone to laptop, with room for the
            content that matters.
          </p>
          <span className="highlight-footer">RESPONSIVE AT THE CORE</span>
        </article>
        <article className="highlight reveal">
          <span className="highlight-mark">
            03<span>⌁</span>
          </span>
          <p className="eyebrow">THE FEELING</p>
          <h3>
            A LITTLE
            <br />
            MORE ALIVE.
          </h3>
          <p>
            Thoughtful transitions, helpful states and motion that gives the
            interface a sense of rhythm.
          </p>
          <span className="highlight-footer">MOTION WITH A REASON</span>
        </article>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      className="contact-section section-space"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="page-width contact-inner reveal">
        <div className="contact-topline">
          <p className="eyebrow">THE NEXT CHAPTER</p>
          <span>LET'S CREATE SOMETHING WORTH EXPLORING.</span>
        </div>
        <h2 id="contact-title">
          GOOD IDEA?
          <br />
          <span>LET'S BUILD IT.</span>
        </h2>
        <div className="contact-bottom">
          <p>
            A website, a dashboard, or an idea on your mind.
            <br />
            I'd love to hear what you're working on.
          </p>
          <a className="button button-white" href="mailto:aqib.n2742@gmail.com">
            Let's talk{" "}
            <svg className="icon">
              <use href="#i-up-right"></use>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
