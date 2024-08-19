import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-neutral-100">
      <div className="container flex items-center justify-between px-4 py-2">
        <Link href="/">
          <Image src="/logo.png" alt="viewpoints.xyz" width={160} height={25} />
        </Link>
      </div>
    </header>
  );
}
