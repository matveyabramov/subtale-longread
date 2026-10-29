# SUBTALE — Motion Contracts (Stage 0.3)

Дата: 2026-10-24. **Approved (2026-10-24).** Измеренные Figma endpoints ниже подтверждены; базовые триггеры, длительности и интерполяции M01–M15 утверждены как отправная точка D08. Художественная доводка допускается на Stage 4 после визуальных тестов. D01–D11 закрыты в INTERACTION_SPEC §9; визуальные детали дополнительных UI-состояний уточняются в своих секциях. Редакционное содержание Figma, включая «98%», утверждено и не пересматривается. Никакого motion-кода, установки библиотек или изменения ассетов в этом этапе нет. Полные UX-состояния, focus, keyboard/touch, media lifecycle и решения D01–D11: [INTERACTION_SPEC.md](INTERACTION_SPEC.md).

**Current raster paths (Stage 0.2H.2):** original Figma sources now live under `source-assets/images/`; source filenames in historical endpoint tables identify those masters. Use each imageHash's separate `optimizedPath` in `FIGMA_ASSET_MAP.json` / `ASSET_DELIVERY.json` for future rendering. Multiply unchanged normalized crops by the selected delivery file's actual dimensions. Hidden/occluded source-only fills have no public derivative unless later approved motion needs one. All positions, transforms, source visibility, ordering, SVG/CSS masks and independent object boundaries below remain unchanged. Idiom WebPs and its shared Mosaic PNG delivery path/bytes are untouched.


**Stage 3.4B (2026-10-28), Awaiting Review:** пользователь утвердил триггер A/B на области иллюстрации: mouse hover→B / leave→A; touch/pen tap и Enter/Space→toggle сохранённого состояния категории. Отдельного видимого переключателя нет; нижняя ссылка и hover карточек не раскрывают B. Все четыре пары сейчас меняются мгновенно (0ms). M07–M10 ниже описывают будущие варианты Stage 4, а не включённые анимации; их старое обозначение reveal-кнопки не означает нижнюю ссылку.

**Stage 3.4B — Idiom Visual Fix (2026-10-28), Awaiting Review:** по уточнению пользователя обе композиции используют адаптивную геометрию льда `idiomA-*`; архивные B-измерения не задают положение льдин в runtime. В B порядок: upper-left `0` → banner `5` → telephone `6` → семь передних льдин `7–13`. Геометрия/ассет телефона и A/B-триггеры прежние, движение отсутствует. Это актуальное переопределение исторического Idiom paint order ниже. Ограничения фактического пересечения с плашкой при неизменной геометрии: [IDIOM_VISUAL_FIX_QA.md](IDIOM_VISUAL_FIX_QA.md).

## Stage 0.3 — назначение и характер движения

SUBTALE строится на резкой типографике, контрасте синего/жёлтого, зерне, пикселях и коллаже. Рекомендация: движение отмечает **изменение прочтения**, не добавляет самостоятельное шоу. Не анимировать каждый заголовок, не раскладывать текст по буквам, не вводить cursor-follow, floating loop, glitch, bounce, auto-carousel, zoom камеры или parallax только ради стиля. Статические композиции остаются полноценным результатом.

Принципы навыка `animate` использованы для выбора назначения, interruptibility и предпочтения простого инструмента. Его общее требование самостоятельно выбирать единственный эффект/писать код не применяется к Stage 0.3: пользователь требует варианты и документацию до реализации. Его автоматический запрет motion от keyboard заменён эквивалентностью способов ввода: семантика одинакова, необязательное перемещение снимается reduced motion. Дополнительные библиотеки и отсутствующие cross-referenced skills не использованы; implemented motion/a11y review не проводились.

**Разделение:** React сразу задаёт semantic target; CSS/GSAP только догоняют его визуально. Конец анимации никогда не разрешает следующий шаг истории. Stage 3 сначала реализует все переходы мгновенно; Stage 4 добавляет только согласованную презентацию. Ни один эффект не меняет исходную типографику, crops, texture opacity, PNG alpha или финальную геометрию.

### Предлагаемые motion tokens

Значения — утверждённые стартовые параметры для feel-check на 1920px в Stage 4, не извлечены из Figma prototype. Существующих runtime tokens ещё нет; при Stage 1A зарезервировать одну систему, а не несколько наборов таймингов.

| Token | Значение R | Назначение |
|---|---|---|
| `duration-instant` | 0ms | Смена категории, reduced motion, статические swaps |
| `duration-feedback` | 150ms | Только hover/pressed color/opacity; focus outline появляется сразу |
| `duration-ui` | 200ms | Небольшое явное раскрытие hint/help, fade декоративной группы |
| `duration-state` | 250ms | Pun A↔B; общая длительность последовательной замены reference |
| `duration-half-state` | 125ms | Один opacity-проход reference |
| `ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | UI появление/исчезновение и opacity; быстрое подтверждение действия |
| `ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Наклон composite Pun без overshoot |

Для 0ms easing неприменим. Не вводить задержку перед ответом, stagger текста, spring или разные тайминги для mouse и keyboard. Hover-feedback действует только при `(hover: hover) and (pointer: fine)`; focus/selected показываются также без hover. `transition: all` не использовать.

### Реестр motion-контрактов R

Все строки ниже используют утверждённые D-решения из INTERACTION_SPEC. Начальное состояние из Figma сохраняет исходную видимость; «без motion» не означает скрытый слой, ожидающий JS.

| ID / область | Trigger → endpoints | Предлагаемая презентация, назначение / владелец | Возврат, повтор, interruption | Reduced motion |
|---|---|---|---|---|
| M01 Hero `10:472` | CTA / Start / Skip → anchors | Мгновенная навигация; collage/headline статичны. Feedback контрола 150ms color/opacity CSS | Нативный scroll назад; CTA не запускает повторную intro-анимацию | То же, 0ms feedback допустим |
| M02 Hint / contents / help | Явная кнопка closed↔open; D01/D03/D04 | Для разрешённой панели: opacity 0↔1, 200ms ease-out CSS. Не двигать текст/фон; немодальные панели | Latest target wins; раскрытый semantic state сразу. При close сначала защитить focus, затем убрать панель; повторное открытие retarget текущую opacity | Мгновенно показать/скрыть |
| M03 Experiment `10:718`/`10:730`/`10:760` | Anchors и native scroll; D02 | Подэкраны статичны, 0ms. Dot/cross никогда не анимируются; эффект физиологический | Любой scroll/skip/replay доступен сразу; нет timeline/timer успеха | Тот же неподвижный stimulus и полный результат |
| M04 Emptiness `10:838` | Чтение | Статично; не менять paint order квадратов и не раскрывать source-only portrait | Нет reset/replay | Та же полная композиция |
| M05 Elephant `10:917` | Чтение четырёх уровней | Статично, без pin и скрытых уровней | Scroll назад не запускает новый цикл | Все уровни видны |
| M06 Explorer category | Click/tap/Enter/Space по tab; D05 | Мгновенный выбор сохранённого A/B. Текст/tabpanel не сдвигаются; feedback 150ms CSS | Незавершённый reveal предыдущей категории отменить и зафиксировать её semantic target; новый category state сразу | Мгновенный выбор |
| M07 Idiom `10:1431`↔`10:1596` | Нижняя reveal-кнопка; D05/D06/D08 | 200ms opacity только телефона, без translate/scale. Изменение смысла; CSS + дискретный paint order, подробности ниже | Повторный toggle retarget текущую opacity; возврат восстанавливает точный A-order. Не очередь | Мгновенный swap телефона и order |
| M08 Pun `10:1495`↔`10:1981` | Reveal-кнопка | 250ms ease-in-out `transform: rotate(0deg)`↔`rotate(34.3671413753deg)` единого wrapper; видимая связь endpoints, CSS | Reverse из текущего угла; одинаковый pivot и длительность в обе стороны, без отдельного вращения wheels | Мгновенно установить A или B; наклонённый B как статическое изображение разрешён |
| M09 Double meaning `10:1528`↔`10:2017` | Reveal-кнопка | 0ms смена полного source в том же слоте: чёткий «второй взгляд». React/CSS; fade не нужен | Повтор — обратный source swap, stale image load игнорировать | Тот же swap и доступное описание |
| M10 Reference `10:1560`↔`10:2049` | Reveal-кнопка | 125ms opacity-out всей A-композиции → замена → 125ms opacity-in B, ease-out; 250ms total. Никакого morph/траектории | Последний target побеждает; не накладывать два полупрозрачных изображения, см. ниже | Мгновенно заменить композицию |
| M11 Movies `10:1794` | Hover строки; click/tap/keyboard открывают разбор; явный Play в разборе; D07 | Запрос 2026-10-29, **Awaiting Review**: fullscreen MP4 `cover` за исходными строками, затемнение 40%; CSS opacity 200ms `ease-out`, неактивные строки 0.4. Новый постер декодируется до смены слоя; видео проявляется поверх него после `playing`. Одновременно играет максимум один MP4 | Native scroll/resize проверяют `elementFromPoint` по сохранённым координатам, включая движение списка; scroll не означает stop. Stop на уход с строки/из viewport, hidden/blur/dialog. Слой clipped границами Movies, pointer-events none; click открывает прежний разбор | Hover/focus показывают статичный постер, без MP4-запроса; Play в разборе остаётся явным |
| M11a Movies sway | Только native desktop scroll внутри видимой Movies | State indication направления: rAF, transform списка до ±6px / ±0.35deg; экспоненциальное сглаживание с учётом времени кадра, без overshoot. Target плавно затухает к нулю; новый scroll перенаправляет текущее движение | Конечный rAF-loop, hit-test после каждого transform; stop/reset при offscreen/hidden/dialog/preference change. Никакого wheel interception, scroll lock или snap | Полностью отключён; touch также без sway |
| M12 Vocab `10:966` | Чтение | Статичный SVG «98%», без count-up/поэлементной сборки | Нет replay/reset | То же |
| M13 Blind-spot-scene `10:997` | Чтение | Статичная центральная PNG и шесть исходных line segments, без прохода линий через круг | Нет replay/reset | То же |
| M14 What-to-do `10:1272` | Чтение | Статичные советы; без имитации взаимодействия с видеосервисом | Нет replay/reset | То же |
| M15 Footer `10:1016` | Чтение | Статичная collage/credits; hidden Union остаётся clipped | Нет loop/replay | То же |

