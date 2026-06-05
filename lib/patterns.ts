import type { MemorySignal, PatternObservation } from "./types";

export function detectPatterns(signals: MemorySignal[]): PatternObservation[] {
  const patterns: PatternObservation[] = [
    ...detectRepeatedPlaces(signals),
    ...detectRepeatedPeople(signals),
    ...detectRepeatedThreads(signals),
    ...detectRepeatedSongs(signals),
    ...detectRoutines(signals),
    ...detectReflectionThemes(signals),
    ...detectPeacefulMoments(signals),
  ];
  return patterns.sort((a, b) => {
    const order = { high: 0, medium: 1 };
    return order[a.confidence] - order[b.confidence];
  });
}

function detectRepeatedPlaces(
  signals: MemorySignal[]
): PatternObservation[] {
  const placeVisits = signals.filter((s) => s.type === "place_visit");
  const counts: Record<string, { count: number; ids: string[] }> = {};

  for (const s of placeVisits) {
    if (s.type !== "place_visit") continue;
    const name = s.placeName;
    if (!counts[name]) counts[name] = { count: 0, ids: [] };
    counts[name].count++;
    counts[name].ids.push(s.id);
  }

  const results: PatternObservation[] = [];
  for (const [placeName, { count, ids }] of Object.entries(counts)) {
    if (count >= 2) {
      const isCafe = placeName.toLowerCase().includes("cafe");
      const isArno = placeName.toLowerCase().includes("arno");
      results.push({
        id: `pattern-place-${placeName}`,
        title: isCafe
          ? "Your cafe after class is becoming a ritual"
          : isArno
            ? "Golden-hour walks by the Arno are becoming a soft little pattern"
            : `You keep returning to ${placeName}`,
        body: isCafe
          ? "Based on the moments you saved, you've visited the cafe near class three times this week — cappuccino, journal, the window seat."
          : isArno
            ? "You've checked in by the Arno multiple times this week, often marking those walks as peaceful."
            : `You've been to ${placeName} ${count} times this week.`,
        patternType: "repeated_place",
        confidence: count >= 3 ? "high" : "medium",
        relatedSignalIds: ids,
        suggestedAction: isArno
          ? "Want me to remind you tomorrow around 5:15?"
          : isCafe
            ? "Want to save this as a ritual?"
            : undefined,
      });
    }
  }
  return results;
}

function detectRepeatedPeople(
  signals: MemorySignal[]
): PatternObservation[] {
  const personCounts: Record<string, string[]> = {};

  for (const s of signals) {
    const people: string[] = [];
    if ("people" in s && s.people) people.push(...s.people);
    if (s.type === "friend_memory") people.push(...s.people);
    if (s.type === "text_message") people.push(s.contactName);
    for (const person of people) {
      if (!personCounts[person]) personCounts[person] = [];
      personCounts[person].push(s.id);
    }
  }

  const results: PatternObservation[] = [];
  for (const [person, ids] of Object.entries(personCounts)) {
    if (ids.length >= 3) {
      results.push({
        id: `pattern-person-${person}`,
        title:
          person === "Andrea"
            ? "You and Andrea keep collecting tiny adventures"
            : `You and ${person} keep showing up in your week`,
        body:
          person === "Andrea"
            ? "Pastries, smallest tables, laughter — based on the friend memories and moments you saved, Andrea keeps appearing in the good parts."
            : `Based on the moments you saved, ${person} appears in several of this week's memories.`,
        patternType: "repeated_person",
        confidence: "high",
        relatedSignalIds: [...new Set(ids)],
      });
    }
  }

  const groupIds = signals
    .filter(
      (s) =>
        ("people" in s &&
          s.people?.includes("Maya") &&
          s.people?.includes("Andrea")) ||
        (s.type === "friend_memory" &&
          s.people.includes("Maya") &&
          s.people.includes("Andrea"))
    )
    .map((s) => s.id);

  if (groupIds.length >= 2) {
    results.push({
      id: "pattern-group-maya-andrea",
      title: "Dinner with Maya and Andrea keeps finding its way back",
      body: "Based on the calendar moments and photos you saved, your study-abroad friend group keeps gathering for the good stuff.",
      patternType: "repeated_person",
      confidence: "medium",
      relatedSignalIds: groupIds,
    });
  }

  return results;
}

