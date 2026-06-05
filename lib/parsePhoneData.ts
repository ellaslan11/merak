import { phoneContacts } from "./phoneData";
import {
  getConsentAwareCalendar,
  getConsentAwareMemos,
  getConsentAwarePhotos,
  getConsentAwareTexts,
  getSharedPhoneStats,
} from "./consentAwareData";
import { detectPatterns } from "./patterns";
import type {
  CalendarSignal,
  DailyNote,
  FriendMemorySignal,
  MemoryCapsule,
  MemorySignal,
  PatternObservation,
  PhotoSignal,
  PlaceSignal,
  ReflectionSignal,
  ReminderSuggestion,
  TextMessageSignal,
  WeeklyLetter,
} from "./types";
import { WEEK_START, WEEK_TITLE } from "./mockSignals";

const WEEK_END = "2026-02-24";

function inWeek(ts: string): boolean {
  const t = new Date(ts);
  const start = new Date(WEEK_START);
  const end = new Date(WEEK_END);
  return t >= start && t < end;
}

function contactName(contactId: string): string {
  return phoneContacts.find((c) => c.id === contactId)?.name ?? contactId;
}

/** Convert shared phone artifacts → MemorySignals */
export function parsePhoneDataToSignals(): MemorySignal[] {
  const signals: MemorySignal[] = [];

  for (const photo of getConsentAwarePhotos().filter(
    (p) => p.merakShared && inWeek(p.timestamp)
  )) {
    signals.push({
      id: `sig-photo-${photo.id}`,
      type: "photo",
      timestamp: photo.timestamp,
      source: "saved photo",
      title: photo.caption
        ? photo.caption.charAt(0).toUpperCase() + photo.caption.slice(1)
        : `Photo at ${photo.location ?? "campus"}`,
      summary: photo.location
        ? `A moment from ${photo.location}.`
        : "A moment you saved.",
      emotionalTags: [
        photo.emotionalHint ?? "nostalgic",
        ...(photo.people ? ["friendship"] : ["solo"]),
      ].filter((v, i, a) => a.indexOf(v) === i),
      privacyLevel: "private",
      imageUrl: photo.imageUrl,
      caption: photo.caption,
      location: photo.location,
      people: photo.people,
      userNote:
        photo.emotionalHint === "peaceful"
          ? "Marked as peaceful."
          : undefined,
      phoneSourceId: photo.id,
    } satisfies PhotoSignal);
  }

  for (const msg of getConsentAwareTexts().filter(
    (t) => t.merakShared && inWeek(t.timestamp)
  )) {
    const name = contactName(msg.contactId);
    signals.push({
      id: `sig-text-${msg.id}`,
      type: "text_message",
      timestamp: msg.timestamp,
      source: "text you shared",
      title:
        msg.direction === "outgoing"
          ? `You to ${name}`
          : `${name} to you`,
      summary: msg.body.slice(0, 80) + (msg.body.length > 80 ? "…" : ""),
      emotionalTags: inferTextTags(msg.body),
      privacyLevel: "private",
      threadId: msg.threadId,
      contactName: name,
      direction: msg.direction,
      messageBody: msg.body,
      phoneSourceId: msg.id,
    } satisfies TextMessageSignal);
  }

  for (const cal of getConsentAwareCalendar().filter(
    (c) => c.merakShared && inWeek(c.timestamp)
  )) {
    signals.push({
      id: `sig-cal-${cal.id}`,
      type: "calendar_event",
      timestamp: cal.timestamp,
      source: "calendar moment",
      title: cal.title,
      summary: cal.title,
      emotionalTags: cal.people ? ["friendship"] : ["learning"],
      privacyLevel: "private",
      eventTitle: cal.title,
      location: cal.location,
      people: cal.people,
      category: "social",
      phoneSourceId: cal.id,
    } satisfies CalendarSignal);
  }

  for (const memo of getConsentAwareMemos().filter(
    (m) => m.merakShared && inWeek(m.timestamp)
  )) {
    signals.push({
      id: `sig-memo-${memo.id}`,
      type: "reflection",
      timestamp: memo.timestamp,
      source: "voice memo you shared",
      title: "Something you said out loud",
      summary: memo.transcript.slice(0, 60) + "…",
      emotionalTags: inferReflectionTags(memo.transcript),
      privacyLevel: "private",
      prompt: "Voice memo",
      answer: memo.transcript,
      phoneSourceId: memo.id,
    } satisfies ReflectionSignal);
  }

  // Derive place visits from photo clusters
  const placeClusters = clusterPlaces(signals);
  for (const cluster of placeClusters) {
    if (cluster.count >= 1) {
      signals.push({
        id: `sig-place-${cluster.key}`,
        type: "place_visit",
        timestamp: cluster.latestTs,
        source: "from photos you saved",
        title: cluster.placeName,
        summary: `${cluster.count} moment${cluster.count > 1 ? "s" : ""} here this week.`,
        emotionalTags: cluster.tags,
        privacyLevel: "private",
        placeName: cluster.placeName,
        location: "Campus",
        durationMinutes: cluster.count * 45,
        userSaved: true,
      } satisfies PlaceSignal);
    }
  }

  // Friend memories from text threads
  const friendMemories = extractFriendMemoriesFromTexts();
  signals.push(...friendMemories);

  // Routines from place clusters
  const bakeryCount = placeClusters.find((p) =>
    p.placeName.toLowerCase().includes("bakery") ||
    p.placeName.toLowerCase().includes("cardamom")
  );
  if (bakeryCount && bakeryCount.count >= 1) {
    const bakeryTexts = signals.filter(
      (s) =>
        s.type === "text_message" &&
        s.messageBody.toLowerCase().includes("cardamom")
    );
    if (bakeryTexts.length) {
      signals.push({
        id: "sig-routine-bakery",
        type: "routine",
        timestamp: "2026-02-22T10:00:00Z",
        source: "pattern from your phone",
        title: "Cardamom buns with Andrea",
        summary: "Texts and photos point to a bakery ritual with Andrea.",
        emotionalTags: ["routine", "friendship", "joy"],
        privacyLevel: "private",
        routineName: "Cardamom bun run",
        evidence: [
          ...signals
            .filter(
              (s) =>
                s.type === "photo" &&
                "location" in s &&
                s.location?.toLowerCase().includes("bakery")
            )
            .map((s) => s.id),
          ...bakeryTexts.map((s) => s.id),
        ].slice(0, 4),
        frequency: "this week",
        suggestion: "Want a gentle nudge next Saturday morning?",
      });
    }
  }

  const festivalCount = placeClusters.find((p) =>
    p.placeName.toLowerCase().includes("festival")
  );
  if (festivalCount) {
    signals.push({
      id: "sig-routine-festival",
      type: "routine",
      timestamp: "2026-02-21T20:00:00Z",
      source: "pattern from your phone",
      title: "Golden-hour festival moments",
      summary: "Festival photos and voice memos mention sunset on the field.",
      emotionalTags: ["routine", "joy"],
      privacyLevel: "private",
      routineName: "Festival golden hour",
      evidence: signals
        .filter(
          (s) =>
            ("location" in s && s.location?.toLowerCase().includes("festival")) ||
            (s.type === "reflection" &&
              s.answer.toLowerCase().includes("festival"))
        )
        .map((s) => s.id)
        .slice(0, 4),
      frequency: "once this week",
      suggestion: "Want me to nudge you before the next outdoor show?",
    });
  }

  return signals.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

function inferTextTags(body: string): string[] {
  const tags: string[] = [];
  const lower = body.toLowerCase();
  if (lower.includes("lol") || lower.includes("cfa") || lower.includes("white lie"))
    tags.push("playful");
  if (
    lower.includes("cardamom") ||
    lower.includes("bar res") ||
    lower.includes("heavenly")
  )
    tags.push("friendship");
  if (lower.includes("alone")) tags.push("solo");
  if (lower.includes("festival") || lower.includes("golden")) tags.push("joy");
  if (tags.length === 0) tags.push("friendship");
  return tags;
}

function inferReflectionTags(text: string): string[] {
  const lower = text.toLowerCase();
  const tags: string[] = [];
  if (lower.includes("alone") && !lower.includes("lonely")) tags.push("solo", "grounded");
  if (lower.includes("peaceful") || lower.includes("quiet")) tags.push("peaceful");
  if (lower.includes("rain") || lower.includes("slower")) tags.push("peaceful");
  if (lower.includes("miss")) tags.push("nostalgic", "reflective");
  return tags.length ? tags : ["reflective"];
}

function clusterPlaces(signals: MemorySignal[]) {
  const photos = signals.filter(
    (s): s is PhotoSignal => s.type === "photo" && !!s.location
  );
  const map: Record<
    string,
    { placeName: string; count: number; latestTs: string; tags: string[]; key: string }
  > = {};

  for (const p of photos) {
    const key = p.location!.toLowerCase().replace(/\s+/g, "-");
    if (!map[key]) {
      map[key] = {
        key,
        placeName: p.location!,
        count: 0,
        latestTs: p.timestamp,
        tags: ["peaceful"],
      };
    }
    map[key].count++;
    if (new Date(p.timestamp) > new Date(map[key].latestTs)) {
      map[key].latestTs = p.timestamp;
    }
  }
  return Object.values(map);
}

function extractFriendMemoriesFromTexts(): FriendMemorySignal[] {
  const memories: FriendMemorySignal[] = [];

  const whiteLie = getConsentAwareTexts().find((m) =>
    m.body.toLowerCase().includes("white lie")
  );
  if (whiteLie) {
    memories.push({
      id: "sig-friend-white-lie",
      type: "friend_memory",
      timestamp: whiteLie.timestamp,
      source: "from texts you shared",
      title: "All white, zero lies",
      summary: "Pulled from your messages with Maya.",
      emotionalTags: ["friendship", "playful"],
      privacyLevel: "private",
      people: ["Maya", "Andrea"],
      memory:
        "Maya texted that the white lie theme was SO specific — we still showed up in all white.",
      relationshipTag: "college friends",
      phoneSourceId: whiteLie.id,
    });
  }

  const piPhiNight = getConsentAwareTexts().find((m) =>
    m.body.toLowerCase().includes("pi phi")
  );
  if (piPhiNight) {
    memories.push({
      id: "sig-friend-pi-phi-night",
      type: "friend_memory",
      timestamp: piPhiNight.timestamp,
      source: "from texts you shared",
      title: "Pi Phi mirror night",
      summary: "Pulled from your messages with Maya.",
      emotionalTags: ["friendship", "nostalgic"],
      privacyLevel: "private",
      people: ["Maya"],
      memory: "Maya reminded you to wear the jersey for Pi Phi mirror night.",
      relationshipTag: "college friends",
      phoneSourceId: piPhiNight.id,
    });
  }

  const crowdedCase = getConsentAwareTexts().find((m) =>
    m.body.toLowerCase().includes("crowded")
  );
  if (crowdedCase) {
    memories.push({
      id: "sig-friend-bakery-case",
      type: "friend_memory",
      timestamp: "2026-02-22T11:30:00Z",
      source: "from texts you shared",
      title: "Crowded cardamom case",
      summary: "Pulled from your thread with Andrea.",
      emotionalTags: ["friendship", "playful"],
      privacyLevel: "private",
      people: ["Andrea"],
      memory:
        "Andrea and I laughed about how the cardamom bun case is always the most crowded spot in the shop.",
      relationshipTag: "college friend",
      phoneSourceId: crowdedCase.id,
    });
  }

  return memories;
}

export interface ParsedWeek {
  signals: MemorySignal[];
  patterns: PatternObservation[];
  dailyNote: DailyNote;
  reminder: ReminderSuggestion;
  weeklyLetter: WeeklyLetter;
  capsule: MemoryCapsule;
}

export function parseAndReflect(): ParsedWeek {
  const signals = parsePhoneDataToSignals();
  const patterns = detectPatterns(signals);

  return {
    signals,
    patterns,
    dailyNote: generateDailyNoteFromSignals(signals),
    reminder: generateReminderFromPatterns(patterns, signals),
    weeklyLetter: generateWeeklyLetterFromSignals(signals, patterns),
    capsule: generateCapsuleFromSignals(signals),
  };
}

function generateDailyNoteFromSignals(signals: MemorySignal[]): DailyNote {
  const today = signals.filter((s) => s.timestamp.startsWith("2026-02-23"));
  const dogPhoto = today.find(
    (s) =>
      s.type === "photo" &&
      "location" in s &&
      s.location?.toLowerCase().includes("patio")
  );
  const reflection = signals.find(
    (s) =>
      s.type === "reflection" && s.timestamp.startsWith("2026-02-23")
  ) as ReflectionSignal | undefined;
  const soloMemo = signals.find(
    (s) =>
      s.type === "reflection" &&
      (s.answer.toLowerCase().includes("alone") ||
        s.answer.toLowerCase().includes("quiet"))
  ) as ReflectionSignal | undefined;

  let body =
    "Based on the moments you saved on your phone today — ";
  if (dogPhoto && dogPhoto.type === "photo") {
    body +=
      "you sat on the back patio with your mom's dog, pavers warm underfoot, everything finally quiet. ";
  }
  if (soloMemo) {
    body += `You said: "${soloMemo.answer.split(".")[0]}." I saved that — it feels like the kind of detail future you might need.`;
  } else if (reflection && reflection.type === "reflection") {
    body += `You said: "${reflection.answer}"`;
  } else {
    body +=
      "a soft Sunday after a loud week. Small endings can still feel full.";
  }

  return {
    id: "note-parsed-today",
    date: "2026-02-23",
    title: "A tiny note from today",
    body,
    relatedSignalIds: today
      .filter((s) => s.type === "photo" || s.type === "reflection")
      .map((s) => s.id)
      .slice(0, 5),
  };
}

function generateReminderFromPatterns(
  patterns: PatternObservation[],
  signals: MemorySignal[]
): ReminderSuggestion {
  const bakery = patterns.find((p) =>
    p.title.toLowerCase().includes("cardamom")
  );
  const bakerySignals = signals.filter(
    (s) =>
      ("location" in s && s.location?.toLowerCase().includes("bakery")) ||
      (s.type === "text_message" &&
        s.messageBody.toLowerCase().includes("cardamom"))
  );

  return {
    id: "reminder-parsed",
    title: bakery?.title ?? "Want to make this a ritual?",
    body:
      bakery?.body ??
      "You and Andrea keep finding your way to the cardamom bun case — crowded, worth it. Want a gentle nudge next Saturday morning?",
    suggestedTime: "Saturday at 10:30",
    actionLabel: "Remind me Saturday",
    relatedSignalIds: bakery?.relatedSignalIds ?? bakerySignals.map((s) => s.id),
  };
}

function generateWeeklyLetterFromSignals(
  signals: MemorySignal[],
  patterns: PatternObservation[]
): WeeklyLetter {
  const reflections = signals.filter((s) => s.type === "reflection") as ReflectionSignal[];
  const soloReflection = reflections.find((r) =>
    r.answer.toLowerCase().includes("alone")
  );
  const weekEndReflection = reflections.find((r) =>
    r.answer.toLowerCase().includes("miss")
  );

  const friendTexts = signals.filter((s) => s.type === "text_message");
  const hasAndrea = friendTexts.some((s) => s.type === "text_message" && s.contactName === "Andrea");
  const hasMaya = friendTexts.some((s) => s.type === "text_message" && s.contactName === "Maya");

  const themes: string[] = [];
  if (soloReflection) themes.push("own company");
  if (patterns.some((p) => p.patternType === "repeated_place")) themes.push("tiny rituals");
  if (hasAndrea || hasMaya) themes.push("friendship");
  if (patterns.some((p) => p.patternType === "peaceful_moments")) themes.push("peaceful moments");
  themes.push("becoming");

  let body = "This week had a quiet kind of bravery to it. ";
  if (soloReflection) {
    body +=
      "You spent more time alone, but not in a lonely way — more like you were learning the shape of your own company. ";
  }
  body +=
    "From your photos and the moments you saved: Tahoe snow, the Van Gogh room, white shirts at the dorm party, waffle fries after. ";
  const festivalMemo = signals.find(
    (s) =>
      s.type === "reflection" && s.answer.toLowerCase().includes("festival")
  );
  if (festivalMemo && festivalMemo.type === "reflection") {
    body += `You said the festival sunset felt cinematic. `;
  }
  if (hasMaya && hasAndrea) {
    body +=
      "Your texts with Maya and Andrea kept lighting up — ski day, the bar, cardamom buns, Written In. ";
  }
  if (weekEndReflection) {
    body += `You said it yourself: "${weekEndReflection.answer}" `;
  }
  body += "The week felt small, but not empty. It felt like becoming.";

  return {
    id: "letter-parsed",
    weekTitle: WEEK_TITLE,
    title: "Your week, remembered softly",
    body,
    themes: [...new Set(themes)],
    relatedSignalIds: signals
      .filter(
        (s) =>
          s.type === "photo" ||
          s.type === "reflection" ||
          s.type === "friend_memory"
      )
      .map((s) => s.id)
      .slice(0, 10),
  };
}

function generateCapsuleFromSignals(signals: MemorySignal[]): MemoryCapsule {
  const photos = signals.filter((s) => s.type === "photo") as PhotoSignal[];
  const hero =
    photos.find((p) => p.location?.toLowerCase().includes("festival")) ??
    photos.find((p) => p.location?.toLowerCase().includes("formal")) ??
    photos[0];

  const timelineByDay = groupSignalsByDay(signals);
  const timelineItems = Object.entries(timelineByDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 7)
    .map(([date, daySignals]) => ({
      date: formatDayLabel(date),
      title: summarizeDay(daySignals),
      description: summarizeDayDescription(daySignals),
      relatedSignalIds: daySignals.map((s) => s.id),
    }));

  return {
    id: "capsule-parsed-campus-week",
    title: WEEK_TITLE,
    dateRange: "Feb 17 – 23, 2026",
    location: "Campus & home",
    heroImageUrl: hero?.imageUrl ?? photos[0]?.imageUrl ?? "",
    openingLetter: buildOpeningLetter(signals),
    timelineItems,
    proofMoments: buildProofMoments(signals),
    scrapbookCaptions: photos.slice(0, 6).map((p) => ({
      imageUrl: p.imageUrl,
      title: p.location ?? "Campus",
      caption: p.caption ?? p.userNote ?? "a moment you saved",
      relatedSignalIds: [p.id],
    })),
    playlist: [
      { songTitle: "Heat Waves", artist: "Glass Animals", memoryContext: "Festival field at golden hour" },
      { songTitle: "Espresso", artist: "Sabrina Carpenter", memoryContext: "Getting ready for Written In" },
      { songTitle: "Pink + White", artist: "Frank Ocean", memoryContext: "Cardamom buns with Andrea" },
      { songTitle: "The Less I Know The Better", artist: "Tame Impala", memoryContext: "Van Gogh immersive room" },
    ],
    places: extractPlaces(signals),
    futurePostcard: {
      title: "Postcard to future you",
      body: buildPostcard(signals),
    },
    relatedSignalIds: signals.slice(0, 10).map((s) => s.id),
  };
}

function groupSignalsByDay(signals: MemorySignal[]) {
  return signals.reduce(
    (acc, s) => {
      const day = s.timestamp.split("T")[0];
      if (!acc[day]) acc[day] = [];
      acc[day].push(s);
      return acc;
    },
    {} as Record<string, MemorySignal[]>
  );
}

function formatDayLabel(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function summarizeDay(signals: MemorySignal[]): string {
  const photo = signals.find((s) => s.type === "photo");
  const text = signals.find((s) => s.type === "text_message");
  if (photo && photo.type === "photo") return photo.location ?? photo.title;
  if (text && text.type === "text_message") return `Texts with ${text.contactName}`;
  return signals[0]?.title ?? "A quiet day";
}

function summarizeDayDescription(signals: MemorySignal[]): string {
  const parts: string[] = [];
  const reflection = signals.find((s) => s.type === "reflection");
  if (reflection && reflection.type === "reflection") {
    parts.push(reflection.answer.slice(0, 80));
  }
  const texts = signals.filter((s) => s.type === "text_message");
  if (texts.length) {
    parts.push(`Messages with ${[...new Set(texts.map((t) => t.type === "text_message" && t.contactName))].filter(Boolean).join(", ")}`);
  }
  return parts.join(" · ") || "Moments you chose to share.";
}

function buildOpeningLetter(signals: MemorySignal[]): string {
  const solo = signals.find(
    (s) => s.type === "reflection" && s.answer.toLowerCase().includes("alone")
  );
  return `Ella — Merak read only what you shared from your phone this week: ${signals.length} moments across texts, photos, voice memos, and calendar. ${
    solo && solo.type === "reflection"
      ? `You said being alone didn't feel lonely — that's the thread holding this capsule together.`
      : `The thread is loud joy and quiet patio time — learning your people, and yourself between them.`
  }`;
}

function buildProofMoments(signals: MemorySignal[]) {
  const peaceful = signals.filter((s) => s.emotionalTags.includes("peaceful"));
  return [
    {
      title: "Peaceful saves from your camera roll",
      description: `You marked ${peaceful.length} moments that felt quiet and peaceful — Van Gogh, the patio with the dog, soft in-between beats.`,
      relatedSignalIds: peaceful.map((s) => s.id).slice(0, 4),
    },
    {
      title: "Texts that became memories",
      description:
        "Friend threads with Maya and Andrea — ski day, white lie theme, crowded bun case — saved because you chose to share them.",
      relatedSignalIds: signals
        .filter((s) => s.type === "text_message" || s.type === "friend_memory")
        .map((s) => s.id)
        .slice(0, 4),
    },
  ];
}

function extractPlaces(signals: MemorySignal[]) {
  const places = new Map<string, string[]>();
  for (const s of signals) {
    if (s.type === "photo" && s.location) {
      const ids = places.get(s.location) ?? [];
      ids.push(s.id);
      places.set(s.location, ids);
    }
    if (s.type === "place_visit") {
      const ids = places.get(s.placeName) ?? [];
      ids.push(s.id);
      places.set(s.placeName, ids);
    }
  }
  return Array.from(places.entries()).slice(0, 5).map(([placeName, ids]) => ({
    placeName,
    description: `Pulled from photos and moments you saved on your phone.`,
    relatedSignalIds: ids,
  }));
}

function buildPostcard(signals: MemorySignal[]): string {
  const end = signals.find(
    (s) => s.type === "reflection" && s.answer.toLowerCase().includes("miss")
  );
  if (end && end.type === "reflection") {
    return `Remember: "${end.answer}" Tahoe, the festival field, Andrea's cardamom texts, the dog on the patio. Future you might need proof you were happy here — and you were.`;
  }
  return "Remember the week you learned that small doesn't mean empty. Future you might need proof you were happy here — and you were.";
}

/** Steps for parsing animation */
export function getParsingSteps(stats = getSharedPhoneStats()) {
  return [
    { id: "photos", label: `Reading ${stats.photos} photos you saved…`, source: "camera roll" },
    { id: "texts", label: `Reading ${stats.texts} texts you shared…`, source: "messages" },
    { id: "calendar", label: `Noting ${stats.calendar} calendar moments…`, source: "calendar" },
    { id: "memos", label: `Listening to ${stats.memos} voice memos…`, source: "voice memos" },
    { id: "patterns", label: "Finding the soft patterns…", source: "merak" },
    { id: "writing", label: "Writing your week back to you…", source: "merak" },
  ];
}
