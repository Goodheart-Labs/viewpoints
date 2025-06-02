import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/ui/cn";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { PosthogProvider } from "@/components/PosthogProvider";
import { TrackPageView } from "@/components/TrackPageView";
import { GoogleAnalytics } from "@next/third-parties/google";
export { metadata } from "@/lib/copy";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

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
            <link rel="icon" href="/favicon.ico" sizes="any" />
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
              <GoogleAnalytics gaId="G-EML70HV3F2" />
            </body>
          </html>
        </QueryProvider>
      </ClerkProvider>
    </PosthogProvider>
  );
}
