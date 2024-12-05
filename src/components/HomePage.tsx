"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiHelpCircle,
  FiPlus,
  FiShare2,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { PollList } from "@/components/PollList";
import { getIndexPolls } from "@/lib/getIndexPolls";

export function HomePage({
  polls,
}: {
  polls: Awaited<ReturnType<typeof getIndexPolls>>;
}) {
  return (
    <main className="w-full md:pt-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid gap-8">
        <div className="grid gap-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Three-click polls for meetings and conferences using{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600 text-transparent bg-clip-text">
              AI
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-gradient-to-b from-neutral-400 to-neutral-500/50 dark:from-neutral-400 dark:to-neutral-300 bg-clip-text">
            Discover what your community is thinking with Viewpoints
          </p>
          <p className="text-lg md:text-xl font-medium text-neutral-500 dark:text-neutral-300 max-w-2xl text-balance">
            Viewpoints.xyz is your go-to tool for quick, intelligent polling.
            Create, share, and analyze polls effortlessly to gauge opinions on
            any topic.
          </p>
        </div>

        {/* Quick Start Steps */}
        <motion.div
          className="grid gap-4 p-8 max-w-2xl w-full mx-auto bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)", rotate: 2 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: 0 }}
          transition={{
            y: { type: "spring", stiffness: 100, damping: 15 },
            rotate: { type: "spring", stiffness: 150, damping: 10 },
            filter: { duration: 0.2 },
          }}
        >
          <h2 className="text-2xl font-extrabold text-neutral-800 dark:text-neutral-100">
            Create your own poll in seconds!
          </h2>
          <div className="grid gap-4 mb-4">
            {[
              "Enter your poll topic or idea",
              "Let AI craft your statements",
              "Review and launch your poll",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  {i + 1}
                </div>
                <p className="text-lg md:text-xl">{step}</p>
              </div>
            ))}
          </div>
          <Link
            href="/new-poll"
            className="inline-flex items-center justify-center px-6 py-4 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
          >
            <FiPlus className="mr-2" />
            Create Your Poll Now
          </Link>
        </motion.div>

        {/* Features Grid */}
        <section className="py-12">
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
                icon: FiSmartphone,
                title: "Multi-Device Compatibility",
                description:
                  "Participants can answer on phones or laptops. Flexibility for every situation.",
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
            ].map(({ icon: Icon, ...feature }) => (
              <div key={feature.title}>
                <div className="flex items-start gap-3">
                  <Icon
                    strokeWidth={1.5}
                    className="w-6 h-6 opacity-30 shrink-0 mt-[2px]"
                  />
                  <div className="grid gap-3">
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="py-12 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid gap-6">
            {[
              "Choose your topic - Tell us what you want to ask about",
              "AI drafts your poll - Our AI suggests questions based on your topic",
              "Approve and customize - Tweak the questions to fit your needs",
              "Share with your audience - Send a link or display a QR code",
              "Collect insights - Get real-time results as people respond",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  <FiCheck className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-lg">
                  <span className="font-bold">{step.split(" - ")[0]}</span> -{" "}
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {step.split(" - ")[1]}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to uncover what your community is thinking?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Join Viewpoints.xyz today and start engaging with your audience like
            never before.
          </p>
          <Link
            href="/new-poll"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
          >
            Create Your Free Poll Now
            <FiArrowRight className="ml-2" />
          </Link>
        </section>

        {/* Latest Polls */}
        <section className="py-12 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold mb-8">Latest Polls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PollList polls={polls} />
          </div>
        </section>
      </section>
    </main>
  );
}
