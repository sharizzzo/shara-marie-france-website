# Design System — Shara Marie-France, Organizational Advisor

**Status:** Implemented on `index.html` and propagated (styling only — original content/copy-pending status preserved) to `services.html`, `insights.html`, `about.html`, and `work-with-me.html`.
**Last updated:** 2026-08-27
**Source of truth for:** color, type, motion, and the two custom diagram treatments (Framework, How I Work). Content and information architecture are out of scope for this file.

Brand direction: intellectually credible, insightful, editorial, sophisticated, accessible, contemporary, slightly unconventional, warm rather than corporate, authoritative without feeling institutional. Explicitly avoiding: traditional consulting-firm, government, nonprofit-template, tech-startup, or luxury-lifestyle aesthetics.

All tokens below live in `css/styles.css`. Every page should link `css/styles.css` and the same Google Fonts `<link>` (see Typography) — do not hardcode hex values or font names in page markup; reference the CSS custom properties.

---

## 1. Color

Client-supplied five-color brand palette. Use approximately 40–50% parchment/light neutrals, 25–30% aubergine, 10–15% clear blue, 5–10% ochre, brown-black as needed for text. **Do not use all five colors with equal weight** — aubergine establishes identity, parchment creates space, ochre attracts attention (sparingly), blue clarifies/organizes, brown-black maintains readability.

| Token | Hex | Role |
|---|---|---|
| `--color-brand-primary` | `#392A42` (Aubergine) | Identity/structure/authority: headings, nav logo, primary buttons, primary-CTA sections, card headings |
| `--color-brand-primary-hover` | `#2C2033` | Aubergine hover/press state |
| `--color-brand-primary-tint` | `#EFEAF0` | Pale aubergine wash — secondary-button hover fill |
| `--color-brand-accent` | `#D5A437` (Ochre) | Insight/emphasis — fills, borders, decorative marks, accent-CTA buttons. **Never** used as small body-sized text on parchment (fails contrast, ~2:1) |
| `--color-brand-accent-hover` | `#BE9130` | Ochre hover |
| `--color-brand-accent-text` | `#8A651F` | Darkened ochre — the **only** ochre-family color safe as small text on parchment (verified 4.7:1). Used for eyebrows, section numbers, the "Gap"/"Intervention" framework tags |
| `--color-brand-secondary` | `#4976A8` (Clear Blue) | Informational/secondary — diagram lines/fills, large text, non-text UI (verified 4.2:1, fine for large text/graphics, not small text) |
| `--color-brand-secondary-hover` | `#3B5F89` | Blue hover |
| `--color-brand-secondary-text` | `#3D6690` | Darkened blue — safe as link/small-text color on parchment (verified 5.3:1) |
| `--color-brand-secondary-on-dark` | `#8FB2D4` | Lightened blue — the only blue safe on an aubergine background (verified 5.9:1). True blue-on-aubergine fails at 2.8:1 — never use `--color-brand-secondary` as text/fine detail on aubergine |
| `--color-background` | `#F6F1E8` (Parchment) | Default page background everywhere, replacing pure white |
| `--color-background-tint` | `#EFE8DD` | Subtle aubergine-leaning tint — alternate section background (Gap, Framework sections) |
| `--color-background-tint-cool` | `#E9EEF2` | Subtle blue-leaning tint — defined, not yet used; reserve for a future section needing visual variety |
| `--color-text` | `#302C2A` (Deep Brown-Black) | Body copy, dark neutral. Prefer over pure black everywhere |
| `--color-text-muted` | `color-mix(text 68%, transparent)` | De-emphasized body copy (hero subhead, step descriptions) |
| `--color-surface` | `#FBF8F2` | Card background — a hair lighter than parchment, for subtle lift |
| `--color-border` | `color-mix(primary 22%, transparent)` | Default hairline border/divider (card borders, section rules) |
| `--color-border-strong` | `color-mix(primary 38%, transparent)` | Stronger divider (connector arrows, secondary-button border interactions) |
| `--focus-ring` | = `--color-brand-primary`, flipped to `--color-background` inside `.on-dark` | Keyboard focus outline; always contrasts regardless of section background |