### M02 — DOM, focus и быстрые открытия

Не требовать отдельной библиотеки для opacity. Fade 0↔1 принадлежит внешнему wrapper; исходные opacity/effects внутренних Figma-слоёв сохраняются. Во время exit панель уже не интерактивна (`inert`/исключена из AT), focus предварительно перемещён на существующий триггер, если он находился внутри. DOM можно временно сохранить только для fade, после него скрыть; при повторном open отменить pending hide. Старый `transitionend` не закрывает новую панель. Внешний click закрывает без кражи focus. Само оглавление/help — по рекомендуемой немодальной модели; modal-вариант требует нового UX-контракта.

### M07 — дискретный order Idiom

**F:** все восемь ледяных объектов стоят на месте. В A mosaic ниже всего льда. В B порядок back→front: upper-left → telephone → mosaic → остальные семь объектов. `z-index` не интерполируется, а перенос mosaic под всё изображение ломает конечный B.

**R:** A→B в начале установить B-order и телефон opacity 0, затем 0→1 за 200ms; B→A телефон 1→0 за 200ms при B-order, затем atomically вернуть A-order. Смена order — предложенный промежуточный художественный выбор, не измеренный Figma transition. При обратном запросе во время fade остаётся текущая opacity; order держится B, пока целевой телефон не станет 0. Если категория скрыта, preference изменилась или effect отменён, немедленно установить order/opacity последнего semantic target. Ни один старый callback не меняет их после нового запроса.

**O:** мгновенная атомарная смена телефона и order, без промежуточной композиции — точнее статическим endpoints и дешевле; выбрать вместо fade, если переключение upper-left заметно. Траектория телефонной трубки/разлёт льда не имеет подтверждённого начального положения и не входит в контракт. Кнопка работает также без fade.

### M08 — pivot Pun и transforms

Composite A: origin (50,200), 735×985; frame pivot (417.5,692.5) = local (367.5,492.5). Общий wrapper несёт два PNG-слота, второй высотой 984px, оба с исходным FILL/alpha. Применить rotation **один раз**, не на group и каждого потомка. В Figma угол отрицательный, в CSS y-down положительный; ниже сохранена полная B-матрица. Не интерполировать bounding box как размеры, не убирать frame clipping и не выбирать независимый центр wheel-pair.

### M09 / M10 — замена цельных картинок

Double meaning: два полных источника с разной исходной resolution/alpha, а не глаз и overlay пары. Рекомендован cut; O — sequential opacity как у M10 после отдельного просмотра, поскольку обычный crossfade даёт промежуточную неоднозначную полупрозрачность. Cultural reference: fade применяется к целой пятиобъектной группе, затем к цельному throne; размеры/позиции только из соответствующего endpoint. Фон и UI не исчезают. При любом endpoint ровно одна композиция полностью видна.

Interrupt M10: если target снова совпал с текущей displayed composition, развернуть opacity к 1; если отличается — довести текущую к 0, заменить на последний target, вернуть к 1. Каждый новый opacity-проход не длиннее 125ms; semantic target обновляется сразу, скрытая композиция исключена из AT. Быстрые запросы не создают очередь fade-пар. При смене категории/unmount/reduced motion — cut к последнему target, без отложенного callback. До успешного decode B не fade-out A; ошибка загрузки оставляет читаемое A и локальную возможность Retry.

### O01 — дополнительный scroll reveal декора, только по D08

Не входит в базовый набор. Если одобрен: I03 Emptiness — целая artwork group; I04 Elephant — illustration; I08 Blind-spot-scene — шесть декоративных line segments как группа; I10 Footer — collage group. Opacity 0→исходная opacity за 200ms ease-out, без translate/scale/stagger. Не менять локальные opacity исходных line/texture объектов; opacity внешнего wrapper приходит к 1. Тексты и controls всегда видны, circle не маскирует линии.

Trigger: при первом входе верхней границы группы в нижние 90% viewport (`IntersectionObserver`, bottom rootMargin −10%, threshold 0, проверка `isIntersecting`). Уже видимая при начальном открытии/прямом hash группа отображается сразу без flash; hidden-tab не запускает эффект. Повторный вход не replay; при быстром уходе/skip — сразу завершить к исходному виду и считать показанной, не задерживать чтение. Reduced motion, отсутствующий observer или сбой setup — исходный вид сразу. Одноразовый reveal не оправдывает ScrollTrigger. До активации эффекта DOM видим; не оставлять opacity 0, ожидая JS, на уровне глобальных базовых стилей.

## Reduced motion, interruption и performance

- CSS учитывает `prefers-reduced-motion`, React читает preference и слушает изменения. При включении reduce: отменить активный transform/fade и поставить **последний выбранный** endpoint без перемещения; не сбрасывать к A и не стирать значение. При выключении — не переигрывать страницу, разрешить обычные переходы со следующего действия.
- Базовый reduced-вариант — 0ms для UI/state/decor, native instant anchors, статичные stimulus и тексты. Это сознательно строже общего совета навыка оставить fade: смены смыслов понятны без промежуточного кадра. Оба состояния доступны теми же кнопками/описаниями. Видео — отдельный явно запрошенный контент; preference change ставит pause, дальнейший Play явный. По D07 первый явный Play запускается со звуком, последующие действия уважают ручной mute.
- Native scroll не блокируется timeline; нет scroll hijacking, pin, scrub, compulsory snap, synthetic smooth-scroller и задержанных focus-переходов. Такие решения потребовали бы отдельного согласования, их нет в этом плане.
- Простые переходы — CSS с явными свойствами transform/opacity/color. Текст не проходит через blur, clip-path или 3D. Не анимировать width/height/top/left, image filters и texture blend; z-order дискретный. `will-change` — только на время реального эффекта, не на все растры страницы.
- GSAP/ScrollTrigger не обязательны ни одному базовому контракту. Если будущий согласованный multi-layer timeline потребует GSAP, локальный context/revert и единый владелец свойства обязательны; не делать React render на каждом animation tick/scroll. Не заявлять GPU-only/performance результат без измерений.
- На скрытии вкладки state/decor transitions завершаются к цели, media pause. При возвращении нет отложенного entrance или autoresume. Полный offscreen active artwork также завершается к цели; возвращение показывает сохранённый endpoint. Все listeners/observers/timelines убираются при unmount и повторном mount.

