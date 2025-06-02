import { FiLock, FiPieChart, FiZap } from "react-icons/fi";
import { FeaturePage } from "@/components/FeaturePage";
import { Metadata } from "next";

const title = "Realtime Poll Consensus Analytics & Insights";
const description =
  "Watch audience opinions unfold and consensus form in real-time with our powerful poll analytics and insights tool. Share and analyze poll results instantly for deeper audience understanding.";

export const metadata: Metadata = {
  title: "Viewpoints: " + title,
  description,
};

export default function RealtimeConsensusAnalytics() {
  return (
    <FeaturePage
      title="Realtime Consensus Analytics"
      description="Watch opinions unfold and consensus form in real-time with our
            powerful analytics tool."
      features={[
        {
          title: "Instant Poll Insight Generation & Analytics",
          description:
            "Viewpoints.xyz transforms how you create, share, and analyze polls. Our realtime consensus analytics provide immediate, actionable audience insights as your poll responses stream in.",
          features: [
            "Immediate Availability: Share your poll and start gathering audience responses and insights instantly",
            "Unbiased Results: Randomized statement order to ensure natural, uninfluenced poll responses",
            "Live Updates: Watch consensus form and conflicts emerge in real-time for deeper audience understanding",
          ],
          image: "/screenshots/poll-page.png",
          alt: "Poll Page",
        },
        {
          title: "Powerful Poll Consensus Building & Insights",
          description:
            "As responses flow in, our analytics tool helps you identify areas of agreement and disagreement, facilitating informed decision-making and audience insights.",
          features: [
            "Agreement Visualization: Instantly see which poll statements garner consensus and audience agreement",
            "Conflict Identification: Quickly spot areas of disagreement for further poll analysis and sharing",
            "Trend Tracking: Observe how audience opinions and poll results evolve over time",
            "Data Exportability: Download poll results in CSV format for deeper audience insights and analytics",
          ],
          image: "/screenshots/results-page.png",
          alt: "Realtime Analytics",
        },
      ]}
      threeColumnCTA={{
        title: "Why Choose Our Poll Consensus Analytics & Insights Builder?",
        items: [
          {
            title: "Speed",
            desc: "Get insights the moment responses start coming in",
            icon: FiZap,
          },
          {
            title: "Clarity",
            desc: "Clear visualizations of consensus and conflict",
            icon: FiPieChart,
          },
          {
            title: "Privacy",
            desc: "Built-in protections for respondent anonymity",
            icon: FiLock,
          },
        ],
      }}
      cta={{
        title: "Start Building Poll Consensus and Gathering Insights Now",
        description:
          "Ready to transform your opinion gathering and consensus building? Try our realtime poll consensus analytics now and see how quickly you can align your team or community and share actionable audience insights.",
      }}
    />
  );
}
