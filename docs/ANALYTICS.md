# Stage 5A — Yandex Metrica

Counter: **113892269**. One asynchronous init per document, before reload/hash
normalization, with the original full URL and referrer. No `hit`, `trackHash`,
ecommerce, UTM storage or cross-visit milestone suppression. A new document
gets a new milestone set. Hash history already preserves the query string.

Only production builds on `matveyabramov.github.io` initialize the counter.
For a custom domain set `VITE_ANALYTICS_HOSTNAME` at build time to its exact
hostname (no protocol/path). Development, localhost and IP literals never send.
Blocked/missing/throwing `ym` does not interrupt the UI. The loader queue is bounded.

## Goals to create manually

In counter settings create **JavaScript event** goals with these exact IDs
(the integration does not create goals in the Metrica account):

| ID | Meaning / parameters |
| --- | --- |
| `experiment_start` | First actual Instructions state |
| `experiment_attempt` | First activation of “Я попробовал” |
| `experiment_result` | First actual Result state; does NOT confirm disappearance of the dot |
| `experiment_skip` | First Skip activation, including the help dialog link |
| `reading_start` | First active Reading mode |
| `explorer_select` | Intentional changed category; `category`: idiom, pun, doubleMeaning, reference |
| `explorer_reveal` | Each explicit explanation dialog open; `category`: idiom, pun, doubleMeaning, reference |
| `movie_analysis_open` | Each explicit analysis open; `movie_id` from MovieMedia |
| `movie_video_play` | First actual `playing` per opened analysis; `movie_id` |
| `read_50` | Reading viewport bottom reaches 50% |
| `read_75` | Reading viewport bottom reaches 75% |
| `footer_reached` | Footer intersects viewport in Reading |

Experiment, Reading and depth milestones send once per document, including
StrictMode/remounts and Back/Forward. Explorer interactions and analysis opens
may repeat on genuine new actions. Mouse hover remains the existing passive
preview. A/B toggles send no goals; opening an explanation sends `explorer_reveal`. No interaction
semantics or motion were changed.

Depth uses document geometry from Emptiness start to Footer start, excluding
Hero/Experiment and modal scroll areas. It runs only in Reading with visible
geometry and no open dialogs/contents. It indicates reached depth, not proof
that text has been read. Direct reading anchors can qualify at their depth.

Dzen launch URL:

https://matveyabramov.github.io/subtale-longread/?utm_source=dzen&utm_medium=article&utm_campaign=subtale_launch&utm_content=post_01

## Privacy / release readiness

Goal parameters are fixed category/movie identifiers, with no user input,
email, names or other personal fields. Standard Metrica collection (including
cookies, URL/referrer and Webvisor) is enabled as requested; this is not a claim
that Metrica itself collects no personal data.

**Release blocker for analytics readiness:** the site has no approved disclosure
or documented consent decision. The owner must confirm applicable requirements
and supply approved notice/policy text. If prior consent is required, implement
a real accept/reject flow, persist that choice, and call `initializeAnalytics`
only after consent (no loader or goals before consent); handle withdrawal too.
The current requested integration starts automatically on the production host.
No placeholder legal policy/banner has been invented. Code deployment success
does not resolve this release readiness issue.

Official references:
- https://yandex.ru/support/metrica/ru/code/counter-initialize
- https://yandex.ru/support/metrica/ru/objects/reachgoal
- https://yandex.ru/support/metrica/ru/general/notification

## QA

Build: `npm run build`; Pages build: `GITHUB_PAGES=true npm run build`.
Run production preview at port 4174, then `node qa/analytics.mjs` using an
available Playwright runtime. Optional environment settings:
`PLAYWRIGHT_MODULE`, `QA_WEBKIT_EXECUTABLE`, `QA_PREVIEW_URL`.
No Playwright dependency was added to the application.

QA serves the local production build under the production hostname through
request interception and blocks all Metrica requests. It records API calls,
not server-side delivery. Chrome and WebKit at 1440 (reduced motion) and 390 (normal motion) cover initialization,
UTM/history/contents navigation, Result vs Skip, deduplication, Explorer, actual analysis playback,
depth, blocked/missing ym and localhost/LAN exclusion. This does not replace
physical Safari 26 browser-chrome testing; Safari fixes and motion code remain
unchanged.

Still requires the counter owner's account: create goals, verify counter access,
confirm an actual production visit/pageview, UTM source report, received goal
parameters and Webvisor configuration. No account-side goal creation or recorded
production pageview is asserted by the browser API tests.
