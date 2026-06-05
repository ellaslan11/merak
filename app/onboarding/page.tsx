"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { NoticePreferenceSelector } from "@/components/onboarding/NoticePreferenceSelector";
import { SignalPermissionSelector } from "@/components/onboarding/SignalPermissionSelector";
import { FrequencySelector } from "@/components/onboarding/FrequencySelector";
import { ToneSelector } from "@/components/onboarding/ToneSelector";
import { Button } from "@/components/ui/Button";
import type {
  NoticePreference,
  NoteFrequency,
  OnboardingPreferences,
  SignalPermission,
  TonePreference,
} from "@/lib/types";
import { savePreferences } from "@/lib/utils";

const TOTAL_STEPS = 4;

const defaultPermissions: Record<SignalPermission, boolean> = {
  photos: true,
  texts: true,
  calendar: true,
  places: true,
  songs: true,
  reflections: true,
  friend_memories: true,
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [noticePrefs, setNoticePrefs] = useState<NoticePreference[]>([
    "tiny joys",
    "friendships",
    "places",
    "routines",
    "solo moments",
    "songs",
  ]);
  const [permissions, setPermissions] =
    useState<Record<SignalPermission, boolean>>(defaultPermissions);
  const [frequency, setFrequency] =
    useState<NoteFrequency>("weekly memory letters");
  const [tone, setTone] = useState<TonePreference>("warm");

  const finish = () => {
    const prefs: OnboardingPreferences = {
      noticePreferences: noticePrefs,
      signalPermissions: permissions,
      noteFrequency: frequency,
      tonePreference: tone,
      completed: true,
    };
    savePreferences(prefs);
    router.push("/home");
  };

  return (
    <OnboardingShell step={step} totalSteps={TOTAL_STEPS}>
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="heading-serif text-[26px] text-espresso mb-2 leading-tight">
              What should Merak notice?
            </h1>
            <p className="text-[14px] text-warm-gray leading-relaxed">
              Choose the kinds of moments that matter to you. You can change
              this anytime.
            </p>
          </div>
          <NoticePreferenceSelector
            selected={noticePrefs}
            onChange={setNoticePrefs}
          />
          <Button className="w-full mt-2" onClick={() => setStep(2)}>
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="heading-serif text-2xl text-espresso mb-2">
              What signals do you want to share?
            </h1>
            <p className="text-sm text-warm-gray">
              Merak only works with what you opt in. No hidden tracking, no
              microphone, no message scraping.
            </p>
          </div>
          <SignalPermissionSelector
            permissions={permissions}
            onChange={setPermissions}
          />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button className="flex-1" onClick={() => setStep(3)}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="heading-serif text-2xl text-espresso mb-2">
              How often should Merak write to you?
            </h1>
            <p className="text-sm text-warm-gray">
              Gentle notes, not notifications that overwhelm.
            </p>
          </div>
          <FrequencySelector selected={frequency} onChange={setFrequency} />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button className="flex-1" onClick={() => setStep(4)}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="heading-serif text-2xl text-espresso mb-2">
              What tone should Merak use?
            </h1>
            <p className="text-sm text-warm-gray">
              Warm and observant — never clinical, never creepy.
            </p>
          </div>
          <ToneSelector selected={tone} onChange={setTone} />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(3)}>
              Back
            </Button>
            <Button className="flex-1" onClick={finish}>
              Start noticing
            </Button>
          </div>
        </div>
      )}
    </OnboardingShell>
  );
}
