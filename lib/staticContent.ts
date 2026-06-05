import type {
  DailyNote,
  MemoryCapsule,
  ReminderSuggestion,
  WeeklyLetter,
} from "./types";

export const dailyNote: DailyNote = {
  id: "note-sun",
  date: "2026-02-23",
  title: "A tiny note from today",
  body: "You found your way back to the cafe after class again — cappuccino, journal, the little table by the window. You wrote that being alone did not feel lonely today. I saved that, because it feels like the kind of detail future you might need.",
  relatedSignalIds: [
    "sig-sun-photo-cafe-3",
    "sig-sun-place-cafe-3",
    "sig-mon-reflection-solo",
  ],
};

export const reminderSuggestion: ReminderSuggestion = {
  id: "reminder-arno",
  title: "Want to make this a ritual?",
  body: "You've gone on a golden-hour walk by the Arno twice this week, and both days had photos you marked as peaceful. Want me to remind you tomorrow around 5:15?",
  suggestedTime: "tomorrow at 5:15",
  actionLabel: "Remind me tomorrow",
  relatedSignalIds: ["sig-fri-photo-arno", "sig-fri-place-arno", "sig-fri-routine-arno"],
};

export const weeklyLetter: WeeklyLetter = {
  id: "letter-week-3",
  weekTitle: "Florence Week 3",
  title: "Your week, remembered softly",
  body: `This week had a quiet kind of bravery to it. You spent more time alone, but not in a lonely way — more like you were learning the shape of your own company. There was the cafe after class, the bookstore corner, the rainy window, and Sweet Disposition playing on the walk home.

You also kept finding your people: dinner with Maya and Andrea, pastries after class, laughing about getting lost. The week felt small, but not empty. It felt like becoming.`,
  themes: [
    "own company",
    "tiny rituals",
    "friendship",
    "peaceful moments",
    "becoming",
  ],
  relatedSignalIds: [
    "sig-mon-reflection-solo",
    "sig-sun-routine-cafe",
    "sig-wed-friend-lost-street",
    "sig-fri-photo-arno",
    "sig-sun-reflection-week",
  ],
};

