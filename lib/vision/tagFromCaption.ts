/** Map raw BLIP captions → Merak-safe emotional tags (no clinical inference) */

const RULES: { tags: string[]; patterns: RegExp[] }[] = [
  { tags: ["peaceful", "solo"], patterns: [/coffee|cafe|cup|journal|window|quiet|alone/i] },
  { tags: ["peaceful", "golden hour"], patterns: [/river|sunset|golden|water|bridge|arno/i] },
  { tags: ["friendship", "joy"], patterns: [/friend|dinner|table|laugh|people|group/i] },
  { tags: ["cozy", "peaceful"], patterns: [/rain|window|book|indoor|cozy/i] },
  { tags: ["nostalgic"], patterns: [/desk|postcard|writing|paper|old/i] },
  { tags: ["food", "joy"], patterns: [/pastry|bread|food|bakery|plate/i] },
  { tags: ["cinematic"], patterns: [/museum|art|hallway|architecture|church/i] },
];

export function tagsFromCaption(caption: string): string[] {
  const tags = new Set<string>();
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(caption))) {
      rule.tags.forEach((t) => tags.add(t));
    }
  }
  if (tags.size === 0) tags.add("nostalgic");
  return Array.from(tags);
}

export function merakSummaryFromCaption(caption: string): string {
  const c = caption.trim();
  if (!c.endsWith(".")) return `Merak noticed: ${c}.`;
  return `Merak noticed: ${c}`;
}
