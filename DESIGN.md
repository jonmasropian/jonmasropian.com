---
name: Jon Masropian
description: Portfolio of a 22-year Army network veteran turned software developer apprentice, set on a living particle horizon.
colors:
  ground: "#030306"
  navy: "#092659"
  cobalt: "#0252ac"
  signal: "#5aa0ff"
  crimson: "#d31816"
  wine: "#591e28"
  alert: "#ff8a85"
  ink: "#f6f6f6"
  muted: "#a6a9af"
  dim: "#8994b4"
  hairline: "rgb(137 148 180 / 0.24)"
typography:
  display-hero:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "min(15vw, 25dvh)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.01em"
  display:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(4rem, 12vw, 10rem)"
    fontWeight: 800
    lineHeight: 0.85
  headline:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.9
  title:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.33
  lead:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2.4dvh, 1.375rem)"
    fontWeight: 300
    lineHeight: 1.375
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "0.08em"
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "2px"
  field: "12px"
  door-phone: "16px"
  panel: "18px"
  full: "999px"
spacing:
  gutter-phone: "20px"
  gutter-desktop: "64px"
  door-gap-phone: "12px"
  door-gap-desktop: "18px"
  panel-pad-phone: "20px"
  panel-pad-desktop: "28px"
  panel-pad-featured: "40px"
  container: "1440px"
components:
  pill:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.55rem 1.25rem"
  button-outline:
    textColor: "{colors.signal}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "12px 16px"
  button-outline-hover:
    textColor: "{colors.ink}"
  glass-panel:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad-desktop}"
  door:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "1.4rem"
    height: "clamp(7rem, 16dvh, 9.5rem)"
  input-field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  chip-stack:
    textColor: "{colors.dim}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  tag-status:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  nav-link:
    textColor: "{colors.muted}"
  nav-link-active:
    textColor: "{colors.ink}"
  terminal:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.panel}"
---

# Design System: Jon Masropian

## Overview

**Creative North Star: "The Horizon Floor"**

The page stands on a particle horizon. A looping, generated particle wave crosses the viewport at about 59% height, and everything on the home screen is placed against that line: Jon's name sinks into the wave, his rim-lit portrait rises out of it, and four dark glass doors rest on it, tilted back as if lying on the plane. The world is near-black and lit from two sides: navy and cobalt from the right, crimson and wine from the left. Text is close-white with two quieter greys.

Inner pages (Projects, Biography, Cyber Lab, Contact, Under the hood) share the same world in a calmer reading mode. The horizon video keeps running behind them but is dimmed under a 72% ground veil, and the crimson ambient light drops to 30%. Density is low: one huge condensed-caps heading per page, then glass panels on a 1440px column.

The voice is plain and credible, never theatrical. Jon has rejected boot sequences, glitch, corruption, scanline and "void horror" effects (PRODUCT.md), so the sci-fi stays in the light and the material, never in the copy or in fake system noise.

**Key Characteristics:**
- Near-black ground lit from two sides (cool right, warm left), never flat.
- Condensed heavy caps for one heading per page; Plex Sans for reading; Plex Mono for every label and data value.
- Dark tinted glass with 1px hairline borders and a cursor light that follows the pointer.
- One gradient-edged pill, reserved for the contact action.
- One authored motion moment per page (typed line, terminal replay); everything else is quiet state transitions.

## Colors

A two-sided light palette on near-black: cool blues carry interaction, crimson carries warmth and the live cursor.

### Primary
- **Horizon Cobalt** (cobalt): the cool key light. Text selection background, the cobalt half of the pill's gradient rim, and the pill's glow. Never used as text on ground (fails contrast); use Signal Blue for that.
- **Signal Blue** (signal): cobalt lifted to pass contrast as text on ground. Links and live actions ("Live site", "Verify", "Replay", "Try it"), the "Live from GitHub" dot, the global focus ring, focused field borders.

### Secondary
- **Edge Crimson** (crimson): the warm edge light. The blinking typed-line and terminal cursors, input caret, the nav underline, the crimson half of the pill rim, the terminal's "Recording" dot, and status-tag borders at 50%. Small doses only.
- **Wine Shadow** (wine): the deep half of the left-side light, part of the approved palette and the video's warm falloff.

