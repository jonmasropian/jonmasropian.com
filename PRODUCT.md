# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: software engineering recruiters and hiring managers screening Jon Masropian for his next SWE role. They arrive from a résumé, LinkedIn, or job application, skim in a minute or two, and decide whether to reach out.

Secondary (side effect, not a design target): students and peers who see the site.

## Product Purpose

Personal portfolio for Jon Masropian. Its job is to get him a better software engineering role than his current apprenticeship. Success = a hiring manager leaves convinced he ships real software and contacts him.

## Positioning

A 22-year U.S. Army veteran (25H Signal Corps network engineer, Drill Sergeant 2016–2019, retired 2026) who moved into software: Security+ → Era Academy full-stack bootcamp → Desktop Analyst at Memorial Health System of Southwest Oklahoma (May–Aug 2026) → Software Developer Apprentice at ERA Solutions LLC (Sept 2026–present). The edge no other junior SWE can copy: two decades of real network/security operations and leadership behind the code. Security is a side strength, not the headline.

## Operating Context

- Viewed on desktop and phone, mostly cold, from links in applications and LinkedIn.
- Deployed on Vercel (Next.js app router).

## Capabilities and Constraints

- Sections to keep: Projects, Experience (one career timeline that merges the military history), Certifications. (The Cyber Lab terminal was removed 2026-11-08; `/cyber-lab` redirects to `/biography`.)
- Project slots must look complete with only 1–2 entries; more projects will be added later, including a planned flagship tool (separate future project).
- Public contact: email, contact form, GitHub, LinkedIn. **No phone number** anywhere public.
- Employers are named: real employer names, titles, and dates for the hospital job and the apprenticeship.
- Open decisions:
  - (resolved 2026-11-02: titles, employers and dates come from the resume in inspiration/.)
  - Real GitHub and LinkedIn URLs (current data has bare domains; `github.com/jonmasropian` was unconfirmed).
  - Contact form backend (not decided; the form currently only simulates sending).
  - Whether Skills and About sections stay.
- `src/data/portfolio.ts` is outdated (says "Full Stack Developer", job-hunting for a first dev role, omits the hospital job and apprenticeship). Treat this file as the source of truth over it.

## Brand Commitments

- Name: Jon Masropian.
- Voice: direct, plain, credible. No hacker theatrics.
- Rejected by Jon: the boot sequence, glitch/corruption/scanline/"void horror" effects, the "[SYSTEM_CORRUPTION_DETECTED]" tagline, the "Full Stack Developer" title.

## Evidence on Hand

- Projects: Warriors Blood Coffee (e-commerce platform), this portfolio site. Both lack public repo links today.
- Certifications: CompTIA Security+ ce (SY0-701), earned 1/19/2026, valid through 1/19/2029, verifiable at verify.CompTIA.org (code in the PDF); active Secret clearance (OK to show publicly); CoITB certifications (all issued 2026, valid 3 yrs): HTML/CSS Web Designer #6846 (3/7/2026), JavaScript Professional Developer #6920 (4/11/2026), ReactJS Framework Developer #7044 (5/16/2026), MySQL Backend Developer #7123 (6/13/2026), Professional Python Developer #7248 (7/25/2026); Era Academy Full Stack bootcamp completed (2/23/2026–7/25/2026). Education: Central Texas College coursework only — no degree; never claim one. Tools confirmed: Active Directory (daily), ServiceNow (SNOW) ticketing, NinjaOne monitoring/remote access.
- Photo: `public/portfolio-picture.png`.
- Absent, do not fabricate: testimonials, metrics, employer logos, client names, performance numbers.
- `public/images/*` (blog, pricing, clients, team, etc.) are template leftovers, not evidence.

## Product Principles

1. Prove he ships: real projects and real work beat claims and adjectives.
2. Veteran experience is the differentiator, framed as engineering maturity, not as a costume.
3. Calm and credible over flashy; anything that slows a recruiter's skim is cut.
4. Honest about level: apprentice now, aiming higher; no inflated titles.
5. Easy to contact in one step.
