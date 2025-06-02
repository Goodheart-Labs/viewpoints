import { FiBook, FiBox, FiLayers } from "react-icons/fi";
import { FeaturePage } from "@/components/FeaturePage";
import { Metadata } from "next";

const title = "Integration-Ready Poll Data API";
const description =
  "Unlock the full potential of your poll and audience insights with our powerful, easy-to-use API for poll data integration and sharing.";

export const metadata: Metadata = {
  title: "Viewpoints: " + title,
  description,
};

export default function IntegrationReadyAPI() {
  return (
    <FeaturePage
      title={title}
      description={description}
      features={[
        {
          title: "Seamless Poll Data Access & Sharing",
          description:
            "Viewpoints.xyz doesn't just help you gather opinions - we ensure you can leverage your poll and audience insights to the fullest with our Integration-Ready Poll Data API for sharing and integration.",
          features: [
            "Full Poll Data Availability: Access all your poll results and audience insights through our robust API",
            "Build Custom Applications: Easily create apps and visualizations based on your poll and audience data",
            "Real-World Examples: See how others have used poll data to create public statistics and share insights",
            "Flexible Data Export: Download CSV files for in-depth poll analysis in your preferred tools",
          ],
          image: "/api-access.png",
          alt: "Realtime Analytics",
        },
        {
          title: "Powerful Poll Integration & Export Options",
          description:
            "Our API is designed to make your poll data work for you, no matter your needs or technical expertise. Share, integrate, and analyze audience insights easily.",
          features: [
            "One-Click CSV Export: Download your poll data instantly for quick audience insights and analysis",
            "RESTful API: Industry-standard architecture for easy poll data integration",
            "Language Agnostic: Use with Python, R, Julia, or any analytics tool to analyze poll results",
            "Real-time Data Access: Get the latest poll results and audience insights as they come in",
          ],
          image: "/download-csv.png",
          alt: "Realtime Analytics",
        },
      ]}
      threeColumnCTA={{
        title: "Why Choose Our Integration-Ready Poll Data API?",
        items: [
          {
            title: "Flexibility",
            desc: "Build custom solutions tailored to your specific needs",
            icon: FiBox,
          },
          {
            title: "Depth",
            desc: "Access rich, detailed data for thorough analysis",
            icon: FiLayers,
          },
          {
            title: "Ease of Use",
            desc: "Well-documented API for developers of all skill levels",
            icon: FiBook,
          },
        ],
      }}
      cta={{
        title: "Start Integrating and Sharing Poll Data Now",
        description:
          "Ready to take your poll data analysis and audience insights to the next level? Explore our Integration-Ready Poll Data API now and see how easily you can share and transform your poll data into actionable insights.",
      }}
    />
  );
}
