@AGENTS.md

# akash.build — portfolio

Personal portfolio for Akash Kumar. Next.js (App Router), fully static, no backend.

Run: `npm run dev` → http://localhost:3000 · Build: `npm run build` · Lint: `npm run lint`

## Shape of the site

**One long scrolling page.** Not routes — every section lives on `/`, and the nav
anchor-scrolls. Order and ground colour alternate deliberately:

| Section | id | ground | source |
|---|---|---|---|
| Hero (masthead, wordmark, dictionary entry, terminal, EXPLORE dock) | `top` | dark | `data/site.json` |
| about `01` | `about` | light | `data/site.json` → `about` |
| stack `02` | `stack` | light | `data/stack.json` |
| work `03` | `work` | light | `data/work.json` |
| writings `04` | `writings` | light | `data/writings.json` |
| contact `05` | `contact` | dark | `data/site.json` → `contact` |

The sticky nav is hidden over the hero and slides in below it. Its left side is a
live shell prompt whose path tracks the section you're in (`:~/about$` →
`:~/work$`). That behaviour lives in `app/components/Nav.js`.

## Content is data, not markup

**Edit `data/*.json`, not components.** Adding a project or a post should never
require touching JSX.

- `data/site.json` — masthead, wordmark, dictionary entry, terminal copy, about prose, contact, footer
- `data/work.json` — projects, split into the `ml` (APPLIED ML) and `auto` (AUTOMATIONS) tabs. **The split is by what the project had to get right, not by technology:** `ml` is work where the hard part was knowing whether the output was right; `auto` is work where the win is hours removed. Nearly everything now has a model in it, so a technology split sorts nothing.
- `data/stack.json` — the four stack columns
- `data/writings.json` — post list

A work entry:

```json
{
  "num": "03",
  "title": "Project name",
  "where": "Dept. of Revenue · 2025",
  "tags": ["Tag", "Tag"],
  "status": "IN PROGRESS",
  "problem": "One or two sentences.",
  "approach": "How it was actually built.",
  "result": "What changed as a result.",
  "case": null
}
```

`where` names the room the work was built in — it ties each entry back to the
trace in `01 about`, so the "same move in every job" argument is visible rather
than asserted. It renders after `status`, in `--num` grey.

`result` may be `null` when the honest number isn't known yet; the RESULT row is
then skipped rather than filled with a placeholder. Don't invent one.

`repo` is **opt-in and gated on a review, not a field to fill in for every entry.**
It renders as a `CODE ↗` link. Only add it after actually reading the repository
for leftover sample data, hardcoded records, and screenshots containing real
names or numbers — several of these projects were built inside a revenue
department. Currently set on three: LERAGS, invoice-auditor, csv-sticker-automator
(audited 2026-09-01: no sample CSVs, dummy preview image, no case data).

`case` is `null` for no expandable panel, or an array of `{heading, body}` blocks —
that renders the OPEN CASE → / CLOSE CASE ↑ accordion. See LERAGS for the pattern.

The project count and "NN PROJECTS" label derive from the array length; don't
hardcode them.

## Design system — don't drift

Values were extracted from an approved reference build. Keep them.

- Dark `#1a1815` / text `#f0ece4` · Light `#f3f2f2` / text `#201f1d`
- Amber `#e1ad66` (on dark) · `#7d5411` section slugs · `#b68235` tags/arrows (on light)
- Display **Cormorant Garamond** (weight 400, `letter-spacing: -0.025em`), body **Lora** 15px/1.55, mono **IBM Plex Mono**
- Fonts load via `next/font/google` in `app/layout.js` and are exposed as `--font-display`, `--font-body`, `--font-mono`

All styling is plain CSS in `app/globals.css`. No Tailwind, no CSS modules.

**Watch out:** `.wrap` supplies the horizontal page padding (64px). Any class that
shares an element with `.wrap` must not use the `padding` shorthand — it silently
wipes that padding out. Use `padding-top` / `padding-bottom`. This has bitten twice.

## Known gaps — deliberate, don't "fix" silently

- **Three `result` fields are `null`, on purpose:** invoice auditor, lead scoring engine, MIA. The measurements exist in the systems themselves — call counts and outcomes in Airtable, PASS/FLAG counts in the invoice sheet, the conversion rate the lead dashboard already computes. Ask Akash for the real figures; don't invent them and don't fill the gap with adjectives.
- **`where` values are unverified** except the Dept. of Revenue ones. LERAGS is marked `Independent · 2026` and Magica `Idea Clan · 2022–24` on inference, not on Akash's word.
- **One placeholder link left** in `data/site.json` → `contact.links`: the résumé PDF, marked `"placeholder": true`, pointing at `#`. Email, LinkedIn, GitHub and Substack are real. (The `placeholder` flag is documentation only — `Contact.js` does not read it.)
- Writings posts have empty `href` and fall back to the Substack URL.

## History

The previous portfolio (amber/orange theme, Timeline + Projects + CurrentlyBuilding
components) is **archived, not deleted** — tag `v1-archive`, branch
`archive/v1-amber-timeline`. Don't resurrect its patterns; it was replaced on purpose.

## Related work on this machine

`~/Desktop/LERAGS` — local-only RAG over scanned High Court writ petitions. The
LERAGS case study on this site was written from that repo's `README.md`,
`plan.md`, `problems.md` and git log. When a project needs a case study, read the
real repo and use measured numbers; that project's own rule is that every claim
carries a measurement.

## Voice

Plain and specific. Concrete numbers over adjectives. The existing copy is the
reference — "Things built to solve problems that shouldn't have needed a person",
not "passionate about leveraging AI". No hype, no filler.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