## Gate и проверка motion-ticket

Перед Stage 4 ticket ссылается на I/M ID и выбранные D-решения; содержит Figma A/B, runtime asset mapping, trigger/default/target, свойства, pivot/order, duration/easing, reverse/reset/replay, interruption, keyboard/touch, reduced motion и проверки. Не включать невыбранные O-варианты автоматически; базовые R-контракты утверждены D08. Stage 1A и статическая сборка не разрешают motion-pass автоматически.

Acceptance: endpoints совпадают с Figma на 1920px; input работает до окончания transition; 10 быстрых toggle/category changes завершаются последним target без очереди; scroll/back сохраняет смысл; runtime reduced-motion change не оставляет opacity 0/промежуточный transform; hidden-tab/offscreen не возвращают старый timeline; source-only artwork не появился; layout не скачет и media не играет в фоне. Проверить mouse, keyboard-only и реальный touch, медленную загрузку B, сбой decode, repeat mount, native scroll. Feel-check M07/M08/M10 сначала при увеличенной длительности для поиска разрывов, затем при целевых 200/250ms. Полная матрица будущего QA — INTERACTION_SPEC §8. Сейчас проверена только документация, motion/performance/browser QA не проводились.

## Stage 0.2 — сохранённые доказательства конечных состояний

Разделы ниже сохранены без изменения измерений. Их фразы «decide in a later stage», «unspecified trigger» и старые пути `public/*.png` описывают момент импорта Stage 0.2. Утверждённые текущие контракты и границы будущих визуальных уточнений находятся выше и в INTERACTION_SPEC; текущие delivery paths — в реестрах. Не трактовать исторические placeholders как разрешённые эффекты или отсутствие Stage 0.3-контракта.

## Stage 0.2D.1 — verified Idiom endpoints (2026-10-24)

Scope: illustration layers in approved frames **A `10:1431`** and **B `10:1596`**, both 1920 × 1080. This section records measured endpoints, not an approved transition. Sources and exact crop matrices, Boolean operands, per-node transforms and SHA256 checksums: `docs/IDIOM_ASSET_IMPORT.json`.

**Observed change:** all eight ice objects retain identical position, dimensions, rotation, opacity, imageHash, crop and Boolean geometry. B adds telephone node `10:1598`. The upper-left ice object moves earlier in the paint order, below the telephone and below the mosaic. No ice explosion, translation, rotation or scaling is established by these two frames.

Coordinates below are frame-local top-left positions before any hypothetical motion. Paint order is the zero-based Figma child index, back to front; omitted indices belong to the unchanged interface. Dimensions are the object/crop viewport, not source-file dimensions. Rotation is Figma's recorded angle. Scale is **B relative to A**; all ice transforms have identity linear parts, so there is no rotation, skew or reflection in either endpoint.

| Object | A node → B node | Position A → B (x, y) | Dimensions A = B | Rotation A → B | Scale B/A (x, y) | Paint order A → B | Delivery file under `public/assets/images/` |
|---|---|---|---|---|---|---|---|
| Upper-left ice | `10:1935` → `10:1597` | (30, 397) → (30, 397) | 501 × 337 | 0° → 0° | (1, 1) | 5 → 0 | `idiom-ice-upper-left.webp` |
| Lower-middle ice | `10:1936` → `10:1628` | (415, 853) → (415, 853) | 232 × 147 | 0° → 0° | (1, 1) | 6 → 6 | `idiom-ice-lower-middle.webp` |
| Upper-right ice | `10:1937` → `10:1629` | (657, 397) → (657, 397) | 424 × 299 | 0° → 0° | (1, 1) | 7 → 7 | `idiom-ice-upper-right.webp` |
| Center ice | `10:1940` → `10:1632` | (504, 499) → (504, 499) | 203 × 379 | 0° → 0° | (1, 1) | 8 → 8 | `idiom-ice-center.webp` |
| Right small ice | `10:1945` → `10:1637` | (900, 646) → (900, 646) | 210 × 145 | 0° → 0° | (1, 1) | 9 → 9 | `idiom-ice-right-small.webp` |
| Left small ice | `10:1950` → `10:1642` | (354, 685) → (354, 685) | 133 × 116 | 0° → 0° | (1, 1) | 10 → 10 | `idiom-ice-left-small.webp` |
| Lower-left ice | `10:1953` → `10:1645` | (30, 727) → (30, 727) | 393 × 273 | 0° → 0° | (1, 1) | 11 → 11 | `idiom-ice-lower-shared.webp` |
| Lower-right ice | `10:1958` → `10:1650` | (653, 735) → (653, 735) | 457 × 265 | 0° → 0° | (1, 1) | 12 → 12 | `idiom-ice-lower-shared.webp` |
| Telephone | absent → `10:1598` | undefined → (227, 228) | undefined → 635 × 851 | undefined → 0° | undefined | absent → 1 | `idiom-telephone-cutout.webp` |
| Mosaic | `10:1432` → `10:1599` | (0, 0) → (0, 0) | 1920 × 1080 | 0° → 0° | (1, 1) | 0 → 2 | existing `mosaic-texture.png` |

**Paint order:** A has mosaic below all eight ice objects. B has upper-left ice → telephone → mosaic → remaining seven ice objects. Preserve the mosaic's 0.4 paint opacity and TILE scale (`scalingFactor` 0.8942065238952637), including its overlay on the telephone and upper-left fragment. Moving that texture behind all imagery changes B's appearance. The telephone is behind every ice object except the upper-left one. Both frames clip content at their 1920 × 1080 bounds.

### Original fills, crops and masks

Seven distinct ice PNGs are each **4096 × 2286**. They contain broadly similar full artwork with actual pixel differences: do not merge them by appearance or substitute one for another. The two lower corner objects share **the same** `b0d17f5142962d3ddc19f08fa9cae9df92eac834` source with different crop transforms; they must remain separate object wrappers. All ice IMAGE fills are visible, NORMAL, opacity 1, CROP. The Figma fill `scalingFactor: 0.5` is stored source metadata, not a B/A animation scale.

The following normalized source-crop values are unchanged in B. For matrix `[[sx, 0, tx], [0, sy, ty]]`, the source crop is `(tx × sourceWidth, ty × sourceHeight, sx × sourceWidth, sy × sourceHeight)`, displayed within the object viewport above. Values below are abbreviated for reading; use the full precision JSON values for implementation.

| A node | sx | sy | tx | ty | Additional clipping |
|---|---:|---:|---:|---:|---|
| `10:1935` | 0.4636995494 | 0.5588722825 | 0.0002040578 | 0 | Rectangular viewport |
| `10:1936` | 0.2147271484 | 0.2437810898 | 0.3565400541 | 0.7562189102 | Rectangular viewport |
| `10:1937` | 0.3924323618 | 0.4958540499 | 0.5805226564 | ≈0 | `idiom-ice-upper-right-mask.svg` |
| `10:1940` | 0.1878862381 | 0.6285240650 | 0.4379882813 | 0.1674958616 | `idiom-ice-center-mask.svg` |
| `10:1945` | 0.1943650693 | 0.2404643297 | 0.8054308891 | 0.4129352868 | `idiom-ice-right-small-mask.svg` |
| `10:1950` | 0.1230978817 | 0.1923714876 | 0.3000816107 | 0.4776119590 | `idiom-ice-left-small-mask.svg` |
| `10:1953` | 0.3637403548 | 0.4527363181 | 0.0002040578 | 0.5472636819 | `idiom-ice-lower-left-mask.svg` |
| `10:1958` | 0.4229754508 | 0.4394693077 | 0.5768204331 | 0.5605306625 | `idiom-ice-lower-right-mask.svg` |

