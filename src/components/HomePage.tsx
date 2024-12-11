"use client";

import { SEO } from "@/lib/copy";
import Link from "next/link";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiCpu,
  FiEdit3,
  FiHelpCircle,
  FiLock,
  FiSettings,
  FiShare2,
  FiZap,
} from "react-icons/fi";

export function HomePage() {
  return (
    <main className="w-full">
      <div className="bg-gradient-to-b from-neutral-50/0 to-neutral-100/80 dark:from-neutral-900/0 dark:to-neutral-900/50">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto p-8 md:px-4 md:py-20 grid gap-4 justify-center">
          {/* Hero Text */}
          <h1 className="sr-only" data-testid="site-title">
            {SEO.title}
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight !leading-[1.1] text-center text-balance">
            Instant polls for meetings and conferences using{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text text-center">
              AI
            </span>
          </h2>
          <p className="text-balance text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-center !leading-normal">
            Discover what your community is thinking with intelligent polling
            that adapts to your needs
          </p>

          {/* Quick Start Card */}
          {/* <motion.div
            className="grid gap-8 p-8 max-w-xl mx-auto w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200/50 dark:border-neutral-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-6">
              <h2 className="text-xl font-semibold">
                Create your poll in seconds
              </h2>

              <div className="grid gap-4">
                {[
                  "Enter your topic or question",
                  "AI generates targeted statements",
                  "Review and launch instantly",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center text-sm font-medium text-orange-600 dark:text-orange-400">
                      {i + 1}
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-200">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/new-poll"
              className="flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
            >
              <FiPlus className="w-4 h-4" />
              Create Your Poll
            </Link>
          </motion.div> */}
        </section>
      </div>

      {/* Features Grid */}
      <div className="bg-white dark:bg-slate-600/10 border-y">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-12 tracking-tight">
            Why choose Viewpoints?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {[
              {
                icon: FiHelpCircle,
                title: "AI-Powered Poll Creation",
                description:
                  "Get AI-generated polls based on your topic, or create from scratch. You're in control.",
              },
              {
                icon: FiZap,
                title: "Lightning-Fast Setup",
                description:
                  "Three clicks are all it takes to launch your poll. Perfect for spontaneous meetings or planned conferences.",
              },
              {
                icon: FiLock,
                title: "Private by Default",
                description:
                  "You control who can respond to your polls. Share exclusively with your intended audience.",
              },
              {
                icon: FiShare2,
                title: "Easy Distribution",
                description:
                  "Share your poll instantly via link or QR code. Reach your audience, wherever they are.",
              },
              {
                icon: FiBarChart2,
                title: "Real-Time Results",
                description:
                  "Watch as responses stream in and opinions take shape before your eyes.",
              },
              {
                icon: FiCheck,
                title: "Statement-Based Polling",
                description:
                  "Get to the heart of issues faster with direct agree/disagree responses to clear statements, providing deeper insights than traditional questions.",
              },
            ].map(({ icon: Icon, ...feature }) => (
              <div key={feature.title}>
                <div className="flex items-start gap-3">
                  <Icon
                    strokeWidth={1.5}
                    className="w-6 h-6 opacity-50 shrink-0 mt-[2px]"
                  />
                  <div className="grid gap-3">
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* How it Works */}
      <section className="px-4 py-12 mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid gap-6 justify-center">
          {[
            {
              icon: FiEdit3,
              text: "Choose your topic - Tell us what you want to ask about",
            },
            {
              icon: FiCpu,
              text: "AI drafts your poll - Our AI suggests questions based on your topic",
            },
            {
              icon: FiSettings,
              text: "Approve and customize - Tweak the questions to fit your needs",
            },
            {
              icon: FiShare2,
              text: "Share with your audience - Send a link or display a QR code",
            },
            {
              icon: FiBarChart2,
              text: "Collect insights - Get real-time results as people respond",
            },
          ].map(({ text, icon: Icon }, i) => (
            <div key={i} className="flex items-start gap-4 text-pretty">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-orange-500" />
              </div>
              <p>
                <span className="font-medium text-xl">
                  {text.split(" - ")[0]}
                </span>{" "}
                -{" "}
                <span className="text-neutral-500 dark:text-neutral-400">
                  {text.split(" - ")[1]}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="grid gap-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-balance !leading-[1.1]">
            Discover what your community is thinking today
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-balance !leading-normal">
            Create your first AI-powered poll and start gathering insights in
            seconds
          </p>
        </div>
        <Link
          href="/new-poll"
          className="mt-8 inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
        >
          Create Your Free Poll Now
          <FiArrowRight className="ml-2" />
        </Link>
      </section>
    </main>
  );
}