### Tertiary
- **Alert Coral** (alert): crimson lifted to pass contrast as error text on ground. Field error messages, the form's send-failure alert, failed API status codes, and invalid-field borders. Never decorative.

### Neutral
- **Night Ground** (ground): page background, theme color, field and terminal fills (at 70-85%), the inner-page veil, the pill's inner fill.
- **Deep Navy** (navy): the cool fill of glass (navy-to-ground gradient), scrollbar thumb, the certificate placeholder gradient.
- **Paper Ink** (ink): headings, titles, values in data rows, hover target for every quiet link.
- **Fog Grey** (muted): body copy, the typed line, inactive nav links.
- **Slate Dim** (dim): labels, metadata, prompts, the second line of the hero name, stack chips, resting field borders at 65% (clears 3:1 non-text contrast).
- **Hairline** (hairline): 1px borders on glass, panels, chips, dividers; rises to dim at 50% on hover/focus.

### Named Rules
**The Lifted Text Rule.** Cobalt and crimson are light sources, not text colors. When either must be read as text on ground, use its lifted twin: Signal Blue for links and actions, Alert Coral for errors.

**The Two-Sided Light Rule.** Cool light comes from the right, warm light from the left: in the backdrop, on the portrait rim, and in the pill gradient (crimson left, cobalt right). Do not flip or center it.

## Typography

**Display Font:** Big Shoulders, variable optical size (with Arial Narrow, sans-serif)
**Body Font:** IBM Plex Sans (with system-ui)
**Label/Mono Font:** IBM Plex Mono 400/500 (with ui-monospace)

**Character:** A condensed, heavy display cap reads like title-sequence lettering; Plex Sans and Plex Mono bring an engineered, documentation-grade calm underneath it.

### Hierarchy
- **Display hero** (800, min(15vw, 25dvh) desktop / 21.5vw phone, 0.84, uppercase): the home name only, two lines, second line in Slate Dim.
- **Display** (800, clamp(4rem, 12vw, 10rem), 0.85, uppercase): the single page H1 on every inner page.
- **Headline** (800, clamp(2.75rem, 6vw, 4.5rem), 0.9, uppercase): section headings within a page (e.g. Career, Certifications).
- **Title** (Plex Sans 500, 1.5rem; 1.875-2.25rem on featured cards): card and door titles, in Paper Ink.
- **Lead** (Plex Sans 300, 1.125-1.375rem, snug): the typed line under the hero name.
- **Body** (Plex Sans 400, 1rem, 1.625): summaries and prose, max 60ch, in Fog Grey.
- **Label** (Plex Mono 400, 0.75rem, 0.06-0.08em tracking, uppercase): form labels, action links, footer, GitHub strip, terminal header. Status tags drop to 11px.
- **Data** (Plex Mono 400, 12-13px, 1.6, tabular-nums): terminal output, API responses, certificate details.

### Named Rules
**The One Loud Line Rule.** Big Shoulders appears once per page as the H1, plus section headlines. It is never used for body, labels, or buttons (the mobile menu items and the certificate issuer placeholder are the only other display uses).

**The Mono Means Data Rule.** Anything that is a label, a value, a timestamp, a command or a small action link is set in Plex Mono. Prose is never mono.

## Layout

A single 1440px column with 20px gutters on phones and 64px from md (48rem) up. The home first screen is one viewport on desktop (lg, 64rem+): every element is absolutely placed against the horizon at 59% of the viewport (name bottom at 39%, typed line plus credentials line at 63%, doors from 72%, GitHub status strip at 3.5% from the bottom, portrait right of center). Below lg it becomes a short stack: name, typed line, credentials line, portrait, doors in a 2x2 grid, strip. Home then scrolls to a "Record and stack" section (three numbers and a grouped stack in a panel, over a ground veil that fades in across the horizon) and the site footer.

Inner pages start below the absolute nav (112px top padding phone, 176px md+), set the display H1, then a grid of glass panels: the first item spans full width as a featured row (image left, text right on lg), the rest sit in two columns on lg with 24px gaps (20px on phones). Section headlines get large air above them (96px phone, 128px md+). Nav and footer share the same column and gutters.

## Elevation & Depth

