import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-body text-primary-text bg-surface-base">
        {children}
      </body>
    </html>
  );
}
