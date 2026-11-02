# Portfolio rebuild plan

**Paused 2026-11-02. Resume here.** Everything below is decided; the next step is writing the build plan.

## Where we are

| Step | Status |
|---|---|
| Inspiration docs read (`inspiration/READ FIRST.docx`, `Website Inspiration.docx`) | done |
| Lead design skill | done: **Impeccable** leads; taste-skill, antislop, ui-craft, frontend-design, ui-ux-pro-max only check its work |
| Background video | done: `inspiration/higgsfield/loop-1793637133938.mp4` (Jon likes it) |
| Home layout | done: **B. Horizon, with A's big name** |
| Resume, certs, career facts | done (in `PRODUCT.md`) |
| Build plan | **NEXT** (~15 min): write with superpowers:writing-plans, Jon approves |
| Build, finish review, DESIGN.md | after plan approval |

## Decisions (Jon, 2026-11-02)

- **Look:** dark sci-fi, palette from Dribbble shot 1: ground `#030306`, blue `#092659` / `#0252AC`, red `#D31816` / `#591E28`, text `#F6F6F6` / `#A6A9AF` / `#8994B4`. Old green `#4ade80` and "clean minimal" look are dropped.
- **Pages:** Home, Projects, Biography, Cyber Lab, Contact — each its own page. No scroll-of-doom home page.
- **Home (Horizon):** the video's particle wave is the floor at ~59% height; giant condensed-caps name top left (~240px, second line dips into the wave); Jon's photo (`public/portfolio-picture.png`) lit blue one side, red the other, rising from the horizon; one typed line with red cursor; 4 glass doors (Projects / Biography / Cyber Lab / Contact) on the horizon, tilting slightly to the pointer; live GitHub strip at the bottom. Contract: `.impeccable/surfaces/src-app-site-page-tsx.md`. Sketch: `.impeccable/mocks/decision/horizon.html`.
- **Video at build:** crossfade the last second into the first (clip doesn't loop cleanly), ~1 MB phone version, poster image, still frame under reduced motion. Regenerate with `node --env-file=.env.local scripts/higgsfield-video.mjs` (key lives in `.env.local`, git-ignored).
- **Projects:** glass cards with short description, tilt toward the mouse (small angle, off on phones and reduced motion). Must look complete with 1–2 projects. Jon needs help getting other projects onto Vercel later.
- **Backend (both):** contact form API route sending through Resend to jon.masropian@gmail.com (validation, rate limit, spam guard) + live GitHub activity panel from a server route.
- **Cyber Lab:** keep the terminal; it types real PostgreSQL that isn't connected to anything (display only).
- **Certifications:** 7 cards with a hover effect (tilt + light). Images: render from the PDFs (`inspiration/ERA Certs/*.pdf`, `inspiration/Jon Masropian CompTIA Security+ ce certificate.pdf`); Era Academy has no file yet → text card.
- **Copy:** no AI slop. Typed line and fonts are still drafts — bring Jon options before building.
- **Links:** github.com/jonmasropian · linkedin.com/in/jon-masropian-9607223a7. No phone number anywhere.
- **Smoothness** on desktop, laptop and phone is top priority.

## Still open

- Typed-line copy (draft: "Software engineer. 22 years keeping Army networks up.").
- Display and body fonts (sketch fonts are stand-ins; avoid Geist/Inter-style defaults).
- Python cert full title (assumed "Python Professional Developer" from its badge).
- Resend account + domain/API key (Jon sets up at build time).
- Old stack cleanup: Three.js/GSAP only served the rejected void effects.
