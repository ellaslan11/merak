import { PhoneAppShell } from "./PhoneAppShell";

/** v2: mobile phone shell only */
export function AppShell({
  children,
  title,
  showTopNav = true,
}: {
  children: React.ReactNode;
  title?: string;
  showTopNav?: boolean;
}) {
  return (
    <PhoneAppShell title={title} showHeader={showTopNav}>
      {children}
    </PhoneAppShell>
  );
}