The six mask SVGs in `public/assets/illustrations/` preserve Boolean SUBTRACT geometry, derived directly from the measured rectangular operands rather than exported with embedded images. They are white opaque remaining areas with transparent cutouts, usable as alpha masks at the recorded object dimensions. No `isMask=true` image-subtree nodes were found; source alpha, crop viewports and Boolean subtraction together define each fragment. Do not render the gray cutter rectangles as visible art, or animate the Boolean operands as separate shards.

| A Boolean → B Boolean | Subtract rectangles (x, y, width, height), local to the outer object |
|---|---|
| `10:1937` → `10:1629` | (-41, 276, 84, 48) |
| `10:1940` → `10:1632` | (-30, 359, 91, 39); (158, 350, 94, 58) |
| `10:1945` → `10:1637` | (-21, -20, 38, 32); (-11, 134, 22, 17) |
| `10:1950` → `10:1642` | (-19, -17, 36, 31) |
| `10:1953` → `10:1645` | (377, 197, 30, 25); (320, -26, 95, 79); (218, -31, 65, 45) |
| `10:1958` → `10:1650` | (261, -30, 183, 81); (-42, -19, 75, 103) |

The telephone has two original **1792 × 2400** fills: hidden JPEG `bfdc63b7bc0f0d5abbdf1a00f3ec8121daffde5a` and visible transparent PNG `be5817d93162046d2b9f3af61b7489db7df1278c`. Only the PNG is rendered in B, at opacity 1, NORMAL blend, FILL mode; retain the JPEG without enabling it. The cable reaches the original bottom edge; keep that source clipping and transparent margins. The telephone has no counterpart in A, so A does not establish its starting position, rotation, scale or pivot. Its angled silhouette is already drawn into the source bitmap; the node rotation is 0°.

### Independent animation feasibility and unresolved decisions

**Feasible:** eight ice wrappers plus one telephone can be transformed independently. Each wrapper must carry its image crop and Boolean mask as one object. Reuse the seven original ice textures and six clipping masks across states; no duplicate state bitmaps are needed. Independent transforms of the two lower objects remain possible despite their shared imageHash.

**Not specified by these frames:** trigger, duration/easing, telephone entry pose/path, transform origins, replay/reset, interruption behavior and when/how the upper-left shard changes stacking relative to the mosaic. Do not infer ice displacement or an explosion from these static endpoints. Decide these in the motion stage before implementation, along with keyboard/touch access and a prefers-reduced-motion alternative that exposes the meaning/state without requiring movement. No scroll hijacking is authorized. No animation, CSS layout or interaction has been implemented in this import stage.

### Stage 0.2H.1 — delivery derivatives (2026-10-24)

The nine original raster fills now live unchanged under `source-assets/images/`, keyed by the same Figma imageHash and original SHA256. The table above selects WebP delivery files; seven ice derivatives are 2304 × 1286, and telephone derivatives are 1344 × 1800. All eight visible PNG-derived files use lossless WebP after alpha-aware resizing. The hidden telephone JPEG has an optional q96 WebP derivative and stays hidden; do not preload or display it automatically.

Every full source canvas and transparent margin is retained in the derivatives. **Use the same normalized CROP matrices, centered FILL behavior, wrapper dimensions, source positions, paint order and six SVG masks.** Do not apply source-pixel crop coordinates calculated for 4096 × 2286 directly to a smaller derivative: multiply normalized crop values by that derivative's actual width/height. Both lower objects continue to reference `idiom-ice-lower-shared.webp` with distinct crops and independent wrappers. No object merge, mask bake-in, animation endpoint or transition was introduced. See `IDIOM_ASSET_OPTIMIZATION.json` and `ASSET_OPTIMIZATION_RESULTS.md` for per-file settings, hashes and QA.

## Stage 0.2D.2 — verified Pun endpoints (2026-10-24)

Scope: illustration layers in **A `10:1495`** and **B `10:1981`**, both 1920 × 1080 with frame clipping enabled. Exact raw coordinates, frame-projected transforms, fills, bounds and source checksums are in `docs/PUN_ASSET_IMPORT.json`. This is endpoint documentation; no transition has been implemented.

**Observed change:** B rotates the entire bicycle composite approximately **34.367141° clockwise** about the initial composite center **(417.5, 692.5)**. Both PNG layers share this transformation; their source hashes, dimensions, FILL settings, opacity, visibility and paint order are unchanged. No wheel detachment, independent wheel rotation, changed drawing or new layer is shown. The upper-left anchor shifts because the composite rotates about its center, not because the two layers move apart. There is no measurable scale change: B/A is 1 × 1, within floating-point tolerance (matrix column lengths ≈1.00000000096).

### Object correspondence and layering

Positions below use the translation of each measured **frame-local transform**, before the axis-aligned rotated bounding box is calculated. All values are in design pixels. Raw node x/y in B are (392.1649169922, 78.5206527710); subtracting absolute frame coordinates yields the translation below, differing by less than 0.00015 px. Both forms are retained in the JSON. Paint paths are zero-based child indices, back to front, from the frame through groups; they remain unchanged in B.

| Object | A node → B node | Frame-local origin A → B | Local dimensions A = B | Figma rotation A → B | Paint path A = B |
|---|---|---|---|---|---|
| Composite group | `10:1975` → `10:2012` | (50, 200) → (392.1650390625, 78.5205078125) | 735 × 985 | 0° → -34.3671413753° | 5 |
| Bicycle subgroup | `10:1976` → `10:2013` | same as composite | 735 × 985 | 0° → -34.3671413753° | 5 / 0 |
| Whole bicycle bitmap | `10:1977` → `10:2014` | same as composite | 735 × 985 | 0° → -34.3671413753° | 5 / 0 / 0 |
| Wheel-pair subgroup | `10:1978` → `10:2015` | same as composite | 735 × 984 | 0° → -34.3671413753° | 5 / 1 |
| Wheel-pair bitmap | `10:1979` → `10:2016` | same as composite | 735 × 984 | 0° → -34.3671413753° | 5 / 1 / 0 |
| Mosaic | `10:1496` → `10:1982` | (0, 0) → (0, 0) | 1920 × 1080 | 0° → 0° | 0 |

The mosaic remains **below** both image layers. The complete bicycle image is painted first; the extracted wheel pair overlays it. Interface layers occupy frame indices 1–4; the illustration group remains index 5 in both states. The wheel layer's **984px** height differs from the bicycle layer's **985px** height by design; do not normalize these heights when aligning the images.

For either bitmap, using local bitmap-slot coordinates `(u, v)`, the frame projection is:

- A: `x = u + 50`, `y = v + 200`.
- B: `x = 0.8254373669624329u - 0.564493715763092v + 392.1650390625`, `y = 0.564493715763092u + 0.8254373669624329v + 78.5205078125`.

Figma reports -34.367141°; the positive sine in the y-down frame matrix corresponds to **+34.367141° clockwise in CSS**. Use the measured frame projection once. The API returns repeated group/descendant coordinate transforms here; do not add the translation or apply the rotation once per nested group. For later DOM nesting, derive child-local transforms from the frame matrices, or use a single transformed wrapper containing the two aligned bitmap slots.

B's rotated canvas bounds are approximately:

| Object | Bounding x | Bounding y | Bounding width | Bounding height |
|---|---:|---:|---:|---:|
| Composite / bicycle canvas | -163.861271 | 78.520508 | 1162.722775 | 1227.958688 |
| Wheel-pair canvas | -163.296777 | 78.520508 | 1162.158281 | 1227.133250 |

