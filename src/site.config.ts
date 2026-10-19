// One place for the few values Harris has to paste in. Everything else is signed text.

export const SITE = {
  name: 'Chef Harris',
  email: 'chefharris.app@gmail.com',

  // The live domain. The GitHub Actions workflow decides whether a build is a
  // preview (github.io URL) or production (this domain) — see .github/workflows/deploy.yml.
  productionUrl: 'https://chefharris.ch',

  // GoatCounter site code (D8). The script is on every page and sends counts to
  // https://<code>.goatcounter.com. Harris picks "chefharris" as the code when he
  // creates the account; if that code is taken, paste the one he got here.
  goatcounterCode: 'chefharris',

  // Google Search Console (D6): the "content" value of the HTML tag Google shows
  // under "Verify ownership → HTML tag". Empty = tag not rendered.
  googleSiteVerification: '',

  // Kit (email capture, D2): the numeric form id behind Harris's "App launch" form
  // (both forms on the Home page post to https://app.kit.com/forms/<id>/subscriptions).
  kitFormId: '10026726',

  // Kit tag "tester-interest" (L4): the numeric id of the tag the tester checkbox applies.
  // Empty = the checkbox is shown but not sent to Kit yet. See README §"Kit".
  kitTesterTagId: '24794691',

  // Shown on /privacy as "Last updated". Changes only when the privacy text changes.
  privacyLastUpdated: '18 October 2026',
};
