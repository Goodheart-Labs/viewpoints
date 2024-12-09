import Image from "next/image";
import { FiCheck } from "react-icons/fi";

export type FeatureBlockProps = {
  title: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

export function FeatureBlock({
  title,
  description,
  features,
  image,
  alt,
}: FeatureBlockProps) {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">
      <div className="grid gap-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-neutral-600">{description}</p>
        <ul className="grid gap-4">
          {features.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-orange-500">
                <FiCheck className="w-6 h-6" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gradient-to-br from-neutral-300/10 to-neutral-300/30 aspect-square rounded-2xl md:order-2 relative overflow-hidden p-2">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
