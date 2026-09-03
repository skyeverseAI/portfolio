> NOT the shipping résumé. `Akash_AI_26.pdf` (LaTeX, in this folder and served
> from `public/`) is what the site links and what goes to recruiters. This file
> is the longer working draft the PDF was cut down from.

# AAKASH AGGARWAL
## AI & Automation Engineer

India · IST (UTC+5:30) · akash.skyeverse@gmail.com
linkedin.com/in/skyeverse · github.com/skyeverseAI · skyeverse.space

Open to remote roles worldwide and to relocation with visa sponsorship.
No current EU/UK/US work authorization.

---

## SUMMARY

Mechanical engineer turned AI and automation engineer. Nine production systems built
across a government revenue department, an advertising agency, and independent work:
retrieval pipelines over scanned legal documents, outbound voice agents, invoice
validation, and browser automation that removes daily manual data entry. Consistent
focus on measuring whether an output is actually correct, not whether a demo runs.

---

## SELECTED PROJECTS

**LERAGS — local-only RAG over scanned court filings** · Independent · 2026
*Python, docling, OCR, embeddings, retrieval*

- Converted 10,062 pages across 64 scanned petitions into structured text, yielding
  30.5M characters against the 10.7M carried by the PDFs' own text layer — 2.8x
  coverage, where the incumbent layer reached only 35% of the corpus.
- Cut OCR throughput from 13.1 hours to 2.1 hours through pipeline tuning.
- Reduced orphaned table rows from 33.2% to 8.2% by chunking the structured document
  rather than splitting joined markdown on character counts; validated across ten
  files rather than the single file that surfaced the problem.
- Replaced a failing LLM metadata extractor with a court-registry lookup after
  measuring it across three prompt and schema configurations; the registry resolves
  62 of 62 files on every field.
- Retracted a published finding after establishing the OCR text was legible (mean
  0.914 of name tokens present) and the model had failed on readable input —
  reclassifying it from an OCR-quality result to a model-capability one.
- Runs entirely on local hardware; confidentiality, not latency, is the constraint.

**MIA — outbound voice agent** · Skyeverse · 2026
*Voice telephony, Airtable, webhooks, state machine*

- Outbound calling over an Airtable queue ordered by least-recently-called, locking
  each record before dialling so overlapping runs cannot call one person twice.
- Call completion resolves through a seven-way state machine — hot, warm, callback,
  not interested, voicemail, wrong number, invalid — each branch writing a distinct
  CRM state before merging to store transcript, summary, and objection.
- Webhook acknowledges before processing, so a slow downstream write cannot present
  itself as a failed call.

**Invoice auditor** · Skyeverse · 2026
*Gemini vision, deterministic validation, Telegram*

- Model reads, code computes. Extraction is explicitly forbidden from inferring
  subtotals or calculating totals; every figure is recomputed downstream and any
  disagreement over half a rupee becomes a flag carrying its own reason.
- Catches line math that does not multiply, subtotals contradicting their own line
  items, mismatched totals, missing signatures, and duplicate invoice numbers
  checked against a ledger before write.
- Flags are clearable through an override endpoint that records who decided — a
  control rather than an obstacle.

**Court automation suite** · Dept. of Revenue · 2025
*Playwright, Tesseract, OpenCV, Streamlit, Google Sheets*

- Cause list watcher: headless traversal of High Court cause lists by date range and
  court hall, tracking section headings, filtering to departmental respondents, and
  appending ten fields per case to a sheet with CSV fallback. Replaced a daily manual
  read-and-retype.
- Bulk case status: batch portal lookups clearing numeric challenges via OpenCV
  preprocessing and a digits-only OCR pass, re-requesting on failed reads; outputs
  Excel with the run visible in progress.
- Case file labelling: existing CSV to print-ready A4 label sheets, three to a page.

**Lead qualification and inbound pipeline** · Skyeverse · 2026
*n8n, Claude, Apify, Notion, Gmail, Calendar*

- Two-score qualification, deliberately different in kind: a deterministic 100-point
  pass over profile facts weighted 40%, and a model reading the same profile for
  buying readiness against a fixed schema weighted 60%. Leads scoring 60 or above
  become Notion records with an outreach hook attached.
- Inbound handling with three failure-path handlers — bounce detection parsing failed
  addresses out of nested MIME, calendar reconciliation of bookings and cancellations
  back onto the row, and a dashboard served off the sheet.

**Magica — ad permutation renderer** · Idea Clan · 2022–24
*Python standard library, ffmpeg*

- Rendered every hook x body x CTA combination from folders of source clips through
  ffmpeg, replacing per-variant manual editing. No install; ran in a browser tab.

---

## EXPERIENCE

**Inspector of GST** — Department of Revenue, Government of India · Jul 2025–present
Built and deployed the court automation suite above alongside statutory duties,
removing recurring manual data entry from departmental litigation tracking.

**AI Automation Engineer** (formerly Data Analyst) — Idea Clan · 2023–2024
Built Magica, an ad permutation renderer that removed manual per-variant editing
from the creative pipeline.

**[TITLE TO CONFIRM]** — Eicher Tractors · 2019
Rebuilt manual data-entry forms after observing full days spent copying numbers
between them.

---

## SKILLS

**Languages and runtimes:** Python, JavaScript, FastAPI, Docker
**Models and retrieval:** Claude, Gemini, OpenAI, structured extraction, RAG,
embeddings, agent tool-use, evaluation harnesses
**Automation:** n8n, Playwright, Apify, webhooks, OAuth, event-driven jobs, queues
and retries
**Voice:** LiveKit, VAPI, turn-taking and barge-in, telephony hand-off, transcripts
**Data:** Supabase, Postgres, Airtable, Google Sheets, pandas

---

## EDUCATION

**B.Tech, Mechanical Engineering** — Punjab Engineering College, Chandigarh · 2016–2020 · CGPA 8.4/10

---
---

# NOTES — DELETE THIS SECTION BEFORE EXPORTING

**Confirm before sending anywhere:**
1. Job titles at Idea Clan and Eicher Tractors.
2. Degree name (B.E. / B.Tech) and institution.
3. Your city, if you want it above "India" — country-level is fine and more private.
4. Whether "Skyeverse" should appear as the banner on those four projects, or whether
   you'd rather they read "Independent".
5. Eicher Tractors 2019 — was this an internship, a trainee role, or full-time?

**Deliberately absent — do not fill with adjectives:**
MIA, the invoice auditor, and the lead engine have no measured outcome numbers. The
measurements exist in the systems themselves (Airtable call counts and outcome
distribution, PASS/FLAG counts in the invoice sheet, the conversion rate the lead
dashboard already computes). Pull the real figures and add one bullet each — that is
the highest-value edit remaining on this document.

**Length:** currently runs ~1.3 pages. For a strict one-page version, cut Magica and
compress the Court automation suite to two bullets. Keep LERAGS at full length; it is
the strongest thing here.

**ATS-safe:** single column, no tables, no text boxes, no graphics, standard section
headings. Export to PDF from Google Docs or Word rather than a design tool, and name
the file `Aakash-Aggarwal-AI-Automation-Engineer.pdf`.
