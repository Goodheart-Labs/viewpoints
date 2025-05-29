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
          {/* SEO Visible H1 */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2">
            Create and Share AI-Powered Polls for Instant Audience Insights
          </h1>
          {/* Hero Text (sr-only for accessibility) */}
          <h1 className="sr-only" data-testid="site-title">
            {SEO.title}
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight !leading-[1.1] text-center text-balance">
            Effortlessly create, share, and analyze polls for meetings, events,
            and communities
          </h2>
          <p className="text-balance text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-center !leading-normal">
            Discover what your community is thinking with intelligent polling
            that adapts to your needs. Create polls, share them with your
            audience, and get actionable insights in real time.
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

      {/* SEO Intro Paragraph */}
      <section className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          <strong>Viewpoints</strong> is the fastest way to create, share, and
          analyze polls for any audience. Whether you&apos;re running a meeting,
          hosting an event, teaching a class, or gathering community feedback,
          our AI-powered platform makes it effortless to collect real-time
          insights and drive better decision-making. With instant analytics,
          easy distribution, and privacy-first design, Viewpoints helps you
          understand what your audience really thinks—so you can take action
          with confidence.
        </p>
      </section>

      {/* Who is Viewpoints for? */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Who is Viewpoints for?
        </h2>
        <ul className="grid gap-2 text-lg text-neutral-700 dark:text-neutral-300 list-disc list-inside">
          <li>
            <strong>Teams & Organizations:</strong> Run quick polls in meetings
            to build consensus and gather feedback.
          </li>
          <li>
            <strong>Event Organizers:</strong> Engage your audience with live
            polls and real-time results at conferences or workshops.
          </li>
          <li>
            <strong>Educators:</strong> Check understanding, spark discussion,
            and collect student insights instantly.
          </li>
          <li>
            <strong>Community Leaders:</strong> Understand what your group or
            community really thinks about key issues.
          </li>
          <li>
            <strong>Researchers:</strong> Collect structured, actionable data
            for studies, surveys, and analytics.
          </li>
        </ul>
      </section>

      {/* Features Grid */}
      <div className="bg-white dark:bg-slate-600/10 border-y">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-12 tracking-tight">
            Why choose Viewpoints for your polls?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {[
              {
                icon: FiHelpCircle,
                title: "AI-Powered Poll Creation",
                description:
                  "Get AI-generated polls based on your topic, or create from scratch. You're in control of your poll questions and audience.",
              },
              {
                icon: FiZap,
                title: "Lightning-Fast Setup",
                description:
                  "Three clicks are all it takes to create and launch your poll. Perfect for spontaneous meetings or planned conferences.",
              },
              {
                icon: FiLock,
                title: "Private by Default",
                description:
                  "You control who can respond to your polls. Share exclusively with your intended audience for targeted insights.",
              },
              {
                icon: FiShare2,
                title: "Easy Poll Distribution",
                description:
                  "Share your poll instantly via link or QR code. Reach your audience, wherever they are, and maximize participation.",
              },
              {
                icon: FiBarChart2,
                title: "Real-Time Poll Results & Insights",
                description:
                  "Watch as responses stream in and opinions take shape before your eyes. Analyze audience insights instantly.",
              },
              {
                icon: FiCheck,
                title: "Statement-Based Polling for Deeper Insights",
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
        <h2 className="text-3xl font-bold mb-8 text-center">
          How It Works: Create, Share, and Analyze Polls
        </h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto mb-8 text-center">
          Creating a poll with Viewpoints is simple and fast. In just a few
          steps, you can launch a poll, share it with your audience, and start
          collecting real-time insights. Our AI helps you craft the perfect
          questions, and our analytics dashboard gives you instant feedback to
          inform your next move.
        </p>
        <div className="grid gap-6 justify-center">
          {[
            {
              icon: FiEdit3,
              text: "Choose your topic - Tell us what you want to ask about and who your audience is",
            },
            {
              icon: FiCpu,
              text: "AI drafts your poll - Our AI suggests poll questions based on your topic for maximum engagement",
            },
            {
              icon: FiSettings,
              text: "Approve and customize - Tweak the poll questions to fit your needs and audience",
            },
            {
              icon: FiShare2,
              text: "Share with your audience - Send a link or display a QR code to maximize poll participation",
            },
            {
              icon: FiBarChart2,
              text: "Collect insights - Get real-time poll results and audience insights as people respond",
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
            Start creating and sharing your first poll to gather real-time
            insights from your audience
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-balance !leading-normal">
            Create your first AI-powered poll and start gathering insights in
            seconds. Share your poll and see what your audience thinks
            instantly.
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
