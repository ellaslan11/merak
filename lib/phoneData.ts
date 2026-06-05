/**
 * Raw simulated phone data for Ella (Campus Week).
 * Merak only reads items the user marked as shareable — never full inbox scraping.
 */

import { demoPhotos } from "./demoPhotos";

export interface PhoneContact {
  id: string;
  name: string;
  avatarColor: string;
}

export interface PhoneTextMessage {
  id: string;
  threadId: string;
  contactId: string;
  direction: "incoming" | "outgoing";
  body: string;
  timestamp: string;
  merakShared: boolean;
}

export interface PhonePhoto {
  id: string;
  imageUrl: string;
  timestamp: string;
  album: string;
  location?: string;
  caption?: string;
  people?: string[];
  merakShared: boolean;
  emotionalHint?: string;
}

export interface PhoneCalendarEntry {
  id: string;
  title: string;
  timestamp: string;
  location?: string;
  people?: string[];
  merakShared: boolean;
}

export interface PhoneVoiceMemo {
  id: string;
  transcript: string;
  timestamp: string;
  merakShared: boolean;
}

export const phoneContacts: PhoneContact[] = [
  { id: "maya", name: "Maya", avatarColor: "#c4a4a4" },
  { id: "andrea", name: "Andrea", avatarColor: "#8fa4b8" },
  { id: "mom", name: "Mom", avatarColor: "#c9b896" },
];

export const phoneTextMessages: PhoneTextMessage[] = [
  {
    id: "txt-1",
    threadId: "maya",
    contactId: "maya",
    direction: "incoming",
    body: "heavenly tomorrow?? pack layers pls",
    timestamp: "2026-02-17T07:30:00Z",
    merakShared: true,
  },
  {
    id: "txt-2",
    threadId: "maya",
    contactId: "maya",
    direction: "outgoing",
    body: "yes. bringing the goggles that actually work this time",
    timestamp: "2026-02-17T07:32:00Z",
    merakShared: true,
  },
  {
    id: "txt-3",
    threadId: "andrea",
    contactId: "andrea",
    direction: "incoming",
    body: "van gogh tickets are in my wallet app — meet 6:15",
    timestamp: "2026-02-18T11:00:00Z",
    merakShared: true,
  },
  {
    id: "txt-3b",
    threadId: "maya",
    contactId: "maya",
    direction: "incoming",
    body: "pi phi mirror night tonight — wear the jersey",
    timestamp: "2026-02-21T18:30:00Z",
    merakShared: true,
  },
  {
    id: "txt-3c",
    threadId: "andrea",
    contactId: "andrea",
    direction: "outgoing",
    body: "YC visit was surreal. name tag still says CS 153 lol",
    timestamp: "2026-02-20T13:30:00Z",
    merakShared: true,
  },
  {
    id: "txt-4",
    threadId: "andrea",
    contactId: "andrea",
    direction: "outgoing",
    body: "perfect. wearing something that won't clash with starry night lol",
    timestamp: "2026-02-18T11:04:00Z",
    merakShared: true,
  },
  {
    id: "txt-5",
    threadId: "maya",
    contactId: "maya",
    direction: "incoming",
    body: "bar res at 8 wednesday — dress cute",
    timestamp: "2026-02-18T18:00:00Z",
    merakShared: true,
  },
  {
    id: "txt-6",
    threadId: "maya",
    contactId: "maya",
    direction: "outgoing",
    body: "yes!! somewhere we can actually hear each other after",
    timestamp: "2026-02-18T18:05:00Z",
    merakShared: true,
  },
  {
    id: "txt-7",
    threadId: "maya",
    contactId: "maya",
    direction: "incoming",
    body: "white lie theme is SO specific… all white fits tomorrow?",
    timestamp: "2026-02-19T15:00:00Z",
    merakShared: true,
  },
  {
    id: "txt-8",
    threadId: "maya",
    contactId: "maya",
    direction: "outgoing",
    body: "already laid out. if CFA is open after we are stopping",
    timestamp: "2026-02-19T15:03:00Z",
    merakShared: true,
  },
  {
    id: "txt-9",
    threadId: "andrea",
    contactId: "andrea",
    direction: "incoming",
    body: "cardamom buns saturday?? that place with the tiny label",
    timestamp: "2026-02-21T21:10:00Z",
    merakShared: true,
  },
  {
    id: "txt-10",
    threadId: "andrea",
    contactId: "andrea",
    direction: "outgoing",
    body: "yes omg. their case is literally always the most crowded",
    timestamp: "2026-02-21T21:12:00Z",
    merakShared: true,
  },
  {
    id: "txt-11",
    threadId: "andrea",
    contactId: "andrea",
    direction: "incoming",
    body: "written in tonight — black dresses only 📸",
    timestamp: "2026-02-22T16:00:00Z",
    merakShared: true,
  },
  {
    id: "txt-12",
    threadId: "mom",
    contactId: "mom",
    direction: "incoming",
    body: "how's campus feeling this week?",
    timestamp: "2026-02-22T18:00:00Z",
    merakShared: true,
  },
  {
    id: "txt-13",
    threadId: "mom",
    contactId: "mom",
    direction: "outgoing",
    body: "busy but good. lots of little things. learning to be alone without it feeling bad",
    timestamp: "2026-02-22T18:20:00Z",
    merakShared: true,
  },
];

