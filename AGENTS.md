# AGENTS.md — sanukhan.dev Portfolio Design & Engineering System

> **Status:** Implementation specification / source-of-truth for AI coding agents  
> **Project:** [sanukhan.dev](https://www.sanukhan.dev/)  
> **Stack:** Next.js + TypeScript; retain the existing router, styling solution, content source, and deployment workflow unless a documented requirement justifies changing them.  
> **Visual inspiration:** [Pamidor Design](https://pamidordesign.co/) — inspiration for editorial rhythm, composition, pacing and typographic confidence, **not** a component library or a design to reproduce verbatim.  
> **Document version:** 1.0 — 2026-10-14  
> **Primary locales:** English (`en`, LTR) and Arabic (`ar`, RTL), when corresponding routes and translated content are actually published.  
> **Canonical origin:** `https://www.sanukhan.dev` (confirm current production redirect/canonical policy in the repo before deployment).

---

## 1. Agent mission

Redesign the personal portfolio into an editorial, premium, fast, accessible, search-friendly engineering portfolio. The work must communicate credible software engineering, solution architecture and product delivery—not imply that the portfolio owner is a graphic-design studio.

### Desired qualities

1. **Confident editorial design:** large headlines, deliberately asymmetrical grids, generous space, strong crop choices, clear information hierarchy.
2. **Engineering credibility:** the work and measurable contributions—not decorative effects—are the main proof of ability.
3. **A coherent, strict visual system:** blunt orange, warm ivory and soft black anchor all pages; typography is the main personality.
4. **True bilingual quality:** Arabic is designed and typeset natively, not merely mirrored or machine-translated on the client.
5. **Mobile-first resilience:** a usable, legible, compelling 320px experience precedes desktop embellishment.
6. **Search-ready and fast:** semantic, server-rendered content, real page metadata, indexable project/articles, stable layout, Core Web Vitals.
7. **Maintainability:** tokens, typed content, reusable components and tests. No unnecessary libraries or fragile visual hacks.

### Non-negotiable instructions for agents

- **Inspect before editing:** read `package.json`, existing route tree, styling setup, SEO implementation, tests, content models, image inventory, deployment configuration and any nested `AGENTS.md` files.
- **Preserve working URLs and content:** never remove or silently rename existing routes, articles, project slugs, structured data, analytics or canonical rules. Create a redirect map if a URL must change.
- **Do not invent claims:** no fabricated client work, metrics, endorsements, certifications, screenshots, employers or testimonials. Use verified repository/CMS content only.
- **Do not clone Pamidor:** borrow visual principles; never copy source code, artwork, imagery, text, logo, illustrations or proprietary animations.
- **Do not redesign blindly:** audit the current page inventory and reusable assets. Work incrementally, showing what changed and why.
- **No unlicensed font assets:** Klaxon requires verifying the exact font family, font files and appropriate logo/web usage rights before embedding or outlining it.
- **Keep meaningful content server-rendered:** do not render SEO-critical content exclusively in client effects, canvases, WebGL or text-as-images.
- **Avoid gratuitous dependencies and hydration:** use React Server Components where the installed Next.js/router architecture permits them; isolate interactive components.
- **Never introduce secrets into browser bundles;** keep credentials, private APIs and tokens server-side.
- **Never claim build, tests, accessibility audit or deployment passed without actually running the relevant checks.**

---

## 2. Source references and what to adopt

### Primary site: sanukhan.dev

Treat the live domain as the product being improved, **not as permission to overwrite its information architecture**. Public search indexing identifies the site as an engineering/architecture portfolio. `/about` and `/projects` URLs have been observed; verify their actual behavior and the entire route tree locally. The site also has published technical writing: preserve all existing post URLs and their link equity.

### Inspiration: pamidordesign.co

The reference site visibly organizes a large personal introduction, concise services, social/client proof, selected projects, an experimental/art section, numbered capabilities, and a prominent contact conversion area. For sanukhan.dev adapt the **patterns**, not the profession-specific sections:

| Reference design principle | Adaptation for an engineering portfolio |
|---|---|
| Oversized identity-led hero | Name + precise engineering positioning + selected value proposition |
| Editorial, asymmetrical composition | Two-column hero and deliberately offset project compositions |
| Selected project storytelling | Outcome-led engineering case studies with role, stack and constraints |
| Contrasting display and utility typography | Raleway + Allura for English; Almarai + Aref Ruqaa for Arabic |
| Large project previews and clear pacing | Actual screenshots/diagrams with mobile fallbacks and captions |
| Numbered services/capabilities | Architecture, full-stack/platforms, automation/AI, integrations (only where evidenced) |
| Playful visual accents | Restrained script treatments, accent lines and well-considered hover transitions |
| Strong conversion section | Accessible invitation to discuss opportunities or collaboration |

**Constraint:** text extraction and public pages do not establish exact pixel geometry or all animation behaviors. Do not claim pixel-accurate reproduction. Use the specification below as the implementable design contract.

---

## 3. Brand system — current user-approved screenshot palette

> **2026-10-14 override:** The user explicitly supplied the Rajib Kabir Framer reference screenshot and directed use of **its colors**. This palette supersedes the original orange/ivory/black 2026-10-14 concept. Reuse its visual color roles; do **not** copy the source site's artwork, text, typography or assets. **Existing portfolio fonts are locked and must not change.**

### 3.1 Palette sampled from the supplied screenshot

| Role | Value | Where used |
|---|---|---|
| Main canvas | `#F5F1EC` | Site and inner-page light backgrounds |
| Card surface | `#FBF9F7` | Cards, inputs, notes, FAQ, service/expertise panels |
| Primary ink | `#171717` | Headlines, reading text, black engagement panels |
| Sand highlight | `#F8E4CD` | Metrics, soft section highlights |
| Hero peach | `#FFDDBB` | Opening hero gradient |
| Warm pink | `#FFD9C8` | Hero and visual transition |
| Blush pink | `#FFCED2` | Gradient endings, footer, contact |
| Coral accent | `#F3633E` | Larger graphic accents and illustrations |
| Readable dark coral | `#AD2A09` | Small text links and labels on light backgrounds |
| CTA gradient (left → right) | `#FF783C` → `#FA6464` → `#E75C93` → `#BD5ACE` | Primary CTAs and ZaakiyV3RSE brand accents, used sparingly |

The image is low-resolution, so these are **representative sampled/normalized colors**, not claimed to be original Framer design tokens. Keep exact shared values in `src/styles/reference-2026.css`; global tokens in `src/styles/editorial.css` and `src/index.css` must stay in sync. The ZaakiyV3RSE wordmark **retains its existing Anta font**; only brand color treatment changes.

### 3.2 Accessibility / contrast

| Combination | Approx. contrast | Instruction |
|---|---:|---|
| `#171717` on `#F5F1EC` | 15.94:1 | Readable copy on canvas |
| `#171717` on `#FBF9F7` | 17.07:1 | Readable copy on cards |
| `#AD2A09` on `#F5F1EC` | 6.00:1 | Accessible small colored labels/links |
| `#F3633E` on `#F5F1EC` | 2.80:1 | **Not for small text** |
| `#171717` on `#FF783C` | 6.83:1 | Accessible dark labels on gradient start |
| `#171717` on `#BD5ACE` | 4.71:1 | Accessible dark labels on gradient end |
| White on `#F3633E` | 3.15:1 | **Not for small CTA labels** |

Keep ordinary text at WCAG 2.2 AA ≥4.5:1, meaningful focus/controls ≥3:1, and evaluate contrast throughout any gradient. Use dark near-black text on bright gradient CTAs; when white text is required use a dark-coral fill (`#AD2A09`).

### 3.3 Application rules

- Backgrounds and navigation: predominantly warm off-white, as in the supplied screenshot. Cards should be distinguishable with near-white surfaces and subtle neutral borders.
- Hero and contact: soft **peach → blush** gradients; avoid introducing unrelated teal/green/purple surfaces. Purple may appear **only as the deliberate endpoint** of the CTA/Zaakiy gradient.
- Projects: let real approved imagery lead; until available, keep clearly labeled conceptual placeholders rather than fabricating product screenshots.
- ZaakiyV3RSE brand + portfolio assistant: use the same sampled coral/rose/violet family consistently; **do not change their fonts or API behavior**.
- Existing HTML content, bilingual translations, engineering case-study data, slugs, SEO/analytics and route behavior are invariant.
- Keep the current layout static. Build scroll and hover animation in a separate user-approved phase rather than bundling it into color work.

### 3.4 Target distribution

Approximately 75–85% canvas/card neutrals, 10–20% peach/sand/blush, and up to 5–10% bright gradient/coral depending on the section. No green-dominant theme, saturated neon decoration, invented client brand colors or unrelated visual palettes.

---

## 4. Typography — font choices and responsibilities

### 4.1 Font hierarchy

| Language/context | Typeface | Purpose | Allowed weights / treatment |
|---|---|---|---|
| Brand logotype | **Klaxon** (licensed local font) | Wordmark/monogram only | Only actual licensed styles; never fake bold |
| English primary | **Raleway** | Display, H1–H6, body, UI, project metadata | 400 / 500 / 600 / 700 (variable if available) |
| English decorative | **Allura** | One short expressive annotation or calligraphic accent per view/section | 400 only |
| Arabic primary | **Almarai** | All Arabic headings, paragraph text, controls, navigation | 400 / 700 / 800; 300 optional for display if tested |
| Arabic decorative | **Aref Ruqaa** | Arabic stylistic counterpart to Allura; short artistic phrases only | 400 / 700 |
| Code/technical snippets | Existing project monospaced font or system mono | Inline code, file paths, architecture snippets | 400 / 500 |

**Why Aref Ruqaa?** Its calligraphic Ruqaa construction supplies a natural handwritten contrast to Almarai. It is **not** a letter-for-letter visual equivalent of English Allura; this is intentional: Arabic should have an authentic typographic expression. Prefer standard **Aref Ruqaa** over **Aref Ruqaa Ink** initially to avoid color-font compatibility and rendering variability.

**Font restrictions:**

- Allura and Aref Ruqaa are accents, not body fonts and not replacements for meaningful H1 text.
- Never render the primary headline as an SVG/image to emulate handwritten glyphs.
- Apply Allura only to English runs and Aref Ruqaa only to Arabic runs. Do not rely on fallback to mix them in one word.
- Never artificially italicize Arabic. Avoid uppercase transformation, positive tracking and Latin-inspired disconnected letter spacing on Arabic glyphs.
- Never stretch, compress or outline live body copy. Preserve selectable DOM text.
- Klaxon is commercially licensed by its foundry in at least some distributions. **A desktop/print license is not automatically a webfont license.** Use it only after the appropriate rights and files are present. If unavailable, temporarily render a Raleway-based wordmark; do **not** download random font copies or commit a counterfeit.

### 4.2 Responsive type scale — English

Values in pixels, rendered at the corresponding viewport. All other font sizes should derive from these semantic levels.

| Style | Phone 320–479 | Large phone 480–767 | Tablet 768–1023 | Desktop 1024–1439 | Wide 1440+ | Weight | Line height | Letter spacing |
|---|---:|---:|---:|---:|---:|---|---|---|
| **Hero / Display** | 44–58 | 58–84 | 76–100 | **96–128** | **122–160** | 600–700 | 0.92–1.02 | `-0.04em` (reduce if clipping) |
| **H1** | 38–44 | 44–58 | 52–64 | **64–80** | **72–96** | 600–700 | 0.98–1.08 | `-0.04em` |
| **H2** | 28–34 | 32–40 | 36–46 | **40–56** | **50–64** | 500–600 | 1.05–1.15 | `-0.03em` |
| **H3** | 22–26 | 24–28 | 26–32 | **28–36** | **32–40** | 500–600 | 1.15–1.25 | `-0.02em` |
| H4 | 20–22 | 20–24 | 22–26 | 24–28 | 26–32 | 600 | 1.2–1.3 | `-0.01em` |
| **Body** | 16 | 16–17 | 17 | **16–18** | **18** | 400 | 1.55–1.75 | `0` |
| Lead / intro copy | 18–20 | 20–22 | 22–24 | 22–28 | 24–30 | 400–500 | 1.35–1.5 | `-0.01em` |
| **Small labels** | 12–13 | 12–13 | 12–13 | **11–13** | **12–13** | 500–600 | 1.3–1.5 | **`+0.08em`** for Latin uppercase labels only |
| **Navigation** | 15–16 | 15–16 | 14–15 | **13–15** | **14–15** | 500–600 | 1.25–1.4 | `0` |
| Buttons / inputs | 15–16 | 15–16 | 15–16 | 15–16 | 15–16 | 600 | 1.25–1.5 | `0` |
| Figcaptions / footnotes | 13–14 | 13–14 | 13–14 | 13–14 | 14 | 400–500 | 1.4–1.6 | `0` |

**Your required desktop ranges are preserved:** Hero 96–160; H1 64–96; H2 40–64; H3 28–40; body 16–18; labels 11–13; navigation 13–15. The actual desktop size must be fluid and constrained by character length, container width and language, not hardcoded at one extreme.

**Large typography must not overflow:** manually tune title wraps (`text-wrap: balance` where supported), constrain line length, test long role names and users at 200% zoom. Words must remain visible at 320px; do not rely on `overflow: hidden` to conceal clipping.

### 4.3 Responsive type scale — Arabic

Arabic is **optically tuned**, not mechanically set equal to English. Use Almarai as the default with more generous vertical space, and Aref Ruqaa only for expressive callouts.

| Style | Mobile | Tablet | Desktop | Weight | Line height | Tracking |
|---|---:|---:|---:|---:|---|---|
| Hero / Display | 40–62 | 66–96 | 88–144 | Almarai 700–800 | 1.15–1.30 | `normal` |
| H1 | 36–48 | 50–68 | 64–96 | Almarai 700–800 | 1.2–1.35 | `normal` |
| H2 | 28–36 | 36–48 | 40–64 | Almarai 700 | 1.25–1.4 | `normal` |
| H3 | 23–29 | 27–34 | 29–40 | Almarai 700 | 1.3–1.45 | `normal` |
| Body | 16–18 | 17–18 | 18–19 | Almarai 400 | 1.75–1.95 | `normal` |
| Labels | 13–14 | 13–14 | 13–15 | Almarai 700 | 1.4–1.6 | `normal` |
| Navigation | 15–16 | 15–16 | 15–16 | Almarai 700 | 1.4–1.6 | `normal` |
| Aref Ruqaa accent | 38–56 | 52–70 | 64–96 | 400–700 | 1.2–1.45 | `normal` |

Arabic implementation rules:

- Set `lang="ar"` and `dir="rtl"` on the relevant root document for Arabic routes. Set `lang="en"` and `dir="ltr"` for English routes.
- Use **CSS logical properties** such as `margin-inline-start`, `padding-inline-end`, `inset-inline-start` and `text-align: start` instead of repeated `left` / `right` overrides.
- For mixed-language runs, wrap with `<bdi>` or a scoped element with appropriate `lang` and `dir="auto"`; preserve English brand/product names and technical codes in LTR.
- Arabic numerals are a locale/content decision, not an incidental CSS transform. Preserve literal versions, dates, URLs and code.
- Allow contextually correct Arabic line breaking; do not add `letter-spacing`, `text-transform: uppercase`, forced word breaks or artificial italic styles.
- Check actual Arabic content in every responsive breakpoint; do not assume translated text is the same length as English.
- Use localized metadata, alt text, navigation labels, form errors and structured data where localized pages exist.
- Keep English-only content at a clearly marked English URL; do not ship a thin Arabic page with only the navigation translated as if it were a complete equivalent.

### 4.4 Typography tokens — suggested CSS foundation

Implement these in the project's existing styling architecture. They are design values, not a mandate to replace Tailwind, CSS Modules or another working system.

```css
:root {
  --color-orange: #d5360c;
  --color-orange-ink: #ad2a09; /* accessible small accent text on ivory */
  --color-ivory: #e6d5bd;
  --color-black: #101010;
  --color-white: #ffffff; /* restricted: orange button text */

  --font-primary-en: var(--font-raleway), Arial, sans-serif;
  --font-script-en: var(--font-allura), cursive;
  --font-primary-ar: var(--font-almarai), Tahoma, sans-serif;
  --font-script-ar: var(--font-aref-ruqaa), serif;
  --font-brand: var(--font-klaxon, var(--font-raleway)), sans-serif;

  --type-display: clamp(2.75rem, 9vw, 10rem);
  --type-h1: clamp(2.375rem, 6vw, 6rem);
  --type-h2: clamp(1.75rem, 4vw, 4rem);
  --type-h3: clamp(1.375rem, 2.75vw, 2.5rem);
  --type-body: clamp(1rem, 0.98rem + 0.14vw, 1.125rem);
  --type-small: 0.8125rem;
  --type-nav: clamp(0.9375rem, 0.86rem + 0.18vw, 1rem);

  --leading-display: 0.96;
  --leading-h1: 1.04;
  --leading-h2: 1.12;
  --leading-h3: 1.22;
  --leading-body: 1.65;

  --tracking-display: -0.04em;
  --tracking-h1: -0.04em;
  --tracking-h2: -0.03em;
  --tracking-h3: -0.02em;
  --tracking-label: 0.08em;

  --page-gutter: clamp(1rem, 4vw, 5rem);
  --content-width: 1440px;
  --reading-width: 72ch;
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --motion-fast: 160ms;
  --motion-base: 260ms;
  --motion-slow: 420ms;
}

@media (min-width: 64rem) {
  :root {
    --type-display: clamp(6rem, 8.5vw, 10rem);
    --type-h1: clamp(4rem, 5vw, 6rem);
    --type-h2: clamp(2.5rem, 3.35vw, 4rem);
    --type-h3: clamp(1.75rem, 2.1vw, 2.5rem);
    --type-nav: clamp(0.8125rem, 0.9vw, 0.9375rem);
  }
}

html { color-scheme: light; }
body {
  background: var(--color-ivory);
  color: var(--color-black);
  font-family: var(--font-primary-en);
  font-size: var(--type-body);
  line-height: var(--leading-body);
  overflow-wrap: break-word;
}
:lang(ar) {
  font-family: var(--font-primary-ar);
  letter-spacing: normal;
}
:lang(ar) :is(h1, h2, h3, p, a, button, input, textarea, label) {
  letter-spacing: normal;
}
:lang(ar) p { line-height: 1.85; }

.display {
  font-size: var(--type-display);
  font-weight: 700;
  letter-spacing: var(--tracking-display);
  line-height: var(--leading-display);
  text-wrap: balance;
}
:lang(ar) .display { line-height: 1.22; letter-spacing: normal; }

.label-caps {
  font-size: var(--type-small);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}
:lang(ar) .label-caps { text-transform: none; letter-spacing: normal; }

.container {
  width: min(calc(100% - 2 * var(--page-gutter)), var(--content-width));
  margin-inline: auto;
}

/* Orange on ivory alone is insufficient for small text. */
.accent-link { color: var(--color-orange-ink); text-decoration: underline; text-underline-offset: 0.2em; }
.primary-button { background: var(--color-orange); color: var(--color-white); }
:focus-visible { outline: 3px solid var(--color-orange-ink); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

**CSS implementation note:** the example `:focus-visible` ring can have insufficient contrast on black or orange surfaces; define surface-specific ring overrides (ivory/white plus a contrasting outline or offset) and test them. Do not use global `overflow-x: hidden` to cover up responsive bugs.

### 4.5 `next/font` implementation guidance

Use Next.js built-in font optimization and self-hosting. Use only installed and verified package exports. Example for **App Router projects** (adapt for Pages Router if the repo uses that):

```tsx
// src/app/fonts.ts (example location only)
import { Raleway, Allura, Almarai, Aref_Ruqaa } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});
export const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allura',
  display: 'swap',
  preload: false,
});
export const almarai = Almarai({
  weight: ['400', '700', '800'],
  subsets: ['arabic'],
  variable: '--font-almarai',
  display: 'swap',
});
export const arefRuqaa = Aref_Ruqaa({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-aref-ruqaa',
  display: 'swap',
  preload: false,
});
```

```tsx
// Only if a correctly licensed Klaxon webfont is present in the repository.
import localFont from 'next/font/local';

