import type { Metadata } from "next";
import { Orbitron, Chakra_Petch, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const shareMono = Share_Tech_Mono({
  variable: "--font-share-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "FENGZIAAA · Lab Cockpit",
  description: "Vibecoding Personal Lab — building in public, shipping daily.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh"
      className={`${orbitron.variable} ${chakra.variable} ${shareMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
