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
    <main className="px-4 w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mt-12 mb-4 text-neutral-800 dark:text-neutral-100">
          How It Works
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-balance">
          Viewpoints.xyz is designed to make opinion gathering and consensus
          building easy and efficient. Follow these simple steps to create,
          share, and analyze your polls.
        </p>
      </div>

      <div className="grid gap-8">
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

      <h2 className="text-2xl font-bold mt-12 mb-6 text-neutral-800 dark:text-neutral-100">
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

      <div className="mt-12 text-center">
        <p className="text-lg mb-4 text-neutral-700 dark:text-neutral-300">
          Join Viewpoints.xyz today and start engaging with your audience like
          never before!
        </p>
        <Link
          href="/new-poll"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition duration-300"
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
    <div className="grid grid-cols-[auto,1fr] gap-6 p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-purple-600 dark:text-purple-400">
        <Icon className="w-10 h-10" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 text-lg">
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
    <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <div className="text-purple-600 dark:text-purple-400 mb-3">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-300">{description}</p>
    </div>
  );
}