export const klaxon = localFont({
  src: '../assets/fonts/klaxon-licensed.woff2', // placeholder: replace with real approved path
  variable: '--font-klaxon',
  display: 'swap',
});
```

Notes:

- Verify `Aref_Ruqaa` and locale subsets against the actual installed Next.js version; resolve any generated `next/font` build errors rather than guessing names/subsets.
- **Do not add the Klaxon import until the asset exists and license is confirmed.** If omitted, define `--font-klaxon` as a valid local/fallback family value or use the Raleway wordmark directly.
- Load only required subsets/weights and reserve space for fallback glyph metrics. Consider isolating noncritical scripts to the pages that actually use them.
- If the Vercel build fails while fetching Google Fonts, diagnose the build network, font CSS response and Next.js version. An allowed local copy of OFL fonts can be bundled with `next/font/local` as a deterministic alternative. Do not commit downloaded proprietary Klaxon files without rights.
- Place font-variable classes on the proper document root/layout for both locales; avoid generating per-component `@import` rules.
- Test actual font files and Arabic shaping on deployed preview builds, not just local development.

---

## 5. Layout, grids and spacing

### 5.1 Responsive breakpoints and density

| Viewport | Columns | Outer gutter | Design behavior |
|---|---:|---:|---|
| 320–479px | 4 conceptual; 1 content column | 16–20px | Stacked navigation, hero, cards; avoid horizontal scrolling |
| 480–767px | 4–6 conceptual; 1 content column | 20–28px | Larger crop, stacked split elements |
| 768–1023px | 8 | 28–40px | Selected side-by-side compositions; tablet-safe menu |
| 1024–1439px | 12 | 40–64px | Editorial asymmetry and alternating project panels |
| 1440–1919px | 12 | 64–80px | Expanded whitespace; content remains width-limited |
| 1920px+ | 12 | 80px max, centered | Do not continue enlarging typography/images without limit |

Use a `1440px` main container max; allow a carefully designed **full-bleed section** outside it. Use a separate ~`65–72ch` reading column for long-form body text. Avoid equal-width cards everywhere; use varied but disciplined proportions.

### 5.2 Spacing system

Base units: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160px`.

