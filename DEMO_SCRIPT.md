# Merak — Demo Video Script (Technical, 4–6 min)

Use with [DEMO_PLAN.md](./DEMO_PLAN.md). Read naturally; pause on UI actions.

---

## Q1 — Why did you build this? (45 sec)

**[Screen: Landing]**

> "Your camera roll is a graveyard of moments. Google Photos organizes files; it doesn't write your week back to you in words you'll actually read. And apps that scrape your whole phone feel wrong.
>
> Merak is different: **consent-bounded memory synthesis**. You opt in per photo and per category. Merak only parses that boundary, builds structured signals, detects patterns, and writes a daily note, weekly letter, and memory capsule — every sentence traceable to a source you shared."

---

## Q2 — How does it work? (2 min) — **technical core**

**[Screen: Phone → Photos tab]**

> "Here's Ella's camera roll — ten photos. Only **six** are shared with Merak. Four are grayed out. Merak literally cannot see them — they're not in the pipeline."

**[Tap festival photo — eye turns on. Tap formal photo — eye turns on.]**

> "I'm opting in two more moments. Nothing uploaded to a black box — just a boolean flag per artifact."

**[Tap "Update memory" sticky bar]**

> "That calls `resetParsedCache()` and re-runs `parsePhoneDataToSignals()` — filter `merakShared`, map to MemorySignals, cluster places, extract friend memories from texts."

**[Screen: Home — parsing animation]**

> "Watch the counts: eight photos, thirteen texts, six calendar events — only shared items. Then pattern detection, then synthesis."

**[Expand "Technical pipeline" card]**

> "Live: opt-in sources → forty-plus signals → patterns → note, letter, capsule. This is the architecture in `docs/ARCHITECTURE.md`."

**[Optional: Analyze camera roll]**

> "Vision runs through `/api/analyze-photo` — BLIP on Hugging Face — with a local cache if we're offline."

---

## Q3 — Impact (30 sec)

> "For college students and anyone with ten thousand photos: reflection without surveillance. Mental bandwidth — noticing a good week without journaling for an hour. The capsule is proof you were happy here, built only from moments you chose."

---

## Q4 — What's next (20 sec)

> "iOS share sheet import, on-device embeddings, longitudinal user study, and therapist-safe export. Production stays consent-first — the boundary is the product."

---

## Provenance beat (30 sec) — **do not skip**

**[Screen: /weekly-letter]**

> "This isn't a black box. Every theme links to sources."

**[Tap a provenance row → Phone opens, photo highlighted]**

> "That's `phoneSourceId` on each signal, resolved in `lib/provenance.ts`. Graders can verify every claim."

---

## Closing line (10 sec)

**[Screen: Capsule hero]**

> "Merak — your life, remembered softly. Only what you shared."

---

## Click path (choreography)

1. `/` → Demo → `/home` (first parse, 6 photos)
2. `/phone?tab=photos` → show gray/private → enable festival + formal
3. **Update memory** → `/home` (re-parse, 8 photos) → expand Technical pipeline
4. `/weekly-letter` → provenance tap
5. `/capsules/florence-week-3` → scrapbook
6. (Optional) `/phone` → Analyze camera roll

---

## Reset demo between takes

Browser console:

```js
localStorage.removeItem('merak-consent-v2');
location.reload();
```
