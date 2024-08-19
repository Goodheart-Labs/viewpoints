import { FiGithub, FiTwitter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 items-center justify-items-center">
          <Image
            src="/logo.png"
            alt="Viewpoints Logo"
            width={200}
            height={50}
          />

          <div className="flex space-x-6">
            <Link
              href="https://chat.whatsapp.com/CTbNWGEebFEJoheWjCXm5G"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-2xl" />
            </Link>
            <Link
              href="https://github.com/Goodheart-Labs/viewpoints.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub className="text-2xl" />
            </Link>
            <Link
              href="https://twitter.com/nathanpmyoung"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter className="text-2xl" />
            </Link>
          </div>

          <Link href="/privacy-policy" className="text-sm">
            Privacy Policy
          </Link>

          <p className="text-sm">© {new Date().getFullYear()} Goodheart Labs</p>
        </div>
      </div>
    </footer>
  );
}