Depth is light and translucency, not stacked shadows. The page has three planes: the video horizon (fixed, behind), tinted glass on top of it, and content inside the glass. Glass casts one soft, long, low drop shadow so it sits on the plane; nothing else is lifted. On desktop glass gets a 12px backdrop blur; on phones it stays opaque-tinted instead, because blur over a playing video is too costly there.

### Shadow Vocabulary
- **Glass drop** (`box-shadow: 0 18px 40px -24px rgb(0 0 0 / 0.9)`): every glass panel, door, and the terminal.
- **Pill glow** (`box-shadow: 0 6px 24px -10px rgb(2 82 172 / 0.7)`, hover `0 10px 32px -10px rgb(2 82 172 / 0.95)`): the contact pill only, offset downward like light on the floor.

### Named Rules
**The Desktop-Only Blur Rule.** Backdrop blur is enabled from 64rem up only. Below that, raise the glass tint instead.

**The Cursor Light Rule.** Glass responds to the pointer with light, not lift: a 220px radial Signal Blue wash inside and a matching glow masked to the 1px edge, plus a tilt of at most 8 degrees. Mouse pointers only, and never under reduced motion.

## Shapes

Soft but firm. Panels, doors and the terminal use 18px corners (16px for doors on phones); fields use 12px; pills, chips, tags and outline buttons are fully round. Every container edge is a 1px hairline. Images clip inside their panel with a hairline divider between image and text. The portrait has no frame: it is an alpha cut-out that fades to transparent at the bottom (70% to 96%) so it rises out of the horizon.

## Components

### Buttons
- **Pill (primary):** the one gradient-edged pill. Ground fill, 1px crimson-to-cobalt gradient rim, Paper Ink text at 15px, fully round (0.55rem 1.25rem). Hover lifts 1px and the cobalt glow deepens (300ms, expo-out). Used only for the Contact action: the nav's Contact link and the contact form's submit. Busy state shows a spinner and `aria-disabled` at 70% opacity.
- **Outline (secondary):** fully round, hairline border, mono label in Signal Blue (12px 16px). Hover turns text to Ink and the border to Signal at 60%. Used for "Try it" and the résumé download.
- **Text action:** mono uppercase label with an up-right arrow icon (14px, stroke 1.75): Signal Blue for the primary link on a card, Slate Dim for the secondary; both go to Ink on hover.

### Chips
- **Stack chip:** fully round hairline outline, Plex Mono 12px in Slate Dim. Lists technologies; never interactive.
- **Status tag:** fully round, crimson border at 50%, 11px mono uppercase in Ink at 80%. Sits beside a title, never above it.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** navy-to-ground glass gradient (160deg; 72%/82% on phones, 45%/30% plus 12px blur on desktop).
- **Shadow Strategy:** Glass drop (see Elevation).
- **Border:** 1px hairline, dim at 50% on hover or when a child has focus.
- **Internal Padding:** 20px phone, 24-28px desktop, 40px on featured rows.

### Inputs / Fields
- **Style:** 12px corners, 1px Slate Dim border at 65%, ground at 70% fill, Ink text, crimson caret, 12px 16px padding. Labels above in mono uppercase.
- **Focus:** border turns Signal Blue and the global focus ring draws outside it.
- **Error:** border and message in Alert Coral; message is linked by `aria-describedby`, the first invalid field takes focus, and a send failure is a `role="alert"` line with a direct email fallback.

### Navigation
- **Desktop:** mono wordmark left (13px, 0.14em, uppercase), text links right in Plex Sans 15px Fog Grey; hover and current page go to Ink with a 1px crimson underline that draws from the left (300ms, expo-out). Contact is the pill.
- **Mobile:** 44px menu toggle; a full-screen ground-at-95% sheet with blur lists links in display caps (36px) divided by hairlines. Escape closes it and returns focus; the page behind is made inert.
- **Footer (every page, including home):** the only footer-like link block; one mono 12px row in Slate Dim: copyright, email, Pause background, Under the hood, résumé, GitHub, LinkedIn.

### Door (signature)
Glass link resting on the horizon: label-bottom layout (title in Ink, one line in Fog Grey), up-right arrow top-right that nudges out on hover. On desktop it is clamp(7rem, 16dvh, 9.5rem) tall with 1.4rem padding and rests at rotateX 10deg inside perspective 500px, so its top edge leans back onto the plane; pointer tilt adds to that rest angle.