**Accessibility pairings verified (WCAG AA, contrast ratios computed, not assumed):**
- Aubergine/parchment text: 11.8:1. Brown-black/parchment: 12.3:1. ✅ Excellent everywhere.
- Ochre-on-parchment (text): 2.0:1 ❌ — use `--color-brand-accent-text` instead (4.7:1 ✅).
- Ochre-with-white-text (button): 2.3:1 ❌ — accent-CTA buttons always use `--color-text` (brown-black) on ochre (6.1:1 ✅).
- Blue-on-aubergine (text): 2.8:1 ❌ — never place `--color-brand-secondary` text directly on an aubergine background; use `--color-brand-secondary-on-dark` if a blue diagram element must sit there (5.9:1 ✅).
- Blue-on-parchment small text: 4.2:1 (borderline) — use `--color-brand-secondary-text` for links/small text (5.3:1 ✅); true blue is fine for large text, diagram lines, and non-text UI (≥3:1 requirement).
- Parchment-on-aubergine: 11.8:1 ✅ — the standard treatment for dark sections (closing CTA, flagship offer card).

**Diagram-specific accents** (layered on top of the palette above, not a replacement — used only within the Framework and How I Work diagrams):

| Token | Hex | Used for |
|---|---|---|
| `--diagram-rose` | `#BF827B` | Community Experience card / Understand step |
| `--diagram-blue` | `#5474A1` | Organization Intention card / Diagnose step |
| `--diagram-ochre` | `#CB8E29` | The Gap card |
| `--diagram-aubergine` | `#362141` | Intervention card |
| `--diagram-olive` | `#747967` | Outcome card |

These five were sampled directly (mode color in an annulus, avoiding icon strokes/background) from a client-provided reference image, not eyeballed. The How I Work section reuses only the first three (rose/blue/ochre) for its 01/02/03 steps.

**Legacy aliases:** `--color-ink`, `--color-paper`, `--color-tint`, `--color-card`, `--color-bg`, `--color-cream`, `--color-purple`, `--color-violet`, `--color-accent`, `--color-vermilion`, `--color-coral`, `--color-divider` all still resolve (mapped to the token matching their original *functional role*, not their old hue) — pre-existing inline styles elsewhere in the codebase keep working, but **write new markup against the `--color-brand-*` / `--color-background` / `--color-text` names directly**, not the aliases.

---

## 2. Typography

