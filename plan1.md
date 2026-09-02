# Portfolio evaluation → 10/10 plan

## Context

`akash.build` is a finished-feeling one-page portfolio: Next.js 16 App Router, fully
static, content driven entirely from `data/*.json`. The writing is genuinely good and
the design has a point of view. But it has never been deployed, so its current
recruiter conversion rate is exactly zero — and several gaps would blunt it even once
live, mostly around *identity, evidence, and logistics* rather than craft.

The goal is a site that converts for three different readers who arrive in this order:

1. **Agency recruiter (EU/US), 20 seconds** — needs name, location, timezone, stack, a
   forwardable PDF. Filters on geography before reading a word of prose.
2. **Technical screener / hiring manager, 3 minutes** — needs outcomes, code, and one
   deep artifact proving engineering judgment.
3. **Anyone who Googles the name afterwards** — needs the site to rank and to preview
   properly when pasted into LinkedIn or Slack.

Today the site serves reader 2 well, reader 1 poorly, and reader 3 not at all.

---

## Rating

**Craft: 7.5/10. As a recruiter-conversion instrument: 4/10** (it isn't deployed;
even discounting that, ~6).

### What is already excellent — protect this, don't refactor it away

- **The voice.** `"Find the thing being done twice. / Delete the second time."` and
  `"Things built to solve problems that shouldn't have needed a person"` are better
  than what 95% of engineering portfolios manage. No hype, no filler. Keep every word.
- **The LERAGS staged case study** (`data/work.json:21-93`) is the single strongest
  asset on the site. Stage 04, *"The claim I had to withdraw"* — where you state a
  finding, get challenged, measure it, and downgrade your own conclusion from *proven*
  to *untested* — is a rare, senior signal. Most candidates cannot demonstrate this.
- **PROBLEM / APPROACH / RESULT** is exactly the shape a hiring manager scans for.
- **The `ml` vs `auto` split by "what the project had to get right"** rather than by
  technology is a genuinely thoughtful taxonomy, and it's defensible in an interview.
- **Content-as-data architecture.** Adding a project touches no JSX. Clean.

### What is holding it back

**Tier 0 — blockers that lose the opportunity outright**

| # | Finding | Evidence |
|---|---|---|
| 1 | **Not deployed.** Nothing else on this list matters until it's reachable. | no `vercel.json`, no CI, no domain |
| 2 | **No résumé.** Agencies pipeline candidates by forwarding a PDF. | `data/site.json:69` → `"href": "#"` |
| 3 | **Name is inconsistent across five surfaces.** A recruiter cannot confidently type it into an ATS. | masthead `Aakash Aggarwal` · `CLAUDE.md` says *Akash Kumar* · git author `Akash` · wordmark `aakash.builds` · footer `AKASH.BUILD` · `<title>` `akash.build` · GitHub `skyeverseAI` |
| 4 | **No location, timezone, or work authorization.** You are targeting EU + India + US + remote; geography is the recruiter's first filter. `"Est. 2026 · Remote"` also reads as a *company*, not a person. | `data/site.json:4` |
| 5 | **No social preview.** Every LinkedIn share — the main recruiter surface — renders a bare grey link. No `openGraph`, no `twitter`, no `metadataBase`. | `app/layout.js:27-31` |
| 6 | **Three `null` results** sit on the three projects a manager is most likely to ask about. Not inventing numbers was right; the fix is to *go get them*. | invoice auditor, lead scoring engine, MIA |

**Tier 1 — credibility gaps**

7. **"Skyeverse · 2026" appears on four projects but Skyeverse is absent from the TRACE
   timeline**, which ends at *"2025– Inspector of GST"*. Unexplained affiliation.
8. **No visual evidence anywhere** — a site about *systems* with zero diagrams. MIA's
   seven-way return leg and the invoice read/compute split are each one diagram away
   from being instantly legible to a skimmer.
9. **All four writings have empty `href`** and land on the same Substack homepage —
   four links that appear broken. All dated Aug 2026, then silence.