- Interactions between a heading and its subordinate description: 12–24px.
- Space between unrelated page components: 24–48px mobile; 48–80px desktop.
- Vertical section padding: 64–96px mobile; 96–160px desktop.
- Project media gap: 16–24px mobile; 24–40px desktop.
- Reading line length: target 55–75 characters for English prose; tune Arabic optically.
- Cards have modest rounding; use square/near-square editorial panels preferentially. Avoid uniform pill corners or glassmorphism.
- Borders: 1px black with intentional opacity only where contrast is not needed to identify a UI control. Never use low-opacity borders as the sole boundary of form inputs.

### 5.3 Compositional conventions

- The hero has one dominant statement plus one subordinate information cluster.
- Large images/case studies should have **one clear crop/focal point**, not several competing background effects.
- Alternate left- and right-weighted blocks so the page has momentum without random stagger.
- Use large ordinal numbers (`01`, `02`, etc.) for capabilities/work indexes; numbers are secondary, not H1 replacements.
- A section can begin with an eyebrow label, but do not force every section to have the same header template.
- Align repeated metadata baselines and edges to a common grid even when the overall composition is asymmetric.
- Prefer typographic contrast to box-shadow, glow, blur, giant border radius, excessive gradients or glass panels.
- Keep scroll-related flourishes optional and avoid scroll hijacking and parallax that shifts reading content.

