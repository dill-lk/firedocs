import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-body",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-family-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-family-code",
});

export const metadata: Metadata = {
  title: "Firedocs - AI-Powered Developer Documentation",
  description: "Generate developer docs in seconds, not hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body text-primary-text bg-surface-base">
        {children}
      </body>
    </html>
  );
}
