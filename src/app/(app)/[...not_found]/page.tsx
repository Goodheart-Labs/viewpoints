import Link from "next/link";
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { Button } from "@/ui/button";

// SVG geometric pattern for hero background (from HomePage)
const HeroPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    aria-hidden="true"
    viewBox="0 0 800 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ zIndex: 0 }}
  >
    <circle cx="200" cy="200" r="120" fill="#71d6bf" fillOpacity="0.08" />
    <circle cx="600" cy="100" r="80" fill="#9b80b8" fillOpacity="0.08" />
    <rect
      x="500"
      y="250"
      width="180"
      height="80"
      rx="40"
      fill="#fd7e04"
      fillOpacity="0.06"
    />
  </svg>
);

export default function NotFoundPage() {
  return (
    <main className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-neutral-50/0 to-neutral-100/80 dark:from-neutral-900/0 dark:to-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <HeroPattern />
      <section className="relative z-10 max-w-xl mx-auto p-8 md:px-4 md:py-24 grid gap-8 justify-center text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="inline-flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 p-6 shadow-lg">
            <FiAlertTriangle className="text-5xl text-yellow-500" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-[1.15] text-balance">
            404: Page Not Found
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            <br />
            It may have been moved, deleted, or never existed.
          </p>
        </div>
        <Button
          asChild
          variant="highlight"
          size="lg"
          className="mx-auto mt-4 px-8 py-4 text-lg font-semibold rounded-2xl gap-3 flex items-center"
        >
          <Link href="/">
            Go Home
            <FiArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