export const phonePhotos: PhonePhoto[] = [
  {
    id: "photo-ski",
    imageUrl: demoPhotos.ski,
    timestamp: "2026-02-17T16:00:00Z",
    album: "Tahoe",
    location: "Heavenly, Lake Tahoe",
    caption: "trail sign with the crew",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-vangogh",
    imageUrl: demoPhotos.vangogh,
    timestamp: "2026-02-18T19:30:00Z",
    album: "Campus week",
    location: "Van Gogh immersive",
    caption: "swirly sky selfie",
    people: ["Andrea"],
    merakShared: true,
    emotionalHint: "peaceful",
  },
  {
    id: "photo-bar",
    imageUrl: demoPhotos.bar,
    timestamp: "2026-02-19T21:00:00Z",
    album: "Campus week",
    location: "Downtown bar",
    caption: "macallan glow",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-white-lie",
    imageUrl: demoPhotos.whiteLieParty,
    timestamp: "2026-02-20T22:30:00Z",
    album: "Campus week",
    location: "Dorm common room",
    caption: "all white, zero lies",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-fries",
    imageUrl: demoPhotos.fries,
    timestamp: "2026-02-20T23:45:00Z",
    album: "Campus week",
    location: "Late-night run",
    caption: "waffle fries & boa",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "playful",
  },
  {
    id: "photo-festival",
    imageUrl: demoPhotos.festival,
    timestamp: "2026-02-21T20:15:00Z",
    album: "Campus week",
    location: "Outdoor festival",
    caption: "golden hour field",
    people: ["Maya"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-bakery",
    imageUrl: demoPhotos.bakery,
    timestamp: "2026-02-22T10:30:00Z",
    album: "Campus week",
    location: "Cardamom bun bakery",
    caption: "cardamom bun case",
    people: ["Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-birthday",
    imageUrl: demoPhotos.birthday,
    timestamp: "2026-02-22T14:00:00Z",
    album: "Campus week",
    location: "Dorm",
    caption: "it is your birthday",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-formal",
    imageUrl: demoPhotos.formal,
    timestamp: "2026-02-22T21:00:00Z",
    album: "Campus week",
    location: "Written In formal",
    caption: "written in backdrop",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "nostalgic",
  },
  {
    id: "photo-dog",
    imageUrl: demoPhotos.dog,
    timestamp: "2026-02-23T15:30:00Z",
    album: "Home",
    location: "Back patio",
    caption: "mom's dog on the pavers",
    merakShared: true,
    emotionalHint: "peaceful",
  },
  {
    id: "photo-sorority-social",
    imageUrl: demoPhotos.sororitySocial,
    timestamp: "2026-02-18T22:00:00Z",
    album: "Campus week",
    location: "Chapter house",
    caption: "pi phi night",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-car-matcha",
    imageUrl: demoPhotos.carMatcha,
    timestamp: "2026-02-19T14:00:00Z",
    album: "Campus week",
    location: "In the car",
    caption: "matcha between classes",
    merakShared: true,
    emotionalHint: "peaceful",
  },
  {
    id: "photo-ycombinator",
    imageUrl: demoPhotos.ycombinator,
    timestamp: "2026-02-20T13:00:00Z",
    album: "Campus week",
    location: "Y Combinator",
    caption: "CS 153 field trip",
    people: ["Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-pi-phi-mirror",
    imageUrl: demoPhotos.piPhiMirror,
    timestamp: "2026-02-21T19:00:00Z",
    album: "Campus week",
    location: "Pi Beta Phi",
    caption: "DREAM mirror selfie",
    people: ["Maya"],
    merakShared: true,
    emotionalHint: "nostalgic",
  },
  {
    id: "photo-japanese-dinner",
    imageUrl: demoPhotos.japaneseDinner,
    timestamp: "2026-02-19T20:30:00Z",
    album: "Campus week",
    location: "Japanese restaurant",
    caption: "ramen + unagi bowl",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
  {
    id: "photo-robot-matcha",
    imageUrl: demoPhotos.robotMatcha,
    timestamp: "2026-02-20T11:30:00Z",
    album: "Campus week",
    location: "Yummy Future kiosk",
    caption: "robot made my matcha",
    merakShared: true,
    emotionalHint: "playful",
  },
  {
    id: "photo-cat",
    imageUrl: demoPhotos.cat,
    timestamp: "2026-02-21T12:00:00Z",
    album: "Home",
    location: "Apartment",
    caption: "cat in the shelf",
    merakShared: true,
    emotionalHint: "peaceful",
  },
  {
    id: "photo-memory-wall",
    imageUrl: demoPhotos.memoryWall,
    timestamp: "2026-02-22T17:00:00Z",
    album: "Dorm",
    location: "Dorm room",
    caption: "corkboard of prints",
    merakShared: true,
    emotionalHint: "nostalgic",
  },
  {
    id: "photo-fortune-cookie",
    imageUrl: demoPhotos.fortuneCookie,
    timestamp: "2026-02-23T11:00:00Z",
    album: "Campus week",
    location: "Panda Express patio",
    caption: "happily ever after exists",
    merakShared: true,
    emotionalHint: "playful",
  },
  {
    id: "photo-dog-walk",
    imageUrl: demoPhotos.dogWalk,
    timestamp: "2026-02-23T14:00:00Z",
    album: "Home",
    location: "Neighborhood walk",
    caption: "fluffy dog on the leash",
    merakShared: true,
    emotionalHint: "peaceful",
  },
  {
    id: "photo-patio-dinner",
    imageUrl: demoPhotos.patioDinner,
    timestamp: "2026-02-23T18:30:00Z",
    album: "Campus week",
    location: "Outdoor patio",
    caption: "calamari with friends",
    people: ["Maya", "Andrea"],
    merakShared: true,
    emotionalHint: "joy",
  },
];

export const phoneCalendar: PhoneCalendarEntry[] = [
  {
    id: "cal-1",
    title: "Heavenly ski day",
    timestamp: "2026-02-17T08:00:00Z",
    location: "Lake Tahoe",
    people: ["Maya", "Andrea"],
    merakShared: true,
  },
  {
    id: "cal-2",
    title: "Van Gogh immersive",
    timestamp: "2026-02-18T18:00:00Z",
    location: "Downtown",
    people: ["Andrea"],
    merakShared: true,
  },
  {
    id: "cal-3",
    title: "Bar with Maya and Andrea",
    timestamp: "2026-02-19T20:00:00Z",
    location: "Downtown",
    people: ["Maya", "Andrea"],
    merakShared: true,
  },
  {
    id: "cal-4",
    title: "White lie party",
    timestamp: "2026-02-20T21:00:00Z",
    location: "Dorm",
    people: ["Maya", "Andrea"],
    merakShared: true,
  },
  {
    id: "cal-5",
    title: "Festival",
    timestamp: "2026-02-21T18:00:00Z",
    location: "Fairgrounds",
    people: ["Maya"],
    merakShared: true,
  },
  {
    id: "cal-6",
    title: "Written In formal",
    timestamp: "2026-02-22T19:00:00Z",
    location: "Campus",
    people: ["Maya", "Andrea"],
    merakShared: true,
  },
];

export const phoneVoiceMemos: PhoneVoiceMemo[] = [
  {
    id: "memo-1",
    transcript:
      "Tahoe air hit different. Cold cheeks, hot cocoa, laughing on the lift.",
    timestamp: "2026-02-17T19:00:00Z",
    merakShared: true,
  },
  {
    id: "memo-2",
    transcript:
      "Festival sunset made everything feel cinematic. I didn't want to leave the field.",
    timestamp: "2026-02-21T22:00:00Z",
    merakShared: true,
  },
  {
    id: "memo-3",
    transcript:
      "Sat on the patio with the dog. Quiet. This week felt loud, but I think I'll miss parts of it.",
    timestamp: "2026-02-23T16:00:00Z",
    merakShared: true,
  },
];

/** @deprecated Use getSharedPhoneStats from lib/consentAwareData */
export { getSharedPhoneStats } from "./consentAwareData";
