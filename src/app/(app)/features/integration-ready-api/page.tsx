import { FiBook, FiBox, FiLayers } from "react-icons/fi";
import { FeaturePage } from "@/components/FeaturePage";

export default function IntegrationReadyAPI() {
  return (
    <FeaturePage
      title="Integration-Ready API"
      description="Unlock the full potential of your poll data with our powerful,
            easy-to-use API."
      features={[
        {
          title: "Seamless Data Access",
          description:
            "Viewpoints.xyz doesn't just help you gather opinions - we ensure you can leverage your data to its fullest extent with our Integration-Ready API.",
          features: [
            "Full Data Availability: Access all your poll results through our robust API",
            "Build Custom Applications: Easily create apps and visualizations based on your poll data",
            "Real-World Examples: See how others have used poll data to create public statistics websites",
            "Flexible Data Export: Download CSV files for in-depth analysis in your preferred tools",
          ],
          image: "/api-access.png",
          alt: "Realtime Analytics",
        },
        {
          title: "Powerful Integration Options",
          description:
            "Our API is designed to make your data work for you, no matter your needs or technical expertise.",
          features: [
            "One-Click CSV Export: Download your poll data instantly for quick analysis",
            "RESTful API: Industry-standard architecture for easy integration",
            "Language Agnostic: Use with Python, R, Julia, or any other analytics tool",
            "Real-time Data Access: Get the latest results as they come in",
          ],
          image: "/download-csv.png",
          alt: "Realtime Analytics",
        },
      ]}
      threeColumnCTA={{
        title: "Why Choose Our Integration-Ready API?",
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
        title: "Start Integrating Now",
        description:
          "Ready to take your data analysis to the next level? Explore our Integration-Ready API now and see how easily you can transform your poll data into actionable insights.",
      }}
    />
  );
}
