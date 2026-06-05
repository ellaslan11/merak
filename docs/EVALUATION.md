# Merak — Evaluation & Evidence (CS 153)

This document supports the **Evaluation & Evidence** rubric criterion. Methods are lightweight but real; extend with your own user sessions before final submission.

## 1. Caption quality (automated)

**Question:** Does image understanding add value over location metadata alone?

**Method:** Compare three caption sources for all 10 shared photos:

| Source | Description |
|--------|-------------|
| Location-only | Parser fallback: `"A moment from {location}"` |
| Vision cache | BLIP-style captions in `lib/visionCache.json` |
| User caption | Ella's own caption in `lib/phoneData.ts` |

**Run:**

```bash
npm run evaluate:captions
```

Paste the generated table into your video slide or appendix.

**Finding (expected):** Vision captions recover *who/what* (friends, food, formal backdrop) that location strings miss. Location-only is intentionally conservative for privacy.

**Limitation:** Cache was hand-verified against photos; live BLIP may differ. Compare live results via Phone → Analyze camera roll with `HF_TOKEN` set.

---

## 2. Privacy framing (recommended — add your data)

**Question:** Do users prefer opt-in sharing vs full camera roll access?

**Method:** 5–10 minute survey or informal interviews with classmates.

Sample prompt:

> Merak only reads photos and texts you mark "shared with Merak." Google Photos reads your entire library. On a scale of 1–5, which approach would you trust more for a memory app?

**Record:** N, mean score, 2 verbatim quotes, 1 counterargument.

**Template results** (replace before submission):

| Metric | Value |
|--------|-------|
| Participants | _N = ___ |
| Mean trust (opt-in) | ___ / 5 |
| Quote | "___" |

---

## 3. Usability task (recommended — add your data)

**Task:** "Find one moment from this week you'd want to remember in a year."

**Conditions:**

- A) Scroll Merak **memory capsule** (2 min)
- B) Scroll **camera roll** simulation / camera app (2 min)

**Measure:** Time to identify a moment, confidence 1–5, emotional resonance 1–5.

**Template:**

| Condition | Avg. time | Confidence | Resonance |
|-----------|-----------|------------|-----------|
| Merak capsule | ___ | ___ | ___ |
| Camera roll | ___ | ___ | ___ |

---

## 4. Provenance check (built into product)

**Feature:** Weekly letter and daily note link to **source artifacts** on `/phone` (photos, texts, calendar).

**Claim validated:** Merak's outputs are traceable — not a black-box summary.

**Demo in video:** Open weekly letter → tap a source → land on highlighted photo or text.

---

## 5. Letter generation modes

| Mode | When | Rubric note |
|------|------|-------------|
| Template | `parsePhoneData.ts` rules | Always works offline |
| OpenAI | `OPENAI_API_KEY` + `/api/generate-letter` | Shows LLM iteration |

Badge on letter UI: **"AI letter · grounded in your sources"** vs **"Template · from parsed signals"**.

---

## 6. Known limitations (honest disclosure)

- Simulated phone data — not production iOS integrations
- Rule-based patterns — not a trained recommender
- Single demo persona (Ella, one week)
- No longitudinal deployment or IRB study

---

## 7. Future evaluation

- A/B template vs OpenAI letter quality (human rubric: warmth, factual grounding)
- On-device embeddings for privacy-preserving retrieval
- 2-week field study with real share-sheet imports
