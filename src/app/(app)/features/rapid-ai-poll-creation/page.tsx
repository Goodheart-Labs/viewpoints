import { FiCpu, FiLock, FiZap } from "react-icons/fi";
import { FeaturePage } from "@/components/FeaturePage";
import { Metadata } from "next";

const title = "Rapid AI Poll Creation & Sharing";
const description =
  "Create, share, and analyze consensus-building polls in minutes with our intuitive, AI-powered poll creation tool for instant audience insights.";

export const metadata: Metadata = {
  title: "Viewpoints: " + title,
  description,
};

export default function RapidAIPollCreation() {
  return (
    <FeaturePage
      title={title}
      description={description}
      features={[
        {
          title: "Instant Poll Creation & Audience Insights",
          description:
            "Viewpoints.xyz revolutionizes the way you create, share, and analyze polls to build consensus. With our rapid poll creation feature, you can go from idea to audience insights in just a few clicks.",
          features: [
            "One-Click Start: Jump straight into poll creation and sharing with a single click",
            "AI-Assisted Generation: Describe your audience and goals, and let our AI craft tailored poll statements for deeper insights",
            "Custom-Tailored Insights: Our AI ensures you get exactly the poll data and audience insights you need",
            "Flexible Growth: Allow poll takers to add statements, letting your polls evolve and gather more insights naturally",
          ],
          image: "/screenshots/create-with-ai.png",
          alt: "Create with AI",
        },
        {
          title: "Swift Poll Sharing & Distribution",
          description:
            "Once your poll is ready, sharing it with your audience is effortless and instantaneous. Get more responses and insights by sharing your poll everywhere.",
          features: [
            "Instant Publishing: One click to save, publish, and share your poll",
            "Private links to share exclusively with your community for targeted audience insights",
            "QR code for easy mobile access and sharing",
            "Embed option for seamless website integration and broader audience reach",
          ],
          image: "/screenshots/qr-code-dialog.png",
          alt: "QR Code Dialog",
        },
      ]}
      threeColumnCTA={{
        title: "Why Choose Our Poll Maker for Creating and Sharing Polls?",
        items: [
          {
            title: "Speed",
            desc: "Create and distribute polls in minutes",
            icon: FiZap,
          },
          {
            title: "Precision",
            desc: "AI-generated statements tailored to your specific needs",
            icon: FiCpu,
          },
          {
            title: "Privacy",
            desc: "Control exactly who can participate in your polls",
            icon: FiLock,
          },
        ],
      }}
      cta={{
        title: "Create and Share Your Free Online Poll Now",
        description:
          "Ready to revolutionize your decision-making process? Try our free online poll maker now to create, share, and analyze polls for instant audience insights.",
      }}
    />
  );
}
