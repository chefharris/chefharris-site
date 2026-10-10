# chefharris.ch

Harris's cooking articles and the "coming soon" page for the Chef Harris app.
Static site built with [Astro](https://astro.build), hosted on GitHub Pages, cost CHF 0.

- Live preview (until the domain is pointed): https://chefharris.github.io/chefharris-site/
- Live domain (after the "Go live" step below): https://chefharris.ch

Every push to `main` rebuilds and deploys the site automatically (about one minute).

## Adding an article

One Markdown file = one article. Nothing else to do.

1. Create `src/content/articles/<slug>.md`. The file name is the URL (`chefharris.ch/<slug>`): lowercase, hyphens, the problem in words, no dates. It never changes after publishing.
2. Start the file with this header, then the article body underneath:

   ```markdown
   ---
   title: "Why your onions never brown — and the fix"
   quickAnswer: "the pan is too crowded and the heat too low. Fewer onions, more heat, more patience."
   date: 2026-10-24
   ---

   First paragraph of the article…

   ## A heading that talks

   More text. Link to another article like [this](/soggy-stir-fry-vegetables)
   and to the app page like [Chef Harris](/app).
   ```

   - `title` becomes the H1 and the browser title.
   - `quickAnswer` becomes the "Quick answer" card at the top, the line under the title on the home page, and the search-engine description. Write it without the words "Quick answer:" — the card adds them.
   - `date` is the publish date. It appears nowhere in the URL; it only orders the home page (newest first).
   - Bold section lines from the draft become `## ` headings. The app line from the handoff block goes last, as a normal sentence with `[Chef Harris](/app)` as the link.
3. Commit and push (Claude Code does this; or use the GitHub mobile app: open the repo → `src/content/articles` → "+" → create file → paste → commit to `main`). The article is live about a minute later.

Only signed, publish-ready articles go in. Drafts never live in this repo — it is public.

## The few values Harris pastes in

All in `src/site.config.ts`:

| Key | What it is | Status |
|---|---|---|
| `goatcounterCode` | GoatCounter site code (`https://<code>.goatcounter.com`) | set to `chefharris` — change only if that code was taken |
| `googleSiteVerification` | the `content="…"` value from Google Search Console's HTML-tag method | **TODO** — empty |
| `kitFormId` | the numeric form id from Kit | **TODO** — empty; the email form on /app posts to a placeholder until set |
| `privacyLastUpdated` | the "Last updated" date on /privacy | set to the go-live date when the domain is pointed |

Push after editing; the site rebuilds.

## Harris's step lists

### 1. GoatCounter (visit counter, cookie-free) — about 5 minutes

1. Go to https://www.goatcounter.com/signup and sign up with chefharris.app@gmail.com.
2. For "Code" enter `chefharris` (this gives `https://chefharris.goatcounter.com`, which the site already uses). Leave everything else default; it is free.
3. If `chefharris` is taken, use another code and paste back **the one line**: `goatcounterCode: '<your code>'`.

Counts start arriving as soon as the site is visited. Dashboard: `https://<code>.goatcounter.com`.

### 2. Kit (email list for the app page) — about 5 minutes

1. Go to https://kit.com and create a free account with chefharris.app@gmail.com (the free "Newsletter" plan; no card).
2. Grow → Landing Pages & Forms → "Create new" → Form → Inline → any minimal template → name it "App launch" → Save.
3. On the form's page click "Publish" → "HTML" tab. The embed code contains an address like `https://app.kit.com/forms/1234567/subscriptions`. Paste back **the one line**: `kitFormId: '1234567'`.
4. Export of the list: Grow → Subscribers → "Export" gives a CSV at any time. No sequences or automations are set up; the one launch email is a plain "Broadcast".

Until step 3 is done, the "Tell me" button submits to a placeholder address and shows an error page. This is the only TODO on the visible site.

### 3. Google Search Console — about 5 minutes, only after the domain is live

1. Go to https://search.google.com/search-console and sign in with chefharris.app@gmail.com.
2. "Add property" → choose the **URL prefix** type → enter `https://chefharris.ch/` → Continue.
3. Under "HTML tag" copy the long value inside `content="…"` and paste back **the one line**: `googleSiteVerification: '<that value>'`. After the site has rebuilt (one minute), click "Verify".
4. Once verified: Sitemaps → enter `sitemap-index.xml` → Submit.

### 4. Infomaniak: DNS for chefharris.ch and the redirect for chefharris.app — click by click

Do this only when the 12-article buffer is ready (Harris's launch rule).

**A. DNS records for chefharris.ch** (Infomaniak Manager → Domains → chefharris.ch → DNS zone)

Delete any existing `A`, `AAAA` or `CNAME` record for `@` (the bare domain) and for `www` that Infomaniak pre-filled (usually a parking page or a web-hosting pointer). Then add:

| Type | Name (source) | Target | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | default |
| A | `@` | `185.199.109.153` | default |
| A | `@` | `185.199.110.153` | default |
| A | `@` | `185.199.111.153` | default |
| AAAA | `@` | `2606:50c0:8000::153` | default |
| AAAA | `@` | `2606:50c0:8001::153` | default |
| AAAA | `@` | `2606:50c0:8002::153` | default |
| AAAA | `@` | `2606:50c0:8003::153` | default |
| CNAME | `www` | `chefharris.github.io.` | default |

Infomaniak's "Add a record" dialog: pick the type, type the name (`@` or `www`), paste the target, Save. Nine records in total. Email records (`MX`) are not touched.

**B. Redirect chefharris.app → https://chefharris.ch** (Infomaniak Manager → Domains → chefharris.app)

1. Open the domain → "Redirection" (labelled "Web redirection" / "Redirect the domain" depending on the Manager version).
2. Choose "Redirect to a URL", type `https://chefharris.ch`, pick "Permanent (301)", and tick the option to include the `www` subdomain if offered. Save.
3. If the domain is attached to a web hosting instead, the same setting is under that hosting → Domains → chefharris.app → "Redirection".

**C. Tell GitHub about the domain** (once, after A)

1. In this repo on github.com: Settings → Pages → "Custom domain" → enter `chefharris.ch` → Save. GitHub checks the DNS (a few minutes up to an hour).
2. When the check is green, tick "Enforce HTTPS" (it appears once the certificate is issued, usually within an hour).

**D. Switch the build to the domain** (Claude Code does this on request)

In `.github/workflows/deploy.yml` set `SITE_URL: https://chefharris.ch` and `BASE_PATH: /`, set `privacyLastUpdated` in `src/site.config.ts` to the launch date, push. The build then writes the `CNAME` file, removes the preview-only `noindex` tag and opens `robots.txt` to search engines. Then do step 3 (Search Console).

### 5. App screenshots for /app

Supply 2–3 screenshots (phone size, PNG or JPG) from the Chef Harris build after fix round B with the v3 brand. They replace the three dashed placeholder frames on the app page. Any folder or message works; Claude Code drops them into `src/assets/` and wires them.

## Open TODOs (the §6 list)

- [ ] Settings → Pages → Source: GitHub Actions, then re-run the workflow — see "Repo setup" below
- [ ] GoatCounter account (step list 1) — then confirm the code or paste back the new one
- [ ] Kit account (step list 2) — paste back the form id
- [ ] 2–3 app screenshots (step list 5)
- [ ] On-device review on the Pixel at the preview URL
- [ ] When 12 articles are ready: Infomaniak DNS + redirect (step list 4), then Search Console (step list 3)

## Repo setup (one-time)

The repo is `github.com/chefharris/chefharris-site` (public). One setting has to be switched on by hand, because the Actions token is not allowed to create the Pages site itself:

1. On github.com open the repo → Settings → Pages.
2. Under "Build and deployment" set **Source** to **GitHub Actions**. Nothing else to fill in.
3. Back under Actions, open the failed "Deploy to GitHub Pages" run → "Re-run all jobs" (or push any commit). About a minute later the preview URL above is live.

## Working on the site locally

```
npm install                      # once
npm run dev                      # http://localhost:4321
npm run build                    # production build into dist/ (domain URLs)
node scripts/make-favicons.mjs   # regenerate the favicon files from the brand icon
```

Preview-mode build (github.io URLs, as the workflow does it): set `SITE_URL=https://chefharris.github.io` and `BASE_PATH=/chefharris-site` before `npm run build`.

## What is where

- `src/content/articles/` — the articles (Markdown)
- `src/pages/` — the six pages: home, `[slug]` (article template), app, about, impressum, privacy, plus `robots.txt`
- `src/layouts/Base.astro` — head tags (title, description, canonical, Open Graph, favicon, GoatCounter, Search Console tag), header, footer
- `src/styles/global.css` — the palette and the reader layout
- `src/assets/brand/` — the three brand files the site uses (v3 pack: sage lockup, hero pan toss, app icon). Never recoloured; resized only by the build.
- `public/fonts/` — TeX Gyre Schola Bold (the wordmark font) as WOFF2, self-hosted, GUST Font License alongside
- `.github/workflows/deploy.yml` — build and deploy to GitHub Pages
- `docs/sessions/` — every Claude Code prompt and report, as in the app repo

## Rules this repo follows

- All visible text is the signed text; no copy is invented here.
- Nothing on the site, in the repo, in alt text or in commit messages names the place where Harris teaches or anyone he teaches. "Hobby cooks", "in person", "real kitchens" only.
- No cookies, no cookie banner, no comments, no search, no newsletter box outside /app, no share buttons, no German, no paid service.
