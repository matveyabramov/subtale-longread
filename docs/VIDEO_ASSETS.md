# SUBTALE — video migration from legacy `sp-longread`

Source repository: `matveyabramov/sp-longread` (private), default branch `main`; original paths `public/media/cases/`. Destination: `matveyabramov/subtale-longread`, `public/assets/videos/`.

Mapping is confirmed by `index.html` labels and `src/main.js` `videoSources` keys in the old repository. Copied blobs were checked byte-for-byte using matching Git SHA-1 values; originals were not modified.

| Case | Film / scene | Legacy source | New file | Bytes | Duration (s) | MP4 signature | Transfer |
|---|---|---|---|---:|---:|---|---|
| 01 | Airplane! (1980) — Surely / Shirley | `case-01.mp4` | `airplane-surely.mp4` | 152,121 | 2.710 | ISO BMFF; `avc1`, `mp4a` identifiers | Verified, SHA equal |
| 02 | Back to the Future Part II (1989) — tree idiom | `case-02.mp4` | `back-to-the-future-tree.mp4` | 317,027 | 3.878 | ISO BMFF; `avc1`, `mp4a` | Verified, SHA equal |
| 03 | Austin Powers: International Man of Mystery (1997) — Number Two | `case-03.mp4` | `austin-powers-number-two.mp4` | 719,488 | 4.644 | ISO BMFF; `avc1`, `mp4a` | Verified, SHA equal |
| 04 | Sherlock S02E01 — I am Sher locked | `case-04.mp4` | `sherlock-sher-locked.mp4` | 1,075,310 | 5.033 | ISO BMFF; H.264 / AAC | Verified, SHA equal |
| 05 | The Shining (1980) — Here's Johnny | `case-05.mp4` | `the-shining-heres-johnny.mp4` | 235,810 | 2.485 | ISO BMFF; `avc1`, `mp4a` | Verified, SHA equal |

All five original JPG thumbnails were migrated with the same exact content and source SHA to `public/assets/videos/posters/`:

- `airplane-surely.jpg` (`case-01.jpg`, 48,720 bytes)
- `back-to-the-future-tree.jpg` (`case-02.jpg`, 74,618 bytes)
- `austin-powers-number-two.jpg` (`case-03.jpg`, 58,961 bytes)
- `sherlock-sher-locked.jpg` (`case-04.jpg`, 55,904 bytes)
- `the-shining-heres-johnny.jpg` (`case-05.jpg`, 95,979 bytes)

**All five MP4 clips are now present.** Sherlock was uploaded directly from the user-provided original `case-04.mp4` without transcoding. The committed Git blob SHA `e5df7ea6d70e27c90968a0b2d6524534232fa5ab` exactly equals the original legacy-repository blob SHA. Local `ffprobe` validates a 1920 × 1080 H.264 video stream, AAC audio stream, duration 5.032993 s and exact length 1,075,310 bytes. SHA256: `747868cf97e5f1f6d252fcf7f6da72a5070f220e4daa7c3915bc35925225e43a`.

**Not yet validated:** actual scene contents against the final Figma artwork, decoder/browser playback, audio track and cut quality (the above MP4 signatures are container-level evidence, not playback certification). Media intentionally remains uncompressed.

## Sources and status

This is the legacy prototype source, not an external downloaded scene search. The new app should use `/assets/videos/<file>.mp4` paths, not legacy `/public/media/cases/` URLs. Do not treat five thumbnails as five substitute videos.

## Stage 0.2H.2 — poster master/delivery paths

The migration table above records the original transfer, not current poster bitstream sizes. All five original JPEGs are now preserved unchanged under `source-assets/images/video-posters/`, with SHA256 and dimensions in `docs/ASSET_DELIVERY.json`. Current poster delivery paths remain `public/assets/videos/posters/<name>.jpg`: four have lossless JPEG Huffman repacking, and Austin Powers retains its original bytes. All five decode pixel-identically at native resolution. No poster was downscaled or given a new lossy generation; The historical Stage 0.2H.2 image pass did not modify MP4 bytes; Sherlock was subsequently added as a new fifth clip. Current per-file bytes and checks are in `docs/ASSET_OPTIMIZATION_RESULTS.md`.
