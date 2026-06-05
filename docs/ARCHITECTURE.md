# Merak Architecture

## Problem

Camera rolls store thousands of moments but little *meaning*. Scraping the whole phone feels invasive. Merak asks: **what if memory only grew from what you explicitly share?**

## Data flow

```mermaid
flowchart LR
  subgraph sources [User-opted sources]
    P[Photos]
    T[Texts]
    C[Calendar]
    V[Voice memos]
  end

  subgraph raw [lib/phoneData.ts]
    PD[Raw phone artifacts merakShared=true]
  end

  subgraph parse [lib/parsePhoneData.ts]
    S[MemorySignals]
    PAT[Pattern detection]
  end

  subgraph vision [Optional HF BLIP]
    BLIP[analyzeImage / visionCache]
  end

  subgraph outputs [Generated artifacts]
    N[Daily note]
    L[Weekly letter]
    CAP[Memory capsule]
  end

  P --> PD
  T --> PD
  C --> PD
  V --> PD
  PD --> S
  S --> PAT
  P --> BLIP
  BLIP --> S
  S --> N
  S --> L
  PAT --> L
  S --> CAP
```

## Key modules

| Path | Role |
|------|------|
| `lib/phoneData.ts` | Simulated device exports (demo) |
| `lib/parsePhoneData.ts` | Parser + template generators |
| `lib/patterns.ts` | Rule-based "Merak noticed" |
| `lib/provenance.ts` | Source links for letters/notes |
| `lib/generateMemory.ts` | Cached `parseAndReflect()` for UI |
| `lib/generateLetterOpenAI.ts` | Optional OpenAI letter |
| `app/api/analyze-photo` | BLIP caption endpoint |
| `app/api/generate-letter` | Letter endpoint |

## Consent model

Every artifact has `merakShared: boolean`. Parser filters `merakShared && inWeek(timestamp)` before creating signals. UI copy reinforces opt-in-only.

## Provenance

`relatedSignalIds` on notes/letters resolve to `/phone?tab=…&highlight=…` via `lib/provenance.ts`.
