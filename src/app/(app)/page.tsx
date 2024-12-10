import { HomePage } from "@/components/HomePage";
import { getBaseUrl } from "@/lib/getBaseUrl";

export default async function Home() {
  return (
    <>
      <link rel="canonical" href={getBaseUrl()} />
      <HomePage />
    </>
  );
}