---

## 6. Information architecture and page blueprints

**Do not invent URLs.** Audit existing content and route slugs before implementing this *recommended* architecture. Retain old slugs and publish redirects only when necessary.

### 6.1 Home

1. **Accessible header:** text/logo, Work/Projects, About, Writing/Blog, Contact, language control (only if Arabic content is published). Minimal on desktop; real menu button on mobile.
2. **Hero — identity and value:** oversized name/role, compact positioning line (e.g. engineering + architecture), 1–2 lines of specific evidence-backed proposition; optional portrait. Avoid a generic "creative designer" tagline.
3. **Signals of trust:** a short, factual experience summary and domains worked in; do not list client logos without the right to use them.
4. **Selected engineering work:** 3–5 curated existing projects with outcome, role, constraints, verified technology stack and a strong visual. Follow with a true link to all projects.
5. **How I work / capabilities:** 3–4 numbered services or strengths: system architecture, full-stack delivery, cloud/integrations, automation/AI—modify to match verified content.
6. **About preview:** concise human context and approach, high-quality image if available, route to full about page.
7. **Latest writing:** up to three actual published technical articles with title, date and honest preview.
8. **Contact conversion:** large editorial invitation, working email link and/or functional form, response expectations only if proven.
9. **Footer:** clear routes, copyright, actual social profiles, locale links if published.

