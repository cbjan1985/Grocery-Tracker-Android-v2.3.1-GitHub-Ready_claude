# Grocery Tracker Android — Development Progress

## Current release candidate
- Version: **2.3.1**
- Android `versionCode`: **24**
- Base: `grocery-tracker-android_v2.1.zip` (Capacitor wrapper around the existing v1.7 web app)
- Deliverable: source package plus GitHub Actions workflow to produce a versioned APK.

## Changes in 2.3.0
1. Replaced the runtime CDN reference for SheetJS with a local bundled path. The build workflow installs the npm `xlsx` package and copies it into `www/vendor`, allowing Excel import/export while offline after install.
2. Added native save/share support via Capacitor Filesystem and Share. JSON, CSV, Excel and PDF files are written to app cache and offered through Android's share sheet.
3. Added Excel exports for inventory, to-buy list and purchase history.
4. Added generated Excel templates for inventory and purchase-list import, avoiding links to template files that may not exist in the WebView asset directory.
5. Added Capacitor native splash configuration and existing CB logo icon/splash assets.
6. Updated mobile styling and visible app version to 2.3.0.
7. Kept local-only storage, JSON backup/restore and existing data schema.
8. Explicitly reports that Claude-dependent bill reading is unavailable on Android; no false success is shown.

## Static validation completed
- Extracted the inline JavaScript and ran `node --check`: passed.
- Reviewed native bridge usage, file export branches, offline SheetJS build step, JSON restore input and Android versioning workflow.

## Not yet validated
- The APK has not been compiled in this workspace because Android SDK/Gradle are unavailable.
- No physical-device/browser interaction testing was performed here. The test checklist in README must be completed on device before production use.
- Unknown-name Kannada translation still depends on the unavailable Claude-only runtime and is a known limitation.

## Next steps
1. Push this project to GitHub and run the included workflow to generate v2.3.0 APK.
2. Complete all Android device checks in README.
3. If any device test fails, fix in this same codebase and increment version to v2.3.1 (or v2.4.0 for a feature release), including versionCode.


## v2.3.1 update (2026-10-29)
- Removed the highlighted Qty label and numeric field from the Inventory add-item form.
- The Add action now adds a new item with blank stock quantity and minimum level; it does not assign a default quantity.
- If the item already exists, the action informs the user to edit quantity under Available in Inventory and preserves the current stock.
- Version bumped to 2.3.1 / Android versionCode 24.
- JavaScript syntax validation is required before release. APK compilation is not performed in this environment; use the included GitHub Actions workflow.


## Package review (2026-10-29, Claude)
Fixed before first GitHub build:
- Workflow: removed `cache: npm` from setup-node (the project has no package-lock.json, so setup-node fails with "lock file not found").
- Workflow: `npx cap add android` now runs BEFORE `npx capacitor-assets generate --android` (assets generation needs the android platform folder; `android/` is git-ignored so it never exists at that point).
- Splash assets regenerated: "Grocery Tracker" + "Designed by CB" on a soft cream (and dark) background, CB logo with a feathered 14% opacity watermark, no Kannada text.
- Visible version label in the app corrected to 2.3.1; version numbers in README/progress aligned (versionCode 24).
Checked: inline JavaScript passes `node --check`; no CDN/network references remain; Capacitor config, package.json and workflow parse as valid.
Not checked: APK compilation and any device run (no Android SDK or internet in the authoring sandbox).
