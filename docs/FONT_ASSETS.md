# IBM Plex Mono — Latin repair (Stage 1B.1)

2026-10-24. Added only Latin WOFF2 weights 500/600; existing Cyrillic and TT Bluescreens files are unchanged. No new family, runtime CDN, package.json dependency or font conversion.

Source: [Fontsource IBM Plex Mono](https://www.npmjs.com/package/@fontsource/ibm-plex-mono), pinned npm tarball `@fontsource/ibm-plex-mono@5.3.0`, font metadata revision v20 / internal name-table Version 2.3. Both Cyrillic files in this package are **byte-identical** to the pre-existing local files, establishing a matching source revision. Latin files were copied unchanged from the same package. OFL-1.1 license is preserved at `public/assets/fonts/OFL-IBM-Plex-Mono.txt`.

| File in public/assets/fonts | Bytes | cmap glyphs | A–Z / А–Я | SHA256 |
|---|---:|---:|---|---|
| ibm-plex-mono-cyrillic-500-normal.woff2 (unchanged) | 8460 | 108 | 0 / 32 | 1d89462e86cb8e87e7e9d6f6635605bd7c3081baca6caaecee84916bf7b60edc |
| ibm-plex-mono-cyrillic-600-normal.woff2 (unchanged) | 9352 | 108 | 0 / 32 | 2b05a8695c7f9f4abd7178b279646a3b005a8ce57546bef6fd145f25d131e0aa |
| ibm-plex-mono-latin-500-normal.woff2 (new) | 14888 | 229 | 26 / 0 | 01d285447409c8a588692162439a038b8cbd7871309ee20267b0d2d91c6e8e22 |
| ibm-plex-mono-latin-600-normal.woff2 (new) | 15620 | 229 | 26 / 0 | 0d1f0b8d0722224e32e9f28261bdc86c79115be73444ae5eceb73976a1bcdf83 |

Actual cmap/name tables were read with a temporary fontTools/Brotli tool outside the project. `src/styles/fonts.css` uses the package's original Latin/Cyrillic unicode-range declarations, including Latin punctuation in U+2000–206F. No guessed range overrides.

Browser verification: Chrome CDP `CSS.getPlatformFontsForNode`, both weights, English `Surely you cannot be serious.` and Russian `Слова знакомы. Сюжет продолжается.`. Every rendered font is custom IBM Plex Mono Medium/SemiBold; no Courier or other fallback. Zero external requests/page errors. Machine-readable evidence: [font-rendering.json](../artifacts/hero-1920/font-rendering.json). This goes beyond FontFaceSet loading/check results.

The Stage 1A Latin-coverage issue is closed. Latin-ext, Cyrillic-ext and other unneeded subsets are not added speculatively. Broader future text coverage is checked with the actual approved copy of each section.