10. **Only 3 of 9 projects link code**, and no project has a demo.
11. **`stack.json` lists OpenAI + Gemini; `work.json` uses Claude + Gemini.** A
    technical screener notices.
12. **Job-title mismatch is never addressed.** The site *argues* the throughline in
    `01 about` but never states what role you now want.

**Tier 2 — polish a technical reviewer will actually check**

13. **`outline: none` (`app/globals.css:339`) with no `:focus-visible` fallback
    anywhere in 1179 lines.** Keyboard users get no focus indicator. On an engineer's
    own site this is a quality signal, not just an a11y bug.
14. **Half-implemented ARIA tabs** — `role="tablist"`/`role="tab"` with no
    `aria-controls`, no `role="tabpanel"`, no arrow-key handling (`Work.js:162-175`).
15. **`lenis` is installed and never imported.** Dead dependency.
16. **Default `create-next-app` README on a public repo**, default Next favicon, and
    five leftover `public/*.svg` files (`next.svg`, `vercel.svg`, …).
17. **`Nav.js` calls `setState` on every scroll event** — no rAF throttle, no
    `IntersectionObserver`.
18. **No `robots.txt`, no `sitemap`, no JSON-LD `Person`.** Nothing helps you rank.
19. **No analytics.** You'll never learn that an agency in Berlin spent four minutes on
    the LERAGS case.

**Tier 3 — the actual difference between 8 and 10**

20. **There is no stated thesis for the 40-second reader.** The site is a body of
    evidence with no summary. The dictionary entry does maybe 30% of that job.
21. **Case depth is uneven** — LERAGS is a 10/10 artifact, two projects have decent
    5-block cases, six have three paragraphs each.

---

## Phase 1 — Ship it and make it findable *(highest value per hour)*

**1.1 Deploy.** Vercel + GitHub `skyeverseAI/portfolio`. Static export, push-to-deploy.
Buy and connect a domain — `akash.build` if free. Pick the domain and the wordmark
together so they finally match (see 1.3).

**1.2 Analytics.** Vercel Analytics or Plausible. You need to know which projects get
opened and which cases get expanded — that data should drive the next revision.

**1.3 Settle the identity — one name, everywhere.**
Files: `data/site.json` (`masthead.name`, `wordmark`, `footer`), `app/layout.js`
(`metadata.title`), `README.md`, GitHub display name.
*Needs your input — see Inputs.* Replace `"Est. 2026 · Remote"`, which reads as a
company founding date, with something a person has: city + timezone.

**1.4 Full metadata block** in `app/layout.js`: `metadataBase`, `openGraph`
(title/description/url/siteName/images/locale), `twitter: { card: "summary_large_image" }`,
`alternates.canonical`, `keywords`, `authors`.

**1.5 OG image.** Add `app/opengraph-image.js` using Next's `ImageResponse` — generated
at build time from the wordmark and headword, so it can never go stale. 1200×630.
Test with LinkedIn Post Inspector before announcing anything anywhere.

**1.6 `app/sitemap.js`, `app/robots.js`, and JSON-LD `Person` schema** (name, jobTitle,
`sameAs` → LinkedIn/GitHub/Substack, `knowsAbout`, `address`) injected as a
`<script type="application/ld+json">` in the layout.

**1.7 Real favicon** replacing the create-next-app default, and delete
`public/{next,vercel,file,globe,window}.svg`.

**Done when:** the domain resolves over HTTPS, pasting the URL into LinkedIn renders a
card with your name and title, and `site:akash.build` is indexed.

---

## Phase 2 — Answer the recruiter's first three questions

**2.1 Availability strip.** You chose to state it plainly. Add to `data/site.json` a
`status` object — location, timezone with an explicit overlap claim, work
authorization, and what you're open to. Render it as a thin bar directly under the
masthead in `Hero.js` and again in `05 contact`. Concretely, something like:

