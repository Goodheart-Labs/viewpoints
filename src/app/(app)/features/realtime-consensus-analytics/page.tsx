import { FiLock, FiPieChart, FiZap } from "react-icons/fi";
import { FeaturePage } from "@/components/FeaturePage";
import { Metadata } from "next";

const title = "Realtime Consensus Analytics";
const description =
  "Watch opinions unfold and consensus form in real-time with our powerful analytics tool.";

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
          title: "Instant Insight Generation",
          description:
            "Viewpoints.xyz transforms how you gather and analyze opinions. Our realtime consensus analytics provide immediate, actionable insights as your poll responses stream in.",
          features: [
            "Immediate Availability: Share your poll and start gathering responses instantly",
            "Unbiased Results: Randomized statement order to ensure natural, uninfluenced responses",
            "Live Updates: Watch consensus form and conflicts emerge in real-time",
          ],
          image: "/screenshots/poll-page.png",
          alt: "Poll Page",
        },
        {
          title: "Powerful Consensus Building",
          description:
            "As responses flow in, our analytics tool helps you identify areas of agreement and disagreement, facilitating informed decision-making.",
          features: [
            "Agreement Visualization: Instantly see which statements garner consensus",
            "Conflict Identification: Quickly spot areas of disagreement for further discussion",
            "Trend Tracking: Observe how opinions evolve over time",
            "Data Exportability: Download results in CSV format for deeper analysis",
          ],
          image: "/screenshots/results-page.png",
          alt: "Realtime Analytics",
        },
      ]}
      threeColumnCTA={{
        title: "Why Choose Our Consensus Builder?",
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
        title: "Start Building Consensus Now",
        description:
          "Ready to transform your opinion gathering and consensus building? Try our realtime consensus analytics now and see how quickly you can align your team or community.",
      }}
    />
  );
}
