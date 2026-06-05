import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { MerakProviders } from "@/components/providers/MerakProviders";
import "@/styles/globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Merak — Your life, remembered softly",
  description:
    "A gentle AI memory companion that helps you notice and preserve the small moments that make life meaningful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased font-sans">
        <PhoneFrame>
          <MerakProviders>{children}</MerakProviders>
        </PhoneFrame>
      </body>
    </html>
  );
}