Four-role editorial system. **Use selectively — not every heading should look the same.** Google Fonts link (put in every page's `<head>`, after the `preconnect` tags):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Public+Sans:wght@400;500;600;700;800&family=Source+Serif+4:ital,wght@1,400;1,500;1,600&display=swap">
```

| Token | Font | Role | Weight(s) used |
|---|---|---|---|
| `--font-display` | Public Sans | **Ideas, problems, diagnoses.** Default for all headings (h1–h6), major statements | 700 (h2–h6 default), 800 (hero h1, lede statement) |
| `--font-body` | Public Sans | **Explanation, navigation, buttons, UI.** Body copy, nav links, button labels | 400 (body), 600 (buttons, `.btn` default) |
| `--font-editorial` | Source Serif 4, *italic only* | **Human experience, questions, reflection, quotes.** Applied via the `.editorial` class | 500 |
| `--font-mono` | IBM Plex Mono | **Systems, processes, frameworks, annotations.** Applied via `.mono` / `.eyebrow--mono` / inline on numbers and step tags | 500–600 |

**Where each role is actually used on `index.html`** (the pattern to follow when extending to other pages):
- **Bold sans (default h1–h6):** hero H1, all section H2s, card H4 titles, the hero's "Turning community insight..." statement.
- **Editorial italic (`.editorial` class):** only on content that is literally a question, a quotation, or a reflective/human statement — the Gap section's closing consequence line, all 5 Framework questions, About's "I see organizations from both sides.", the closing CTA's question headline, the iceberg card questions ("What is happening?" etc.). **Never** apply `.editorial` to a whole paragraph of body copy or as a default heading style.
- **Mono (`.mono` / `.eyebrow--mono` / inline):** eyebrows on *systemic* sections only (The Gap, How I Work, Framework — **not** About Me or the hero eyebrow, which stay regular Public Sans since they're personal, not systemic); all numbered markers (card numbers 01–04, step numbers 1–3/01–05); the Framework's five step tags (Experience/Organization/Gap/Intervention/Outcome — note Gap and Intervention render in `--color-brand-accent-text` instead of aubergine, flagging them as the friction/action points); diagram annotation text (ORGANIZATION/COMMUNITY/ALIGNMENT labels).
- **Regular/Medium sans:** everything else — body paragraphs, nav, buttons, links, diagram sub-captions, step-card descriptions.

**Type scale** (font-agnostic em/clamp values): `--fs-hero` (36–56px, `clamp(2.25rem, 1.5rem + 2.3vw, 3.5rem)` — narrowed from 44–72px on 2026-08-27 so "Shara Marie-France" fits on one line at its own hero size instead of wrapping), `--fs-h2` (32–44px), `--fs-h3` (26px), `--fs-lede` (21px), `--fs-body` (17px), `--fs-label` (13px). Below the 700px mobile breakpoint, `--fs-hero` is overridden again to a flat `29px` (see §7) — the clamp's own 36px floor was still ~45px wider than the space available beside the hero logo at ordinary phone widths.

---

## 3. Motion

Single shared mechanism, defined in `js/main.js` + the `.reveal`/`.load-in` CSS classes. **Do not introduce a second animation system** — extend this one.

- **Scroll reveal:** any element with `class="reveal" data-reveal` starts at `opacity:0; transform: translateY(28px)`, and gets `.is-visible` (→ `opacity:1; transform:none`, 600ms ease-out) added by a single `IntersectionObserver` once it crosses `rootMargin: '0px 0px -30% 0px'` (roughly the upper-middle of the viewport). The observer unobserves each element after it fires — reveals never re-hide on scroll-back. Add `--reveal-index` (integer) + wrap in `.reveal-group` for elements that appear together (e.g. a card row) and need a staggered `90ms`-per-index delay instead of firing simultaneously.
- **Hero load-in:** `class="load-in"` + `--load-index` (integer) staggers a `translateY(18px)→0` fade-up via pure CSS `@keyframes`, gated by `@media (prefers-reduced-motion: no-preference)` so it's skipped entirely otherwise.
- **Buttons:** `.btn:hover` lifts 2px with a soft shadow; `.btn-primary:hover` adds an inset ochre stripe at the bottom.
- **Cards:** `.card:hover` lifts 3px, border darkens slightly, shadow deepens a touch. Deliberately restrained — no heavy shadow, no large lift (avoid reading as a "floating SaaS card").
- **`prefers-reduced-motion: reduce`** is respected everywhere: all `.reveal` elements show at full opacity/no transform immediately, all transitions are disabled, the two diagrams' path-draw-in animations resolve instantly to their final state.

---

## 4. Components

- **Buttons** — `.btn` base (inline-flex, sized to content, `white-space:nowrap`) + one modifier. **Color rule (as of 2026-08-27): ochre/yellow is reserved exclusively for "Work With Me" — every other CTA on the site shares one consistent dark aubergine style.** Concretely:
  - `.btn-accent` — ochre fill, brown-black text. **Every "Work With Me" button, wherever it appears** (nav, hero, closing CTA), plus the flagship-offer CTA (the original donor instance of this style). Do not apply `.btn-accent` to anything else — it should read as "this is the one action that matters most on the page."
  - `.btn-primary` — aubergine fill, parchment text. The default for **every other CTA**: "Learn about the Alignment Review," "Learn More about the Gaps," "Learn more about the Framework," "More About Me," and any future secondary/tertiary calls to action.
  - `.btn-secondary` — transparent fill, aubergine border + text, pale-aubergine hover fill. Still defined in CSS but **not currently used anywhere on `index.html`** after this change — available if a genuinely lower-emphasis, non-`.btn-primary` CTA is needed later, but don't reach for it by default.
- **Cards** — `.card` (surface bg, 1px aubergine-tinted border, minimal shadow) is the shared surface for every card-like module. Compose with layout-only classes (`.fw-card`, `.fw-row`) rather than duplicating background/border/shadow per instance.
- **Eyebrow** — `.eyebrow` (ochre-text label + bright-ochre decorative dash) is the default; add `.eyebrow--mono` for systemic sections (see Typography above).
- **Nav** — `.nav-link` gets an animated blue underline sweep + blue text on hover/`[aria-current="page"]`. `.btn-primary[aria-current="page"]` (the "Work With Me" nav button) darkens instead.

---

## 5. The two custom diagrams

Both were built from client-supplied reference images (concept/layout only, not literal styling) and share one visual grammar: colored icon-circle cards (`.card.fw-row`, `.fw-card-icon`, `.fw-card-title`, `.fw-row-number`, `.fw-card-question`) connected by small dashed arrows (`.fw-connector-dash`), all built from plain inline SVG (no icon library).

- **Framework section** (`#framework`): two top cards ("Community Experience" / "Organization Intention") in a `.fw-top-grid`, converging via an SVG merge-connector into three sequential `.fw-row` cards (03 Gap / 04 Intervention / 05 Outcome). Icon circles use the five `--diagram-*` colors. Stacks to one column under 700px (`.fw-connector-merge--mobile` swaps in a simple straight arrow).
- **How I Work section** (`#help`, eyebrow "How I Work"): a flat two-tone iceberg (SVG polygons — `--color-brand-secondary-on-dark` above the waterline, `--color-brand-primary` below it, no gradients/photorealism), beside a vertical 3-step sequence (01 Understand / 02 Diagnose / 03 Change) reusing the exact `.fw-row` card styling and the first three diagram colors. At desktop, `.iceberg-panel` and `.how-i-work-steps` are stretched to share one row height (`.how-i-work-grid { align-items: stretch }`), and the iceberg's SVG is drawn against a fractional `viewBox` (`preserveAspectRatio="none"`, coordinates as 0–1000 = 0–100% of the row) so the peak/waterline/base land at exact, predictable points of that row instead of being auto-centered — currently peak at 0%, waterline at 29.7% (level with the gap between step cards 1 and 2), base at 95% (a small gap above step 3's bottom). The "Above/Below the Surface" labels are each independently centered (via `.iceberg-label--above`/`--below`, `position: absolute; top: 15%/62%`) against their own zone of the graphic rather than stacked as a column. **This whole pairing depends on the panel being externally stretched** — it collapses/overlaps if the panel isn't given a definite height by its layout context, which is exactly what happens at the single-column mobile breakpoint (see §7), so `.iceberg-labels`/`.iceberg-label` fall back to plain stacked flow there.

