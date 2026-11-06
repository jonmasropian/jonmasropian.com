# Portfolio rebuild: session brief

**New session: read this whole file first, then `PRODUCT.md`. Don't re-ask Jon anything answered here.**
Last updated 2026-11-06. **All 6 stages approved; merged to main and live.** Stages 1–5 committed (Stage 5 = `e8f9639`: /cyber-lab terminal, /contact via Resend (test email received), /under-the-hood API docs, /api/github + /api/contact), plus a résumé PDF download (`public/Jon-Masropian-Resume.pdf`, no phone; source + `build-resume.js` in `inspiration/resume/`). Stage 6: finish review (fixed: matte-traced rim light outside the outline, left crimson light, name masked into the wave, doors lean 6deg / 600px, CLS 0.186→0.001), a11y pass (pause-background toggle, terminal plays once + Replay, form focus/labels), DESIGN.md. **Next: connect jonmasropian.com in Vercel + verify it in Resend, then swap the contact `from` address.** Jon is retired from the Army; site and resume say so once, plainly.

## 1. Where things stand

- Repo: this folder. Branch: `rebuild/planning` (not merged, not pushed). `main` auto-deploys on Vercel, so never push to `main` without Jon's OK.
- Stack: Next.js 16 App Router, Tailwind v4 (tokens in `src/styles/tailwind.css`), React 19, lucide-react, framer-motion (installed, unused so far). All old void/glitch code and 24 unused deps were removed in Stage 1.
- Routes: `/` home, `/projects`, `/biography`, `/cyber-lab`, `/contact` under `src/app/(site)/`. Biography, Cyber Lab and Contact are still placeholder pages (`src/components/PageHeading.tsx` with a "Stage N" note).

| Stage | What shipped | Status |
|---|---|---|
| 1 Foundation | Tokens, fonts, nav (`SiteNav.tsx`, mobile full-screen menu), footer (hidden on `/`), 5 routes, persistent video backdrop (`Backdrop.tsx`, dims to 72% on inner pages) | approved, `5482b10` |
| 2 Home | Horizon layout (`src/app/(site)/page.tsx`): big name, cut-out portrait with edge rim light (`home/Portrait.tsx`), typed line (`home/TypedLine.tsx`), 4 glass doors (`home/Doors.tsx`), live GitHub strip (`home/GithubStrip.tsx` + `src/lib/github.ts`, tests in `src/lib/github.test.ts`) | approved, `b4bf264`, `00e542b` |
| 3 Projects | 3 glass cards (`projects/ProjectCard.tsx`, data in `src/data/projects.ts`): Warriors Blood Coffee (featured, full width), The Bean's Place, Barbershop Cut & Snip; screenshots in `public/projects/`; client-work line under cards | approved, committed with this brief |

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

## 4. Next: Stage 4, Biography (~1 hr after content OK)

**First action:** show Jon this content plan and get OK. Don't build before that.

Page `/biography`, Experience mode, calm, readable (65–75ch measure):
1. **Short intro** (3–4 sentences, first person, from the resume and `PRODUCT.md` Positioning). Draft it, Jon approves.
2. **One career timeline** (military merged in), newest first:
   - Software Developer Apprentice, ERA Solutions LLC, Sept 2026–present: teaches MySQL through ERA's LMS over Teams; website projects with the dev team; works with Vet Solutions 4 Life at Fort Sill bringing in students for CoITB-certified programs.
   - Desktop Analyst, Memorial Health System of Southwest Oklahoma, May–Aug 2026: account/login troubleshooting, desktop and laptop hardware/software, Windows 25H2 rollout, VPN, VoIP, imaging, surgery air/humidity monitoring; team of ~7 analysts across sites. Tools confirmed: Active Directory (daily), ServiceNow, NinjaOne. **Intune NOT confirmed; don't list it.**
   - Era Academy full-stack bootcamp: 2/23/2026–7/25/2026, completed.
   - CompTIA Security+ (SY0-701), earned 1/19/2026.
   - U.S. Army 2004–2026, IT & Network Support Supervisor / Senior Communications Technician (25H Signal Corps): tactical and garrison networks for hundreds of users, STIG/DoD policy, Tier I/II help desk, equipment accountability, trained junior Soldiers. Inside it: Drill Sergeant / Technical Training Lead 2016–2019 (2,000+ trainees); team lead of 10–30.
   - Education: Central Texas College coursework only. **No degree; never claim one.** Active Secret clearance (OK to show).
3. **Certifications: 7 glass cards** using `.glass` + `tilt`:
   - CompTIA Security+ ce: render from `inspiration/Jon Masropian CompTIA Security+ ce certificate.pdf`.
   - 5 CoITB certs: render from `inspiration/ERA Certs/*.pdf` (HTML/CSS Web Designer, JavaScript, ReactJS, MySQL, Python). Read each PDF for its exact title; Python's is "CoITB Professional Python Developer". Issue dates in `PRODUCT.md`.
   - Era Academy: no file yet, so a text-only card.
   - Rendering: PDFs → WebP. ffmpeg can't read PDF; install PyMuPDF into the scratch venv (`python -m pip install pymupdf`) or use the Read tool to view them, then export ~900px WebP to `public/certs/`.