### 6.2 Projects index

- Descriptive H1 and concise introduction; no duplicate hero size competition.
- Filter by useful categories **only** if enough content exists; links or accessible controls must work without relying on hover.
- Each project tile must contain title, scope, the user's role, year (if known), technologies/outcome (if verified), and a descriptive link.
- Featured cards may use staggered crops and unusual aspect ratios; on mobile revert to one clean column.
- Empty states and missing screenshots require graceful factual fallbacks, never fictional mockups labeled as real.

### 6.3 Project detail / case study

Suggested order: project introduction → role and scope → problem/context → constraints → architecture/design decisions → implementation/stack → results (verified) → lessons/trade-offs → related work and next actions.

- Distinguish personal contribution from team output and verified outcome from intention.
- For confidential work, show an anonymized architecture diagram or permitted image only; do not expose secrets, internal endpoints, PII or employer/customer information.
- Make diagrams accessible via adjacent textual explanation.
- Code/tech details use true monospaced text blocks, not screenshots of text.
- Preserve references and existing inbound routes.

### 6.4 About

- Clear identity and professional positioning, not an autobiography wall.
- Chronology, selected capabilities, delivery methods and relevant credentials drawn from verified source content.
- Readable subheads, ~65–72ch paragraphs, optional portrait/media with accurate descriptions.
- Strong contextual links to work, articles and contact.

### 6.5 Blog / writing

- Article index with accessible real links, dates, topics and summaries.
- Article detail with one descriptive H1, publish/update dates where appropriate, meaningful subheads, code syntax with contrast, TOC if sufficiently long, related posts and author/byline information.
- Long-form reading width distinct from homepage layout; body font 17–19px desktop is acceptable inside articles.
- Keep existing canonical slugs unchanged and retain Markdown/MDX syntax where already used.
- Table wrappers must scroll horizontally **locally** on small devices without moving the whole page.

### 6.6 Contact

- Include direct real contact options and accessible form only if there is a functioning, secure submission destination.
- Inputs have persistent associated labels, helpful errors, visible success/failure feedback and keyboard-friendly focus.
- Validate server-side; apply rate limiting/honeypot or equivalent abuse controls consistent with existing stack.
- Do not claim "message sent" until the API acknowledges submission. Keep privacy messaging accurate.

---

## 7. Component-level rules

### Navigation

- Desktop: left/start brand; right/end nav (logical alignment mirrors in RTL). Enough spacing to scan without spreading the menu across the whole screen.
- Mobile: logo, obvious menu button with `aria-expanded`, `aria-controls`, Escape handling, focus management and scroll behavior tested.
- Use semantic `<nav aria-label="Primary">`, real links and active-page `aria-current="page"`.
- Avoid navigation labels under 13px desktop or 15px mobile.
- Sticky headers must not cover target headings (`scroll-margin-top`) or keyboard-focused controls.

### Hero

- Layout: one large content zone and a narrower side/meta zone; collapse to a single content flow at narrow widths.
- Copy: render the actual H1 as semantic text; decorative Allura/Aref Ruqaa can add emphasis, not replace the entire meaning.
- If a portrait exists: `next/image`, actual dimensions, descriptive alt when informative, empty alt if redundant and purely decorative.
- Background shapes and oversized numerals must be `aria-hidden="true"` and must not obscure text.

### Project cards

- Large preview images with stable aspect ratios (e.g. 16:10 or 4:3) and image focal-point control.
- Visible project title, short functional description and entire-card behavior that does not create nested links.
- Hover may scale image at most ~1.02–1.04, reveal a line, or shift an icon a few pixels. Focus state must make the interaction equally obvious.
- Do not place important text exclusively within image overlays that appear on hover.

### Buttons, links and forms

