import { FiCpu, FiGrid, FiZap } from "react-icons/fi";
import { FeaturePage } from "@/components/FeaturePage";

export default function RapidAIPollCreation() {
  return (
    <FeaturePage
      title="Rapid AI Poll Creation"
      description="Create consensus-building polls in minutes with our intuitive,
            AI-powered tool."
      features={[
        {
          title: "Instant Poll Creation",
          description:
            "Viewpoints.xyz revolutionizes the way you gather opinions and build consensus. With our rapid poll creation feature, you can go from idea to insights in just a few clicks.",
          features: [
            "One-Click Start: Jump straight into poll creation with a single click",
            "AI-Assisted Generation: Describe your audience and goals, and let our AI craft tailored statements",
            "Custom-Tailored Insights: Our AI ensures you get exactly the information you need",
            "Flexible Growth: Allow poll takers to add statements, letting your polls evolve naturally",
          ],
          image: "/screenshots/create-with-ai.png",
          alt: "Create with AI",
        },
        {
          title: "Swift Distribution",
          description:
            "Once your poll is ready, sharing it with your audience is effortless and instantaneous.",
          features: [
            "Instant Publishing: One click to save and publish your poll",
            "Private links to share exclusively with your community",
            "QR code for easy mobile access",
            "Embed option for seamless website integration",
          ],
          image: "/screenshots/qr-code-dialog.png",
          alt: "QR Code Dialog",
        },
      ]}
      threeColumnCTA={{
        title: "Why Choose Our Poll Maker?",
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
            title: "Flexibility",
            desc: "Multiple sharing options to suit any scenario",
            icon: FiGrid,
          },
        ],
      }}
      cta={{
        title: "Create Your Free Online Poll Now",
        description:
          "Ready to revolutionize your decision-making process? Try our free online poll maker now and see the difference rapid, intelligent polling can make.",
      }}
    />
  );
}