These are full **transparent-canvas** bounds, not visible silhouette bounds. A's bicycle canvas extends to y=1185 and the wheel canvas to y=1184; both states are clipped by their 1080px frame. Preserve this clipping rather than trimming sources or treating the rotated bounds as slot dimensions. The slightly different wheel canvas center follows the common group pivot; do not rotate the 984px wheel layer around an independently chosen center if reproducing B.

### Sources, fills, transparency and masks

All four originals are **1792 × 2400** and are reused between A and B, one local file per imageHash:

| Object / fill | imageHash | File under `public/assets/images/` | Visibility in A and B |
|---|---|---|---|
| Bicycle JPEG | `f896e935d71fd96ad289d93b7e8ce7d177767633` | `pun-bicycle-base.jpg` | Hidden |
| Bicycle PNG | `062b06beeb916ea58e9db0134f2d6a1ba921958a` | `pun-bicycle-cutout.png` | Visible |
| Wheel-pair JPEG | `abafb5e224150ff4820d1e37233090f06e1e9689` | `pun-wheels-base.jpg` | Hidden |
| Wheel-pair PNG | `173aa0acd8edfb44bd3dee924ff505e613162e4f` | `pun-wheels-cutout.png` | Visible |

Each node has hidden JPEG followed by visible PNG; keep the JPEG originals without enabling them behind the transparent artwork. Both visible PNG fills use NORMAL blend, opacity 1, FILL mode, identity imageTransform and stored `scalingFactor: 0.5`. There is no custom CROP transform. Retain the full original canvas and exact slot aspect ratios, including the slight cover crop implicit in FILL. The fill scalingFactor is source metadata, not the endpoint scale change.

There are **no explicit Figma masks, Boolean subtractions or external clipping shapes** in the inspected illustration subtree. PNG alpha provides the silhouette; rectangular slot cover and frame clipping provide the remaining clipping. No additional mask file is needed. Both PNGs have real fully transparent and partially transparent pixels. The bicycle PNG contains 10 faint source-edge samples at alpha 1–3, so its nonzero-alpha bounds technically span the canvas; these original pixels were retained without cleanup. Its alpha>8 bounds are (89, 487)–(1702, 1864). Wheel-pair nonzero-alpha bounds are (89, 914)–(1702, 1864). Do not reposition either layer by visible-content bounds or discard its transparent margins.

### Independent animation feasibility

The existing art supports **two independently transformable bitmap wrappers**, and the complete composite can rotate together as shown by A/B. However:

- The lower PNG already contains the whole bicycle: frame, saddle, handlebar, crank, pedals **and both original wheels** are fused in one image.
- The upper PNG contains **both extracted wheels together**. There are no independent left/right wheel nodes, masks or files.
- Moving the wheel-pair overlay away exposes the original wheels underneath. A clean wheel-free frame and independently detached wheels are therefore **not available as supplied**. Such motion requires separately agreed source preparation/masking; it must not be claimed complete from these assets or improvised in this import stage.

The observed endpoints are achievable with existing files. Trigger, duration/easing, path, replay/reset, interruption handling and keyboard/touch controls remain decisions for the motion stage. A prefers-reduced-motion option should expose both states/meaning without requiring rotation. No scroll hijacking is authorized. No layout, animation, new wheel isolation or dependency installation was performed.

## Stage 0.2D.3 — verified Double Meaning endpoints (2026-10-24)

Scope: **A `10:1528`**, **B `10:2017`**, both 1920 × 1080. Source checksums, exact fills/transforms and A/B node correspondence are in `docs/DOUBLE_MEANING_ASSET_IMPORT.json`. The earlier interaction row remains a proposal; this section records the actual endpoint mechanism and introduces no animation.

**Observed visual difference:** A shows an eye with an empty yellow center; B shows a dark couple silhouette within that center. Both are **complete eye PNGs**, not a common eye plus a separate couple overlay. In Figma there is one illustration rectangle with two IMAGE fills; their `visible` flags are exchanged. Position, scale, rotation, crop settings, node opacity, paint opacity, mask structure and layer order do not change. No geometric reveal or opacity tween is encoded by these endpoints.

### Object structure and fixed geometry

| Object | A node → B node | Position A = B (x, y) | Dimensions A = B | Rotation A = B | Scale B/A | Node opacity A = B | Frame paint order A = B |
|---|---|---|---|---|---|---|---|
| Eye rectangle, two fills | `10:1558` → `10:2047` | (115, 383) | 845 × 563 | 0° | (1, 1) | 1 | 4 |
| Existing mosaic | `10:1529` → `10:2018` | (0, 0) | 1920 × 1080 | 0° | (1, 1) | 1 | 0 |

Frame paint order is zero-based, back to front. Within either frame: mosaic 0 → sidebar group 1 → title 2 → yellow heading container 3 → eye rectangle 4 → bottom text link 5. The image remains above the mosaic in both states. Frame-local eye transform is exactly `[[1, 0, 115], [0, 1, 383]]` for A and B; its slot center is (537.5, 664.5). Both frames clip at 1920 × 1080. The page-level sibling indices of the two reference frames (13 and 14) are document placement, not a transition in the internal stacking.

### The actual state change: fill visibility

Fill-array order stays fixed. Each paint uses NORMAL blend, opacity 1, FILL mode, identity imageTransform `[[1, 0, 0], [0, 1, 0]]`, zero filters and stored `scalingFactor: 0.5`.

| Fill index | Original imageHash | File under `public/assets/images/` | Original resolution | A visible | B visible |
|---|---|---|---|---|---|
| 0 | `a9f463489c07be031417200565743725d6a366ac` | `double-meaning-eye.png` | 3072 × 2048 | true | false |
| 1 | `3a4dbff1bde5d50b9dc399bc758f670e1fbee740` | `double-meaning-eye-couple.png` | 1536 × 1024 | false | true |

Exactly one fill is enabled per endpoint. The two fills are alternative full artwork, not two simultaneously visible compositing layers. To reproduce the endpoints, switch the enabled image in the same logical slot. A crossfade, pupil opening, animated clipping mask or independent couple movement would be an additional design decision, not a behavior established by these frames.

The apparent size stays the same despite B's source having half the width and height of A's source: both use the identical 845 × 563 slot. Both canvases have a 3:2 aspect ratio, slightly different from the slot, so retain the small centered cover crop implicit in FILL. There is no custom CROP transform, and the paint `scalingFactor` is not an endpoint scale change. Do not resize originals to a common resolution, trim transparent margins, or align the art by nonzero-alpha bounds.

### Alpha and masks

Both originals are RGBA PNGs with fully transparent edges and real partially transparent pixels. A's alpha range is **0–255**; B's is **0–254**, with no fully opaque pixel. This is source-pixel data, not a change to Figma node/paint opacity, which stays 1. Preserve these bytes without forcing alpha to 255 or flattening against the blue background.

| PNG | Nonzero-alpha bounds in original pixels | Fully transparent pixels | Partially transparent pixels |
|---|---|---:|---:|
| Eye A, 3072 × 2048 | (104, 2)–(2998, 2022) | 2,621,824 | 3,425,234 |
| Eye with couple B, 1536 × 1024 | (52, 1)–(1499, 1011) | 655,456 | 917,408 |

No `isMask=true` nodes or Boolean operations were found in either inspected frame. PNG alpha contains the silhouette and internal illustration; slot cover and frame clipping provide the remaining clipping. There is no separate pupil mask to export. No additional SVG/mask file is needed. The mosaic is reused at 0.4 paint opacity, TILE scalingFactor 0.8942065238952637, unchanged below the eye.

### Comparison evidence and animation limits

The recorded structure has 32 nodes per frame. Pairwise comparison of their in-frame geometry, transforms, visibility, opacity, fills, effects, strokes, mask/clipping flags and text content found a single changed property: the eye rectangle's fill array, differing **only in the two `visible` flags**. Source hashes and paint-array order remain the same. Original-byte fingerprints, decoded dimensions and actual alpha pixels were checked; both original images were visually inspected in the same logical slot against the Figma references.

