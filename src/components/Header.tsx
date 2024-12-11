"use client";

import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { FiChevronDown, FiHome, FiMenu, FiPlus, FiX } from "react-icons/fi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { cn } from "@/ui/cn";
import * as HoverCard from "@radix-ui/react-hover-card";

const calloutLinkStyles =
  "text-sm font-medium flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors";

function MobileNavLinks({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid gap-4 mt-4">
      <NavLink href="/new-poll" variant="callout" onClick={onClose}>
        <FiPlus size={16} />
        Create a Poll
      </NavLink>
      <NavLink href="/how-it-works" onClick={onClose}>
        How it Works
      </NavLink>
      <NavLink href="/features/rapid-ai-poll-creation" onClick={onClose}>
        Rapid AI Poll Creation
      </NavLink>
      <NavLink href="/features/realtime-consensus-analytics" onClick={onClose}>
        Realtime Consensus Analytics
      </NavLink>
      <NavLink href="/features/integration-ready-api" onClick={onClose}>
        Integration-Ready API
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
              variant="callout"
              data-testid="create-poll-button"
            >
              <FiPlus size={16} />
              Create a Poll
            </NavLink>
            <HoverCard.Root openDelay={100} closeDelay={200}>
              <HoverCard.Trigger asChild>
                <div className={linkStyles}>
                  <FiChevronDown size={16} />
                  Features
                </div>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className="z-50 bg-white dark:bg-neutral-900 rounded-md shadow-lg p-4 w-64"
                  sideOffset={5}
                >
                  <div className="grid gap-3">
                    <Link
                      href="/features/rapid-ai-poll-creation"
                      className={linkStyles}
                    >
                      Rapid AI Poll Creation
                    </Link>
                    <Link
                      href="/features/realtime-consensus-analytics"
                      className={linkStyles}
                    >
                      Realtime Consensus Analytics
                    </Link>
                    <Link
                      href="/features/integration-ready-api"
                      className={linkStyles}
                    >
                      Integration-Ready API
                    </Link>
                  </div>
                  <HoverCard.Arrow className="fill-white dark:fill-neutral-900" />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <NavLink href="/how-it-works" data-testid="how-it-works">
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
  variant = "default",
  ...props
}: LinkProps & {
  children: React.ReactNode;
  icon?: typeof FiHome;
  variant?: "default" | "callout";
}) {
  return (
    <Link
      className={variant === "callout" ? calloutLinkStyles : linkStyles}
      {...props}
    >
      {Icon && <Icon size={16} />}
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
            Sign In
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <>
          <NavLink href="/user/polls" onClick={isMobile ? onClose : undefined}>
            Your Polls
          </NavLink>
          <NavLink
            href="/user/account"
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
