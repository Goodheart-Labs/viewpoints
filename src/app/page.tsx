import { Button } from "@/ui/button";
import { Switch } from "@/ui/switch";

export default function Home() {
  return (
    <main className="mx-auto grid gap-2 w-max p-10">
      <Button variant="brand">Click Me</Button>
      <Switch />
    </main>
  );
}
