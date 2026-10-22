# Gemini implementation brief — Sanu Khan cinematic portfolio

## Task and constraints
You are the principal design engineer. Continue the redesign of https://github.com/sanukhandev/sanukhandev.github.io on **2026/10/dev** only. Read `AGENTS.md` (capitalized), then audit the code, routes, CSS, assets, SEO, sitemap scripts and CI. **Never merge to main.** Vercel production deploys only from main; publish a verifiable preview for development changes. Keep existing working routes, article slugs, project slugs, schemas, contact functions, navigation, analytics and SEO canonical policy.

The project currently uses **Vite + React 18 + TypeScript + React Router + Tailwind** (do not migrate to Next.js as part of a visual redesign). It already has an English/Arabic locale provider, dark/light theme provider, editorial-refresh.css, optimized project media, a Zaakiy brain and prerendering. Build on them, do not introduce a duplicate site or unexplained dependencies.

## Visual input
Use the attached source portrait photograph and the 105-second video "protfolio refrence .mp4" as inspiration, **not** as a template or licensed asset source. The motion reference is a premium portfolio with oversized typesetting, monochrome and orange accents, full-bleed black chapters, alternate image crops, asymmetric bento/collage grids, fine labels, orange micro-CTAs, sectional reveals and strong editorial pacing.

Brand: `#101010` ink, `#E6D5BD` warm ivory, `#D5360C` orange accent. White may appear where required for contrast. Montserrat is the English base, IBM Plex Sans Arabic the Arabic base, IBM Plex Mono only utility, Sloop Script only where correctly licensed (fallback Allura); Aref Ruqaa for Arabic accent if properly licensed/available. Do not download unlicensed fonts.

## Photographic assets
1. From the supplied portrait create **two distinct photographs** with consistent facial likeness, beard/hair shape and professional identity—do not invent a different person.
2. `hero-avatar-monochrome`: transparent-background monochrome cutout (alpha, not a flattened gray square), face sharp and well lit, visible upper torso, subtle film contrast and accurate edges, responsive 360/720/1122 derivatives in WebP/AVIF. Position as a layered collage between hero headline and metadata. Keep text readable independently of image loading.
3. `editorial-about-monochrome`: black-and-white cinematic portrait in a portrait ratio with restrained grain on a soft dark or warm-ivory field. Use a layered paper/card frame without bulky generic cards.
4. `og-card.jpg` at 1200x630: distinctive monochrome portrait, readable positioning headline and brand mark. Keep Open Graph previews raster JPEG/PNG. Provide a verified image path and file-size-optimized outputs. Do not replace real client media with generated fake screenshots. Add credits/accurate alt and captions where needed.

## Narrative and content
Use the positioning **"Where architecture meets execution."** Distinguish the personal brand from a design studio. The owner works across:
- Extended full-stack development, system design and solution architecture
- Technology and business consulting
- Technical leadership and cross-functional team collaboration
- Enterprise API and platform integration
- Process automation and AI-assisted workflows
- Technical writing and developer education
- Content strategy and translating complex systems into approachable explanations

Professional tone: team player, accountable collaborator, practical thinker, hands-on builder. Summarize roles into **6–7 scannable value pillars**, rather than stuffing eleven equal titles into the hero. Expand concrete, useful English/Arabic copy and FAQs, backed by existing published works only. Do **not** fabricate clients, certifications, credentials, metrics, testimonials, case-study numbers or results.

## Pages to implement and verify
- Home: bold typographic hero; monochrome transparent cutout with paper/collage offsets; refined impact metrics; numbered and linked "What I Solve"; 7-area bilingual editorial expertise collage; asymmetrical featured projects, recent writing, animated Zaakiy, about/portrait, approach, FAQs and contact.
- About: articulate 13+ years of career progression and collaborative delivery, technical principles, cross-functional strengths and real resume link. New cinematic portrait treatment.
- Projects and details: intentional varied 12-column asymmetry, captions and meaningful real architecture evidence; preserve project routes and internal linking.
- Blog index and article reader: readable long-form typography at 16–19px, 65–75ch, code and tables that work on phones, dates, tags, TOC where useful; preserve posts and their canonical URLs.
- Service pages: fact-grounded positioning across full-stack, system design, integrations, consulting, automation and leadership; add indexable routes ONLY where needed, without orphan paths.
- Contact, FAQ and developer tools: same typographic tokens, backgrounds and focused readability; verify functionality.

## Internationalization
True English AND Arabic across all updated sections, headings, buttons, aria labels, metadata, FAQ content, empty/error states, and any new routes. Root document `lang` and `dir` must update correctly. Native Arabic copy; use logical CSS properties; preserve English technical tokens appropriately; no Latin uppercase/tracking on Arabic. Check mobile 320/375/768, tablet 1024 and desktop 1440 in all **four locale/theme combinations**.

## Motion
Use CSS/IntersectionObserver and existing SectionReveal. Subtle 8–16px opacity/translation on entry (max 500ms), line/arrow motion 160–220ms, image hover scale <= 1.04, gently offset collage elements. No scroll hijacking, cursor-following, autoplay audio, CLS, or animations that gate SEO content. Respect `prefers-reduced-motion`, keyboard and touch.

## SEO/semantics
One meaningful H1 per page, nested semantic headings, canonical and actual published hreflang alternates, descriptive English/Arabic title and summary, alt text, non-keyword-stuffed skills and services, descriptive internal linking, high-quality FAQ answers. Preserve BreadcrumbList, ProfilePage, article structured data and sitemap / robots generation. Only publish Arabic hreflang when the URL actually serves a reliably localized, prerendered page; avoid duplicate canonical language links. Test crawler-rendered HTML, JSON-LD, og cards and sitemap. Keep hero and all important copy DOM selectable/accessible and present on initial render/prerender.

## Quality gate and delivery
1. Follow `AGENTS.md` and inspect nested instructions; inventory routes/assets and record existing verified claims.
2. Implement modular TSX/CSS/data and assets, no dead links. Remove visual inconsistencies rather than layering endless overrides.
3. Validate `npm ci`, `npm run lint`, `npm run test`, `npx tsc -b`, `npm run build`. Also test Vite prerender result, sitemap and route inventory. Fix failures before reporting completion.
4. Run responsive visual QA + automated contrast/WCAG checks, bilingual RTL, theme switching, keyboard focus and reduced motion.
5. Commit to `2026/10/dev` only, open/update PR targeting `main` without merging, provide changed-file summary, checks with links, and actual Vercel preview URL once deployment is verified. Never invent a preview URL.
6. Continue until scoped work is done, but never bypass failing checks or claim tests passed without observed results.

## Acceptance criteria
- Editorial, asymmetric **yet readable** at every supported width.
- Monochrome transparent hero avatar and independent cinematic portrait, both based on user image; performant OG JPEG.
- All requested expertise represented factually and discoverably.
- English/Arabic and dark/light quality parity, accessible focus/contrast.
- All existing live URLs and SEO equity preserved.
- Lint, tests, TypeScript and production build succeed before merging.