function detectRepeatedThreads(
  signals: MemorySignal[]
): PatternObservation[] {
  const texts = signals.filter(
    (s): s is import("./types").TextMessageSignal => s.type === "text_message"
  );
  const threadCounts: Record<string, { name: string; ids: string[] }> = {};

  for (const t of texts) {
    if (!threadCounts[t.threadId]) {
      threadCounts[t.threadId] = { name: t.contactName, ids: [] };
    }
    threadCounts[t.threadId].ids.push(t.id);
  }

  return Object.entries(threadCounts)
    .filter(([, { ids }]) => ids.length >= 3)
    .map(([threadId, { name, ids }]) => ({
      id: `pattern-thread-${threadId}`,
      title:
        name === "Andrea"
          ? "You and Andrea keep texting about the good small stuff"
          : `Your thread with ${name} has been full this week`,
      body: `Based on the texts you chose to share, ${name} keeps showing up in the little adventures — not the whole inbox, just what you saved.`,
      patternType: "repeated_thread" as const,
      confidence: "high" as const,
      relatedSignalIds: ids,
    }));
}

function detectRepeatedSongs(
  signals: MemorySignal[]
): PatternObservation[] {
  const songCounts: Record<string, { artist: string; ids: string[] }> = {};

  for (const s of signals) {
    if (s.type !== "song_played") continue;
    const key = s.songTitle;
    if (!songCounts[key]) songCounts[key] = { artist: s.artist, ids: [] };
    songCounts[key].ids.push(s.id);
  }

  return Object.entries(songCounts)
    .filter(([, { ids }]) => ids.length >= 2)
    .map(([title, { artist, ids }]) => ({
      id: `pattern-song-${title}`,
      title:
        title === "Sweet Disposition"
          ? "Sweet Disposition became part of your walks home this week"
          : `${title} keeps playing in your week`,
      body:
        title === "Sweet Disposition"
          ? `You added ${title} by ${artist} twice — both times around walks. It seems to be becoming part of the rhythm.`
          : `Based on the songs you added, ${title} by ${artist} appeared more than once.`,
      patternType: "repeated_song" as const,
      confidence: "high" as const,
      relatedSignalIds: ids,
    }));
}

function detectRoutines(signals: MemorySignal[]): PatternObservation[] {
  return signals
    .filter((s): s is Extract<MemorySignal, { type: "routine" }> => s.type === "routine")
    .map((s) => {
      const isArno = s.routineName.toLowerCase().includes("arno");
      return {
        id: `pattern-routine-${s.id}`,
        title: isArno
          ? "Golden-hour walks by the Arno are becoming a soft little pattern"
          : `${s.routineName} is becoming a ritual`,
        body: `This seems to be becoming a ritual — ${s.frequency}. ${s.suggestion ?? ""}`.trim(),
        patternType: "routine" as const,
        confidence: "high" as const,
        relatedSignalIds: s.evidence,
        suggestedAction: s.suggestion,
      };
    });
}

function detectReflectionThemes(
  signals: MemorySignal[]
): PatternObservation[] {
  const reflections = signals.filter((s) => s.type === "reflection");
  const soloKeywords = ["alone", "lonely", "company", "solo"];
  const matching = reflections.filter((s) => {
    if (s.type !== "reflection") return false;
    const text = s.answer.toLowerCase();
    return soloKeywords.some((k) => text.includes(k));
  });

  if (matching.length >= 2) {
    return [
      {
        id: "pattern-reflection-solo",
        title: "A lot of this week was about enjoying your own company",
        body: "You wrote that being alone didn't feel lonely, and that the quiet parts felt peaceful. Based on your reflections, solo time seems to be landing softly.",
        patternType: "reflection_theme",
        confidence: "high",
        relatedSignalIds: matching.map((s) => s.id),
      },
    ];
  }
  return [];
}

function detectPeacefulMoments(
  signals: MemorySignal[]
): PatternObservation[] {
  const peaceful = signals.filter(
    (s) =>
      s.emotionalTags.includes("peaceful") ||
      (s.type === "photo" && s.userNote?.toLowerCase().includes("peaceful"))
  );

  if (peaceful.length >= 3) {
    return [
      {
        id: "pattern-peaceful",
        title: "You saved several moments that felt quiet, cozy, and peaceful",
        body: "Based on the moments you marked — the Arno, the rainy window, the museum quiet — this week had a gentle texture to it.",
        patternType: "peaceful_moments",
        confidence: "high",
        relatedSignalIds: peaceful.map((s) => s.id).slice(0, 6),
      },
    ];
  }
  return [];
}
