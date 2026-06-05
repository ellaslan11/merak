import {
  phoneCalendar,
  phonePhotos,
  phoneTextMessages,
  phoneVoiceMemos,
  type PhoneCalendarEntry,
  type PhonePhoto,
  type PhoneTextMessage,
  type PhoneVoiceMemo,
} from "./phoneData";
import { DEMO_PHOTO_COUNT } from "./demoPhotos";
import { getPhotoConsent } from "./consentStore";

export { DEMO_PHOTO_COUNT };

export function getConsentAwarePhotos(): PhonePhoto[] {
  return phonePhotos.map((p) => ({
    ...p,
    merakShared: getPhotoConsent(p.id, p.merakShared),
  }));
}

export function getConsentAwareTexts(): PhoneTextMessage[] {
  return phoneTextMessages;
}

export function getConsentAwareCalendar(): PhoneCalendarEntry[] {
  return phoneCalendar;
}

export function getConsentAwareMemos(): PhoneVoiceMemo[] {
  return phoneVoiceMemos;
}

export function getSharedPhoneStats() {
  const photos = getConsentAwarePhotos();
  return {
    texts: phoneTextMessages.filter((t) => t.merakShared).length,
    photos: photos.filter((p) => p.merakShared).length,
    photosTotal: photos.length,
    calendar: phoneCalendar.filter((c) => c.merakShared).length,
    memos: phoneVoiceMemos.filter((m) => m.merakShared).length,
  };
}

export function getConsentSummary() {
  const stats = getSharedPhoneStats();
  return {
    ...stats,
    photosHidden: stats.photosTotal - stats.photos,
  };
}
