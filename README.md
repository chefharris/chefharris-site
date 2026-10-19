# chefharris.ch

The landing page for the Chef Harris app, plus About, Impressum and Privacy. Static site built with [Astro](https://astro.build), hosted on GitHub Pages, cost CHF 0.

- Live preview (until the domain is pointed): https://chefharris.github.io/chefharris-site/
- Live domain (after `docs/GO_LIVE.md`): https://chefharris.ch

Every push to `main` rebuilds and deploys the site automatically (about one minute).

## Pages

| URL | What |
|---|---|
| `/` | Landing page: hero, email form, "What it does" with the four app screenshots, bio strip, email form again |
| `/about` | About Harris |
| `/privacy` | Privacy for the site and the app (the app's consent screen links here — the path never changes) |
| `/impressum` | Impressum |
| `/app` | Redirects to `/` (kept for the future store-listing link) |

The two signed articles are in the repo but not published (see "Publishing articles later"). Their URLs return 404 for now.

## Harris's photo (one-file swap)

The bio strip shows the cartoon face (`src/assets/brand/app_icon_face_only_1024.png`) until Harris's photo exists. To swap: save the photo as `src/assets/harris.jpg` (square crop, at least 400×400, warm, informal, home kitchen, daylight; no work uniform, logo, badge or recognisable workplace; not AI-generated) and push. The page picks it up by itself; no code change. Delete the file and the cartoon face comes back.

## App screenshots

`src/assets/screens/originals/` holds the four untouched captures (Pixel 7 Pro, 1440×3120; two from 18 Oct, two from 19 Oct 2026). `src/assets/screens/<name>.png` are the web copies: the same box cropped from every capture (the status bar at the top, and everything from the red DEV strip down, i.e. the strip and the Android navigation bar), 720 px wide, lossless. The build turns them into 360/720 px WebP (quality 90) with PNG fallback, and the phone frame on the Home page has the same aspect as the crop, so nothing is hidden. To replace a screenshot: drop the new capture into `originals/` under the same name, then

```
node scripts/make-screens.mjs
```

which rebuilds all four web copies and `docs/sessions/2026-10-18_W2_screens_preview.png`. The crop box is the two numbers at the top of that script. Nothing else is ever done to the pictures: no recolouring, no retouching, no stretching.

## Share image

`public/og-landing.png` (1200×627: sage, the cream lockup box, the headline) is the preview card on LinkedIn, WhatsApp and Reddit for `/` and `/about`. Regenerate with `node scripts/make-og-landing.mjs` (needs a local Chrome; set `CHROME=<path>` if it is not in the default place).

## Publishing articles later

Each article file in `src/content/articles/` has `published: false` in its header. To publish one: delete that line (or set it to `true`), commit, push. The page is live a minute later at `chefharris.ch/<file-name>` and appears in the sitemap.

Not built yet: the "From my kitchen" list on the Home page. It comes back together with the first published article and needs Harris's sign on its heading and placement first.

## Adding an article

One Markdown file = one article.

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
   and to the app like [Chef Harris](/).
   ```

   - `title` becomes the H1 and the browser title.
   - `quickAnswer` becomes the "Quick answer" card at the top and the search-engine description. Write it without the words "Quick answer:" — the card adds them.
   - `date` is the publish date. It appears nowhere in the URL.
   - Leave out `published` (or write `published: true`) and the article is live on push; `published: false` keeps it in the repo without a page.
3. Commit and push (Claude Code does this; or use the GitHub mobile app: open the repo → `src/content/articles` → "+" → create file → paste → commit to `main`).

Only signed, publish-ready articles go in. Drafts never live in this repo — it is public.

## The few values Harris pastes in

All in `src/site.config.ts`:

| Key | What it is | Status |
|---|---|---|
| `goatcounterCode` | GoatCounter site code (`https://<code>.goatcounter.com`) | set to `chefharris` |
| `googleSiteVerification` | the `content="…"` value from Google Search Console's HTML-tag method (only if the TXT-record method in `docs/GO_LIVE.md` is not used) | empty |
| `kitFormId` | the numeric form id from Kit | set (`10026726`, the "App launch" form) |
| `kitTesterTagId` | the numeric id of the Kit tag `tester-interest` | set (`24794691`, 19 Oct 2026) |
| `privacyLastUpdated` | the "Last updated" date on /privacy; changes only when the privacy text changes | 18 October 2026 |

Push after editing; the site rebuilds.

## Harris's step lists

### 1. GoatCounter (visit counter, cookie-free) — done

Account `chefharris`, dashboard https://chefharris.goatcounter.com. The two email forms also send an event on submit, `signup-top` and `signup-bottom`; they show up in the dashboard under "Events" (toggle at the top of the paths list). The count is taken as the form is sent to Kit, so it counts submits, not confirmed subscribers — the confirmed number is in Kit.

### 2. Kit (email list) — form and tag done, one small setting open

Done on 10 Oct 2026: both forms on the Home page post to Kit form `10026726` ("App launch", double opt-in on). Kit's own embed script is not used; the plain HTML form posts the email, the tester checkbox and a hidden `source` field.

Done 19 Oct 2026: tag `tester-interest` = `24794691`, set in `kitTesterTagId`; the checkbox sends it.

Still open, free, in Kit:

1. **Custom field `source`** (where a signup came from: `linkedin`, `reddit`, `instagram`, `betalist`, `whatsapp`, … or `direct`). Kit only stores a field it already knows, so create it once: Grow → **Subscribers** → open any subscriber → **Add a new field** → name `source` → Save. From then on every signup carries it.
2. ~~Tag `tester-interest`~~ — done (`24794691`). If the tag is ever recreated in Kit, its new number goes into `kitTesterTagId`.

**Test signups, one per form** (after the `source` field exists; `+something` addresses land in the normal inbox):

| | Open | Tick the box? | Email |
|---|---|---|---|
| Top form | `https://chefharris.github.io/chefharris-site/?ref=test` | yes | `chefharris.app+top@gmail.com` |
| Bottom form | the same page, scroll to the bottom form | no | `chefharris.app+bottom@gmail.com` |

Each "Tell me" lands on Kit's "check your email" page; click the confirmation link in both emails (double opt-in). Then in Kit → **Subscribers**: both addresses are listed as confirmed, both show `source: test`, only the top one carries the tag `tester-interest`; the "App launch" form shows the two signups. In GoatCounter → Events: one `signup-top`, one `signup-bottom`. Afterwards delete the two test subscribers in Kit (open the subscriber → ⋯ → Delete) so the real list starts clean.

Sharing links later: add `?ref=<source>` to the link you post, e.g. `https://chefharris.ch/?ref=linkedin`. Letters, digits, `-` and `_` only; anything else counts as `direct`.

Export of the list: Grow → Subscribers → Export (CSV). No sequences or automations are set up; the launch email is a plain Broadcast.

### 3. Go live on chefharris.ch

All clicks in **`docs/GO_LIVE.md`**: Infomaniak DNS, the chefharris.app redirect, GitHub Pages custom domain and HTTPS, the "domain live" message, then Search Console and the sitemap.

The build switch itself is prepared on the branch `go-live` (workflow env lines → `https://chefharris.ch`, plus `public/CNAME`). It is merged and pushed only after Harris says "domain live". Until then preview builds keep the `noindex` tag and a `Disallow: /` robots.txt.

## Open TODOs

- [x] Settings → Pages → Source: GitHub Actions
- [x] GoatCounter account (code `chefharris`)
- [x] Kit account and form id
- [x] Four app screenshots (18–19 Oct 2026, cropped per `scripts/make-screens.mjs`)
- [ ] Harris: check `docs/sessions/2026-10-18_W2_screens_preview.png` and the Home page on the Pixel
- [x] Kit tag number in `kitTesterTagId` (19 Oct 2026)
- [ ] Harris: Kit custom field `source` (step list 2), then the two test signups
- [ ] Harris: `docs/GO_LIVE.md` A–C, then "domain live" → Claude Code merges `go-live`
- [ ] Harris: Search Console + sitemap (GO_LIVE.md E)
- [ ] Later: Harris's photo as `src/assets/harris.jpg`
- [ ] Later: publish the first article and bring back the Home list (needs Harris's sign)

## Repo setup (one-time, done)

The repo is `github.com/chefharris/chefharris-site` (public). Settings → Pages → Source is **GitHub Actions**. Git author in this repo's local config: Chef Harris <chefharris.app@gmail.com>.

## Working on the site locally

```
npm install                      # once
npm run dev                      # http://localhost:4321
npm run build                    # production build into dist/ (domain URLs)
node scripts/make-favicons.mjs   # regenerate the favicon files from the brand icon
node scripts/make-og-landing.mjs # regenerate the share image
node scripts/make-screens.mjs    # recrop the app screenshots and the preview sheet
```

Preview-mode build (github.io URLs, as the workflow does it): set `SITE_URL=https://chefharris.github.io` and `BASE_PATH=/chefharris-site` before `npm run build`.

## What is where

- `src/pages/` — `index` (landing page), `about`, `privacy`, `impressum`, `app` (redirect), `[slug]` (article template, only for `published` articles), `robots.txt`
- `src/components/` — `Header`, `Footer`, `SignupForm` (the Kit form, used twice on the Home page)
- `src/layouts/Base.astro` — head tags (title, description, canonical, Open Graph and Twitter card, favicon, GoatCounter, Search Console tag), header, footer
- `src/content/articles/` — the articles (Markdown, `published: false` until Harris publishes)
- `src/styles/global.css` — the palette and the one-column layout
- `src/assets/brand/` — brand files from the v3 pack (sage lockup, cream lockup, hero pan toss, app icon, face-only icon). Never recoloured; resized only by the build.
- `src/assets/screens/` — the four app screenshots (web copies) and `originals/`
- `public/og-landing.png` — the share image; `public/fonts/` — TeX Gyre Schola Bold (the wordmark font) as WOFF2, self-hosted, GUST Font License alongside
- `.github/workflows/deploy.yml` — build and deploy to GitHub Pages; the two env lines decide preview vs. domain
- `docs/GO_LIVE.md` — Harris's go-live clicks; `docs/sessions/` — every Claude Code prompt and report

## Rules this repo follows

- All visible text is the signed text; no copy is invented here.
- Nothing on the site, in the repo, in alt text or in commit messages names the place where Harris teaches or anyone he teaches. "Hobby cooks", "in person", "real kitchens" only.
- No cookies, no cookie banner, no comments, no search, no share buttons, no pop-ups, no counters, no German, no paid service. The only form is the Kit email form on the Home page.
- Brand files are placed, never redrawn or recoloured. Screenshots get one fixed crop (status bar, DEV strip, navigation bar) and nothing else.
