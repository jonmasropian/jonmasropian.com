# Portfolio: session brief

**New session: read this whole file first, then `PRODUCT.md`. Don't re-ask Jon anything answered here.**
Last updated 2026-11-06. **The rebuild is finished and live at https://www.jonmasropian.com** (repo renamed to `github.com/jonmasropian/jonmasropian.com`). All 6 stages approved. **Next phase: Jon's teaching projects with live databases (section 4). Not started; Jon will say when.** Jon is retired from the Army; site and résumé say so once, plainly.

## 1. Where things stand

- Repo: this folder (local folder still named `Masropian-portfolio-template`; GitHub repo is `jonmasropian/jonmasropian.com`, old URL redirects). Work lands on `main`, which auto-deploys on Vercel, so **never push to `main` without Jon's OK** (use a branch for new work). `rebuild/planning` is fully merged.
- Live: `https://www.jonmasropian.com` (apex `jonmasropian.com` 308-redirects to www; both bought/managed in Vercel). Vercel env: `GITHUB_TOKEN` (read-only, LMS_Backend), `RESEND_API_KEY`. Resend domain `jonmasropian.com` verified; contact mail sends from `portfolio@jonmasropian.com`, reply-to = visitor.
- Stack: Next.js 16 App Router, Tailwind v4 (tokens in `src/styles/tailwind.css`), React 19, lucide-react, framer-motion (installed, unused so far). All old void/glitch code and 24 unused deps were removed in Stage 1.
- Routes: `/` home, `/projects`, `/biography`, `/cyber-lab`, `/contact`, `/under-the-hood` under `src/app/(site)/`; API at `src/app/api/github` and `src/app/api/contact`. Design system recorded in `DESIGN.md`.

| Stage | What shipped | Status |
|---|---|---|
| 1 Foundation | Tokens, fonts, nav (`SiteNav.tsx`, mobile full-screen menu), footer (hidden on `/`), 5 routes, persistent video backdrop (`Backdrop.tsx`, dims to 72% on inner pages) | approved, `5482b10` |
| 2 Home | Horizon layout (`src/app/(site)/page.tsx`): big name, cut-out portrait with edge rim light (`home/Portrait.tsx`), typed line (`home/TypedLine.tsx`), 4 glass doors (`home/Doors.tsx`), live GitHub strip (`home/GithubStrip.tsx` + `src/lib/github.ts`, tests in `src/lib/github.test.ts`) | approved, `b4bf264`, `00e542b` |
| 3 Projects | 3 glass cards (`projects/ProjectCard.tsx`, data in `src/data/projects.ts`): Warriors Blood Coffee (featured, full width), The Bean's Place, Barbershop Cut & Snip; screenshots in `public/projects/`; client-work line + Under-the-hood line under cards | approved, `9f7b639` |
| 4 Biography | Intro, career timeline, 7 cert cards (`biography/CertCard.tsx`, data `src/data/biography.ts`, images `public/certs/`), Credly link on Security+, résumé button | approved, `f23f2ce` … `60c5bce` |
| Résumé | One-page single-column résumé, two copies (with phone for applications, no phone for the site) in `inspiration/resume/` + `build-resume.js`; site copy `public/Jon-Masropian-Resume.pdf` | approved, `5e42a50` |
| 5 Backend | `/cyber-lab` typed psql session (`cyber-lab/Terminal.tsx`, `src/data/cyberLab.ts`, `src/lib/psql.ts`), `/contact` form → Resend (`src/lib/contact.ts` validation + rate limit), `/under-the-hood` API docs with Try-it | approved, `e8f9639` |
| 6 Finish | Impeccable finish review fixes (rim light traced from the matte, outside the outline; left crimson light; name masked into wave; doors lean 6deg/600px; CLS 0.186→0.001), a11y pass (Pause background toggle, terminal plays once + Replay, form focus/labels, menu inert), `DESIGN.md` | approved, `ad03a1e` |
| Launch | Merged to main, domain connected, Resend domain sender (`a971391`), README + repo rename (`84e648b`), local tool folders untracked (`7006d05`) | live |

Shared pieces to reuse: `.glass` utility (tilt + inner light + edge light, keyboard focus too) and `src/lib/tilt.ts` (`tilt` / `resetTilt` pointer handlers). The `.pill` utility is the one gradient-edged button (used for Contact in the nav).

## 2. How we work (Jon's rules; follow exactly)