**Supported by the assets:** exact switching between two complete images in the fixed slot. The couple, iris, pupil, highlight and eye outline are fused into those images; they are not separate independently transformable objects. Independently moving the figures or morphing the pupil would require additional agreed source preparation and a design decision. These reference states specify no duration, easing, path or interpolation, so this import does not invent one.

Trigger, replay/reset, interruption and keyboard/touch access remain decisions for the interaction/motion stage. Both readings must remain accessible without requiring motion, including for prefers-reduced-motion. No layout, transition or animation has been implemented.

## Stage 0.2D.4 — verified Cultural Reference compositions (2026-10-24)

Scope: **A `10:1560`** and **B `10:2049`**, both 1920 × 1080. Exact fills, transforms, source checksums, alpha QA and common-node correspondence are in `docs/CULTURAL_REFERENCE_ASSET_IMPORT.json`. These are measured compositions, not an approved animation sequence.

**Observed difference:** A contains **five complete snowflake image instances** at different positions and sizes. B contains **one complete Iron Throne image** and no snowflake nodes, including hidden counterparts. The five instances are not five separately drawn fragments of one snowflake. Their identical imageHash pairs reference one shared JPEG/PNG source pair. The throne uses a different source pair. The 30 common texture/interface nodes retain all recorded in-frame geometry, transforms, paint order, visibility, opacity, fills, effects, strokes, mask/clipping flags and text content.

There is no direct A/B node correspondence between a particular snowflake and the throne, and no correspondence between snowflake arms and swords. Do not describe the central snowflake as moving/scaling into the throne or infer a morph from these two reference frames.

### Geometry of every illustration object

Coordinates are frame-local slot origins; dimensions are the full image-slot canvas, including transparent margins. Paint order is the zero-based frame child index, back to front. All listed nodes are visible, at opacity 1, rotation 0°, with no skew/reflection. Each snowflake is an independently placed instance of the same full PNG.

| State / object | Figma node | x | y | Width | Height | Center (x, y) | Rotation | Paint order | Other-state counterpart |
|---|---|---:|---:|---:|---:|---|---|---:|---|
| A / main snowflake | `10:1591` | 328 | 321 | 522 | 699 | (589, 670.5) | 0° | 5 | Absent in B |
| A / upper-left snowflake | `10:1592` | 76 | 283 | 232 | 311 | (192, 438.5) | 0° | 6 | Absent in B |
| A / upper-right snowflake | `10:1593` | 870 | 198 | 232 | 311 | (986, 353.5) | 0° | 7 | Absent in B |
| A / lower-right snowflake | `10:1594` | 902 | 655 | 168 | 224 | (986, 767) | 0° | 8 | Absent in B |
| A / lower-left snowflake | `10:1595` | 126 | 732 | 110 | 147 | (181, 805.5) | 0° | 9 | Absent in B |
| B / Iron Throne | `10:2087` | 301 | 263 | 610 | 817 | (606, 671.5) | 0° | 5 | Absent in A |

For each object, the frame-local projection is `[[1, 0, x], [0, 1, y]]` using its table origin. Differently sized snowflake slots represent instance sizes, not a sequence of scale changes. Since no snowflake has a counterpart in B, an A→B transform/scale ratio is **undefined** for each one; the same applies to the throne's starting pose in A. Full-precision per-instance geometry is recorded in the JSON.

**Stacking:** both frames have mosaic 0 → sidebar group 1 → title 2 → yellow heading container 3 → bottom text link 4. A then paints the five snowflake nodes in table order, 5–9. B instead paints the throne at 5. The existing mosaic is below all artwork, with unchanged TILE scalingFactor 0.8942065238952637 and paint opacity 0.4. No mask or foreground texture overlays the illustrations. Both frames clip at 1920 × 1080; the throne's full slot reaches y=1080 exactly. Preserve frame clipping and original transparent margins.

### Original sources, fill visibility and cropping

All four originals are **1792 × 2400**. There is one file per imageHash; the five snowflakes share their two originals without per-instance copies.

| Source / fill | imageHash | File under `public/assets/images/` | Used by | Fill visibility |
|---|---|---|---|---|
| Snowflake JPEG | `a3b7ac7e799505da584c86b7c42f8da6723eedbc` | `cultural-snowflake-base.jpg` | All five A instances | Hidden |
| Snowflake PNG | `479c47cbc92ef29bc039dc843d2f7103b80d1391` | `cultural-snowflake-cutout.png` | All five A instances | Visible |
| Throne JPEG | `429921b86495a728937851d97677ae3dcf8c9122` | `cultural-iron-throne-base.jpg` | B throne | Hidden |
| Throne PNG | `76a447de6eae4a64eca6b2865f63ff9cdb9e566c` | `cultural-iron-throne-cutout.png` | B throne | Visible |

Every illustration node has hidden JPEG fill 0 followed by visible PNG fill 1. Preserve both originals without enabling the opaque JPEG behind the PNG. Both fills use NORMAL blend, paint opacity 1, FILL mode, identity imageTransform `[[1, 0, 0], [0, 1, 0]]`, zero filters and stored `scalingFactor: 0.5`. This scalingFactor is fill metadata, not an animation scale.

There is no custom CROP matrix. Preserve the small centered cover crop implicit in FILL for each exact slot aspect ratio; notably the 168 × 224 slot differs slightly in aspect from the original canvas and the other instances. Do not normalize dimensions, trim alpha margins, or save five cropped copies of the snowflake to reproduce these slots.

### Transparency, masks and independence

Both PNG originals have alpha 0–255, fully transparent edges and genuine partial-alpha pixels. Their alpha provides the silhouette and internal cutouts; no explicit `isMask=true` nodes or Boolean operations were found in either frame. No extra mask file is required.

| PNG | Nonzero-alpha bounds in source pixels | Fully transparent pixels | Partially transparent pixels |
|---|---|---:|---:|
| Snowflake | (31, 167)–(1761, 2233) | 2,623,754 | 90,206 |
| Iron Throne | (93, 87)–(1714, 2302) | 1,892,480 | 67,898 |

**Independent objects available:** five complete snowflake wrappers in A can each be transformed independently, while all five reuse one visible PNG. The complete throne is one separately transformable bitmap in B. Each snowflake's arms are fused into its raster; the throne's swords, seat and other details are fused into its raster. There are no separate arm/sword nodes supporting independent component animation.

**Not established by the design:** how the five A objects disappear, how the B object enters, any motion path, transform origin, morph, fade, duration/easing or intermediate state. These endpoints show a replacement of compositions, not a specified snowflake-to-throne transformation. Decide transition behavior, trigger, replay/reset, interruption, keyboard/touch access and a prefers-reduced-motion alternative in the later interaction/motion stage. No transition, animation or new component separation has been implemented.

## Stage 0.2E.1 — verified Blind-spot-scene structure (2026-10-24)

Scope: main frame **`10:997`**, 1920 × 1080, plus targeted verification of the shared `AU-FG-Texture4-8K` image in What-to-do `10:1272` and Footer `10:1016`. Those two frames were inspected only for this texture usage. Exact layer metadata, source checksums and line paths are in `docs/BLIND_SPOT_SCENE_ASSET_IMPORT.json`. There is one static reference frame; no animation or second state was inferred.

### Shared original texture

ImageHash **`364855320f08ade1d04f13556e9f3defb0d52bcb`** is one original **JPEG, 3370 × 2247**, saved once as `public/assets/images/au-fg-texture4-8k.jpg`. The layer name contains “8K”, but the actual original dimensions are the measured 3370 × 2247, not an assumed 8K export. Do not use the PNG render returned for the layer as a substitute original.

