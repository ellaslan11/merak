# Merak

**Your life, remembered softly.**

Consent-first AI memory companion MVP — shown inside a phone frame. Merak reads only what Ella **opts in** (photos, texts, calendar, voice memos), parses them into memory signals, and writes daily notes, weekly letters, and memory capsules.

**Course:** CS 153 · **Track:** Application / Product  
**Demo persona:** Ella · **Week:** Campus Week (Feb 17–23, 2026)

---

## Rubric alignment (for graders)

| Criterion | Where to look |
|-----------|----------------|
| **Problem & insight** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — consent vs scrape |
| **Execution** | Live demo path below; parser + vision + optional LLM |
| **Evaluation** | [docs/EVALUATION.md](docs/EVALUATION.md) + `npm run evaluate:captions` |
| **Communication** | This README + demo video script |
| **AI disclosure** | [docs/AI_DISCLOSURE.md](docs/AI_DISCLOSURE.md) |

---

## Quick start

```bash
cd ~/Downloads/merak
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) · **Shortcut:** Landing → **Demo →**

### Optional environment

Copy `.env.example` → `.env.local`:

```bash
HF_TOKEN=hf_...           # Live BLIP captions on shared photos
OPENAI_API_KEY=sk-...     # AI weekly letter at /weekly-letter
PEXELS_API_KEY=...        # Optional live camera roll feed
```

Without keys: template letter + `lib/visionCache.json` fallbacks.

---

## Demo path (4–6 min technical video)

**Hero moment:** Phone → toggle **festival** + **formal** photos → **Update memory** → Home re-parses (6→8 photos) → Weekly letter gains new sources.

1. `/phone?tab=photos` — Per-photo consent (6/10 shared by default)  
2. `/home` — Parse animation + **Technical pipeline** panel  
3. **Update memory** after toggling photos  
4. `/weekly-letter` — Provenance links → highlighted source  
5. `/capsules/florence-week-3` — Capsule  

See [DEMO_SCRIPT.md](DEMO_SCRIPT.md) and [DEMO_PLAN.md](DEMO_PLAN.md).

**Reset demo:** `localStorage.removeItem('merak-consent-v2'); location.reload();`

---

## Architecture (short)

```
phoneData (opt-in) → parsePhoneData → signals + patterns
                    → daily note / weekly letter / capsule
                    → provenance links back to /phone
```

Details: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## Evaluation

```bash
npm run evaluate:captions   # Caption quality table for slides
```

Add your user study results to [docs/EVALUATION.md](docs/EVALUATION.md) before submission.

---

## Project structure

```
app/              # Routes (home, phone, feed, capsule, API)
components/       # UI by feature
lib/
  phoneData.ts    # Simulated shared phone exports
  parsePhoneData.ts
  provenance.ts   # Source linking for letters
  vision/         # BLIP + cache
public/photos/    # 10 personal demo images
docs/             # Evaluation, AI disclosure, architecture
scripts/          # evaluate-captions.mjs
```

---

## Iteration log

| Version | Focus |
|---------|--------|
| v1 | Static Florence mock + Unsplash |
| v2 | Phone data parser → signals + reflections |
| v3 | Real personal photos, BLIP vision, Campus Week narrative |
| v4 | Provenance UI, evaluation docs, optional OpenAI letter, demo disclosure |

---

## Privacy

**Demo mode:** simulated phone data only. No real iMessage, Photos, or location APIs. Production would use OS share sheets and on-device processing.

---

## AI usage

See [docs/AI_DISCLOSURE.md](docs/AI_DISCLOSURE.md).
