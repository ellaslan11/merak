"use client";

import { AppShell } from "@/components/layout/AppShell";
import { CapsuleHero } from "@/components/capsule/CapsuleHero";
import { OpeningLetter } from "@/components/capsule/OpeningLetter";
import { MemoryTimeline } from "@/components/capsule/MemoryTimeline";
import { ProofYouWereHappyHere } from "@/components/capsule/ProofYouWereHappyHere";
import { ScrapbookGrid } from "@/components/capsule/ScrapbookGrid";
import { PlaylistSection } from "@/components/capsule/PlaylistSection";
import { PlacesSection } from "@/components/capsule/PlacesSection";
import { FuturePostcard } from "@/components/capsule/FuturePostcard";
import { getMemoryCapsule } from "@/lib/generateMemory";

export default function FlorenceWeek3CapsulePage() {
  const capsule = getMemoryCapsule();

  return (
    <AppShell showTopNav={false}>
      <div className="-mt-2 pb-12">
        <CapsuleHero
          title={capsule.title}
          dateRange={capsule.dateRange}
          location={capsule.location}
          imageUrl={capsule.heroImageUrl}
        />
        <OpeningLetter text={capsule.openingLetter} />
        <MemoryTimeline items={capsule.timelineItems} />
        <ProofYouWereHappyHere moments={capsule.proofMoments} />
        <ScrapbookGrid items={capsule.scrapbookCaptions} />
        <PlaylistSection items={capsule.playlist} />
        <PlacesSection places={capsule.places} />
        <FuturePostcard
          title={capsule.futurePostcard.title}
          body={capsule.futurePostcard.body}
        />
      </div>
    </AppShell>
  );
}