| Use / texture node | Texture rectangle | Frame size | Paint opacity | Node opacity | Node blend mode | Paint order |
|---|---|---|---|---|---|---:|
| Blind-spot-scene `10:998` | (0, 0), 1920 × 1080 | 1920 × 1080 | 0.4 | 1 | LIGHTEN | 0 |
| What-to-do `10:1273` | (0, 0), 1920 × 1080 | 1920 × 1080 | 0.2 | 1 | LIGHTEN | 0 |
| Footer `10:1017` | (0, 0), 1920 × 1080 | 1920 × 1334 | 0.4 | 1 | LIGHTEN | 0 |

All three IMAGE paints are visible, NORMAL blend, CROP mode, `imageTransform: [[1, 0, 0], [0, 1, 0]]`, `scalingFactor: 0.5`, with zero filters and no rotation. Preserve the full source-normalized mapping into each measured texture rectangle; the design context maps the whole image to the rectangle rather than tiling it. Do not replace this with the early-section Mosaic, a tiled texture, or an automatic aspect-preserving cover crop. Preserve the distinction between **node LIGHTEN** and **paint NORMAL/opacity**. Footer's texture ends at y=1080 even though its frame extends to y=1334; do not automatically stretch it to the full Footer height. All three frames have content clipping enabled.

### Central `image 51`: original fills and geometry

One rectangle **`10:1012`**, frame origin **(670, 336)**, slot **581 × 581**, center **(960.5, 626.5)**, rotation **0°**, node opacity **1**, frame paint order **14**. Its frame projection is `[[1, 0, 670], [0, 1, 336]]`. Node blend is PASS_THROUGH; IMAGE paints use NORMAL at opacity 1.

| Fill index | Original imageHash | File under `public/assets/images/` | Original dimensions / pixels | Visible |
|---|---|---|---|---|
| 0 | `097adb30ab0ee1356352c1673681a2318d190cad` | `blind-spot-circle-source.png` | 512 × 512, RGB, opaque white background | false |
| 1 | `a3a4fd64ac220162df428e62b8a3cddf755b1fe7` | `blind-spot-circle-cutout.png` | 512 × 512, RGBA, transparent exterior | true |

Both PNG originals are retained. Only fill 1 contributes to the supplied composition; do not enable fill 0 underneath it or treat the hidden PNG as a designed alternate state. Both paints use FILL, identity imageTransform, `scalingFactor: 0.5`, no rotation and zero filters. A square source in a square slot has no aspect-ratio crop. The original 512px image is displayed at **581/512 = 1.134765625×** in Figma. Preserve original bytes/resolution rather than replacing them with a larger rendered export.

The visible PNG has alpha 0–255: **77,172 fully transparent pixels**, **7,049 partial-alpha pixels**, **2,048 transparent edge samples**; nonzero-alpha bounds are (13, 13)–(499, 499). The hidden RGB PNG has no alpha channel and is fully opaque. The visible image's **black center is opaque** (sampled source center RGBA `(1, 1, 1, 255)`), not a transparent hole. Yellow ring, black center, cracks and highlights are fused into the bitmap. No independent ellipse, central mask or Boolean cutout is present.

### Six separate line segments

Each line is a separate VECTOR node with a single straight horizontal path, no fill, arrows, dashes, rotation or effects. Stroke: **white, 4px, centered, opacity 0.3**, butt/no extension cap (`NONE`); node opacity 1. Root frame child indices below are paint order, back to front. Source path data is retained exactly in the JSON, including the third right segment's floating-point length ≈29.

| Segment | Node | Start (x, y) | End (x, y) | Length | Paint order |
|---|---|---|---|---:|---:|
| Upper left | `10:1000` | (356, 509) | (640, 509) | 284 | 2 |
| Upper right | `10:1001` | (1281, 509) | (1427, 509) | 146 | 3 |
| Middle left | `10:1006` | (317, 626) | (640, 626) | 323 | 8 |
| Middle right | `10:1002` | (1281, 626) | (1427, 626) | 146 | 4 |
| Lower left | `10:1009` | (297, 743) | (640, 743) | 343 | 11 |
| Lower right | `10:1003` | (1281, 743) | (1310, 743) | 29 | 5 |

All left segments end at **x=640** and all right segments start at **x=1281**. The central image slot spans **x=670…1251**, leaving a **30px gap** on each side before even accounting for the PNG's own transparent margin. There are no continuous lines extending through or beneath the circle, and no mask hiding their middle portions. The preliminary suggestion of lines passing through the blind area was a proposed behavior, not the observed geometry.

**CSS/SVG assessment:** CSS rectangles are sufficient for the current geometry: width equal to the recorded segment length, height 4px, top at `y−2`, white at opacity 0.3. Preserve each segment independently and do not make the short lower-right segment equal to the others. SVG is also appropriate if later work requires path-based controls: use these six measured paths, centered strokes and butt caps; the two equal 146px paths may share geometry while retaining separate placements. No dedicated vector asset file is needed at this import stage. The central custom bitmap should remain an image rather than be approximated with CSS circles.

### Text structure, stacking and independent elements

| Row center y | Left statement / node | Left text box | Right reaction / node | Right text box |
|---:|---|---|---|---|
| 509 | «Все слова понял» `10:999` | (30, 488), 296 × 42 | «Но почему они смеются?» `10:1004` | (1457, 488), 433 × 42 |
| 626 | «Сюжет понятен» `10:1005` | (30, 605), 257 × 42 | «Но почему он обиделся?» `10:1007` | (1457, 605), 433 × 42 |
| 743 | «Ответ знаком» `10:1008` | (30, 722), 237 × 42 | «Но почему он звучит странно?» `10:1010` | (1340, 722), 550 × 42 |

These six text nodes and six line segments are separate frame children, not three pre-existing grouped full-width paths. Texture is child 0; statements, reactions and line segments occupy 1–12; explanatory note `10:1011` is 13; central image is 14; title `10:1013` is 15; yellow heading container `10:1014` is 16. The image is painted after the row elements, but the recorded line segments do not overlap its slot. All source paint indices are retained in the metadata.

**Potential independent animation elements:** six line segments, six statement/reaction text nodes, one complete central illustration and one background texture rectangle. Rows can be logically coordinated later while preserving their source geometry. The center/ring/cracks cannot be animated separately from the supplied bitmap, and there is no existing moving aperture or line mask.

**Not specified:** trigger, scroll relationship, line travel, changing text/line visibility, timing/easing, replay/reset, interruption or an alternate circle state. Decide any such behavior in a later scoped motion ticket, including keyboard/touch access and a prefers-reduced-motion alternative. Do not infer scroll trapping or a reveal from the static frame. No layout, animation, SVG/CSS implementation or source-image cleanup was performed.

## Stage 0.2E.2 — verified Footer collage (2026-10-24)

Scope: Footer **`10:1016`**, 1920 × 1334, frame clipping enabled. Source: one static Figma frame. Every image, fill, ancestor clip, source transform, primitive pixel rectangle and byte checksum is recorded in `docs/FOOTER_ASSET_IMPORT.json`. No animation was inferred or implemented.

### Raster structure and reuse

Footer has **8 image-filled nodes referencing 9 unique raster hashes**: six previously pending originals and three reused sources. The four new collage layers each contain one complete RGBA image. They are not editable paper/photo/text component trees.

| Figma layer / node | Actual content | Source under `public/assets/images/` | Original dimensions |
|---|---|---|---|
| `image 21` / `10:1142` | Torn-paper eye, fused into one PNG | `footer-eye.png` | 1774 × 887 |
| `image 30` / `10:1143` | Paper strip with baked-in «[не сказано...]» lettering | `footer-unsaid-strip.png` | 2172 × 724 |
| `image 31` / `10:1144` | Paper strip with baked-in «[между строк]» lettering | `footer-between-lines-strip.png` | 2172 × 724 |
| `image 29` / `10:1146` | Mouth and torn paper, fused into one PNG | `footer-mouth.png` | 2172 × 724 |
| `telegram-peer-photo…` / `10:1162` | HSE ART AND DESIGN SCHOOL logo, not a portrait; hidden JPEG plus visible cropped PNG | `footer-school-logo-base.jpg`, `footer-school-logo-cutout.png` | Both 640 × 640 |
| `image 22` / `10:1145` | Reflected, color-filtered Hero accent | reused `hero-eye-accent.png` | 1254 × 1254 |
| `Union` / `10:1073` | Yellow Boolean Union with Hero portrait fill; fully clipped in this frame | reused `hero-person-collage.png` | 1122 × 1402 |
| `AU-FG-Texture4-8K` / `10:1017` | Shared texture, LIGHTEN at 0.4 paint opacity | reused `au-fg-texture4-8k.jpg` | 3370 × 2247 |