> `BASED IN <city>, IST (UTC+5:30) · OVERLAPS CET TO 18:00, ET TO 12:30`
> `OPEN TO REMOTE AI/AUTOMATION ENGINEERING ROLES · <auth status>`

Written in the existing mono-caps register so it reads as instrument panel, not plea.
The timezone-overlap line is the highest-leverage sentence on the whole site for a
European or US remote hire — it pre-empts the objection before it forms.

**2.2 The 40-second thesis.** One short paragraph between the dictionary entry and the
EXPLORE dock: what you build, how long you've built it, the two or three systems in
production right now, and what you want next. This is Tier-3 item 20 and it's the main
reason the site currently reads as an essay rather than a candidacy.

**2.3 Résumé.** You chose *draft one from the site*. I'll generate
`resume/akash-resume.md` from `work.json` + `site.json` — one page, ATS-safe (no
columns, no tables, no graphics, standard section headings), the same voice, with the
measured LERAGS numbers as the lead bullet. You review and correct the facts, then we
export to `public/akash-aggarwal-resume.pdf` and wire `data/site.json:69`, adding a
`download` attribute in `Contact.js` and a second link in the hero strip.

*Note:* the site already contains far more substance than most résumés — this is a
reformatting job, not a writing-from-scratch job.

**2.4 Explain Skyeverse.** Add it to `about.timeline` so the four projects tagged
`Skyeverse · 2026` have somewhere to land. *Needs your input.*

**Done when:** a recruiter can answer "where are they, when can they meet, can they be
hired, and can I forward something" without emailing you.

---

## Phase 3 — Make the evidence visible

You said you want visuals but don't know how. **You won't need any design tool.** I'll
hand-author them as inline SVG in the repo — vector, theme-aware (they respect the
existing `#e1ad66` / `#b68235` palette), and they scale on mobile with no image
assets to manage. They contain no real case data, so there's no confidentiality
exposure from the Dept. of Revenue work.

**3.1 Three architecture diagrams**, added as an optional `diagram` field on a work
entry (rendered inside the case panel, so nothing changes for entries without one):

- **LERAGS** — scanned PDF → OCR (docling/OcrMac) → DoclingDoc → HybridChunker →
  local embeddings → retrieval with page-image citation. Annotated with the real
  measured numbers already in the JSON (10,062 pages, 2.8×, 8.2% orphan rate). This is
  the diagram that makes your best work legible in five seconds.
- **MIA** — the seven-way return leg. Airtable queue → lock → dial → the seven terminal
  states → merge → CRM write. Your own case text says this is the hard part; right now
  a reader has to take that on faith.
- **Invoice auditor** — the read/compute split: model reads, JavaScript computes,
  disagreement becomes a flag with a reason. One box with a wall down the middle. It
  makes the central design decision self-evident.

**3.2 A scannable summary row per project.** Above PROBLEM, a single mono line:
`STACK · SCALE · OUTCOME`. Non-technical recruiters read only this line; technical
ones read past it. Cheap, high-yield.

**3.3 Safe screenshots** for the three already-audited public repos — I'll drive the
apps locally, capture, and check each frame for real names or numbers before it lands.

**3.4 Fix `writings`.** Fill the four `href`s with real post URLs, or cut the list to
the posts that exist and let the Substack button carry the rest. Four links to the
same homepage is worse than two links that work.

**Done when:** someone who cannot read code can still say what LERAGS and MIA do.

---

## Phase 4 — Close the credibility gaps

**4.1 Get the three missing numbers.** `CLAUDE.md` correctly forbids inventing them,
and they exist in the systems: MIA's call counts and outcome distribution in Airtable;
the invoice auditor's PASS/FLAG counts in its sheet; the lead engine's conversion rate
in its own dashboard. *This is a task for you, not for me* — one hour of pulling real
figures upgrades three projects from anecdote to result. If a number turns out to be
unflattering, ship it anyway; the LERAGS "claim I had to withdraw" stage proves that
honest numbers read as strength on this particular site.

