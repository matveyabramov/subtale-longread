# SUBTALE — video migration from legacy `sp-longread`

Source repository: `matveyabramov/sp-longread` (private), default branch `main`; original paths `public/media/cases/`. Destination: `matveyabramov/subtale-longread`, `public/assets/videos/`.

Mapping is confirmed by `index.html` labels and `src/main.js` `videoSources` keys in the old repository. Copied blobs were checked byte-for-byte using matching Git SHA-1 values; originals were not modified.

| Case | Film / scene | Legacy source | New file | Bytes | Duration (s) | MP4 signature | Transfer |
|---|---|---|---|---:|---:|---|---|
| 01 | Airplane! (1980) — Surely / Shirley | `case-01.mp4` | `airplane-surely.mp4` | 152,121 | 2.710 | ISO BMFF; `avc1`, `mp4a` identifiers | Verified, SHA equal |
| 02 | Back to the Future Part II (1989) — tree idiom | `case-02.mp4` | `back-to-the-future-tree.mp4` | 317,027 | 3.878 | ISO BMFF; `avc1`, `mp4a` | Verified, SHA equal |
| 03 | Austin Powers: International Man of Mystery (1997) — Number Two | `case-03.mp4` | `austin-powers-number-two.mp4` | 719,488 | 4.644 | ISO BMFF; `avc1`, `mp4a` | Verified, SHA equal |
| 04 | Sherlock S02E01 — I am Sher locked | `case-04.mp4` | `sherlock-sher-locked.mp4` | 1,075,310 | Not checked | Not checked | **Pending: source too large for GitHub Contents API** |
| 05 | The Shining (1980) — Here's Johnny | `case-05.mp4` | `the-shining-heres-johnny.mp4` | 235,810 | 2.485 | ISO BMFF; `avc1`, `mp4a` | Verified, SHA equal |

All five original JPG thumbnails were migrated with the same exact content and source SHA to `public/assets/videos/posters/`:

- `airplane-surely.jpg` (`case-01.jpg`, 48,720 bytes)
- `back-to-the-future-tree.jpg` (`case-02.jpg`, 74,618 bytes)
- `austin-powers-number-two.jpg` (`case-03.jpg`, 58,961 bytes)
- `sherlock-sher-locked.jpg` (`case-04.jpg`, 55,904 bytes)
- `the-shining-heres-johnny.jpg` (`case-05.jpg`, 95,979 bytes)

**Remaining action — only Sherlock MP4:** the GitHub Contents API omits base64 content for files above 1 MiB, and the binary reader cannot retrieve that blob for cross-repository upload. Do not create a zero-byte substitute. Copy locally:

```bash
cp ~/Documents/GitHub/sp-longread/public/media/cases/case-04.mp4 \
  ~/Documents/GitHub/subtale-longread/public/assets/videos/sherlock-sher-locked.mp4
```

Then verify original vs copy with `shasum`, check with `ffprobe`, and commit/push the final video.

**Not yet validated:** actual scene contents against the final Figma artwork, decoder/browser playback, audio track and cut quality (the above MP4 signatures are container-level evidence, not playback certification). Media intentionally remains uncompressed.

## Sources and status

This is the legacy prototype source, not an external downloaded scene search. The new app should use `/assets/videos/<file>.mp4` paths, not legacy `/public/media/cases/` URLs. Do not treat five thumbnails as five substitute videos.

## Stage 0.2H.2 — poster master/delivery paths

The migration table above records the original transfer, not current poster bitstream sizes. All five original JPEGs are now preserved unchanged under `source-assets/images/video-posters/`, with SHA256 and dimensions in `docs/ASSET_DELIVERY.json`. Current poster delivery paths remain `public/assets/videos/posters/<name>.jpg`: four have lossless JPEG Huffman repacking, and Austin Powers retains its original bytes. All five decode pixel-identically at native resolution. No poster was downscaled or given a new lossy generation; MP4 bytes and the pending Sherlock video status are unchanged. Current per-file bytes and checks are in `docs/ASSET_OPTIMIZATION_RESULTS.md`.
