import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/ui/cn";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { SEO } from "@/lib/copy";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { PosthogProvider } from "@/components/PosthogProvider";
import { TrackPageView } from "@/components/TrackPageView";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    images: [
      {
        url: `${getBaseUrl()}/open-graph.png`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PosthogProvider>
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            avatarBox: "w-6 h-6",
          },
        }}
      >
        <QueryProvider>
          <html lang="en" suppressHydrationWarning>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <body
              className={cn(
                inter.variable,
                "bg-neutral-50 text-foreground dark:bg-foreground dark:text-background antialiased",
                "grid grid-rows-[auto_minmax(0,1fr)_auto] min-h-[100dvh]",
              )}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                {children}
                <Footer />
                <Toaster />
              </ThemeProvider>
              <TrackPageView />
            </body>
          </html>
        </QueryProvider>
      </ClerkProvider>
    </PosthogProvider>
  );
}