**4.2 Reconcile `stack.json` with `work.json`** — add Claude, and make the model list
reflect what you actually ship on.

**4.3 One more case study at LERAGS depth.** Pick MIA — it has the richest engineering
story and a `null` result that Phase 4.1 will fill. Two deep artifacts beats one.

**4.4 Verify the `where` values.** `CLAUDE.md` flags LERAGS (`Independent · 2026`) and
Magica (`Idea Clan · 2022–24`) as inferred, not confirmed. Anything on a résumé must be
defensible in an interview.

---

## Phase 5 — Engineering polish (what a technical reviewer greps for)

**5.1 Focus states.** Remove the bare `outline: none` at `app/globals.css:339`; add a
`:focus-visible` ring on every interactive element — nav links, dock pills, tab
buttons, case/stage toggles, terminal input, contact links. Amber on dark, `#7d5411`
on light, to stay inside the design system.

**5.2 Finish the tab ARIA** in `Work.js`: `aria-controls` + `id` pairing, a real
`role="tabpanel"` wrapper, and arrow-key navigation. Add `aria-labelledby` to each
`<section>`, and a skip-to-content link as the first focusable element.

**5.3 `Nav.js`:** replace the per-event `setState` with `IntersectionObserver` for the
active section and a rAF-throttled handler for nav visibility.

**5.4 Housekeeping:** remove the unused `lenis` dependency (or actually use it), and
replace the default `README.md` — the repo is public, and a boilerplate README on the
portfolio repo itself undercuts everything the site claims.

**5.5 Mobile pass at 375px.** The hero terminal carries a text input; the nav prompt
hides below 560px. Verify the whole page on a real narrow viewport — a large share of
recruiter traffic arrives from LinkedIn on a phone.

**5.6 Lighthouse ≥ 95** on all four axes, and confirm the ARIA tab pattern with
keyboard-only navigation end to end.

---

## Inputs I need from you

Facts I cannot invent. Phases 1 and 2 are blocked on the first three.

1. **Your name, exactly as it should appear** — `masthead.name` says *Aakash Aggarwal*,
   `CLAUDE.md` says *Akash Kumar*, git says *Akash*. Which is right?
2. **City + work authorization.** Country of residence, and any right-to-work you hold
   for the EU/UK/US (or explicitly: none, remote contract only). This determines the
   wording of the availability strip.
3. **What role you want**, in your own words — the strip and the thesis paragraph both
   depend on it.
4. **What Skyeverse is** — your own consultancy, a client, freelance banner? — and the
   dates for the timeline entry.
5. **The three missing numbers** (Phase 4.1).
6. **Whether `akash.build` is available**, or which domain to buy.
7. **Real Substack post URLs** for the four writings entries.

---

## Verification

- `npm run build && npm run lint` clean after every phase.
- **Metadata:** LinkedIn Post Inspector and `opengraph.xyz` both render a correct card.
- **Live check:** drive the deployed URL in Chrome at 375px, 900px, and 1440px;
  confirm the nav slide-in, tab switching, case/stage accordions, and terminal
  commands (`ls`, `whoami`, `clear`, `/work`) all still work.
- **Keyboard-only pass:** Tab from the top through skip-link → nav → dock → tabs →
  case toggles → contact. Every stop must show a visible focus ring.
- **Lighthouse** ≥ 95 across Performance / Accessibility / Best Practices / SEO.
- **The 20-second test** — the real one. Open the live site cold and time how long it
  takes to find: name, location, timezone, one measured result, and the résumé. If any
  takes longer than 20 seconds, Phase 2 isn't finished.

## Sequencing note

Phases 1 and 2 carry almost all of the conversion value and are roughly a day of work.
Phase 3 is what moves it from *good* to *memorable*. Phases 4 and 5 are what survive a
technical screener's scrutiny. Do them in order — a beautifully polished site that
nobody can reach converts at zero.