- Minimum practical interactive target: **44 × 44 CSS px** for primary mobile interactions (WCAG 2.2 has a smaller formal AA target criterion; 44px is this project's usability target).
- Primary CTA: orange background + white copy; secondary CTA: black background + ivory copy; tertiary link: underlined black or dark-orange text.
- Use `:focus-visible`, preserve keyboard order, and never suppress outlines without tested replacement.
- Button labels are explicit actions such as "View project" or "Get in touch", not repeated ambiguous "Explore" everywhere.
- Error color cannot be communicated only through orange; add icon/text and explain next steps.

### Section transitions

- Default light content blocks on ivory; choose isolated black chapters for contrast.
- A decorative rule, small label or chapter number may bridge sections; avoid excessive background swaps.
- Keep ornamental script to one short accent in a visually significant section. Never use decorative script in dense navigation or 11–13px labels.

---

## 8. Motion and interaction

Motion should communicate state and hierarchy, not force attention.

| Interaction | Behavior | Duration |
|---|---|---:|
| Link underline/icon | Immediate feedback, subtle movement | 160–220ms |
| Card image hover | Small transform / reveal | 260–350ms |
| Section in-view appearance | Opacity + translation of ~8–16px | 350–500ms max |
| Navigation drawer | Simple slide/fade; trap/focus rules tested | 200–300ms |
| Page transition | Optional only if no accessibility or CWV cost | 250–420ms |

- Prefer native CSS transitions and IntersectionObserver sparingly; do not add Framer Motion solely for basic hover animations.
- Do not animate layout heights, font sizes or text position on every scroll tick.
- Honor `prefers-reduced-motion: reduce`; never block content behind entrance animations.
- No perpetual cursor followers, custom scrollbars, autoplay video with audio, forced smooth scrolling, bouncy physics on content or hidden navigation.
- Validate touch interactions: nothing essential may depend on `:hover`.

---

## 9. Next.js + TypeScript architecture

### Repo-first compatibility

Do **not** migrate routers or styling systems as an incidental part of a redesign. If the repository uses App Router, use its Metadata API and Server Components. If Pages Router, use compatible equivalents. Adopt existing lint, formatting, image, test and deployment conventions unless demonstrably broken.

Suggested file organization **for a project already using App Router** (adapt existing structure rather than replatforming):

```text
src/
  app/
    layout.tsx                 # HTML/document root, shared metadata and fonts
    page.tsx                   # Homepage, server-rendered content
    robots.ts                 # Robots metadata route
    sitemap.ts                # Canonical indexable pages
    opengraph-image.tsx       # Optional sharable OG illustration
    [existing-locale-routing]/ # Only if localization is actually in use
  components/
    layout/                   # Header, Footer, Container, Section
    portfolio/                # Hero, WorkCard, CaseStudy, CapabilityList
    ui/                       # Button, TextLink, LocaleSwitcher, Reveal
  content/                     # Typed project/page data or existing CMS adapters
  lib/
    seo/                       # metadata helpers / JSON-LD
    i18n/                      # locale resources and logical direction helpers
  styles/
    tokens.css
    typography.css
```

Coding standards:

- TypeScript strict mode; no unexplained `any`; validate untrusted content at IO boundaries.
- Meaningful semantic HTML (`header`, `nav`, `main`, `article`, `section`, `aside`, `footer`).
- Use `next/link` for internal navigation and `next/image` for suitable local/remote images; respect existing image-host allowlists and remote patterns.
- Use responsive `sizes`; specify height/width or fill container dimensions to prevent CLS.
- One source of truth for navigation links, portfolio items, locales and metadata definitions where practical.
- CSS logical spacing rather than two almost-identical Arabic/English stylesheet trees.
- Server rendering for project descriptions, article content, metadata, breadcrumbs and meaningful links.
- Client boundaries only for necessary interaction (mobile menu, filters, active toggles, forms).
- Keep import paths, aliases and component conventions consistent with the project.
- Avoid hard-coded base URLs except in a canonical centralized configuration with a validated production value.

---

## 10. SEO implementation contract

### 10.1 Architecture and indexability

- Keep HTML content discoverable without executing browser-only animation hooks.
- Each indexable route gets an accurate, **unique** page title, meta description, canonical URL, share image and language.
- Title: front-load page subject, then identity/brand; aim for a concise SERP-friendly length (roughly 50–60 characters when feasible, **not** a strict search-engine limit).
- Description: informative 1–2 sentences, often around 140–160 characters (again a guideline, not a ranking or truncation guarantee).
- Maintain a descriptive H1 per page as an editorial convention; use H2/H3 in logical order; headings communicate structure, not typography tokens.
- Actual internal links must use descriptive anchor text and correct destinations.
- Preserve exact post/project slugs wherever possible; for changes use permanent redirects and update internal links, canonicals and the sitemap.
- Return actual 404 status for missing content. Do not serve 200 soft-404 placeholders.
- Avoid indexing draft routes, internal previews, search-result pages or thin placeholder translations.

### 10.2 App Router metadata reference

```tsx
// Example only; adapt route paths and current Next.js version.
import type { Metadata } from 'next';

const origin = 'https://www.sanukhan.dev';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: 'Sanu Khan | Software Engineer & Solution Architect',
    template: '%s | Sanu Khan',
  },
  description:
    'Explore software architecture, full-stack engineering projects, and technical writing by Sanu Khan.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Sanu Khan',
    url: origin,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Sanu Khan portfolio' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

**Important:** the sample metadata contains proposed editorial copy, **not audited claims**. Replace it with final approved content, a real OG image and verified production routing. On each child page, set its **own** canonical and appropriate OG URL/image rather than inheriting `/` blindly. Set `alternates.languages` **only for real fully translated equivalent pages**, including each page's own language URL.

### 10.3 Structured data

Use valid, content-backed schema types:

- Home: `Person` describing the real portfolio owner; `WebSite` for the website (and `ProfilePage` if the page meets the schema's purpose/Google requirements).
- Articles: `BlogPosting` or `Article` for genuine published writing; real publish/modified dates; accurate author and image.
- Project pages: `CreativeWork` or `SoftwareSourceCode` **only if the content and properties genuinely apply**.
- Internal navigation: `BreadcrumbList` on appropriate detail pages with URLs that actually exist.

No invented ratings, reviews, employers, awards, sameAs profiles or social links. Do not assume all valid schema types create Google rich results.

Sanitize serialized JSON-LD to avoid script-breakout on external/user-originated values:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(verifiedStructuredData).replace(/</g, '\\u003c'),
  }}
/>
```

Build `verifiedStructuredData` from actual verified content and test with the Schema Markup Validator / Google Rich Results Test as appropriate.

### 10.4 Multilingual SEO

- Prefer distinct, stable crawlable URLs for English and Arabic **when both are published** (e.g. `/en/...` and `/ar/...`, or a documented default-English policy).
- All translated-equivalent pages must declare reciprocal `hreflang` references, including self-reference, and canonicalize **to their own language URL**, not all to English.
- Add `x-default` only when a genuinely appropriate fallback or language selector URL exists.
- Localize meta titles, meta descriptions, OG content, heading copy, image alt text and in-page navigation, not just chrome.
- Locale links must work without client-side JS and retain as much equivalent path context as practical.
- Do not automatically redirect Googlebot or all new users purely by IP/`Accept-Language` so that alternate language URLs become unreachable.

### 10.5 Crawl control and operations

- Serve valid `robots.txt` and XML sitemap(s), using Next.js file conventions where available.
- Include only absolute canonical indexable URLs in sitemaps, with `lastModified` derived from **real** content revisions; no fabricated fresh timestamp on every build.
- Confirm status codes, canonical redirect between `www`/non-`www`, HTTP→HTTPS, trailing-slash policy and sitemap URLs.
- Preserve Search Console property and analytics instrumentation with user-consent/privacy requirements. Compare post-launch performance against pre-launch baseline.
- OG images ideally 1200×630px and meaningful; ensure all referenced image paths exist.
- Verify rendering using production preview HTML, not only client-side browser view.

---

## 11. Accessibility (WCAG 2.2 AA target)

- Semantic landmarks and a visible keyboard **Skip to content** link.
- Keyboard-operable header, menu, projects, filter chips, forms, accordions and modal/drawer if any.
- Logical focus order; Escape closes modal/menu and restores focus where appropriate.
- Visible focus styles on all three surfaces; ensure focused items are not hidden by sticky elements.
- Never make the entire interaction depend on color, animation, icon alone or pointer hover.
- All controls have accessible names; icon-only buttons require text alternatives.
- Decorative imagery uses empty alt; informative images get concise descriptions. Architecture diagrams include nearby text.
- Form controls have persistent labels, associated errors and visible field status.
- Contrast: 4.5:1 regular type, 3:1 large type, 3:1 meaningful UI indicators. Check actual computed composite colors.
- Screen reader page language and direction correct; mixed-language spans marked when helpful.
- Content and controls operate at 200% browser zoom without loss of function; test reflow at 320 CSS px (and WCAG 400% zoom conditions where applicable).
- No text clipping under user font zoom/spacing overrides; avoid fixed-height text wrappers.
- Reduced-motion preference respected and no seizure-prone animation.
- Touch targets 44×44px preferred; retain adequate space between neighbors.
- Color and typography rules apply equally in Arabic, not only English.

---

## 12. Performance & image delivery

### Web Vitals success thresholds (field data, p75)

| Metric | Good target | Engineering implication |
|---|---:|---|
| **LCP** | ≤ 2.5 seconds | Prioritize main headline/hero image, reduce render-blocking and transfer cost |
| **INP** | ≤ 200 ms | Limit hydration and expensive animation/event work |
| **CLS** | ≤ 0.10 | Reserve aspect ratios, font space and async UI dimensions |

Recommended supporting quality gates, not Google ranking guarantees: Lighthouse Performance ≥90 on representative mobile runs; Accessibility ≥95, Best Practices ≥95, SEO ≥95 where Lighthouse applies. Field CWV takes precedence over one synthetic run.

Implementation:

- Render key hero copy as text; do not require a hero video, WebGL scene or animation before useful paint.
- Use AVIF/WebP responsive imagery **when supported and appropriate**, preserve clear color and readable crops. Optimize original sizes and avoid unbounded 4K assets for cards.
- `next/image` plus meaningful `sizes`; prioritize only the genuine above-the-fold LCP image, not every card.
- Reserve fixed ratios/dimensions for portrait, project images, embeds, logos and figures.
- Defer below-fold heavy media; use lazy loading only where it does not damage LCP.
- Keep animation code lean; avoid giant animation frameworks for simple transitions.
- Audit third-party scripts, web fonts, analytics and embedded widgets.
- Use static generation / caching appropriately for stable project and article content; document ISR/cache behavior if applicable.
- Diagnose `next/font` build issues in CI rather than silently replacing fonts with external runtime stylesheet fetches.
- Measure production bundle sizes and compare before/after; investigate large new client chunks.

---

## 13. Responsive and bilingual acceptance matrix

Minimum viewport tests:

| Width | Expected verification |
|---:|---|
| 320px | No page-level horizontal overflow; full navigation; visible H1 and CTA; all project titles fit |
| 375px | Common mobile line breaks and real touch spacing |
| 390px | Hero portrait/text ordering; no stretched script |
| 430px | Large phone project previews; CTA and bottom content |
| 768px | Tablet grid, portrait cropping, navigation and Arabic shaping |
| 1024px | Switch to desktop project compositions without collisions |
| 1280px | Desktop type hierarchy and readable reading column |
| 1440px | Reference editorial rhythm and spacing intent |
| 1920px | Maximum width prevents enormous lines/empty expanses |

For **every** key route above, verify:

- English LTR and Arabic RTL, including mixed English technologies and proper names.
- Keyboard-only path from skip link to footer.
- Screen reader heading/landmark structure.
- 200% zoom / large text; additional reflow tests when applicable.
- Both normal motion and reduced motion.
- Light surfaces, dark surfaces and orange CTA states.
- Touch, mouse and hoverless pointer behavior.
- Broken image, long title, no image, slow network, missing data, invalid contact field and failed submission.
- Metadata output, canonical, OG tags, HTTP status and production sitemap visibility.

**Visual quality bar:** not only "looks responsive". No orphaned one-word display lines unless intentional; no clipped ascenders/Arabic marks; no images with faces cut off; no tiny labels; no accidental visual ambiguity around links and buttons.

---

## 14. Workflow for autonomous coding agents

### Phase 0 — Audit and establish a baseline

1. Inspect repository, branch, package manager, Next.js version/router, styling tokens, font setup, tests and deployment.
2. Enumerate existing routes, article/project slugs, language variants, redirects, canonical policy, SEO metadata and schema.
3. Capture baseline desktop/mobile screenshots or UI observations for core routes if tooling permits.
4. Identify assets that may be reused and any license limitations (especially Klaxon).
5. Record baseline build/lint/typecheck/test output and available CWV/Lighthouse metrics. **Do not fabricate results.**
6. Write a concise migration plan with proposed component and CSS changes before executing broad refactors.

### Phase 1 — Design-system foundation

1. Add semantic color tokens; verify calculated pairwise contrast.
2. Add the fonts using `next/font`, first validating available weights/subsets and build behavior.
3. Implement English/Arabic text style definitions, fluid type tokens and spacing/container rules.
4. Set up logical RTL layout conventions and shared semantics.
5. Build and visually validate isolated button, navigation, card, content-container and typography examples.

### Phase 2 — High-value pages

1. Implement home/mobile-first and its editorial desktop layout.
2. Apply consistent navigation/footer/sitewide background and accent roles.
3. Implement projects index/detail layouts using actual available data.
4. Apply editorial but readable article and about page typography.
5. Complete contact behavior and accessibility.
6. Polish bilingual layout only alongside real available translations, not in a disconnected final sweep.

### Phase 3 — SEO, a11y and performance

1. Check server-rendered content, metadata, route canonicals and current URL redirects.
2. Implement/verify robots, sitemaps, structured data and OG images.
3. Audit image ratios, LCP priorities, font loading, JS bundles and reduced-motion behavior.
4. Run automated and manual accessibility verification on relevant screens.
5. Check cross-browser font rendering, RTL and focus treatments.

### Phase 4 — Verification and release

Use actual scripts from `package.json`; common examples may include:

```bash
# Examples only: verify each command exists in package.json first.
npm run lint
npm run typecheck
npm run test
npm run build
```

If using pnpm/yarn, use the repository's pinned package manager and lockfile. Do not install another package manager or update unrelated dependencies to make these commands work.

Before deployment:

- Compare key page screenshots at the acceptance breakpoints.
- Verify no broken direct links, canonical conflicts, invalid `hreflang` pairs or disappearing project/blog content.
- Inspect preview deployment for correct fonts, assets, 404 behavior, Arabic UI and metadata.
- Confirm analytics/Search Console continuity.
- Record actual test commands, results and known limitations in the final handoff.

### Required final agent handoff

Every substantial implementation should report:

1. **Changed:** concise description of pages/components and design-system work.
2. **Preserved:** existing routes, content, links, SEO/canonical policy and behavior preserved.
3. **Validated:** precise lint/typecheck/tests/build/a11y/performance checks **actually performed**, with outcomes.
4. **Open issues:** licensing, missing Arabic translations/assets, content verification, screenshot/preview issues.
5. **Deployment:** commit/PR/preview identifier and URL **only when verified**, not invented.

---

## 15. Agent decision hierarchy and hard stops

When requirements conflict, decide in this priority order:

1. Security, actual legal rights and user privacy.
2. Accuracy of real work/history and preservation of live content and URLs.
3. Accessibility/legibility and usable interaction.
4. SEO, indexability and performance.
5. This typography/palette/layout specification.
6. Visual resemblance to external inspiration.
7. Decorative effects and personal aesthetic preference.

**Stop and ask rather than guess if:**

- Production URLs would need to be deleted or remapped and there is no confirmed redirect plan.
- Klaxon or any other proprietary font lacks documented permitted usage.
- Existing employer/client assets cannot clearly be displayed publicly.
- A language version lacks translated substantive content.
- User-specific project outcomes, years or role details are unavailable.
- A required action depends on missing API credentials or privileged deployment access.
- A requested visual treatment would make ordinary body text fail WCAG AA and cannot be corrected within the token scheme.

---

## 16. Definition of done

A deliverable is complete only when all applicable boxes are checked with evidence:

- [ ] Existing routes/slugs and content inventory reviewed and preserved (or mapped to approved redirects).
- [ ] Pamidor-inspired editorial hierarchy implemented **without copying** its copyrighted assets or code.
- [ ] Core palette implemented with acceptable color combinations; no 16px original-orange text on ivory.
- [ ] Raleway / Allura / Almarai / Aref Ruqaa applied to the correct purposes, with font files verified.
- [ ] Klaxon only used when correctly licensed and locally supplied; fallback wordmark otherwise.
- [ ] Desktop display type stays within user-specified range; mobile scale readable from 320px.
- [ ] Body copy accessible and line spacing comfortable in both English and Arabic.
- [ ] RTL direction and logical spacing work; mixed technical runs remain legible.
- [ ] All primary information and links are keyboard-operable and server-rendered where appropriate.
- [ ] Responsive layouts verified at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px.
- [ ] Each indexable route has real metadata, correct canonical, working 404 and share image.
- [ ] Robots, sitemaps, structured data and reciprocal language alternates validated where applicable.
- [ ] No misleading factual content, invented projects or fake performance/SEO claims.
- [ ] CI build, lint, typecheck and applicable tests pass; measured performance/a11y results documented.
- [ ] Preview production experience checked before approval to merge/deploy.
- [ ] Final handoff reports exactly what was changed, preserved, verified and remains unresolved.

---

## 17. External primary references for agents

Read current documentation for the installed framework version; do not cargo-cult obsolete examples.

- Current portfolio: https://www.sanukhan.dev/
- Visual inspiration: https://pamidordesign.co/
- Next.js Metadata & Open Graph: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js `next/font`: https://nextjs.org/docs/app/api-reference/components/font
- Google SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google localized URLs and `hreflang`: https://developers.google.com/search/docs/specialty/international/localized-versions
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WCAG minimum text contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Aref Ruqaa project/license: https://github.com/aliftype/aref-ruqaa
- Klaxon licensing reference: https://www.myfonts.com/collections/klaxon-font-device

**End of instructions.** All coding agents operating on this portfolio should read this file before making design, architecture, typography, internationalization or SEO changes.