Both diagrams' cards use the standard `.reveal` fade-in, each firing independently as it scrolls into view.

---

## 6. Known constraints / things to watch

- **No git repository existed for most of this project's history** — initialized partway through (see repo log for what's tracked from that point forward).
- The browser preview tool used during this session had a recurring scroll-position/viewport-size drift and stale-frame bug — if something looks visually wrong in a screenshot, re-verify against live DOM state before assuming a code defect. Two specific traps found on 2026-08-27, worth checking first:
  - `window.innerWidth` and `window.scrollY` can drift from the real viewport — trust `document.documentElement.clientWidth` instead.
  - An element's own `.getClientRects()` can under-report line-wrap count on a wrapped inline box. To check whether text is genuinely wrapping, measure a `Range` over its contents (`range.selectNodeContents(el); range.getClientRects()`) instead, or build a detached, unconstrained `<span>` with the same font/letter-spacing and compare its width to the available space.

---

## 7. Mobile / responsive patterns (added 2026-08-27)

Most of `index.html`'s section layouts were built and tuned at desktop width without an explicit mobile fallback, which had let two classes of bug slip in silently. Both are now fixed on every section below `@media (max-width: 700px)`, and **both apply to any new multi-column layout added to this page or ported to the other pages**:

- **Grid tracks need `minmax(0, ...)`, not just `1fr`.** A track defined as `1fr`, `1.15fr`, or `repeat(2, 1fr)` cannot shrink a grid item below its *content's* min-content width (CSS Grid's automatic minimum size) — a wide button row, a long unbroken heading word, or a full-bleed image can silently force the whole page to overflow horizontally at narrow widths even though nothing individually looks broken. Always write grid tracks that need to shrink as `minmax(0, 1fr)` (or `minmax(0, 1.3fr)` etc.) — this was retrofitted onto the hero grid, `#about`'s photo/text grid, and the Gap section's 4-card grid. Note this only fixes the *track*; if the same rule is set again in a later cascade layer (e.g. a mobile override), an inline `style=""` base declaration still wins over a stylesheet class unless the override adds `!important` — every mobile grid override in `css/styles.css` uses it for this reason.
- **Every section with a 2-column (or wider) grid/flex layout needs an explicit single-column mobile fallback** — it will not happen automatically. `.hero-grid`, `.about-grid`, `.gap-grid`, and `.review-card` (the Alignment Review callout, which also had a hardcoded `width: 600px` panel) all stack to one column under 700px now, with borders that ran between columns (e.g. `border-right`) swapped to `border-bottom`.
- **Full-bleed images now sit inside the same 48px inset used everywhere else**, rather than touching the viewport edge. Both the hero portrait and the About photo are wrapped in a `.hero-photo-wrap` / `.about-photo-wrap` div carrying the inset as one-sided padding (`padding-right: 48px` / `padding-left: 48px`) plus `height: 100%` so the `<img>` (`width:100%; height:100%; object-fit:cover`) still fills its cropped area edge-to-edge with no letterboxing. Below 700px the inset becomes symmetric (`padding: 0 24px`) since the image is full-width there instead of sharing a row with text.
- **CTA button labels can wrap on mobile.** `.btn` is `white-space: nowrap` by default (intentional, so short labels like "Work With Me" never break oddly), but longer labels ("Learn about the Alignment Review") no longer fit a narrow padded column at that behavior. Below 700px, `.btn` switches to `white-space: normal; text-align: center`.
- **Headings get `overflow-wrap: break-word` below 700px** as a last-resort safety net — a single long word (e.g. "organizations", "Organizational–Community") in a large heading can be wider than a narrow mobile column on its own, which normal word-wrapping can't fix since it only breaks between words.
- **The header nav needs its own mobile fallback too** — `.site-header`/`.site-nav` (both classes required on the `<header>`/`<nav>` elements, not just present in the markup for styling hooks) wrap onto multiple rows and tighten their gap below 700px; without both classes present the 5-item nav row silently forces page-wide horizontal overflow exactly like an un-fallback'd content grid does.
- **Absolutely-positioned content doesn't count toward its parent's intrinsic size** — the How I Work iceberg labels (`.iceberg-label--above/--below`) learned this the hard way: pulling them out of flow to position them independently meant `.iceberg-labels` (and so `.iceberg-panel`) had nothing left to size itself by once external stretch wasn't in play (i.e. at the mobile single-column breakpoint), collapsing the row to near-zero height and overlapping the two labels. Any layout using `position: absolute` for precise placement needs either a parent with a guaranteed definite height (stretch from an ancestor flex/grid row) or an explicit mobile fallback that returns the children to normal flow — don't assume the parent will size itself sensibly.
- **Generic multi-column patterns are meant to be reused, not re-derived per page.** `.gap-grid` (2-up card grid → 1-up under 700px, `minmax(0, 1fr)` track) and `.card` (surface/border/shadow) aren't scoped to the Gap section specifically — `work-with-me.html`'s two-option layout reuses both directly rather than defining a near-duplicate class.

