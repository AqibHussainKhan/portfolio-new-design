import type { CSSProperties } from "react";
import portrait from "../assets/aqib-portrait.jpg";
import { contactEmail, githubUrl, projects, skills } from "../data/portfolio";
import type { Project, ViewerProfile } from "../data/portfolio";
import { Icon } from "./Icon";
import { ProjectGallery } from "./Projects";
import { ContactSection } from "./StorySections";

interface RoleDashboardProps {
  profile: Exclude<ViewerProfile, "aqib">;
  saved: string[];
  onToggle: (id: string) => void;
  onOpen: (project: Project) => void;
  motion: boolean;
}

const pillars = [
  { id: "01", title: "INTERFACES", detail: "Responsive UI with a clear, consistent visual system." },
  { id: "02", title: "INTERACTIONS", detail: "Search, forms, filters, navigation and usable feedback." },
  { id: "03", title: "DATA & AUTH", detail: "Connecting components to records, storage and sign-in flows." },
];

function GalleryAndContact(props: Omit<RoleDashboardProps, "profile">) {
  return (
    <>
      <ProjectGallery saved={props.saved} onToggle={props.onToggle} onOpen={props.onOpen} motion={props.motion} />
      <ContactSection />
    </>
  );
}

function RoleLabel({ number, children }: { number: string; children: string }) {
  return <p className="role-section-label"><span>{number}</span> {children}</p>;
}

function RecruiterDashboard(props: Omit<RoleDashboardProps, "profile">) {
  return (
    <div className="role-dashboard recruiter-view" data-view="recruiter">
      <section className="role-hero recruiter-hero page-width" id="home" aria-labelledby="recruiter-hero-title">
        <div className="role-hero-copy">
          <div className="role-overline"><span className="role-signal" /> RECRUITER EDITION / AQIB HUSSAIN KHAN</div>
          <h1 id="recruiter-hero-title">A BUILDER<br />FOR THE <em>DETAILS.</em></h1>
          <p>Frontend developer focused on thoughtful interfaces, practical dashboards, and experiences that work beautifully from mobile to desktop.</p>
          <div className="role-actions">
            <a className="role-action-primary" href="#originals">View selected work <Icon name="arrow" /></a>
            <a className="role-action-secondary" href={`mailto:${contactEmail}`}>Get in touch <Icon name="up-right" /></a>
          </div>
          <div className="role-hero-signature">REACT <span>✳</span> TYPESCRIPT <span>✳</span> UI / UX</div>
        </div>
        <aside className="recruiter-candidate-card" aria-label="Candidate overview">
          <div className="candidate-card-top"><span>PROFILE / 001</span><span className="recruiter-pill">FRONTEND</span></div>
          <div className="candidate-avatar"><img src={portrait} alt="Aqib Hussain Khan" /></div>
          <p className="candidate-caption">DEVELOPER PROFILE</p>
          <h2>Aqib Hussain<br />Khan.</h2>
          <div className="candidate-divider" />
          <div className="candidate-facts"><span>SELECTED WORK</span><strong>{String(projects.length).padStart(2,"0")} PROJECTS</strong></div>
          <div className="candidate-facts"><span>MAIN FOCUS</span><strong>FRONTEND & UI</strong></div>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">EXPLORE GITHUB <Icon name="up-right" /></a>
        </aside>
      </section>

      <section className="role-section page-width recruiter-summary" id="story" aria-labelledby="recruiter-story-title">
        <RoleLabel number="01" >THE QUICK INTRODUCTION</RoleLabel>
        <div className="recruiter-summary-layout">
          <h2 id="recruiter-story-title">GOOD DESIGN.<br /><span>WORKING CODE.</span></h2>
          <div className="recruiter-summary-copy"><p>I take ideas from the initial layout to the details that make the experience useful. My projects explore hospital operations, record management and interactive web experiences.</p><p>What matters to me: clear interfaces, responsive layouts, organized components and small improvements that make a real difference.</p><a href="#originals">Explore the case studies <Icon name="arrow" /></a></div>
        </div>
        <div className="recruiter-pillars">{pillars.map((pillar)=><article key={pillar.id}><span>{pillar.id} / CAPABILITY</span><h3>{pillar.title}</h3><p>{pillar.detail}</p></article>)}</div>
      </section>
      <section className="role-section recruiter-skills" id="skills" aria-labelledby="recruiter-skills-title">
        <div className="page-width"><RoleLabel number="02">TOOLS I WORK WITH</RoleLabel><div className="recruiter-skills-row"><h2 id="recruiter-skills-title">THE SKILL SET.</h2><p>A practical toolkit for design-led frontend work.</p></div><div className="recruiter-skill-tags">{["React","TypeScript","JavaScript","HTML & CSS","Tailwind CSS","Supabase","Git & GitHub","Responsive UI"].map((item,index)=><span key={item}><b>{String(index+1).padStart(2,"0")}</b>{item}</span>)}</div></div>
      </section>
      <GalleryAndContact {...props} />
    </div>
  );
}