1. **Six stages, Jon approves each one.** Build a stage, show it at `http://localhost:3123`, wait for "approved", then commit to `rebuild/planning`.
2. **Before building a stage, show a short content plan** (what items, draft wording) and wait for OK. Jon stopped me once for picking content on my own.
3. **Design calls are mine** (fonts, layout, motion, small copy); Jon reviews them at the stage review. **Facts and content selection are his.** Never invent duties, numbers or claims.
4. **Impeccable leads design.** taste-skill, antislop, ui-craft, frontend-design and ui-ux-pro-max only review its work.
5. Jon has ADHD mode on: lead with the next action, numbered steps, concrete time estimates, say what works now, end with one next step.
6. Jon likes research-backed advice when he asks "what do you suggest" (search, then recommend one option).

## 3. Decisions locked (don't revisit)

- **Look:** dark sci-fi. Ground `#030306`, navy `#092659`, cobalt `#0252AC`, signal `#5aa0ff` (cobalt lifted for text contrast), crimson `#D31816`, wine `#591E28`, text `#F6F6F6` / `#A6A9AF` / `#8994B4`.
- **Fonts:** Big Shoulders (display, caps), IBM Plex Sans (body), IBM Plex Mono (labels/data). Via `next/font/google` in `src/app/(site)/layout.tsx`.
- **Title:** "Software Developer Apprentice" (ERA Solutions). **Never call Jon an engineer.** Browser title: "Jon Masropian — Software Developer".
- **Typed line:** "22 years running Army networks. Now I write software and teach MySQL."
- **No phone number anywhere.** Public contact: jon.masropian@gmail.com, GitHub `github.com/jonmasropian`, LinkedIn `linkedin.com/in/jon-masropian-9607223a7/` (all in `src/data/site.ts`). Jon's other emails (ERA, Vets4Life) stay off the site.
- **No AI-slop copy.** Plain, factual, first person.
- **Craft rules hit so far:** no eyebrow/kicker labels above headings (status tags go beside titles), no section numbers, no zero-offset colored glow halos, blur only on desktop (too heavy over video on phones).
- **GitHub strip:** shows private repo `jonmasropian/LMS_Backend` (time, commit count, name only; never contents or messages). Needs `GITHUB_TOKEN`. Jon already created a fine-grained read-only token for that repo and added it in Vercel as a Secret (Production + Preview). Without the token it falls back to public push events.
- **Projects shown:** only the three above. Company work (an LMS and a VA document app built at ERA) gets one vague line, no names or features. Teaching-class repos stay off until their MySQL/MongoDB databases are hosted (advice given: use MongoDB Atlas M0 / Aiven free MySQL, not the company Azure account; low priority).
- **Warriors Blood Coffee** is a team repo (`joshuasilvazero-source/warriors-blood-coffee-silva`), live at `warriors-blood-coffee.vercel.app`, **not complete**. Jon's parts: lower home-page sections, About Us layout (incomplete), most of the Square checkout.
- Bean's Place live: `the-beans-place-masropian.vercel.app`. Barbershop live: `barbershop-cut-and-snip.vercel.app`. Both auto-deploy from their repos. I pushed a map fix to Bean's Place (`d344a84`: CARTO tiles now need a key, so it switched to OpenStreetMap + a dark CSS filter, and zoom buttons stay under the navbar).

## 4. Next phase: teaching projects + live databases (not started)

Jon's request (2026-11-06): bring in what he teaches, including putting his databases live. **Three projects.** Not today; he'll say when. **Don't fetch or clone the repos until he starts this phase.**

Known so far (ask Jon for the rest at kickoff, then show a content plan before building, as with every stage):
- These are his teaching-class repos. They currently need a **local** MySQL or MongoDB, which is why they were kept off the Projects page.
- He teaches MySQL through ERA's LMS over Teams (see `src/data/biography.ts`).
- Earlier advice (still the plan unless he says otherwise): host the databases on free tiers he owns, **MongoDB Atlas M0** and/or **Aiven free MySQL**, not the company Azure account. Read-only or limited-privilege DB users for anything public; keep credentials in Vercel env vars only.