---

## 8. Propagation to the other four pages (2026-08-27)

`services.html`, `insights.html`, `about.html`, and `work-with-me.html` now all link the same fonts/stylesheet and share `index.html`'s exact header/footer markup (including the `.site-header`/`.site-nav` classes — required, see §7). This was a **styling-only** pass — no content, copy, or draft/`noindex` status changed on any of the four pages.

- **`services.html` / `insights.html` / `about.html`** are still placeholder shells (`<!-- PLACEHOLDER — awaiting copy -->`, "Copy pending."). Each is just a bare `<h1>` (sized `--fs-h2`, relying on the global h1–h6 rule for weight/color/family) + a muted note paragraph (`--fs-body`, `--color-text-muted`), inside `.container.container--narrow` with generous page-intro padding (`120px 48px 200px`, `max-width: 900px`). Note `.container`/`.container--narrow`/`.section`/`.lede` are **not** defined anywhere in `css/styles.css` — they're inert class names carried over from the pre-v5 codebase, styled entirely by the inline `style=""` alongside them (matching how every other page in this system works). Don't assume they do anything on their own.
- **`work-with-me.html`** keeps its real content and functionality untouched (discovery-call link `href="#"`, inquiry form `action="#" method="POST"`, both still explicit placeholders per their `<!-- TODO -->` comments) — only every hardcoded color/font (`Work Sans`, `Trebuchet MS`, `#FFFDF7`, `var(--color-vermilion)`, etc.) and the vestigial inline `.btn` overrides (leftover from the old `.btn { width: 100% }` bug, already fixed at the class level — see the button system history) were replaced with current tokens/classes. Its two-option grid reuses `.gap-grid` + `.card` directly (see §7's last point) rather than introducing page-specific layout classes. The "Option 1"/"Option 2" labels use `--color-brand-accent-text` (not raw `--color-brand-accent`) since they're small text on a card surface — same AA-contrast rule as the eyebrows and card numbers elsewhere.
