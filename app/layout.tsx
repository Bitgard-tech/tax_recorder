import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppNav } from "@/components/app-nav";
import { Toaster } from "@/components/ui/sonner";

import { getDealerProfile } from "@/actions/settings-actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoTrust Pro | Used Car Dealer Management",
  description: "Professional inventory, expense tracking & tax reporting for used car dealers in Sri Lanka",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profileResult = await getDealerProfile();
  const companyName = profileResult.success && profileResult.data?.companyName
    ? profileResult.data.companyName
    : "AutoTrust Pro";

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppNav companyName={companyName}>
          {children}
        </AppNav>
        <Toaster closeButton />
      </body>
    </html>
  );
}
