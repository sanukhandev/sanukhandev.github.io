
# Sanu Khan Portfolio — Plan

Build a single-page dark portfolio matching the uploaded reference, using the new color palette and Montserrat typography. All page content lives in one editable data file. The hero portrait uses a placeholder you can swap later.

## Design System

- **Background:** jet-black `#0f1015` (page), `#16171d` (cards/surfaces), `#2b2f3b` (borders/dividers).
- **Text:** `#f0f1f4` primary, `#a7acbe` muted.
- **Primary accent:** Tea Green `#38c755` (buttons, badges, skill bars, highlights — keeps current look).
- **Secondary accents (used sparingly for chips/tags):** Magenta Bloom, Vibrant Coral, Beige/Lime — auto-assigned per tag.
- **Typography:** Montserrat (Google Fonts) — weights 400/500/600/700/800. Applied via Tailwind `font-sans`.
- **Radius/spacing:** rounded-xl cards, generous vertical rhythm, container max-width ~1100px.
- All colors registered as HSL CSS variables in `index.css` and exposed as Tailwind tokens.

## Page Sections (in order)

1. **Top nav** — "SanuKhan" logo left, links right (Home, About, Services, Works, Articles, Contact), green "Hire Me" button.
2. **Hero** — "Hi, I'm Sanu Khan ⚡", short tagline, role/location/availability lines, three stat tiles (14+, 150+, 50+), green "Hire Me" + outline "Download CV" buttons. Right side: placeholder avatar image.
3. **Web / Skills** — Section title with green pill label. Left: intro paragraph + bullet list of focus areas. Right: list of skills with green progress bars and percentages.
4. **Tech Stack** — Grid of small square tiles with icon + label (placeholder lucide icons).
5. **Services & Expertise** — 3-column card grid (5 cards). Each card: green icon badge, title, description, colored tag chips.
6. **Latest Works** — Tabs filter (All, Web, Mobile, etc.) + 3-column project cards with status badge, title, description, tag chips, year. "View All" outline button at bottom.
7. **Latest Articles** — 3-column article cards: category chip, title, excerpt, tags, "Read Article" link.
8. **Licenses & Certifications** — 3-column cards with issuer icon, title, "View Certificate" link. Numeric pagination (1, 2, 3+).
9. **Testimonials** — 3-column quote cards with avatar, name, role.
10. **Footer** — 4 columns (brand blurb + socials, Quick Links, Services, Get in Touch with green "Hire Me" button), bottom copyright row.

## Editable Data File

Single file: `src/data/siteData.ts` exporting typed objects so you edit content in one place:

```text
profile        → name, tagline, role, location, availability, stats, ctas, avatarUrl
skills         → intro, bullets, list of {name, percent}
techStack      → list of {name, icon}
services       → list of {icon, title, description, tags[]}
works          → list of {title, description, tags[], year, status, category}
articles       → list of {category, title, excerpt, tags[], url}
certifications → list of {issuer, title, url}
testimonials   → list of {quote, name, role, avatarUrl}
footer         → blurb, socials[], quickLinks[], services[], contact{}
nav            → links[]
```

Avatar uses `/placeholder.svg` for now — swap by changing `profile.avatarUrl`.

## Technical Notes

- Stack stays React + Vite + Tailwind + shadcn/ui.
- Add Montserrat via `<link>` in `index.html`; set as default `font-sans` in `tailwind.config.ts`.
- Extend Tailwind `colors` with the 5 palettes (jet-black, magenta-bloom, vibrant-coral, tea-green, beige) as full 50–950 scales for direct utility use.
- Update `index.css` HSL tokens so semantic shadcn components (cards, buttons, inputs) inherit the new dark theme automatically.
- Components organized under `src/components/sections/` (Hero, Skills, TechStack, Services, Works, Articles, Certifications, Testimonials, Footer) plus `src/components/Navbar.tsx`.
- Works tabs and Certifications pagination are client-side only, driven by the data file.
- Icons via `lucide-react` (already available).
- Fully responsive: 3-col → 2-col (md) → 1-col (sm). Sticky nav with mobile hamburger sheet.

## Out of Scope

- Real avatar image (placeholder only).
- Backend, forms submission, CMS, auth — purely static content from the data file.
