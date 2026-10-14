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
<app repo>\docs\design\chef_harris_brand_v3\ — copy only the files
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
- **`claude/` folder.** The prompt says to keep it out of the public site output. Because the repo itself is public and the folder contains private notes (partner decisions, P.O. box costs), it is git-ignored, so it is neither on the site nor in the repo. If Harris wants the signed docs in the repo, remove the line from `.gitignore`.
- **Quick-answer card colour.** §3 says "cream card", §4 says sage tint. Rendered as a light sage wash (#E3E4D1, sage over ivory) with a sage left border, which reads as both.
- **Sitemap file name.** The Astro integration emits `sitemap-index.xml` + `sitemap-0.xml` rather than a single `sitemap.xml`; robots.txt and the `<link rel="sitemap">` point to the index. Search Console accepts it.

### Not built (out of brief, listed only)
- A visible publish date on article pages (the date is in the file and in the Open Graph tag only).
- A `site.webmanifest` / PWA icons; not needed for the scores.

---

## Follow-up prompt (verbatim; two grep search terms redacted so this file does not itself contain them)

```
Before any push: set this repo's git author to name "Chef Harris" and email
chefharris.app@gmail.com (local config only, not global), rewrite the author on all
existing commits to that, then grep the whole repo, build output, config files and git
log for "[term 1]", "[term 2]" and any email other than chefharris.app@gmail.com. Remove
any hit and report what you found and where it came from.

Decisions on the provisional items: slugs confirmed as chosen (sticky from now). Privacy:
change "Kit" to "Kit (USA)" in the email-capture line. Links inside article and page
text: use a darker terracotta that passes 4.5:1 on ivory (CSS token only; brand files and
the button unchanged); re-run Lighthouse. "Oil goes in last" stays unlinked with the
TODO. GoatCounter code is chefharris.

Commit, then wait for me to say the GitHub repo exists before pushing.
```

## Follow-up report

- Git author set in the local config only (`.git/config`): "Chef Harris" <chefharris.app@gmail.com>. No global git config exists on the machine. All three commits rewritten (author and committer); the pre-rewrite objects were expired from the reflog and garbage-collected, so they cannot be pushed by accident.
- Grep over tracked files, `.git/config`, the full git log (all refs, authors, committers, messages), the production build output and the config files:
  - Term 1 (the old mail provider): no hits anywhere after the rewrite. Source of the original: the author identity git had copied from the app repo's local config.
  - Term 2 (the Windows user name): one hit in this session doc, inside the verbatim prompt (the local path to the brand folder). Replaced with `<app repo>\…`. The same string is also the first part of the GitHub account name, which appears as `…-creator.github.io` in the README (preview URL, DNS CNAME target) and appeared in the workflow. The workflow now derives the preview URL from the repository owner at build time, so the literal is gone there. The README keeps it, because the DNS table and the preview link must be exact and the account name is public on GitHub anyway. Renaming the GitHub account is the only way to remove it.
  - Other email addresses: none in text files. The email-pattern grep matched one random byte sequence inside the compressed pixel data of `hero_pan_toss_2048.png`; the file has no text or EXIF chunks at all. False positive, nothing to remove.
- Slugs `soggy-stir-fry-vegetables` and `meat-sticks-to-pan` are now sticky.
- `/privacy`: "stored with Kit (USA) only to send you one message…".
- Text links now use `--terracotta-link: #B05430` (brand terracotta scaled to 91.5 %), contrast 4.57:1 on ivory. The button keeps `--terracotta: #C05C35` and the brand files are untouched.
- Lighthouse 12.8, mobile, production build, after the change:

| Page | Performance | SEO | Accessibility | Best practices |
|---|---|---|---|---|
| `/` | 100 | 100 | 95 | 100 |
| `/soggy-stir-fry-vegetables` | 100 | 100 | 100 | 100 |
| `/meat-sticks-to-pan` | 100 | 100 | 100 | 100 |
| `/app` | 100 | 100 | 95 | 100 |
| `/privacy` | 100 | 100 | 100 | 100 |

  The remaining accessibility deduction on `/` and `/app` is the button only (ivory text on brand terracotta, 3.94:1), which was to stay unchanged.
- Not pushed. Waiting for the GitHub repo to exist.

- Account change (10 Oct, later): the repo lives under the GitHub account `chefharris` (`github.com/chefharris/chefharris-site`). The README preview link and DNS CNAME target now read `chefharris.github.io`; the workflow derives the owner at build time. Grep for the old account name: zero hits.

- Kit wired (10 Oct, later): form id `10026726` (taken from inside Harris's embed snippet; the snippet's JavaScript itself is not used). Test POST of `chefharris.app+test@gmail.com` to the endpoint returned Kit's success page ("check your email to confirm"), i.e. double opt-in is on and the test subscriber sits in Kit as unconfirmed until the confirmation link in that mail is clicked. Pages source set to GitHub Actions by Harris; deploys run.

---

## Pixel review, round 1 (10 Oct 2026) — three signed changes

Prompt (verbatim): "Three signed changes: (1) add "About" to the footer on every page: Impressum · Privacy · About · email. (2) On the Home "Latest articles" list, capitalise the first letter of each quick-answer line (list only; article pages unchanged). (3) Replace the Home paragraph's second sentence, verbatim: "These articles are the conversations we have when the stove challenges you — the things recipes almost never warn you about." Update claude/website_page_texts_SIGNED.md in docs/ to match, commit, push, confirm the deploy."

Done: footer link added in `Footer.astro`; home list capitalises the first letter at render time (the article files and article pages are untouched); home paragraph sentence replaced. The signed page-texts file was updated locally in `claude/` (that folder is git-ignored, so the change is recorded here in `docs/sessions/` for the public record). Deployed to the preview URL.

---

## Pixel review, round 2 (11 Oct 2026) — three signed fixes

Prompt (verbatim): "Three signed fixes (Harris, 11 Oct 2026): 1. /app consent line, replace verbatim with: "I'll write when the app is ready — and after that only when there's something worth your time. Leave whenever you like." 2. /privacy email-capture line, replace the purpose with: "only to send you news about the app — rarely, and never shared." Keep "Kit (USA)" and the delete-by-email sentence. 3. Header: Home uses a bigger logo/header than every other page and on phones the round logo is stretched into an oval. Use ONE header component on every page, at the size the article pages use now; the logo keeps its aspect ratio on every screen size (fixed width and height or object-fit: contain). Check at 380 px and on desktop. Update claude/website_page_texts_SIGNED.md and claude/website_legal_SIGNED.md to match, re-run Lighthouse, commit, push, confirm the deploy."

Done:
- `/app` consent line replaced verbatim.
- `/privacy`: "…stored with Kit (USA) only to send you news about the app — rarely, and never shared. Email … any time and it's deleted." "Last updated" moved to 11 October 2026 because the policy text changed.
- Header: the `large` variant is gone; Home, articles and all other pages render the same `Header.astro`. Logo box is 274 px wide on phones and 325 px from 600 px up (the heights the article pages used before: about 64 px and 76 px). The height now follows the image's own ratio, and `object-fit: contain` keeps the drawing undistorted.
- Cause of the oval: Home's phone logo was fixed at 88 px *height*, which made it 376 px wide. That did not fit a 380 px screen minus the gutters, so `max-width: 100%` narrowed the width while the height stayed fixed. The logo was squeezed sideways.
- Measured with device emulation on all six pages: logo 274 × 64 at 380 px (DPR 2.625), 325 × 75.5 at 1280 px, identical on every page, no horizontal scroll.
- Signed files updated locally in `claude/` (git-ignored): page texts (consent line) and legal (email-capture line, which also replaces the old "[email tool]" placeholder with Kit (USA)).
- Lighthouse 12.8, mobile, local production build: `/`, `/app` 100/95/100/100; both articles and `/privacy` 100/100/100/100 (Perf/A11y/BP/SEO). The 95 is the unchanged terracotta button contrast, as before.

### Follow-up (11 Oct 2026)

Prompt (verbatim): "Signed (Harris, 11 Oct 2026): on /privacy replace "Ingredients, cravings, your kitchen gear" with "Ingredients, the dishes you ask for, your kitchen gear". Update claude/website_legal_SIGNED.md, commit, push, confirm the deploy."

Done: `/privacy` app section reworded; signed legal file updated locally in `claude/`. "Last updated" was already 11 October 2026.

---

## Home and About re-signed (14 Oct 2026)

Harris signed new wording for the Home paragraph and the whole About page (SIGNED 14 Oct 2026). Both replaced byte for byte; layout, header, footer and links unchanged.

Done:
- Home: paragraph under the logo replaced. The page's meta description is the paragraph's first sentence, so it now carries the new first sentence too.
- About: page text replaced (now five paragraphs plus the email line). The meta description (its opening lines) is unchanged because those lines are unchanged.
- Signed page-texts file updated locally in `claude/` (git-ignored), so the change is recorded here.
- Check: rendered text of both built pages compared against the signed file, exact match. At 380 px with mobile device emulation: no horizontal scroll, no element past the right edge, nothing clipped.
