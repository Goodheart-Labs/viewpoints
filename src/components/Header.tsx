"use client";

import Link, { LinkProps } from "next/link";
import Image from "next/image";
import {
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiLogIn,
  FiMenu,
  FiPlus,
  FiUser,
  FiX,
} from "react-icons/fi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { cn } from "@/ui/cn";
import { SEO } from "@/lib/copy";

function MobileNavLinks({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid gap-4 mt-4">
      <NavLink href="/new-poll" icon={FiPlus} onClick={onClose}>
        Create a Poll
      </NavLink>
      <NavLink href="/how-it-works" icon={FiHelpCircle} onClick={onClose}>
        How it Works
      </NavLink>
      <AuthLink isMobile onClose={onClose} />
      <UserButton userProfileMode="modal" />
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <h1 className="sr-only" data-testid="site-title">
            {SEO.title}
          </h1>
          <Image
            src="/logo.png"
            className="dark:hidden"
            alt="viewpoints.xyz"
            width={160}
            height={25}
          />
          <Image
            src="/logo-dark.png"
            className="hidden dark:block"
            alt="viewpoints.xyz"
            width={160}
            height={25}
          />
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              href="/new-poll"
              icon={FiPlus}
              data-testid="create-poll-button"
            >
              Create a Poll
            </NavLink>
            <NavLink
              href="/how-it-works"
              icon={FiHelpCircle}
              data-testid="how-it-works"
            >
              How it Works
            </NavLink>
            <AuthLink />
          </div>
          <ModeToggle />
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden px-4 py-1 h-0 overflow-hidden transition-all duration-300 h-auto",
          {
            "max-h-0 opacity-0": !isMenuOpen,
            "max-h-[300px] opacity-100": isMenuOpen,
          },
        )}
      >
        <MobileNavLinks onClose={closeMenu} />
      </div>
    </header>
  );
}

const linkStyles =
  "text-sm font-medium flex items-center gap-2 cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200";

function NavLink({
  children,
  icon: Icon,
  ...props
}: LinkProps & { children: React.ReactNode; icon: typeof FiHome }) {
  return (
    <Link className={linkStyles} {...props}>
      <Icon size={16} />
      {children}
    </Link>
  );
}

function AuthLink({
  isMobile,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <div className={linkStyles} onClick={isMobile ? onClose : undefined}>
            <FiLogIn size={16} />
            Sign In
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <>
          <NavLink
            href="/user/polls"
            icon={FiGrid}
            onClick={isMobile ? onClose : undefined}
          >
            Your Polls
          </NavLink>
          <NavLink
            href="/user/account"
            icon={FiUser}
            onClick={isMobile ? onClose : undefined}
          >
            Account
          </NavLink>
          {!isMobile && <UserButton />}
        </>
      </SignedIn>
    </>
  );
}
