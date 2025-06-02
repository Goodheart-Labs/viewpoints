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
  FiPlus,
  FiSettings,
  FiShare2,
  FiZap,
} from "react-icons/fi";

// SVG geometric pattern for hero background
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

export function HomePage() {
  return (
    <main className="w-full">
      {/* Hero Section with SVG pattern */}
      <div className="relative bg-gradient-to-b from-neutral-50/0 to-neutral-100/80 dark:from-neutral-900/0 dark:to-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <HeroPattern />
        <section className="relative z-10 max-w-6xl mx-auto p-8 md:px-4 md:py-24 grid gap-8 justify-center">
          {/* SEO Visible H1 */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 tracking-tight leading-tight md:leading-[1.15] text-balance">
            Create and Share AI-Powered Polls for Instant Audience Insights
          </h1>
          {/* Hero Text (sr-only for accessibility) */}
          <h1 className="sr-only" data-testid="site-title">
            {SEO.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium tracking-tight !leading-[1.1] text-center text-balance text-neutral-600 dark:text-neutral-300 mb-2">
            Effortlessly create, share, and analyze polls for meetings, events,
            and communities
          </h2>
          <p className="text-balance text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-center !leading-normal mb-2">
            Discover what your community is thinking with intelligent polling
            that adapts to your needs. Create polls, share them with your
            audience, and get actionable insights in real time.
          </p>
          {/* New CTA Button at the top */}
          <Link
            href="/new-poll"
            className="mx-auto mt-4 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg transition-colors duration-300 gap-3"
          >
            <FiPlus className="w-6 h-6" />
            Create a New Poll
            <FiArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </section>
      </div>

      {/* SEO Intro Paragraph */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-900/30 dark:to-neutral-800/30 rounded-2xl my-12 shadow-sm">
        <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mb-6">
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
      <section className="max-w-4xl mx-auto px-8 py-16 bg-white dark:bg-neutral-900 rounded-2xl my-12">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-balance !leading-[1.1] text-center mb-8">
          Who is Viewpoints for?
        </h2>
        <ul className="grid gap-4 text-lg text-neutral-700 dark:text-neutral-300 list-none justify-center max-w-2xl mx-auto">
          {[
            {
              label: "Teams & Organizations:",
              text: "Run quick polls in meetings to build consensus and gather feedback.",
              color: "bg-teal-200 dark:bg-teal-700",
            },
            {
              label: "Event Organizers:",
              text: "Engage your audience with live polls and real-time results at conferences or workshops.",
              color: "bg-orange-200 dark:bg-orange-700",
            },
            {
              label: "Educators:",
              text: "Check understanding, spark discussion, and collect student insights instantly.",
              color: "bg-purple-200 dark:bg-purple-700",
            },
            {
              label: "Community Leaders:",
              text: "Understand what your group or community really thinks about key issues.",
              color: "bg-teal-200 dark:bg-teal-700",
            },
            {
              label: "Researchers:",
              text: "Collect structured, actionable data for studies, surveys, and analytics.",
              color: "bg-orange-200 dark:bg-orange-700",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl shadow-sm"
              style={{ background: "none" }}
            >
              <span
                className={`w-3 h-3 mt-2 rounded-full shrink-0 ${item.color}`}
              ></span>
              <span>
                <strong>{item.label}</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Features Grid */}
      <section className="w-full py-20 bg-white dark:bg-slate-700/30 border-y">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-balance !leading-[1.1] text-center mb-16">
            Why choose Viewpoints for your polls?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-16">
            {[
              {
                icon: FiHelpCircle,
                color: "bg-teal-100 dark:bg-teal-800",
                iconColor: "text-teal-500 dark:text-teal-300",
                title: "AI-Powered Poll Creation",
                description:
                  "Get AI-generated polls based on your topic, or create from scratch. You're in control of your poll questions and audience.",
              },
              {
                icon: FiZap,
                color: "bg-orange-100 dark:bg-orange-800",
                iconColor: "text-orange-500 dark:text-orange-300",
                title: "Lightning-Fast Setup",
                description:
                  "Three clicks are all it takes to create and launch your poll. Perfect for spontaneous meetings or planned conferences.",
              },
              {
                icon: FiLock,
                color: "bg-purple-100 dark:bg-purple-800",
                iconColor: "text-purple-500 dark:text-purple-300",
                title: "Private by Default",
                description:
                  "You control who can respond to your polls. Share exclusively with your intended audience for targeted insights.",
              },
              {
                icon: FiShare2,
                color: "bg-teal-100 dark:bg-teal-800",
                iconColor: "text-teal-500 dark:text-teal-300",
                title: "Easy Poll Distribution",
                description:
                  "Share your poll instantly via link or QR code. Reach your audience, wherever they are, and maximize participation.",
              },
              {
                icon: FiBarChart2,
                color: "bg-orange-100 dark:bg-orange-800",
                iconColor: "text-orange-500 dark:text-orange-300",
                title: "Real-Time Poll Results & Insights",
                description:
                  "Watch as responses stream in and opinions take shape before your eyes. Analyze audience insights instantly.",
              },
              {
                icon: FiCheck,
                color: "bg-purple-100 dark:bg-purple-800",
                iconColor: "text-purple-500 dark:text-purple-300",
                title: "Statement-Based Polling for Deeper Insights",
                description:
                  "Get to the heart of issues faster with direct agree/disagree responses to clear statements, providing deeper insights than traditional questions.",
              },
            ].map(({ icon: Icon, color, iconColor, ...feature }) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col gap-4 items-start border border-neutral-100 dark:border-neutral-800"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm ${color}`}
                >
                  <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 py-20 mx-auto max-w-6xl bg-neutral-50 dark:bg-neutral-900/40 rounded-2xl my-12 shadow-sm">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-balance !leading-[1.1] text-center mb-10">
          How It Works: Create, Share, and Analyze Polls
        </h2>
        <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto mb-10 text-center">
          Creating a poll with Viewpoints is simple and fast. In just a few
          steps, you can launch a poll, share it with your audience, and start
          collecting real-time insights. Our AI helps you craft the perfect
          questions, and our analytics dashboard gives you instant feedback to
          inform your next move.
        </p>
        <div className="grid gap-8 justify-center">
          {[
            {
              icon: FiEdit3,
              color: "bg-orange-100 dark:bg-orange-800",
              iconColor: "text-orange-500 dark:text-orange-300",
              text: "Choose your topic - Tell us what you want to ask about and who your audience is",
            },
            {
              icon: FiCpu,
              color: "bg-teal-100 dark:bg-teal-800",
              iconColor: "text-teal-500 dark:text-teal-300",
              text: "AI drafts your poll - Our AI suggests poll questions based on your topic for maximum engagement",
            },
            {
              icon: FiSettings,
              color: "bg-purple-100 dark:bg-purple-800",
              iconColor: "text-purple-500 dark:text-purple-300",
              text: "Approve and customize - Tweak the poll questions to fit your needs and audience",
            },
            {
              icon: FiShare2,
              color: "bg-orange-100 dark:bg-orange-800",
              iconColor: "text-orange-500 dark:text-orange-300",
              text: "Share with your audience - Send a link or display a QR code to maximize poll participation",
            },
            {
              icon: FiBarChart2,
              color: "bg-teal-100 dark:bg-teal-800",
              iconColor: "text-teal-500 dark:text-teal-300",
              text: "Collect insights - Get real-time poll results and audience insights as people respond",
            },
          ].map(({ text, icon: Icon, color, iconColor }, i) => (
            <div key={i} className="flex items-start gap-5 text-pretty">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${color}`}
              >
                <Icon className={`w-7 h-7 ${iconColor}`} />
              </div>
              <p>
                <span className="font-semibold text-xl text-neutral-900 dark:text-neutral-100">
                  {text.split(" - ")[0]}
                </span>{" "}
                <span className="text-neutral-500 dark:text-neutral-400">
                  - {text.split(" - ")[1]}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="grid gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight leading-tight md:leading-[1.15]">
            Start creating and sharing your first poll to gather real-time
            insights from your audience
          </h2>
          <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-balance !leading-normal">
            Create your first AI-powered poll and start gathering insights in
            seconds. Share your poll and see what your audience thinks
            instantly.
          </p>
        </div>
        <Link
          href="/new-poll"
          className="mt-12 inline-flex items-center justify-center px-10 py-5 text-xl font-semibold rounded-2xl text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg transition-colors duration-300 gap-3"
        >
          <FiPlus className="w-6 h-6" />
          Create Your Free Poll Now
          <FiArrowRight className="ml-2 w-6 h-6" />
        </Link>
      </section>
    </main>
  );
}
