# Merak YC Demo — Datasets & Real Vision Pipeline

## Recommended stack (what we implemented in v3)

| Layer | Choice | Why for YC |
|-------|--------|------------|
| **Live photos** | [Pexels API](https://www.pexels.com/api/documentation/) | Real URLs, lifestyle/travel queries, free tier, feels like a camera roll |
| **Social-style bulk data** | [Hugging Face datasets](https://huggingface.co/datasets) | Posts + captions + engagement metadata for offline enrichment |
| **Image understanding** | [HF Inference — BLIP](https://huggingface.co/Salesforce/blip-image-captioning-base) | Real captions in ~1–3s server-side; no 500MB browser download |
| **Fallback** | Pre-computed `lib/visionCache.json` | Demo never breaks if API is down |

## Social-media-like datasets (download / research)

Use these for **batch enrichment** or training — not for scraping Instagram in production.

### Tier A — Best fit for Merak (travel + captions + images)

1. **[Rabornkraken/xhs-travel-photos](https://huggingface.co/datasets/Rabornkraken/xhs-travel-photos)** (~28k images, 2.8k posts, titles/descriptions/tags, CC BY 4.0)
   - Xiaohongshu travel aesthetic — closest to your target user
   - Fields: `title`, `description`, `tags`, `posted_at`, `liked_count`, images per note

2. **[PHY041/sc4021-travel-opinion-search](https://huggingface.co/datasets/PHY041/sc4021-travel-opinion-search)** (~105k IG posts, academic NC license)
   - Already has `image_description`, `image_category`, `quality_score`, location
   - Good if you want **pre-labeled** scenes without running BLIP yourself

3. **[Unsplash Dataset Lite](https://unsplash.com/data)** (25k images + 1M search queries, free commercial)
   - Real search/keyword metadata; pairs well with vision captions

### Tier B — General social photo behavior

4. **[SMP Challenge — SMPD-Image](https://smp-challenge.com/dataset.html)** (486k Flickr posts, time/location/category/tags)
   - Classic social prediction benchmark; anonymized

5. **[FlickrUser / Commonly Interesting Images](https://github.com/fiabdu/Commonly-Interesting-Images)** (500k images, aesthetic + CLIP emotion features)

### Tier C — Avoid for YC demo

- Live Instagram/TikTok scraping (ToS, brittle, looks creepy)
- Full inbox access narratives

## Vision models

| Model | Where | Latency | Demo use |
|-------|-------|---------|----------|
| `Salesforce/blip-image-captioning-base` | HF Inference API | ~1–3s | **Primary** — server route |
| `Xenova/vit-gpt2-image-captioning` | Transformers.js in browser | 2–10s + first-load model | Optional “runs on device” story |
| `salesforce/blip` on Replicate | Replicate API | ~2s | Alternative if HF rate-limited |

## Environment variables

```bash
# Required for live captions (free HF token)
HF_TOKEN=hf_...

# Optional — dynamic camera roll from Pexels
PEXELS_API_KEY=...

# Use cache only (rehearsal / no network)
MERAK_VISION_MODE=cache
```

## Demo script addition

1. Open `/phone` → show shared texts + photos  
2. Tap **“Analyze camera roll”** on Home  
3. Watch real BLIP captions appear one-by-one  
4. Merak noticed + daily note cite **“Based on what Merak saw in your photo…”**
