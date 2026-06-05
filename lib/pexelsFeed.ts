/**
 * Live lifestyle photo feed via Pexels — simulates a camera roll refresh.
 * https://www.pexels.com/api/documentation/
 */

import { demoPhotos } from "./demoPhotos";

export interface PexelsPhoto {
  id: number;
  url: string;
  photographer: string;
  alt: string;
  width: number;
  height: number;
}

const CAMPUS_QUERIES = [
  "college friends festival",
  "ski trip friends snow",
  "bakery pastry cafe",
  "friends bar night",
  "dorm party college",
];

export async function fetchPexelsCameraRoll(
  perQuery = 2
): Promise<PexelsPhoto[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return getFallbackPexels();

  const results: PexelsPhoto[] = [];

  for (const query of CAMPUS_QUERIES.slice(0, 3)) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perQuery}&orientation=portrait`,
        { headers: { Authorization: key }, next: { revalidate: 3600 } }
      );
      if (!res.ok) continue;
      const data = (await res.json()) as {
        photos: {
          id: number;
          alt: string;
          photographer: string;
          width: number;
          height: number;
          src: { medium: string; large: string };
        }[];
      };
      for (const p of data.photos ?? []) {
        results.push({
          id: p.id,
          url: p.src.large,
          photographer: p.photographer,
          alt: p.alt || query,
          width: p.width,
          height: p.height,
        });
      }
    } catch {
      /* skip query */
    }
  }

  return results.length > 0 ? results : getFallbackPexels();
}

function getFallbackPexels(): PexelsPhoto[] {
  return [
    {
      id: 1,
      url: demoPhotos.festival,
      photographer: "Ella",
      alt: "festival golden hour",
      width: 800,
      height: 1200,
    },
    {
      id: 2,
      url: demoPhotos.formal,
      photographer: "Ella",
      alt: "Written In formal",
      width: 800,
      height: 1200,
    },
  ];
}
