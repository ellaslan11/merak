export type NoticePreference =
  | "tiny joys"
  | "friendships"
  | "places"
  | "routines"
  | "solo moments"
  | "songs"
  | "trips"
  | "soft eras";

export type SignalPermission =
  | "photos"
  | "texts"
  | "calendar"
  | "places"
  | "songs"
  | "reflections"
  | "friend_memories";

export type NoteFrequency =
  | "tiny daily notes"
  | "weekly memory letters"
  | "monthly capsules";

export type TonePreference =
  | "warm"
  | "cinematic"
  | "playful"
  | "poetic but grounded"
  | "simple and sincere";

export interface UserProfile {
  id: string;
  name: string;
  vibePreferences: string[];
  noticePreferences: NoticePreference[];
  signalPermissions: Record<SignalPermission, boolean>;
  noteFrequency: NoteFrequency;
  tonePreference: TonePreference;
}

export type MemorySignalType =
  | "photo"
  | "text_message"
  | "calendar_event"
  | "place_visit"
  | "song_played"
  | "reflection"
  | "friend_memory"
  | "routine"
  | "reminder";

export type PrivacyLevel = "private" | "shared";

export interface MemorySignalBase {
  id: string;
  type: MemorySignalType;
  timestamp: string;
  source: string;
  title: string;
  summary: string;
  emotionalTags: string[];
  privacyLevel: PrivacyLevel;
  /** Links back to raw phone artifact when parsed from device */
  phoneSourceId?: string;
}

export interface PhotoSignal extends MemorySignalBase {
  type: "photo";
  imageUrl: string;
  caption?: string;
  location?: string;
  people?: string[];
  userNote?: string;
}

export interface TextMessageSignal extends MemorySignalBase {
  type: "text_message";
  threadId: string;
  contactName: string;
  direction: "incoming" | "outgoing";
  messageBody: string;
}

export interface CalendarSignal extends MemorySignalBase {
  type: "calendar_event";
  eventTitle: string;
  location?: string;
  people?: string[];
  category?: string;
  description?: string;
}

export interface PlaceSignal extends MemorySignalBase {
  type: "place_visit";
  placeName: string;
  location?: string;
  durationMinutes?: number;
  tags?: string[];
  userSaved?: boolean;
}

export interface SongSignal extends MemorySignalBase {
  type: "song_played";
  songTitle: string;
  artist: string;
  context?: string;
  repeatCountThisWeek?: number;
}

export interface ReflectionSignal extends MemorySignalBase {
  type: "reflection";
  prompt?: string;
  answer: string;
}

export interface FriendMemorySignal extends MemorySignalBase {
  type: "friend_memory";
  people: string[];
  memory: string;
  relationshipTag?: string;
}

export interface RoutineSignal extends MemorySignalBase {
  type: "routine";
  routineName: string;
  evidence: string[];
  frequency: string;
  suggestion?: string;
}

export interface ReminderSignal extends MemorySignalBase {
  type: "reminder";
  reminderTitle: string;
  reminderBody: string;
  suggestedTime?: string;
  relatedSignals?: string[];
}

export type MemorySignal =
  | PhotoSignal
  | TextMessageSignal
  | CalendarSignal
  | PlaceSignal
  | SongSignal
  | ReflectionSignal
  | FriendMemorySignal
  | RoutineSignal
  | ReminderSignal;

export type PatternType =
  | "repeated_place"
  | "repeated_person"
  | "repeated_song"
  | "repeated_thread"
  | "routine"
  | "reflection_theme"
  | "peaceful_moments";

export interface PatternObservation {
  id: string;
  title: string;
  body: string;
  patternType: PatternType;
  confidence: "high" | "medium";
  relatedSignalIds: string[];
  suggestedAction?: string;
}

export interface DailyNote {
  id: string;
  date: string;
  title: string;
  body: string;
  relatedSignalIds: string[];
}

export interface ReminderSuggestion {
  id: string;
  title: string;
  body: string;
  suggestedTime: string;
  actionLabel: string;
  relatedSignalIds: string[];
}

export interface WeeklyLetter {
  id: string;
  weekTitle: string;
  title: string;
  body: string;
  themes: string[];
  relatedSignalIds: string[];
  /** Set when served from /api/generate-letter */
  generationMode?: "template" | "openai";
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  relatedSignalIds: string[];
}

export interface ProofMoment {
  title: string;
  description: string;
  relatedSignalIds: string[];
}

export interface ScrapbookCaption {
  imageUrl: string;
  title: string;
  caption: string;
  relatedSignalIds: string[];
}

export interface PlaylistItem {
  songTitle: string;
  artist: string;
  memoryContext: string;
}

export interface PlaceMemory {
  placeName: string;
  description: string;
  relatedSignalIds: string[];
}

export interface FuturePostcard {
  title: string;
  body: string;
}

export interface MemoryCapsule {
  id: string;
  title: string;
  dateRange: string;
  location: string;
  heroImageUrl: string;
  openingLetter: string;
  timelineItems: TimelineItem[];
  proofMoments: ProofMoment[];
  scrapbookCaptions: ScrapbookCaption[];
  playlist: PlaylistItem[];
  places: PlaceMemory[];
  futurePostcard: FuturePostcard;
  relatedSignalIds: string[];
}

export interface OnboardingPreferences {
  noticePreferences: NoticePreference[];
  signalPermissions: Record<SignalPermission, boolean>;
  noteFrequency: NoteFrequency;
  tonePreference: TonePreference;
  completed: boolean;
}