function DeveloperDashboard(props: Omit<RoleDashboardProps, "profile">) {
  return (
    <div className="role-dashboard developer-view" data-view="developer">
      <section className="role-hero developer-hero page-width" id="home" aria-labelledby="developer-hero-title">
        <div className="developer-hero-copy">
          <div className="dev-command"><span>~</span> aqib@portfolio <span>›</span> ./hello-world</div>
          <p className="dev-eyebrow"><span className="role-signal" /> DEVELOPER VIEW — SYSTEM ONLINE</p>
          <h1 id="developer-hero-title">I BUILD<br /><span>FOR THE WEB</span><b>_</b></h1>
          <p className="developer-hero-description">Clean components. Responsive interfaces. Real interactions. From a dashboard flow to the smallest hover state, I enjoy making the web feel considered.</p>
          <div className="role-actions"><a className="role-action-primary" href="#originals">Browse the builds <Icon name="arrow" /></a><a className="role-action-secondary" href={githubUrl} target="_blank" rel="noopener noreferrer"><Icon name="github" /> GitHub</a></div>
          <div className="dev-mini-stats"><span><strong>04</strong> FEATURED BUILDS</span><span><strong>06</strong> FRONTEND TOOLS</span><span><strong>∞</strong> IDEAS TO TRY</span></div>
        </div>
        <div className="developer-editor" aria-label="Code-inspired profile preview">
          <div className="editor-chrome"><div><i /><i /><i /></div><span>portfolio.tsx</span><small>TSX</small></div>
          <div className="editor-lines">
            <p><span>01</span> <em>const</em> developer = <b>{"{"}</b></p>
            <p><span>02</span> &nbsp; name: <q>"Aqib Hussain Khan"</q>,</p>
            <p><span>03</span> &nbsp; focus: <q>"Frontend Development"</q>,</p>
            <p><span>04</span> &nbsp; stack: <b>[</b></p>
            <p><span>05</span> &nbsp;&nbsp; <q>"React"</q>, <q>"TypeScript"</q>,</p>
            <p><span>06</span> &nbsp;&nbsp; <q>"CSS"</q>, <q>"JavaScript"</q></p>
            <p><span>07</span> &nbsp; <b>]</b>,</p>
            <p><span>08</span> &nbsp; approach: <q>"Build. Test. Refine."</q></p>
            <p><span>09</span> <b>{"}"}</b>;</p>
            <p className="editor-comment"><span>10</span> // Explore the projects below ↓</p>
          </div>
          <div className="editor-status"><span><span className="role-signal" /> ALL SYSTEMS READY</span><span>UTF-8 · REACT</span></div>
        </div>
      </section>
      <section className="role-section page-width developer-story" id="story" aria-labelledby="developer-story-title">
        <RoleLabel number="01">HOW I THINK ABOUT A BUILD</RoleLabel>
        <h2 id="developer-story-title">CODE WITH <span>INTENT.</span></h2>
        <div className="developer-process">{[
          ["01 / STRUCTURE", "Start with a clear foundation", "Make layouts, components and information easy to understand."],
          ["02 / INTERACTION", "Make every action meaningful", "Wire up forms, filters, search and useful feedback."],
          ["03 / POLISH", "Refine every screen", "Check spacing, responsive states and motion before calling it done."],
        ].map(([label, title, description])=><article key={label}><small>{label}</small><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></article>)}</div>
      </section>
      <section className="role-section page-width developer-stack" id="skills" aria-labelledby="developer-skills-title">
        <RoleLabel number="02">TECH / STACK</RoleLabel><h2 id="developer-skills-title">THE TOOLKIT<span>.json</span></h2>
        <div className="developer-stack-grid">{[
          {title:"01_FRONTEND",items:skills.frontend.items},
          {title:"02_DATA & AUTH",items:skills.data.items},
          {title:"03_WORKFLOW",items:skills.tools.items},
        ].map(group=><article key={group.title}><div className="dev-stack-title"><span>{group.title}</span><Icon name="code" /></div><div>{group.items.map(item=><p key={item.name}><span style={{"--skill-color":item.color} as CSSProperties}>●</span>{item.name}</p>)}</div></article>)}</div>
      </section>
      <GalleryAndContact {...props} />
    </div>
  );
}

