import type { Metadata } from "next";
import { Figtree, Lexend } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alexander Åhman – Systemutvecklare i Västervik",
  description:
    "Systemutvecklare som bygger praktiska webbappar och automationer. Jag hjälper till att ta sig från stökiga problem till lösningar som funkar, och jobbar med datamodeller, API:er, gränssnitt och drift.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
