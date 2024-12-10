import { FeatureBlock, FeatureBlockProps } from "@/components/FeatureBlock";
import {
  ThreeColumnCTA,
  ThreeColumnCTAProps,
} from "@/components/ThreeColumnCTA";
import { Button } from "@/ui/button";
import Link from "next/link";

export function FeaturePage({
  title,
  description,
  features,
  threeColumnCTA,
  cta,
}: {
  title: string;
  description: string;
  features: FeatureBlockProps[];
  threeColumnCTA: ThreeColumnCTAProps;
  cta: {
    title: string;
    description: string;
  };
}) {
  return (
    <div className="py-12">
      {/* Header Section */}
      <div className="grid gap-4 text-center mb-16 max-w-6xl mx-auto px-4">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Feature
        </span>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-balance">
          {description}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-24 max-w-6xl mx-auto px-4">
        {features.map((feature) => (
          <FeatureBlock key={feature.title} {...feature} />
        ))}
      </div>

      <div className="grid gap-4">
        <ThreeColumnCTA {...threeColumnCTA} />

        {/* Testimonial Section */}
        {/* <blockquote className="text-center grid gap-6 max-w-3xl mx-auto">
          <p className="text-xl italic text-neutral-600">
            &quot;The Integration-Ready API from Viewpoints.xyz has been a
            game-changer for our research. We&apos;ve been able to create custom
            dashboards that give us real-time insights into public opinion
            trends.&quot;
          </p>
          <footer className="text-neutral-500">
            - Dr. Emily Chen, Data Scientist
          </footer>
        </blockquote> */}

        {/* CTA Section */}
        <section className="grid gap-4 text-center my-8">
          <h2 className="text-3xl font-bold">{cta.title}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto mb-4">
            {cta.description}
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="default" asChild>
              <Link href="/new-poll">Get Started</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