### Terminal (signature)
A recorded psql session on the Cyber Lab: 18px panel, ground at 85% (60% plus blur on desktop), hairline header bar in mono uppercase with a crimson "Recording" dot and a Signal "Replay" action. Body is Data type with a blinking crimson block cursor; prompts in Slate Dim, output in Fog Grey. The scroll box fades its top edge over 1rem (and its right edge on phones, where wide tables scroll sideways) so clipped lines read as scrolling. A full transcript is in an `sr-only` block.

### Accessibility behaviours (part of the system)
- **Focus:** a global `:focus-visible` ring, 2px Signal Blue, 3px offset, 2px radius, on everything. Glass lights its cursor glow on keyboard focus too.
- **Reduced motion:** global transitions and animations collapse to 0.01ms; the background video is paused on its poster; the typed line and the terminal render their final state at once; pointer tilt is off.
- **Pause background:** a "Pause background" / "Play background" toggle (`aria-pressed`) in the site footer stores the visitor's choice in localStorage and pauses the video site-wide (WCAG 2.2.2). It hides itself when the OS already requests reduced motion.
- **Error text** always uses Alert Coral, never raw crimson.
- **New tabs:** every `target="_blank"` link carries an `sr-only` "(opens in a new tab)" notice. Decorative icons are `aria-hidden`.
- **Layout stability:** the typed line reserves its final height with an invisible copy, so typing never shifts layout.
- A skip link to `#main` appears on focus.

## Do's and Don'ts

### Do:
- **Do** place home elements against the horizon at 59% of the viewport, and keep the video top-anchored at 118% height so the wave stays there.
- **Do** use Signal Blue for links and actions and Alert Coral for errors (The Lifted Text Rule).
- **Do** keep warm light on the left and cool light on the right (The Two-Sided Light Rule).
- **Do** build every container as glass with a 1px hairline and 18px corners; enable blur only from 64rem.
- **Do** set labels, metadata and data in Plex Mono uppercase at 12px with 0.06-0.08em tracking.
- **Do** give every motion a reduced-motion final state and respect the Pause background choice.
- **Do** use expo-out easing (cubic-bezier(0.16, 1, 0.3, 1)) for state transitions: 150ms to follow, 300ms to settle, 500ms for tilt, 700ms for backdrop changes between routes.

### Don't:
- **Don't** add a second gradient-edged pill; it belongs to the Contact action alone.
- **Don't** put eyebrow or kicker labels above headings, or number sections; status tags go beside titles.
- **Don't** use zero-offset colored glow halos; light is offset downward or masked to an edge.
- **Don't** use glitch, scanline, corruption or boot-sequence effects, or hacker-theatre copy.
- **Don't** set cobalt or crimson as body or link text on ground.
- **Don't** tilt glass more than 8 degrees, or tilt for touch pointers.

## Raster Provenance

Every shipping raster and its source:

- `public/portrait-cutout.webp`: BiRefNet-portrait alpha matte (rembg) of `public/portfolio-picture.png`, Jon's own photo. The rim light is traced from this matte in CSS, not painted into the image.
- `public/video/horizon-854.mp4`, `public/video/horizon-1280.mp4`, `public/video/horizon-poster.webp`: crossfaded loop and poster made from `inspiration/higgsfield/loop-1793637133938.mp4`, generated with Higgsfield through the official API (`scripts/higgsfield-video.mjs`).
- `public/projects/wbc.webp`, `beans.webp`, `barber.webp`: screenshots of the live project sites (warriors-blood-coffee.vercel.app, the-beans-place-masropian.vercel.app, barbershop-cut-and-snip.vercel.app).
- `public/certs/secplus.webp`, `coitb-html-css.webp`, `coitb-javascript.webp`, `coitb-react.webp`, `coitb-mysql.webp`, `coitb-python.webp`: rendered with PyMuPDF from Jon's certificate PDFs in `inspiration/` (CompTIA Security+ ce and five CoITB certificates).
- `public/Jon-Masropian-Resume.pdf`: Word export of the no-phone résumé built by `inspiration/resume/build-resume.js`.
