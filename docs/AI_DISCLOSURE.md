# AI Usage Disclosure (CS 153)

Per course policy, this documents how AI tools were used on Merak.

## Tools used

| Tool | Use |
|------|-----|
| **Cursor / Claude** | Code generation, refactoring, documentation, debugging |
| **Hugging Face BLIP** | Image captioning via `HF_TOKEN` (`lib/vision/analyzeImage.ts`) |
| **OpenAI API** (optional) | Weekly letter prose via `OPENAI_API_KEY` (`lib/generateLetterOpenAI.ts`) |
| **Pexels API** (optional) | Supplemental lifestyle photos in live feed demo |

## Human-authored / designed

- Product concept: consent-first passive memory (not full-phone scraping)
- UX: phone frame, onboarding permissions, capsule narrative structure
- Demo narrative: Campus Week storyline, 10 personal photos, text threads
- `lib/phoneData.ts` — all simulated messages, calendar, memos
- `lib/visionCache.json` — verified captions aligned to real photos
- Visual design: typography, color tokens, component layout

## AI-generated with human review

- Most TypeScript/React implementation (reviewed, tested with `npm run build`)
- README and evaluation docs (edited for accuracy)
- Rule-based letter templates in `lib/parsePhoneData.ts` (logic human-designed; prose templated)

## Not AI-generated

- Photographs in `public/photos/` (user's personal images)
- Course rubric alignment and evaluation methodology choices

## How to reproduce AI features

```bash
# Vision (BLIP)
HF_TOKEN=hf_xxx npm run dev

# LLM weekly letter
OPENAI_API_KEY=sk-xxx npm run dev
# Open /weekly-letter — badge shows "AI letter" when key works

# Offline / no keys
npm run dev  # uses template letter + visionCache.json
```

## Integrity

- No claim of real iMessage or Photos API integration in this MVP
- Demo mode banner on Home and Phone states simulated data
- Provenance links connect outputs back to shared sources
