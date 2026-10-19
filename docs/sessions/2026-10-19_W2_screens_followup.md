# W2 follow-up: new SOS and "What you learned" captures, one crop for all four (19 Oct 2026)

## Prompt

> Two screenshots were replaced in src/assets/screens/: sos.png and what-you-learned.png. Both have a red DEV strip at the bottom — crop it off (bottom ~1.5%, down to the start of the navigation bar), and crop the blurred status bar at the top of sos.png (top ~2.5%). Crop all four screenshots to the same final aspect so the phone frames match. Keep the untouched files in originals/, rebuild the web copies, redeploy, update the preview PNG, and tell me the preview URL.

## What was done

- The two new captures (`Screenshot_20261018-220053.png` = What you learned, `Screenshot_20261019-060034.png` = SOS) were renamed and kept untouched in `src/assets/screens/originals/`; the stray full-size copies in `src/assets/screens/` were removed.
- Measured on the 1440×3120 captures: the red DEV strip is rows 2906–2947 and sits directly above the navigation bar (rows 2952–3119). The status bar occupies rows 0–~94 on all four; in SOS it is blurred by the sheet.
- One crop box for all four, in `scripts/make-screens.mjs`: keep rows 96–2905 → 1440×2810 (aspect 9:17.56). That removes the status bar (3.1 %, the blur ends at row 90, so 2.5 % was not enough), the DEV strip and, unavoidably, the navigation bar under it: a crop cannot take a band out of the middle, and splicing would be editing. Fridge Clearer and Cook Mode get the same box, so all four lose status bar and navigation bar alike. Cook Mode loses 11 rows of a faint shadow under the "Stuck? Ask me." pill; the pill itself ends at row 2892 and is intact.
- Web copies rebuilt at 720×1405, lossless; `.phone` in `global.css` now has `aspect-ratio: 1440 / 2810`, so the frames show the whole crop.
- Preview sheet `docs/sessions/2026-10-18_W2_screens_preview.png` rebuilt by the same script (1370×665, ivory, four frames with the site's sage border).
- README: "App screenshots" section and rules line updated; `make-screens.mjs` listed under local work.

## Checks

See the commit; preview URL https://chefharris.github.io/chefharris-site/
