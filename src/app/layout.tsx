import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"
import { MotionProvider } from "@/components/motion/motion-provider"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

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
    <html lang="en" className={`${inter.variable}`}>
      <body
        className={`${inter.className} antialiased`}
      >
        <MotionProvider>
          <AppShell>{children}</AppShell>
        </MotionProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
