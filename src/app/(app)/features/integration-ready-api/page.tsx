import { FiCheck } from "react-icons/fi";
import { Button } from "@/ui/button";

export default function IntegrationReadyAPI() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="grid gap-4 text-center mb-16">
        <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          Feature
        </span>
        <h1 className="text-4xl font-bold">Integration-Ready API</h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Unlock the full potential of your poll data with our powerful,
          easy-to-use API.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-24">
        {/* Seamless Data Access Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            <h2 className="text-3xl font-bold">Seamless Data Access</h2>
            <p className="text-neutral-600">
              Viewpoints.xyz doesn&apos;t just help you gather opinions - we
              ensure you can leverage your data to its fullest extent with our
              Integration-Ready API.
            </p>
            <ul className="grid gap-4">
              {[
                "Full Data Availability: Access all your poll results through our robust API",
                "Build Custom Applications: Easily create apps and visualizations based on your poll data",
                "Real-World Examples: See how others have used poll data to create public statistics websites",
                "Flexible Data Export: Download CSV files for in-depth analysis in your preferred tools",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-orange-500">
                    <FiCheck className="w-6 h-6" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-neutral-100 aspect-square rounded-2xl" />
        </section>

        {/* Powerful Integration Options Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-neutral-100 aspect-square rounded-2xl md:order-2" />
          <div className="grid gap-6 md:order-1">
            <h2 className="text-3xl font-bold">Powerful Integration Options</h2>
            <p className="text-neutral-600">
              Our API is designed to make your data work for you, no matter your
              needs or technical expertise.
            </p>
            <ul className="grid gap-4">
              {[
                "RESTful API: Industry-standard architecture for easy integration",
                "Comprehensive Documentation: Clear guidelines to get you started quickly",
                "Language Agnostic: Use with Python, R, Julia, or any other analytics tool",
                "Real-time Data Access: Get the latest results as they come in",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-orange-500">
                    <FiCheck className="w-6 h-6" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="grid gap-8 text-center">
          <h2 className="text-3xl font-bold">
            Why Choose Our Integration-Ready API?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Flexibility",
                desc: "Build custom solutions tailored to your specific needs",
              },
              {
                title: "Depth",
                desc: "Access rich, detailed data for thorough analysis",
              },
              {
                title: "Ease of Use",
                desc: "Well-documented API for developers of all skill levels",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="grid gap-4 p-6 bg-neutral-50 rounded-xl"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <blockquote className="text-center grid gap-6 max-w-3xl mx-auto">
          <p className="text-xl italic text-neutral-600">
            &quot;The Integration-Ready API from Viewpoints.xyz has been a
            game-changer for our research. We&apos;ve been able to create custom
            dashboards that give us real-time insights into public opinion
            trends.&quot;
          </p>
          <footer className="text-neutral-500">
            - Dr. Emily Chen, Data Scientist
          </footer>
        </blockquote>

        {/* CTA Section */}
        <section className="grid gap-6 text-center">
          <h2 className="text-3xl font-bold">Start Integrating Now</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Ready to take your data analysis to the next level? Explore our
            Integration-Ready API now and see how easily you can transform your
            poll data into actionable insights.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="default">
              Get Started
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
