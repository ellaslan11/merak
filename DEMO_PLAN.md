# Merak — Technical Demo Plan (CS 153)

**Length:** 4–6 minutes · **Goal:** Show consent-bounded memory synthesis is real engineering, not a slideshow.

---

## Pre-flight (2 min before recording)

```bash
cd ~/Downloads/merak
# Fresh demo state (13/21 photos shared)
# In browser console on localhost: localStorage.removeItem('merak-consent-v2')
npm run dev
```

Optional: set `HF_TOKEN` and `OPENAI_API_KEY` in `.env.local` for live vision + AI letter badges.

**Browser:** 390px phone frame, zoom 100%, close other tabs.

---

## Act structure

| Act | Time | Screen | Technical point to state |
|-----|------|--------|---------------------------|
| **0** Hook | 0:30 | Landing | Problem: 10k photos, zero narrative; scrape = creepy |
| **1** Consent | 1:00 | `/phone` → Photos | **Per-photo opt-in**; 6/10 visible; 4 grayed out |
| **2** Pipeline | 1:30 | `/home` parse animation | **parsePhoneData.ts** counts only shared items |
| **3** Wow moment | 1:00 | `/phone` toggle + sync | Turn ON festival + formal → **Update memory** → counts change |
| **4** Provenance | 0:45 | `/weekly-letter` | Tap source → highlighted photo on Phone |
| **5** Tech panel | 0:30 | `/home` expand "Technical pipeline" | Signals → patterns → synthesis |
| **6** Vision (opt) | 0:30 | Phone → Analyze camera roll | BLIP API route, not fake captions |
| **7** Close | 0:30 | Capsule | Impact + limitations (simulated phone, real pipeline) |

---

## The "wow" beat (script exactly)

1. Open **Phone → Photos**. Say: *"Merak sees thirteen of twenty-one photos — eight stay private."*
2. Tap **festival**, **YC**, or **Pi Phi mirror** so eye icons turn green.
3. Tap **Update memory** (sticky bar).
4. Go **Home** — parsing runs again with higher photo count.
5. Open **Weekly letter** — new themes appear; expand **Sources** → tap a photo → lands highlighted on Phone.

---

## Technical callouts (say one sentence each)

1. **Consent gate:** `merakShared` filter in `lib/parsePhoneData.ts` before any signal exists.
2. **Normalization:** Phone artifacts → typed `MemorySignal` union (photo, text, calendar, reflection).
3. **Derivation:** Place clusters + friend memories only from filtered signals.
4. **Patterns:** `lib/patterns.ts` rule engine on signal graph.
5. **Synthesis:** Template letter + optional OpenAI with `GENERATION_RULES` — no inventing events.
6. **Provenance:** `lib/provenance.ts` maps `relatedSignalIds` → `/phone?highlight=`.
7. **Vision:** `POST /api/analyze-photo` → Hugging Face BLIP, cache fallback.

---

## README / rubric checklist on screen

Flash these headings in video or final slide:

- Problem & insight: consent-bounded memory
- Execution: Next.js 15 + parser + vision API
- Evaluation: `npm run evaluate:captions` + user study (fill in)
- AI disclosure: `docs/AI_DISCLOSURE.md`

---

## Backup if live APIs fail

- Vision: "Analyze camera roll" still shows `visionCache.json` captions
- Letter: Template badge — still valid; say rules-based fallback is intentional

---

## Files to mention if asked "show me the code"

| File | One line |
|------|----------|
| `lib/consentStore.ts` | Per-photo overrides in localStorage |
| `lib/consentAwareData.ts` | Merges consent before parse |
| `lib/parsePhoneData.ts` | Core synthesis pipeline |
| `lib/provenance.ts` | Traceability |
| `app/api/analyze-photo/route.ts` | Real vision |
| `app/api/generate-letter/route.ts` | Optional LLM |

---

## Peer review sound bite

*"One person built a full memory pipeline: opt-in ingest, structured signals, pattern detection, generative outputs with provenance — not a chatbot that reads your entire camera roll."*