**Jon's answers (2026-11-06):**
1. Repo links: none yet (he'll provide). Databases: "each one uses MySQL and MongoDB". *Clarify at kickoff:* does every app use both, or do some use MySQL and others MongoDB?
2. **Class material he wrote for his students** (not personal projects). Wording on the site must say so.
3. Show them **on the Projects page, in a separate section titled "Teaching"** below the current three projects (same card style).
4. **All data is made up for class; no real student data.** Still check each DB for anything personal before going public.
5. **Each app has a frontend and a backend.**

**Open questions for the kickoff session (ask these first):**
1. Clarify the MySQL/MongoDB split per app (see answer 1).
2. **Is ERA OK with the class material being public?** It was written for ERA's courses; confirm Jon or ERA owns it before publishing code or live demos.
3. Each app's stack: frontend (React? plain HTML/JS?) and backend (Node/Express? something else?). A long-running Express server can't run as-is on Vercel; options are a free host for the backend (Render, Railway, Fly.io) or converting routes to Vercel functions. Decide per app.
4. Do the repos contain hardcoded secrets or connection strings? They must be moved to env vars before any repo is public or deployed.
5. Can visitors write data (create/edit/delete)? If yes, plan a reset (nightly re-seed) so the demo stays clean, plus rate limits.
6. Are there seed scripts or SQL/JSON dumps to load the class data into the hosted databases?
7. Should the repos be public on Jon's GitHub (linked from the cards), or live demos only?
8. A one-line description per app: what students build or learn with it.

Likely shape (to confirm): create the hosted DBs → load schema + sample data → set env vars in Vercel → deploy each app → add cards with live links → optional tie-in with the Cyber Lab terminal or the backlog's live SQL sandbox.

## 5. Backlog (suggested, nothing promised)

- **Flagship project:** live SQL sandbox. Visitors run read-only SELECTs against a sample DB (read-only role, 2 s timeout, row cap). 1–2 days, own project.
- **README drafts** for Barbershop, Bean's Place and WBC are in `inspiration/readme-drafts/` (live links filled in). Jon approved writing them, not pushing. Ask before pushing. WBC needs his team's OK.
- Suggestions given, not done: pin best repos on GitHub, add repo descriptions, move Barbershop's study notes out of `js/main.js` into `NOTES.md`, fix Bean's Place sideways scroll at desktop width, split its large JS bundle.

## 6. Gotchas (save yourself the rediscovery)

- **Local preview:** `npx kill-port 3123; GITHUB_TOKEN=$(gh auth token) npm run build && GITHUB_TOKEN=$(gh auth token) npx next start -p 3123`. The gh token is only for the local process; never write it to a file. `.env.local` is git-ignored and Claude can't read it.
- **Replaced an image in `public/` but the page shows the old one?** Delete `.next/cache/images` and restart. Playwright's browser also caches, so use a fresh context.
- **Playwright:** `waitUntil: 'networkidle'` never settles (the video streams); use `'load'`. Hover tests are flaky because Jon's real mouse is over the headed window; force hover states by adding a class plus CSS vars instead. Screenshots must go under `.playwright-mcp/` (git-ignored).
- **Build warning** "Failed to find font override values for Big Shoulders" is harmless (no metrics for that font).
- **Tests:** `node --test src/lib/github.test.ts` (tsconfig has `allowImportingTsExtensions` for this).
- **Design checker:** `"C:/Users/follo/.claude/plugins/cache/impeccable/impeccable/4.8.0/skills/impeccable/scripts/impeccable" detect --json src/components src/app src/styles`. Run after each stage; it was `[]` through Stage 3.
- `inspiration/READ FIRST.docx` may be open in Word (locked). Copy it to the scratchpad to read it.
- **Background removal tool:** rembg + BiRefNet model (~1 GB) cached at `~/.rembg`. The scratch venv is gone next session; reinstall with `pip install "rembg[cpu]"` only if a new cut-out is needed.
- **Portrait rim light** (`home/Portrait.tsx`): `mask-image: url(cutout), url(cutout)` with `mask-composite: subtract` and positions `shift, 0` draws a band OUTSIDE the outline (Jon's choice); `0, shift` draws it inside. The matte has a ~3px soft alpha fringe, and the right arm touches the image box, so the glow layer needs the 12px `BLEED` box or it gets clipped flat.
- **Testing the live contact form sends a real email** to Jon. Use an empty body (`{}`) for checks; only send a real one when he asks.
- `graphify-out/` is stale (built from the old void site). Don't use it for this work.

## 7. Skills to invoke next session

- `impeccable:impeccable` before any UI edit (it runs `impeccable context`; read `reference/craft-floor.md` before editing).
- `superpowers:verification-before-completion` before saying a stage is done.
- At Stage 6: the `impeccable:impeccable-finish-reviewer` and `impeccable:impeccable-documenter` agents, plus `ui-craft:a11y-auditor`.
