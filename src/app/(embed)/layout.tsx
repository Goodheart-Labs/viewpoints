import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../(app)/globals.css";
import { cn } from "@/ui/cn";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { SEO } from "@/lib/copy";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            inter.variable,
            "bg-neutral-50 text-foreground dark:bg-foreground dark:text-background antialiased overflow-hidden",
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
