import { FiGithub, FiTwitter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 bg-gradient-to-b from-neutral-50 to-neutral-200 dark:from-foreground dark:to-neutral-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 items-center justify-items-center">
          <Image
            src="/logo.png"
            alt="Viewpoints Logo"
            width={200}
            height={50}
            className="dark:hidden"
          />
          <Image
            src="/logo-dark.png"
            alt="Viewpoints Logo"
            width={200}
            height={50}
            className="hidden dark:block"
          />

          <div className="flex space-x-6">
            <FooterLink
              href="https://chat.whatsapp.com/CTbNWGEebFEJoheWjCXm5G"
              icon={FaWhatsapp}
            >
              WhatsApp
            </FooterLink>
            <FooterLink
              href="https://github.com/Goodheart-Labs/viewpoints.xyz"
              icon={FiGithub}
            >
              GitHub
            </FooterLink>
            <FooterLink
              href="https://twitter.com/nathanpmyoung"
              icon={FiTwitter}
            >
              Twitter
            </FooterLink>
          </div>

          <Link href="/privacy-policy" className="text-sm hover:opacity-50">
            Privacy Policy
          </Link>

          <p className="text-sm">
            ©{new Date().getFullYear()}&nbsp;
            <Link
              href="https://goodheartlabs.com/"
              className="hover:opacity-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Goodheart Labs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  children: React.ReactNode;
  icon: typeof FiGithub;
}) {
  return (
    <Link
      href={href}
      className="text-sm flex items-center gap-1 hover:opacity-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
      {children}
    </Link>
  );
}
