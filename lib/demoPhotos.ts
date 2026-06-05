/**
 * Ella's demo camera roll — local assets in /public/photos.
 */

export const demoPhotos = {
  ski: "/photos/ski.jpg",
  vangogh: "/photos/vangogh.jpg",
  bar: "/photos/bar.jpg",
  whiteLieParty: "/photos/white-lie-party.jpg",
  fries: "/photos/fries.jpg",
  festival: "/photos/festival.jpg",
  bakery: "/photos/bakery.jpg",
  formal: "/photos/formal.jpg",
  birthday: "/photos/birthday.jpg",
  dog: "/photos/dog.jpg",
  sororitySocial: "/photos/sorority-social.jpg",
  carMatcha: "/photos/car-matcha.jpg",
  ycombinator: "/photos/ycombinator.jpg",
  piPhiMirror: "/photos/pi-phi-mirror.jpg",
  japaneseDinner: "/photos/japanese-dinner.jpg",
  robotMatcha: "/photos/robot-matcha.jpg",
  cat: "/photos/cat.jpg",
  memoryWall: "/photos/memory-wall.jpg",
  fortuneCookie: "/photos/fortune-cookie.jpg",
  dogWalk: "/photos/dog-walk.jpg",
  patioDinner: "/photos/patio-dinner.jpg",
} as const;

export type DemoPhotoKey = keyof typeof demoPhotos;

export const DEMO_PHOTO_COUNT = Object.keys(demoPhotos).length;
