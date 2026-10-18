# Claude Code prompt — website round R2: app landing page — 15 Oct 2026 (v3, final — all texts SIGNED 16:15)
Repo: `chefharris-site` (NOT the app repo). Run AFTER the screenshot session (`claude/app_screenshots_prompt_2026-10-15.md`) so the real screenshots go straight in. Paste everything below the line into Claude Code, opened in the site project.
Signed texts master copy: `claude/website_landing_texts_SIGNED_2026-10-15.md`. The site goes live without Harris's photo — cartoon face in the bio strip until then.

**Addendum 17 Oct 2026:** superseded by `website_W2_prompt_2026-10-18.md`, which runs this spec plus the screenshots and the privacy app section in one round. Do not run this file on its own.

---

You are working in the `chefharris-site` repo (Astro static site, GitHub Pages, built under build brief v1.1). This round turns the site from blog-first into an **app landing page**, removes the articles from the live site for now, and prepares it to go public on chefharris.ch.

All visible text below is **signed by Harris (15 Oct 2026) and must be used verbatim** — no rewording, no added copy. If anything is unclear or contradicts what's in the repo, stop and list it in the report; do not invent a decision.

## 0. Before you change anything
1. `git pull`, confirm a clean tree, run the build once.
2. Save this prompt as `docs/sessions/2026-10-15_R2_landing_prompt.md`.

## 1. New Home page (`/`) — top to bottom

### 1.1 Hero
- Logo lockup header (unchanged).
- H1: `Cook by feel, not by luck.`
- Paragraph: `Chef Harris is a cooking app that teaches you the why: what to look, listen and taste for, and how to save a dish when the pan surprises you. In English and German.`
- Small line (muted): `Coming early 2027.`
- Image: `hero_pan_toss` (existing optimised asset), alt: `Chef Harris tossing vegetables in a pan`.

### 1.2 Email form — first placement (directly under the hero, above the fold on a 380px phone if possible)
- Heading: `Want to know when it's ready?`
- Email field + button `Tell me`
- Checkbox (unticked by default): `I'd like to test it before launch (limited spots).`
- Consent line: `I'll write when the app is ready — and after that only when there's something worth your time. Leave whenever you like.`

### 1.3 Section "What it does"
Section heading: `What it does`. Four items, each = title + one line + one screenshot. Phone: stacked; wider screens: 2×2 grid. Show each screenshot in a simple phone-shaped frame (CSS, rounded corners, thin border — no device mockup images). Files: `src/assets/screens/fridge-clearer.png`, `cook-mode.png`, `sos.png`, `what-you-learned.png`. If they're in the repo (from the screenshot session), use them; if not, use clearly marked placeholders with the same filenames and report it — **the site does not go public with placeholder screenshots**. Alt text = the item title.

- **Fridge Clearer** — `Tell me what's left in the fridge. I'll give you three dinners that use it up, made with the gear you actually have.`
- **Cook Mode** — `Step by step, with what to see, hear and smell — not just minutes.`
- **SOS** — `Something's off mid-cook? Ask me, and I'll tell you what happened and how to save it.`
- **What you learned** — `After every dish, one thing you keep for next time.`

### 1.4 Bio strip
- Round image, **for now the cartoon face**: `brand_fixed/app_icon_face_only_1024.png` from the app repo's `docs/design/chef_harris_brand_v3/` (or the closest face-only v3 file there — report which). Never recolour.
- Build it so the image comes from one file, `src/assets/harris.jpg` if it exists, otherwise the cartoon face — so Harris's real photo later is a one-file drop-in, no code change. README: one line on how to swap it.
- Alt: `Harris`.
- Text: `Hi, I'm Harris — a chef from the Greek countryside, raised among farmers, teaching hobby cooks for years. This app is me in your kitchen when I can't be there.`
- Link: `More about me →` → `/about`

### 1.5 Email form — second placement
Identical to 1.2 (same Kit form, same fields, same text).

### 1.6 Remove from Home
- The old intro paragraph ("I'm a professional chef from the Greek countryside, and for years now…").
- The `Meet the app →` button.
- The "Latest articles" list.

