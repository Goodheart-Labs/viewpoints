import { FiCheck } from "react-icons/fi";
import { Button } from "@/ui/button";

export default function RealtimeConsensusAnalytics() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="grid gap-4 text-center mb-16">
        <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          Feature
        </span>
        <h1 className="text-4xl font-bold">Realtime Consensus Analytics</h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Watch opinions unfold and consensus form in real-time with our
          powerful analytics tool.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-24">
        {/* Instant Insight Generation Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            <h2 className="text-3xl font-bold">Instant Insight Generation</h2>
            <p className="text-neutral-600">
              Viewpoints.xyz transforms how you gather and analyze opinions. Our
              realtime consensus analytics provide immediate, actionable
              insights as your poll responses stream in.
            </p>
            <ul className="grid gap-4">
              {[
                "Immediate Availability: Share your poll and start gathering responses instantly",
                "Unbiased Results: Randomized statement order to ensure natural, uninfluenced responses",
                "Live Updates: Watch consensus form and conflicts emerge in real-time",
                "Privacy Protected: Anonymous responses to encourage honest feedback",
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

        {/* Powerful Consensus Building Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-neutral-100 aspect-square rounded-2xl md:order-2" />
          <div className="grid gap-6 md:order-1">
            <h2 className="text-3xl font-bold">Powerful Consensus Building</h2>
            <p className="text-neutral-600">
              As responses flow in, our analytics tool helps you identify areas
              of agreement and disagreement, facilitating informed
              decision-making.
            </p>
            <ul className="grid gap-4">
              {[
                "Agreement Visualization: Instantly see which statements garner consensus",
                "Conflict Identification: Quickly spot areas of disagreement for further discussion",
                "Trend Tracking: Observe how opinions evolve over time",
                "Data Exportability: Download results in CSV format for deeper analysis",
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
            Why Choose Our Consensus Builder?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Speed",
                desc: "Get insights the moment responses start coming in",
              },
              {
                title: "Clarity",
                desc: "Clear visualizations of consensus and conflict",
              },
              {
                title: "Privacy",
                desc: "Built-in protections for respondent anonymity",
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
            &quot;The realtime analytics from Viewpoints.xyz have revolutionized
            our decision-making process. We can now gauge consensus during
            meetings and adjust our approach on the fly.&quot;
          </p>
          <footer className="text-neutral-500">
            - Mark T., Project Manager
          </footer>
        </blockquote>

        {/* CTA Section */}
        <section className="grid gap-6 text-center">
          <h2 className="text-3xl font-bold">Start Building Consensus Now</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Ready to transform your opinion gathering and consensus building?
            Try our realtime consensus analytics now and see how quickly you can
            align your team or community.
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
