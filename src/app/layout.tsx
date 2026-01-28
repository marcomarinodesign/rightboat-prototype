import type { Metadata } from "next"
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"

export const metadata: Metadata = {
  title: "Rightboat Marketplace",
  description:
    "Browse thousands of boats for sale and find the right fit for your next adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