4. **Ask Jon at the content-plan step:** (a) bootcamp dates; (b) show cert numbers/verification codes on the images, or crop them out? (Recommend showing: they let recruiters verify.)

## 5. Stage 5, Cyber Lab + backend (~1.5–2 hr)

1. **Cyber Lab terminal** (`/cyber-lab`): types real PostgreSQL queries and results on a loop. **Display only**, not connected to any database. Mono font, red cursor; reduced motion shows the final state.
2. **Contact form** (`/contact`) → API route `src/app/api/contact/route.ts` → **Resend** → jon.masropian@gmail.com. Server-side validation, honeypot field, simple rate limit, clear error and success states. Needs from Jon: a Resend account and API key, added as `RESEND_API_KEY` in Vercel and `.env.local`. Sending from `onboarding@resend.dev` works without a domain if his Resend login is that Gmail.
3. **"Under the hood" API docs page** (Jon said yes): a public page documenting the site's own routes (`/api/github`, `/api/contact`) with "try it" buttons showing real responses; add a small line to the home strip like `API · 38 ms · docs →`. Means moving the GitHub fetch behind `src/app/api/github/route.ts` too.

## 6. Stage 6, Finish (~45 min)

1. Impeccable finish review (`impeccable:impeccable-finish-reviewer` agent) against `.impeccable/surfaces/src-app-site-page-tsx.md`; fix its material findings.
2. Accessibility pass (`ui-craft:a11y-auditor`) and a phone smoothness/performance check.
3. `DESIGN.md` via `impeccable:impeccable-documenter`, including raster provenance: `public/portrait-cutout.webp` = BiRefNet-portrait matte of `public/portfolio-picture.png`; `public/video/*` = crossfaded loop of `inspiration/higgsfield/loop-1793637133938.mp4` (Higgsfield); `public/projects/*` = screenshots of the live sites.
4. Ask Jon before: merging `rebuild/planning` → `main` (goes live), and deleting the root PNGs `change-model.png`, `remove-api-key.png`, `set-api-key.png` (not mine).
5. Domain: `metadataBase` and the sitemap use `https://jonmasropian.com` (or `SITE_URL`). Jon owns it (bought through Vercel, not live yet; confirmed 2026-11-06). Connect it to the Vercel project at launch.

## 7. Post-launch backlog (suggested, nothing promised)

- **Flagship project:** live SQL sandbox. Visitors run read-only SELECTs against a sample DB (read-only role, 2 s timeout, row cap). 1–2 days, own project.
- **README drafts** for Barbershop, Bean's Place and WBC are in `inspiration/readme-drafts/` (live links filled in). Jon approved writing them, not pushing. Ask before pushing. WBC needs his team's OK.
- Suggestions given, not done: pin best repos on GitHub, add repo descriptions, move Barbershop's study notes out of `js/main.js` into `NOTES.md`, fix Bean's Place sideways scroll at desktop width, split its large JS bundle.

## 8. Gotchas (save yourself the rediscovery)

- **Local preview:** `npx kill-port 3123; GITHUB_TOKEN=$(gh auth token) npm run build && GITHUB_TOKEN=$(gh auth token) npx next start -p 3123`. The gh token is only for the local process; never write it to a file. `.env.local` is git-ignored and Claude can't read it.
- **Replaced an image in `public/` but the page shows the old one?** Delete `.next/cache/images` and restart. Playwright's browser also caches, so use a fresh context.
- **Playwright:** `waitUntil: 'networkidle'` never settles (the video streams); use `'load'`. Hover tests are flaky because Jon's real mouse is over the headed window; force hover states by adding a class plus CSS vars instead. Screenshots must go under `.playwright-mcp/` (git-ignored).
- **Build warning** "Failed to find font override values for Big Shoulders" is harmless (no metrics for that font).
- **Tests:** `node --test src/lib/github.test.ts` (tsconfig has `allowImportingTsExtensions` for this).
- **Design checker:** `"C:/Users/follo/.claude/plugins/cache/impeccable/impeccable/4.8.0/skills/impeccable/scripts/impeccable" detect --json src/components src/app src/styles`. Run after each stage; it was `[]` through Stage 3.
- `inspiration/READ FIRST.docx` may be open in Word (locked). Copy it to the scratchpad to read it.
- **Background removal tool:** rembg + BiRefNet model (~1 GB) cached at `~/.rembg`. The scratch venv is gone next session; reinstall with `pip install "rembg[cpu]"` only if a new cut-out is needed.
- `graphify-out/` is stale (built from the old void site). Don't use it for this work.

## 9. Skills to invoke next session

- `impeccable:impeccable` before any UI edit (it runs `impeccable context`; read `reference/craft-floor.md` before editing).
- `superpowers:verification-before-completion` before saying a stage is done.
- At Stage 6: the `impeccable:impeccable-finish-reviewer` and `impeccable:impeccable-documenter` agents, plus `ui-craft:a11y-auditor`.
