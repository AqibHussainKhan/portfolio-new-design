# Aqib's Portfolio — Start Here

ZIP ka original folder structure rakha gaya hai:

`portfolio new design / portfolio /`

VS Code mein andar wala **portfolio** folder open karein — isi folder mein `package.json` hai.

## Run locally

Terminal mein:

```bash
npm install
npm run dev
```

Terminal mein jo local URL aaye, use browser mein kholein. Vite ka default URL `http://localhost:5173` hai; port busy ho to terminal wala URL use karein.

Node.js `20.19+` or `22.12+` is required by this project's Vite version. A current LTS Node release is recommended.

## Production build

```bash
npm run build
npm run preview
```

`dist/` is the production output. The old compiled version has been cleared and `npm run build` will regenerate it. Relative asset paths are configured for hosting subdirectories.

## What is included

- React and TypeScript components for the complete cinematic portfolio.
- Intro animation and four viewing profiles.
- Hero with Aqib's portrait, story, highlights, toolkit and contact sections.
- Swipeable project and episode rails, project filters and project detail dialogs.
- Search, saved projects, browser persistence and motion settings.
- A chapter-based story player with pause, next, previous and keyboard controls.
- Mobile navigation, responsive layouts, reduced-motion support and accessible native dialogs.
- Local images, SVG project illustrations, fonts and font licenses.

`node_modules` is intentionally excluded from this delivery. `npm install` recreates the dependencies for your own operating system.

## Where to edit

| File                                 | Purpose                                                                |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `src/App.tsx`                        | Main page, shared state and dialogs                                    |
| `src/data/portfolio.ts`              | Project titles, descriptions, skill categories, email and GitHub links |
| `src/components/Hero.tsx`            | Hero name and introduction                                             |
| `src/components/StorySections.tsx`   | About, highlights and contact copy                                     |
| `src/components/Header.tsx`          | Header, footer and social links                                        |
| `src/components/Projects.tsx`        | Project cards, details and My List                                     |
| `src/components/ExploreSections.tsx` | Episodes and skill tabs                                                |
| `src/components/StoryPlayer.tsx`     | Animated story player                                                  |
| `src/components/SearchDialog.tsx`    | Portfolio search                                                       |
| `src/components/ProfilePicker.tsx`   | Profile selection and intro                                            |
| `src/hooks/usePortfolioState.ts`     | Local storage and media preferences                                    |
| `src/App.css`                        | Theme, responsive breakpoints and animations                           |
| `src/assets/aqib-portrait.jpg`       | Profile photo                                                          |

The portrait is displayed with CSS masking and gradients. Project covers are stylized vector interface illustrations, not application screenshots. GitHub buttons point to Aqib's profile; no unverified project URLs have been invented. Contact buttons open the visitor's email application.

## Validation

The TypeScript/JSX source was syntax-checked and the CSS stylesheet was parsed. The dependency installation could not complete in the packaging environment, so run `npm install` and `npm run build` in your VS Code terminal to type-check and create a production bundle. Browser checks should be carried out on the target phone and laptop.

## New: 4 actually different dashboards (October 2026)

From **Who's exploring?** choose one of four views:

| Card | What opens |
| --- | --- |
| Meet Aqib | The entire original cinematic portfolio, preserved as before. |
| Recruiter | A new editorial candidate overview, capabilities, skill grid, featured work and contact. |
| Developer | A new code-editor inspired dashboard, developer approach, categorized stack, projects and contact. |
| Explorer | A new playful creative gallery with editorial introduction, creative toolkit and projects. |

Choose a different view at any time from the profile button at the top right. The selected dashboard is persisted in local storage. All four share working Originals filters, project details, My List, contact and search. Each has its own hero, overview and skills sections; all navigation links point to actual sections.

### Live-project buttons

Open **Originals → a project cover → Visit Live Website** to open a real configured website directly in a new tab. Cards also show **Live site** shortcuts when a live URL is set.

The optional `liveUrl` and `sourceUrl` fields live in `src/data/portfolio.ts`, directly below each project `id`. Replace the `liveUrl` with your deployed URL when available:

```ts
{
  id: "lab",
  liveUrl: "https://YOUR-REAL-DEPLOYED-LAB-URL.example",
  sourceUrl: "https://github.com/AqibHussainKhan/gutham-lab-portal",
  // rest of the project...
}
```

**Current link status:**
- MediCore: previously supplied `https://medicore-hms-aqib.blonddeer16.chatgpt.site/` is configured; check that your host still serves it. GitHub project repository is linked as well.
- Lab IDs: GitHub repository is linked. A public deployed site URL has not been provided, so a live button is hidden rather than pointing to the wrong website.
- The Portfolio: the live button opens the currently running portfolio website (localhost when developing, your site after deployment).
- Slide Stories: its exact hosted URL and repository are not confirmed, so only GitHub profile navigation is shown until supplied.

**Please supply the real Lab IDs and Slide Stories live URLs** to enable their direct live-site buttons. No project link is guessed.

### Changed / added source files

- `src/components/RoleDashboards.tsx` **NEW** — three custom page layouts.
- `src/App.tsx` **UPDATED** — route profile selection to the correct page and refresh active section observers.
- `src/components/Header.tsx` **UPDATED** — viewer-specific nav captions and profile thumbnail.
- `src/components/Projects.tsx` **UPDATED** — direct project links on cards and in details.
- `src/data/portfolio.ts` **UPDATED** — real URL configuration, individual source links.
- `src/App.css` **UPDATED** — styles and responsive breakpoints for all three new dashboards.

### Building and testing

Run `npm install`, then `npm run dev`. To deploy a new production bundle run `npm run build`, then deploy the generated `dist/` directory as appropriate for your host. The old `dist` assets were deliberately cleared from the delivered ZIP so an obsolete build will never masquerade as the updated four-view portfolio.


## Dashboard navigation (updated)

- The site opens directly on the **Meet Aqib** home dashboard every fresh visit.
- Use the **Meet Aqib** dropdown on the right side of the header to change among
  Meet Aqib, Recruiter, Developer, and Explorer dashboards. The previous
  “Who's exploring?” full-screen choice page has been removed.
- The dropdown closes by clicking outside it or pressing Escape.
- On the Originals cards, open a project to see **Visit Live Website** where a
  direct deployment URL is available; Lab IDs points to:
  https://aqibhussainkhan.github.io/gutham-lab-portal/
- Slide Stories does not have a verified deployment URL yet; update its
  `liveUrl` in `src/data/portfolio.ts` when available.
