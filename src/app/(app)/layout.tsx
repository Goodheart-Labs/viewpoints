import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/ui/cn";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-background text-foreground dark:bg-foreground dark:text-background"
    >
      <body
        className={cn(
          inter.variable,
          "grid grid-rows-[auto_minmax(0,1fr)_auto] min-h-[100dvh]"
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
