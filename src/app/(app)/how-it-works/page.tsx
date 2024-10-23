import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiDollarSign,
  FiEdit,
  FiMessageSquare,
  FiShare2,
  FiSmile,
  FiUser,
} from "react-icons/fi";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="px-4 w-full max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mt-10 mb-3 text-neutral-800 dark:text-neutral-100">
          How It Works
        </h1>
        <p className="text-lg text-neutral-400 dark:text-neutral-500 max-w-2xl mx-auto text-balance">
          Viewpoints.xyz is designed to make opinion gathering and consensus
          building easy and efficient. Follow these simple steps to create,
          share, and analyze your polls.
        </p>
      </div>

      <div className="grid gap-6">
        <StepCard
          icon={FiUser}
          title="Sign Up"
          description="Get started by signing up for a free account. Upgrade anytime for pro features."
        />
        <StepCard
          icon={FiEdit}
          title="Create a Poll"
          description="Use our intuitive poll maker to design your poll. Choose from various question formats and customize your poll to suit your needs."
        />
        <StepCard
          icon={FiShare2}
          title="Share Your Poll"
          description="Once your poll is ready, share it with your audience via a direct link or embed it on your website."
        />
        <StepCard
          icon={FiMessageSquare}
          title="Collect Responses"
          description="Watch as opinions roll in. Respondents can easily agree, disagree, or express uncertainty about each statement."
        />
        <StepCard
          icon={FiBarChart2}
          title="Analyze Results"
          description="Viewpoints.xyz offers robust analytics to help you make sense of the data and build a consensus form."
        />
      </div>

      <h2 className="text-xl font-bold mt-10 mb-5 text-neutral-800 dark:text-neutral-100">
        Why Choose Viewpoints.xyz?
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={FiCheckCircle}
          title="Consensus Builder"
          description="Our tool is optimized for building consensus, making it easier to understand collective opinions."
        />
        <FeatureCard
          icon={FiDollarSign}
          title="Free Poll Creation"
          description="Start creating online polls for free and only pay when you need advanced features."
        />
        <FeatureCard
          icon={FiSmile}
          title="User-Friendly Interface"
          description="Our platform is designed to be simple and straightforward, so you can focus on what matters most—gathering insights."
        />
      </div>

      <div className="mt-10 text-center">
        <p className="text-base mb-4 text-neutral-500 dark:text-neutral-400">
          Join Viewpoints.xyz today and start engaging with your audience like
          never before!
        </p>
        <Link
          href="/new-poll"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-orange-600 rounded-full hover:bg-orange-700 transition duration-300"
        >
          Get Started
          <FiArrowRight />
        </Link>
      </div>
    </main>
  );
}

function StepCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FiBarChart2;
  title: string;
  description: string;
}) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 items-center">
      <div className="bg-orange-100 dark:bg-orange-600/70 rounded-full p-4 aspect-square flex items-center justify-center">
        <Icon className="w-6 h-6 text-orange-600 dark:text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1 text-neutral-800 dark:text-neutral-100">
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FiBarChart2;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 bg-gradient-to-tr border from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-lg grid content-start shadow-sm">
      <div className="text-orange-600 dark:text-orange-400 mb-4 justify-self-start">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold mb-1 text-neutral-800 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm text-balance">
        {description}
      </p>
    </div>
  );
}