The four collage PNGs each have one visible NORMAL IMAGE fill at opacity 1, FILL mode, identity imageTransform, scalingFactor 0.5 and zero filters. Their slot and source aspect ratios match, so no aspect-ratio crop is required. `telegram-peer-photo` has a hidden JPEG FILL followed by visible PNG CROP; do not enable the JPEG behind the transparent logo. Raster filenames/labels do not imply extra editable sublayers or different imagery.

### Position, scale, rotation and paint order

Coordinates below are the **frame-local transform origin**, not the axis-aligned visual bounding-box corner after rotation/reflection. Source-pixel scale is display pixels per original image pixel, using the effective CROP window where present. Rounded display values below are for reading; full precision matrices and scales are in the JSON.

Paint paths are zero-based child indices from the Footer frame, back to front. Keep ancestor clipping with each object. No animated endpoint scales or trajectories are implied.

| Element | Frame transform origin (x, y) | Local slot width × height | Figma rotation / reflection | Effective source scale | Paint path |
|---|---|---|---|---|---|
| Texture `10:1017` | (0, 0) | 1920 × 1080 | 0° | x 0.569733; y 0.480641 | 0 |
| Hidden-by-clip Union `10:1073` | (1106, 887.287109375) | 617.142578125 × 385.712890625 | 0° | ≈0.671676 | 2 / 16 |
| Eye `10:1142` | (1502, 394.92578125) | 258.578186035 × 129.289093018 | +15° Figma / 15° counterclockwise on screen | 0.145759970 | 2 / 17 / 38 |
| Unsaid strip `10:1143` | (1248, 216) | 321 × 107 | 0° | 0.147790055 | 2 / 17 / 39 |
| Between-lines strip `10:1144` | (1546, 819.962890625) | 336 × 112 | +15° Figma / 15° counterclockwise on screen | 0.154696133 | 2 / 18 |
| Accent `10:1145` | (1544, 255) | 337 × 337 | Horizontal reflection; matrix below | 0.268740032 | 2 / 19 |
| Mouth `10:1146` | (1329, 568) | 432 × 144 | 0° | 0.198895028 | 3 |
| School logo `10:1162` | (1679, 1120) | 201 × 80 | 0° | ≈0.3890625 after CROP | 6 |

For the eye and between-lines strip, the frame projection is `x = 0.9659258127212524u + 0.258819043636322v + originX`, `y = -0.258819043636322u + 0.9659258127212524v + originY`. This is one 15° counterclockwise rotation, equivalent to CSS -15°. Do not use the generated axis-aligned wrapper top as the unrotated image origin.

For the accent, use `x = -u + 1544`, `y = v + 255`, giving the actual footprint **x=1207…1544, y=255…592**. The API's scalar rotation of -180° is accompanied by reflection; applying a plain 180° rotation would be incorrect. Preserve the complete matrix `[[−1, 0, 1544], [0, 1, 255]]`.

The accent also has Figma IMAGE filters **exposure=1, contrast=1, shadows=-1**, with saturation, temperature, tint and highlights at 0. This makes the reused Hero source appear gray/white in Footer. No filtered duplicate was committed. Exact runtime filter conversion is deferred to the later layout stage; preserve these original parameters and compare against the Figma appearance instead of assuming a generic CSS brightness/contrast approximation is exact. A Figma-provided processed rendition was used only for temporary visual QA.

### Clipping, crop transforms and effective visibility

| Container | Node / paint path | Frame origin | Dimensions | Clips children |
|---|---|---|---|---|
| Outer collage | `10:1019` / 2 | (1106, 193) | 771 × 694 | yes |
| Middle band | `10:1020` / 2 / 0 | (1106, 502) | 771 × 154 | yes |
| Upper band | `10:1103` / 2 / 17 | (1106, 193) | 771 × 309 | yes |
| Credit strip | `10:1149` / 5 | (0, 1080) | 1920 × 254 | yes |

The eye and unsaid strip are children of the upper band as well as the outer collage, so retain **both** clips. The between-lines strip and reflected accent are only inside the outer collage. The mouth is a separate **root child at paint path 3**, painted above the whole collage subtree; do not move it inside those clips. The school logo is also a separate root child, painted at path 6 after the dark credit-strip subtree at 5; it is not a child of the credit strip.

The portrait Union starts at outer-collage local y=**694.287109375**, beyond its parent's **694px** bottom edge. It and its 29 Boolean rectangle operands are therefore **fully clipped**, despite the node and fill being marked visible. Preserve its source metadata and existing Hero image reference, but do not reveal a portrait that the current Footer does not show. This is geometric clipping, not opacity 0 or an absent source.

School logo's visible PNG CROP transform is exactly `[[0.8072287440299988, 0, 0.09638551622629166], [0, 0.3212851583957672, 0.3413654565811157]]`, normalized to its 640 × 640 source. Preserve this custom crop and its 201 × 80 viewport instead of stretching the entire square PNG. The hidden JPEG has FILL/identity transform and is retained only as an original source.

The hidden portrait Union has visible yellow SOLID plus visible IMAGE, with CROP `[[0.818902313709259, 0, -0.012672530487179756], [0, 0.4095972180366516, 0.7499189376831055]]`. No copy of the portrait bitmap is needed. The texture has the already verified full-source normalized identity CROP mapping into 1920 × 1080, node LIGHTEN and paint NORMAL/opacity 0.4; it stops at the top of the credit strip.

### Pixel geometry, brand mark and independent elements

There are **181 solid primitive rectangles** recorded in the JSON with exact local/frame coordinates, dimensions, colors and paint paths:

- 37 in middle band `10:1020`, with many outside its clip.
- 15 direct outer-collage rectangles.
- 29 operands in the fully clipped Union `10:1073`.
- 38 in upper band `10:1103`, again retaining the original clip.
- 62 primitives in Footer's pixel mark `10:2093`.

All these rectangles have zero rotation/corner radius, no strokes/effects and opaque solid fills; collage tiles are approximately 77.14286px square. CSS rectangles can reproduce the collage geometry; keep fractional coordinates, original order, near-duplicate placements and clips rather than deduplicating tiles by visual position or flattening the collage into a bitmap. The 90 non-Union collage tiles are separate source nodes; only the parts within their parent clips are visible.

The Footer pixel mark is exported separately as **`public/assets/illustrations/footer-pixel-mark.svg`**, 46 × 68, 62 rectangles, at frame origin approximately (40, 1119.349609375), within the brand group at (40, 1120). It is the same mark design as Hero but the direct Footer export has small subpixel coordinate quantization differences, so its source-specific SVG is retained. The adjacent brand name and all other headlines/credits remain text, not part of the PNG collage or this SVG.

**Independently placeable objects:** eye, mouth, each of two paper strips, reflected accent, school logo, pixel geometry, Footer brand mark and text/credit groups. Each paper/photo/letter composition is fused within its own PNG; the paper edges, eye/mouth and raster letters cannot move independently without further source preparation. The fully clipped Union is not currently visible artwork to animate into view by default. Independent movement must carry the correct image crop, source filters, reflection and ancestor clips.

No animation duration, trigger, path, replay/reset or interruption behavior is supplied by this static frame. Decide any future behavior, keyboard/touch equivalent and prefers-reduced-motion alternative in a later scoped motion ticket. No layout or animation was implemented. Footer can be reconstructed from these separate original sources, primitives, text and recorded transforms/clips; no whole-frame screenshot is used as an asset.