## 2. Articles — off the live site, files kept
- Do **not** delete the two article Markdown files. Add `published: false` (or the repo's equivalent) so they're excluded from the build, the sitemap and any list. Their URLs must return 404 for now.
- README: one short section "Publishing articles later" — how to flip an article back on (and that a "From my kitchen" list on Home comes back with it, which needs Harris's sign then). Don't build that list now.

## 3. `/app` and `/about`
- `/app`: keep the URL working (future store-listing link) — static meta-refresh redirect to `/` + canonical to `/`. Remove the old "coming soon" content.
- `/about`: replace exactly this one sentence:
  - OLD: `That's what I write about here: what actually happened in the pan, why, and what to do next time.`
  - NEW: `That's what I teach, in person and now in the app: what actually happened in the pan, why, and what to do next time.`
  Nothing else on /about changes. Make sure /about contains no links to article pages (they'd 404).

## 4. Privacy page — one line
In the "This website" section replace exactly:
- OLD: `If you leave your email on the app page, it's stored with Kit (USA) only to send you news about the app — rarely, and never shared. Email chefharris.app@gmail.com any time and it's deleted.`
- NEW: `If you leave your email on this site, it's stored with Kit (USA) only to send you news about the app and, if you ticked the box, an invitation to test it — rarely, and never shared. Email chefharris.app@gmail.com any time and it's deleted.`
Set "Last updated" to the date this goes live.

## 5. Kit wiring (free plan, CHF 0)
- Both placements post to the **same** existing Kit form ("App launch"). Double opt-in stays on.
- **Tester checkbox** → ticked = subscriber gets tag `tester-interest` (or the closest mechanism Kit's free plan supports for a plain HTML form).
- **Source tracking** → read `?ref=` from the page URL (`linkedin`, `reddit`, `instagram`, `betalist`, `whatsapp`, …) and pass it to Kit as custom field `source` (or tag `src-<value>` if fields aren't available on free). No ref → `direct`.
- If any of this is NOT possible on Kit's free plan: do not pay, do not switch tools — build what works and list the gap in the report with the closest free alternative.
- GoatCounter event on successful submit: `signup-top` / `signup-bottom`.
- **Test**: write exactly how Harris does one real test signup per placement (with/without checkbox, with `?ref=test`) and what he should see in Kit afterwards.

## 6. Share image (the preview card when the link is pasted on LinkedIn, WhatsApp, Reddit)
- Create `og-landing.png`, **1200×627**: sage background (#B3C29A), the cream lockup box with the logo (Harris's rule: cream box on sage), and the headline `Cook by feel, not by luck.` in the heading serif, dark brown #4A2E1F. Nothing else. Never recolour or redraw brand files.
- Wire it as Open Graph + Twitter image for `/` (and `/about`). `og:title`: `Chef Harris — Cook by feel, not by luck.` · `og:description` = the hero paragraph.
- Commit a PNG preview so Harris can check it on his phone.

## 7. Going public (prepare, don't flip without Harris)
- Prepare the change that removes `noindex` and sets canonical/sitemap/robots to `https://chefharris.ch` as a separate commit — **do not deploy it** until Harris says the domain is live. The photo is NOT a blocker; real screenshots are.
- Re-check the README step list for Infomaniak (DNS for `chefharris.ch` + `www`, redirect `chefharris.app` → `https://chefharris.ch`) and GitHub Pages custom domain + HTTPS. Click by click.
- Search Console: keep the verification hook; step list for after go-live.

## 8. Rules (non-negotiable)
- **Employer leak check** on every changed file, alt text, metadata, commit message, README: no employer, client site, "corporate", or student names. "Hobby cooks" / "in person" / "real kitchens" only.
- "craving/cravings" never appears.
- English only. No features beyond this prompt (no testimonials, pricing, counters, pop-ups, cookie banner, share buttons).
- Same palette, fonts and one-column feel as now; no design round. Judge on a 380px phone first.
- Cost CHF 0.

## 9. Definition of done
- Build passes; deployed to the GitHub Pages preview (still `noindex`).
- `/`, `/about`, `/privacy`, `/impressum` render correctly at 380px; `/app` redirects to `/`; article URLs 404; sitemap lists only live pages.
- Lighthouse (mobile): performance and SEO ≥ 90.
- `og-landing.png` exists and is wired.
- Session report committed as `docs/sessions/2026-10-15_R2_landing_report.md`.

## 10. Report back (short, plain words)
1. What changed, with the preview URL.
2. **Harris list**, in order: screenshots still missing (if any) · Kit test signups · Infomaniak clicks · tell you "domain live" so you flip noindex · later: drop his photo in as `src/assets/harris.jpg`.
3. Anything Kit's free plan couldn't do, and what you did instead.
4. Anything unclear.
