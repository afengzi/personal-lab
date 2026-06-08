import type { Metadata } from "next";
import { Orbitron, Chakra_Petch, Share_Tech_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`dark ${orbitron.variable} ${chakra.variable} ${shareMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