export const florenceWeek3Capsule: MemoryCapsule = {
  id: "capsule-florence-week-3",
  title: "Florence Week 3",
  dateRange: "Feb 17 – 23, 2026",
  location: "Florence, Italy",
  heroImageUrl:
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80",
  openingLetter: `Ella — this was the week you started to recognize your own rhythms. The cafe after class, the golden-hour walks, the rain slowing everything down just enough. You wrote that being alone didn't feel lonely, and I think that's the thread holding this capsule together: you were learning Florence, and learning yourself inside it.`,
  timelineItems: [
    {
      date: "Mon, Feb 17",
      title: "Cafe after class",
      description:
        "Cappuccino, journal, window seat. Sweet Disposition on the walk home. You wrote that solo time felt good.",
      relatedSignalIds: ["sig-mon-photo-cafe", "sig-mon-reflection-solo"],
    },
    {
      date: "Tue, Feb 18",
      title: "Uffizi quiet",
      description:
        "Renaissance lecture, then pockets of peace in the museum hallways.",
      relatedSignalIds: ["sig-tue-photo-uffizi", "sig-tue-reflection-museum"],
    },
    {
      date: "Wed, Feb 19",
      title: "Dinner with your people",
      description:
        "Maya and Andrea, laughter, getting lost and finding the prettiest street.",
      relatedSignalIds: ["sig-wed-photo-dinner", "sig-wed-friend-lost-street"],
    },
    {
      date: "Thu, Feb 20",
      title: "Rain day",
      description:
        "Rainy window, tiny bookstore, Mystery of Love. Everything slower, in a good way.",
      relatedSignalIds: ["sig-thu-photo-rain", "sig-thu-place-bookstore"],
    },
    {
      date: "Fri, Feb 21",
      title: "Golden hour by the Arno",
      description:
        "River light, peaceful walk. A pattern starting to form.",
      relatedSignalIds: ["sig-fri-photo-arno", "sig-fri-place-arno"],
    },
    {
      date: "Sat, Feb 22",
      title: "Pastries with Andrea",
      description:
        "Smallest tables, biggest laughs. Pink + White on the walk back.",
      relatedSignalIds: ["sig-sat-photo-pastry", "sig-sat-friend-andrea-tables"],
    },
    {
      date: "Sun, Feb 23",
      title: "Week's soft ending",
      description:
        "Postcards on the desk. You wrote: this week felt small, but I'll miss it.",
      relatedSignalIds: ["sig-sun-photo-desk", "sig-sun-reflection-week"],
    },
  ],
  proofMoments: [
    {
      title: "The cafe window",
      description:
        "Three visits, same ritual — proof that small routines can anchor a big week abroad.",
      relatedSignalIds: ["sig-mon-photo-cafe", "sig-sun-photo-cafe-3"],
    },
    {
      title: "Peaceful saves",
      description:
        "You marked several moments as peaceful: the Arno, the rainy window, the museum quiet.",
      relatedSignalIds: ["sig-fri-photo-arno", "sig-thu-photo-rain"],
    },
    {
      title: "Andrea's smallest tables",
      description:
        "Friendship doesn't need big gestures — sometimes it's pastries and a shared joke.",
      relatedSignalIds: ["sig-sat-friend-andrea-tables", "sig-sat-photo-pastry"],
    },
  ],
  scrapbookCaptions: [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      title: "After class",
      caption: "cappuccino, journal, not lonely",
      relatedSignalIds: ["sig-mon-photo-cafe"],
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80",
      title: "Museum light",
      caption: "pockets of peace",
      relatedSignalIds: ["sig-tue-photo-uffizi"],
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      title: "Dinner",
      caption: "Maya, Andrea, laughter",
      relatedSignalIds: ["sig-wed-photo-dinner"],
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1421930866250-aa9394e00504?w=600&q=80",
      title: "Rain day",
      caption: "slower, in a good way",
      relatedSignalIds: ["sig-thu-photo-rain"],
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
      title: "Arno",
      caption: "golden hour, peaceful",
      relatedSignalIds: ["sig-fri-photo-arno"],
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
      title: "Sunday desk",
      caption: "postcards, end of week",
      relatedSignalIds: ["sig-sun-photo-desk"],
    },
  ],
  playlist: [
    {
      songTitle: "Sweet Disposition",
      artist: "The Temper Trap",
      memoryContext: "Walks home — becoming part of the rhythm",
    },
    {
      songTitle: "Dreams",
      artist: "The Cranberries",
      memoryContext: "After dinner with Maya and Andrea",
    },
    {
      songTitle: "Mystery of Love",
      artist: "Sufjan Stevens",
      memoryContext: "Rainy evening, bookstore day",
    },
    {
      songTitle: "Pink + White",
      artist: "Frank Ocean",
      memoryContext: "Walking back from pastries with Andrea",
    },
    {
      songTitle: "Sweet Disposition",
      artist: "The Temper Trap",
      memoryContext: "Golden-hour Arno walk",
    },
  ],
  places: [
    {
      placeName: "Cafe near class",
      description:
        "Your after-class ritual — journal, cappuccino, the window seat.",
      relatedSignalIds: ["sig-mon-place-cafe", "sig-sun-place-cafe-3"],
    },
    {
      placeName: "Uffizi Gallery",
      description: "Art, quiet, and pockets of peace.",
      relatedSignalIds: ["sig-tue-place-uffizi"],
    },
    {
      placeName: "Arno river walk",
      description: "Golden-hour walks becoming a soft pattern.",
      relatedSignalIds: ["sig-fri-place-arno", "sig-thu-place-arno-2"],
    },
    {
      placeName: "Tiny bookstore",
      description: "Shelter on a rain day — old paperbacks and slow time.",
      relatedSignalIds: ["sig-thu-place-bookstore"],
    },
  ],
  futurePostcard: {
    title: "Postcard to future you",
    body: "Remember the week you learned that small doesn't mean empty? The cafe, the Arno, Andrea's smallest tables, and the rainy window. Future you might need proof that you were happy here — and you were.",
  },
  relatedSignalIds: florenceWeek3SignalIds(),
};

function florenceWeek3SignalIds(): string[] {
  return [
    "sig-mon-photo-cafe",
    "sig-tue-photo-uffizi",
    "sig-wed-photo-dinner",
    "sig-thu-photo-rain",
    "sig-fri-photo-arno",
    "sig-sat-photo-pastry",
    "sig-sun-photo-desk",
  ];
}