function ExplorerDashboard(props: Omit<RoleDashboardProps, "profile">) {
  return (
    <div className="role-dashboard explorer-view" data-view="explorer">
      <section className="role-hero explorer-hero page-width" id="home" aria-labelledby="explorer-hero-title">
        <div className="explorer-copy"><div className="explorer-topline">AN INTERACTIVE PORTFOLIO <span>VOL. 01 / ∞</span></div><p className="explorer-kicker">YOU HAVE ARRIVED SOMEWHERE INTERESTING.</p><h1 id="explorer-hero-title">FOLLOW YOUR<br /><em>CURIOSITY</em><span>✳</span></h1><p>Hi, I'm Aqib. Welcome to the creative side of code — a little bit of design, a little bit of experimentation, and a whole lot of building.</p><div className="role-actions"><a className="role-action-primary" href="#story">Start exploring <Icon name="arrow" /></a><a className="role-action-secondary" href="#originals">Skip to the projects <Icon name="up-right" /></a></div></div>
        <div className="explorer-art" aria-hidden="true"><div className="explorer-orbit"><span>DESIGN</span><i>✳</i><span>CODE</span></div><div className="explorer-art-card card-one"><span>01 / CREATE</span><b>IMAGINE<br />IT.</b><Icon name="spark" /></div><div className="explorer-art-card card-two"><span>02 / DEVELOP</span><b>MAKE<br />IT REAL.</b><Icon name="code" /></div><div className="explorer-art-sticker">AQ / 26 ↗</div></div>
      </section>
      <section className="role-section explorer-story page-width" id="story" aria-labelledby="explorer-story-title"><RoleLabel number="01">THE STORY SO FAR</RoleLabel><h2 id="explorer-story-title">NOT JUST<br />A <em>PORTFOLIO.</em><br />A PLAYGROUND.</h2><div className="explorer-story-bottom"><p>One idea leads to another. Sometimes it's a useful medical dashboard. Sometimes it's a lab records interface. Sometimes it's a playful slider. Each one is another opportunity to learn, try and refine.</p><a href="#originals" className="explorer-story-link">SEE WHAT I MADE <Icon name="arrow" /></a></div><div className="explorer-ticker" aria-hidden="true">DESIGN ✳ DEVELOP ✳ EXPLORE ✳ REPEAT ✳ DESIGN ✳ DEVELOP ✳ EXPLORE ✳ REPEAT ✳</div></section>
      <section className="role-section explorer-skills page-width" id="skills" aria-labelledby="explorer-skills-title"><RoleLabel number="02">THE CREATIVE TOOLBOX</RoleLabel><h2 id="explorer-skills-title">TOOLS & <em>TRICKS.</em></h2><div className="explorer-tool-grid">{[
        {num:"01",label:"THE STRUCTURE",name:"HTML + CSS",description:"The foundation behind every great layout.",style:"coral"},
        {num:"02",label:"THE MAGIC",name:"JavaScript",description:"Where static pages turn into experiences.",style:"mint"},
        {num:"03",label:"THE SYSTEM",name:"React + TS",description:"Reusable components and organized interfaces.",style:"lilac"},
        {num:"04",label:"THE CONNECTION",name:"Supabase",description:"Records, sign-in flows and persistent data.",style:"yellow"},
      ].map(item=><article key={item.num} className={`explorer-tool ${item.style}`}><span>{item.num} / {item.label}</span><Icon name="spark" /><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></section>
      <GalleryAndContact {...props} />
    </div>
  );
}

export default function RoleDashboard({ profile, ...props }: RoleDashboardProps) {
  if (profile === "recruiter") return <RecruiterDashboard {...props} />;
  if (profile === "developer") return <DeveloperDashboard {...props} />;
  return <ExplorerDashboard {...props} />;
}
