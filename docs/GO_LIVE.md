# Go live on chefharris.ch — Harris's clicks

Plain steps, in order. Everything is free. The site stays on the preview URL (https://chefharris.github.io/chefharris-site/) and hidden from search engines until step D is done.

The GitHub Pages addresses below were checked against GitHub's own documentation on 18 October 2026 ("Managing a custom domain for your GitHub Pages site"). If GitHub's page shows different numbers on the day, use GitHub's.

## A. Infomaniak: DNS records for chefharris.ch (about 10 minutes)

1. Log in at https://manager.infomaniak.com → **Domains** → click **chefharris.ch** → **DNS zone** (sometimes "Manage DNS zone").
2. Look for records already there for the bare domain (shown as `@`, empty, or `chefharris.ch.`) and for `www`. Delete every existing **A**, **AAAA** and **CNAME** record on those two names (they usually point to an Infomaniak parking page). Leave all **MX**, **TXT** and other records alone.
3. Click **Add a record** and add these nine, one by one (type, name, target; TTL stays on the default):

| Type | Name | Target |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `chefharris.github.io.` |

   If the form refuses `@` for the name, leave the name empty — that means the same thing. If it refuses the trailing dot on `chefharris.github.io.`, enter it without the dot.
4. Save. DNS changes spread within minutes, sometimes up to an hour.

## B. Infomaniak: redirect chefharris.app → https://chefharris.ch (about 3 minutes)

1. Infomaniak Manager → **Domains** → click **chefharris.app**.
2. Open **Redirection** (also called "Web redirection" or "Redirect the domain", depending on the Manager version). If the domain is attached to a web hosting, the setting is under that hosting → Domains → chefharris.app → Redirection.
3. Choose **Redirect to a URL**, enter `https://chefharris.ch`, pick **Permanent (301)**, and tick the option to include `www` (so `www.chefharris.app` redirects too). Save.

## C. GitHub: tell Pages about the domain (about 5 minutes, after A)

1. Open https://github.com/chefharris/chefharris-site → **Settings** → **Pages** (left menu).
2. Under **Custom domain** type `chefharris.ch` → **Save**. GitHub runs a DNS check (a few minutes, up to an hour if the records are still spreading). Wait until it shows a green tick.
3. Tick **Enforce HTTPS**. If the box is greyed out, the certificate is still being issued — come back in up to an hour and tick it then.

## D. Tell me "domain live"

Write **"domain live"** in the website chat. I then publish the prepared go-live change (branch `go-live`): the build switches to `https://chefharris.ch`, the `noindex` tag goes away, `robots.txt` opens, the sitemap and all canonical links use the domain, and the `CNAME` file is included in every deploy so the custom domain survives future builds. About a minute later https://chefharris.ch shows the site. The old preview URL redirects there by itself.

Check on your phone: https://chefharris.ch, https://www.chefharris.ch (should land on chefharris.ch), https://chefharris.app (should land on chefharris.ch), https://chefharris.ch/privacy.

## E. After that: Google Search Console (about 5 minutes)

1. Go to https://search.google.com/search-console and sign in with chefharris.app@gmail.com.
2. **Add property** → choose **Domain** → enter `chefharris.ch` → Continue. Google shows a TXT record (`google-site-verification=…`).
3. Infomaniak Manager → Domains → chefharris.ch → DNS zone → **Add a record** → type **TXT**, name `@` (or empty), value = the text Google gave you → Save. Back in Search Console click **Verify** (if it fails, wait ten minutes and try again).
   - Alternative, if you prefer the HTML tag: add the property as **URL prefix** `https://chefharris.ch/`, pick **HTML tag**, send me the value inside `content="…"`. I paste it into `googleSiteVerification` in `src/site.config.ts` and push; then click Verify.
4. Once verified: **Sitemaps** (left menu) → enter `sitemap-index.xml` → **Submit**.

Nothing else is needed. The first search data appears after a few days.
