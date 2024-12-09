import { cn } from "@/ui/cn";
import { FiCheck } from "react-icons/fi";

export type ThreeColumnCTAProps = {
  title: string;
  items: { title: string; desc: string; icon?: typeof FiCheck }[];
};

export function ThreeColumnCTA({ title, items }: ThreeColumnCTAProps) {
  return (
    <section className="text-center bg-white py-12 border-y border-neutral-200 my-12 shadow-lg shadow-neutral-100">
      <div className="max-w-6xl mx-auto px-4 grid gap-10">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map(({ icon: Icon = FiCheck, ...item }, index) => {
            const colors: [string, string][] = [
              ["bg-green-500/10", "text-green-600"],
              ["bg-orange-500/10", "text-orange-600"],
              ["bg-blue-500/10", "text-blue-600"],
              ["bg-purple-500/10", "text-purple-600"],
              ["bg-red-500/10", "text-red-600"],
            ];

            const [bgColor, textColor] = colors[index % colors.length];
            return (
              <div
                key={item.title}
                className="grid gap-2 p-4 rounded-xl content-start"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-1",
                    bgColor,
                  )}
                >
                  <Icon className={cn("text-xl", textColor)} />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-neutral-600 text-balance">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
