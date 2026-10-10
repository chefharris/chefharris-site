# Session — Website build, round 1 (2026-10-10)

First session in this repo. Input: `claude/website_build_brief_v1_2026-10-09.md` (v1.1)
and the signed docs it lists (kept locally in `claude/`, which is git-ignored — see report).
Brand files taken from the app repo's `docs/design/chef_harris_brand_v3/`.

---

## Prompt (verbatim)

```
Build the Chef Harris website. Read claude/website_build_brief_v1_2026-10-09.md (v1.1)
first and follow it exactly; the other signed docs it lists are in the claude/ folder
beside it. Brand files are in the app repo at
C:\Users\hkall\Desktop\Optimeal\docs\design\chef_harris_brand_v3\ — copy only the files
the brief names, never the masters folder, never recolour. Keep claude/ out of the
public site output. Stop only for the §6 list.
```

---

## Report

### Built
- Astro 5 static site, Markdown content collection for articles (`src/content/articles/`), no CMS, no server code.
- Six routes: `/`, `/[slug]`, `/app`, `/about`, `/impressum`, `/privacy`, plus `robots.txt` and `sitemap-index.xml`. Footer on every page: Impressum · Privacy · chefharris.app@gmail.com.
- Both signed articles: `soggy-stir-fry-vegetables` and `meat-sticks-to-pan` (slugs chosen by Claude Code — the handoff blocks name no URL; see "Unclear").
- Article anatomy per §3: H1, quick-answer card (sage wash on ivory, sage left border), body with `##` headings, internal links, app line as a plain sentence linking "Chef Harris" to `/app`, author line "— Harris" → `/about`. Metadata: title, meta description = quick answer, canonical, Open Graph with `hero_pan_toss` as default OG image (1200×1200 JPEG), `article:published_time`.
- Design: single column, 680 px measure, 20 px gutter, ivory #F8F3E9 page, sage #B3C29A header band with `lockup_horizontal_sage_2400.png`, terracotta #C05C35 links and the one button, near-black text, brown #4A2E1F headings (the wordmark "Chef" colour). No gold. Headings in TeX Gyre Schola Bold, self-hosted WOFF2 (33 kB, GUST Font License) — the exact wordmark font, so no Google Fonts request. Body: system sans. No animations, no carousel, no cookie banner.
- Brand files copied (3): `lockup_horizontal_sage_2400.png`, `hero_pan_toss_2048.png`, `app_icon_1024.png`. `masters/` not touched. Nothing recoloured; favicons are plain resizes (the apple-touch-icon has its transparent corners filled with page ivory because iOS needs an opaque square).
- `/app`: signed text, hero image, three dashed phone-shaped placeholder frames (no words), Kit plain HTML form posting to `https://app.kit.com/forms/<id>/subscriptions`, consent line verbatim. Form id is a TODO in `src/site.config.ts`.
- `/privacy`: signed text verbatim incl. the 10 Oct app section; email tool named as "Kit"; "Last updated: 10 October 2026" (config value, to be set to the launch date).
- Wiring: GoatCounter script on every page (code `chefharris`, config value); Search Console meta tag hook (renders when the config value is set); GitHub Actions workflow builds on push to `main` and deploys to Pages. Preview/production switch via two env lines in the workflow: preview builds (github.io URL) carry `noindex` and a `Disallow: /` robots.txt so the preview is never indexed; production builds write `CNAME`, canonical `https://chefharris.ch/...`, open robots.txt.
- README: how to add an article (incl. GitHub mobile app), the four Harris step lists (GoatCounter, Kit, Search Console, Infomaniak DNS + redirect click by click), the go-live switch, the §6 TODO list, repo setup.

### Verification
- `npm run build` passes in both modes. Output 7 pages, ~0.8 MB total.
- Lighthouse 12.8 (mobile emulation, headless Chrome, `astro preview` of the production build):

| Page | Performance | SEO | Accessibility | Best practices |
|---|---|---|---|---|
| `/` | 100 | 100 | 95 | 100 |
| `/soggy-stir-fry-vegetables` | 100 | 100 | 94 | 100 |
| `/meat-sticks-to-pan` | 100 | 100 | 94 | 100 |
| `/app` | 100 | 100 | 95 | 100 |

  Accessibility deduction is one audit, colour contrast: terracotta #C05C35 link text on ivory is about 3.9:1 (WCAG AA asks 4.5:1 for body-size text). The palette is signed; not changed. Harris can decide later whether links should use a darker terracotta.
- 380 px-wide headless screenshots of home, article and app page checked: no horizontal scroll, gutters hold, header lockup legible.
- Employer leak check: grep over the site output, README, workflow, commit message for the forbidden terms — none. Only "hobby cooks", "in person", "real kitchens".

### Not done / blocked (needs Harris — the §6 list)
1. **GitHub repo + first push.** No `gh` CLI on this machine and Claude Code is not allowed to read the stored GitHub credential, so the empty public repo `chefharris-site` must be created once on github.com (or `gh` installed and logged in). Everything is committed locally on `main`; the push is one command afterwards. Until then there is no Pages URL to review.
2. GoatCounter account (code `chefharris`), Kit account (paste back form id), Search Console (after the domain is live).
3. Infomaniak DNS + redirect — only when the 12-article buffer is ready.
4. 2–3 app screenshots for `/app`.
5. On-device review on the Pixel at the preview URL.

### Unclear — decided provisionally, flagged for Harris
- **Slugs.** The brief says "slug = the handoff block's URL", but neither handoff block contains a URL. Chosen by the D6 rule (problem in words, short): `soggy-stir-fry-vegetables`, `meat-sticks-to-pan`. Nothing is public yet, so they can still be renamed; after the domain is pointed they are sticky.
- **Article 02 internal link.** The handoff has "[link to "Oil goes in last"]" — that article does not exist yet. The sentence is rendered without a link, with a TODO comment in the Markdown to add it on publish day of "Oil goes in last". Article 01's "Boiled or steamed — that's a different article" has no link placeholder, so it is plain text.
- **Privacy, email tool.** Inserted the name only ("stored with Kit"). If Harris wants the country added like the GitHub line ("Kit, USA"), that is a one-word sign-off.
- **`claude/` folder.** The prompt says to keep it out of the public site output. Because the repo itself is public and the folder contains private notes (partner decisions, P.O. box costs, HR mention), it is git-ignored, so it is neither on the site nor in the repo. If Harris wants the signed docs in the repo, remove the line from `.gitignore`.
- **Quick-answer card colour.** §3 says "cream card", §4 says sage tint. Rendered as a light sage wash (#E3E4D1, sage over ivory) with a sage left border, which reads as both.
- **Sitemap file name.** The Astro integration emits `sitemap-index.xml` + `sitemap-0.xml` rather than a single `sitemap.xml`; robots.txt and the `<link rel="sitemap">` point to the index. Search Console accepts it.

### Not built (out of brief, listed only)
- A visible publish date on article pages (the date is in the file and in the Open Graph tag only).
- A `site.webmanifest` / PWA icons; not needed for the scores.
