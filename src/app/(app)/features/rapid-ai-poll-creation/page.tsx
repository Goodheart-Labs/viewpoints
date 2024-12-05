import { Button } from "@/ui/button";
import { FiCheck } from "react-icons/fi";

export default function RapidAIPollCreation() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="grid gap-4 text-center mb-16">
        <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          Feature
        </span>
        <h1 className="text-4xl font-bold">Rapid AI Poll Creation</h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Create consensus-building polls in minutes with our intuitive,
          AI-powered tool.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-24">
        {/* Instant Poll Creation Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            <h2 className="text-3xl font-bold">Instant Poll Creation</h2>
            <p className="text-neutral-600">
              Viewpoints.xyz revolutionizes the way you gather opinions and
              build consensus. With our rapid poll creation feature, you can go
              from idea to insights in just a few clicks.
            </p>
            <ul className="grid gap-4">
              {[
                "One-Click Start: Jump straight into poll creation with a single click",
                "AI-Assisted Generation: Describe your audience and goals, and let our AI craft tailored statements",
                "Custom-Tailored Insights: Our AI ensures you get exactly the information you need",
                "Flexible Growth: Allow poll takers to add statements, letting your polls evolve naturally",
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
          <div className="bg-neutral-100 aspect-square rounded-2xl" />{" "}
          {/* Placeholder for illustration */}
        </section>

        {/* Distribution Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-neutral-100 aspect-square rounded-2xl md:order-2" />{" "}
          {/* Placeholder for illustration */}
          <div className="grid gap-6 md:order-1">
            <h2 className="text-3xl font-bold">Swift Distribution</h2>
            <p className="text-neutral-600">
              Once your poll is ready, sharing it with your audience is
              effortless and instantaneous.
            </p>
            <ul className="grid gap-4">
              {[
                "Instant Publishing: One click to save and publish your poll",
                "Public link for wide distribution",
                "Private link for controlled access",
                "QR code for easy mobile access",
                "Embed option for seamless website integration",
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
          <h2 className="text-3xl font-bold">Why Choose Our Poll Maker?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Speed",
                desc: "Create and distribute polls in minutes",
              },
              {
                title: "Precision",
                desc: "AI-generated statements tailored to your specific needs",
              },
              {
                title: "Flexibility",
                desc: "Multiple sharing options to suit any scenario",
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
            &quot;Viewpoints.xyz has transformed how we gauge opinions in our
            organization. The speed of poll creation and the insights from the
            AI-generated statements are game-changers.&quot;
          </p>
          <footer className="text-neutral-500">- Sarah K., HR Director</footer>
        </blockquote>

        {/* CTA Section */}
        <section className="grid gap-6 text-center">
          <h2 className="text-3xl font-bold">
            Create Your Free Online Poll Now
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Ready to revolutionize your decision-making process? Try our free
            online poll maker now and see the difference rapid, intelligent
            polling can make.
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
