"use client";

import { ConsentProvider } from "./ConsentProvider";

export function MerakProviders({ children }: { children: React.ReactNode }) {
  return <ConsentProvider>{children}</ConsentProvider>;
}
