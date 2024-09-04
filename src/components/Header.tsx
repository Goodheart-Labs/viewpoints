import Link, { LinkProps } from "next/link";
import Image from "next/image";
import {
  FiHome,
  FiBookOpen,
  FiPlus,
  FiLogIn,
  FiGrid,
  FiUser,
} from "react-icons/fi";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

export function Header() {
  return (
    <header>
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/">
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
          {/* <NavLink href="/how-it-works" icon={FiBookOpen}>
            How It Works
          </NavLink> */}
          <NavLink href="/new-poll" icon={FiPlus}>
            Create a Poll
          </NavLink>
          <AuthLink />
          <ModeToggle />
        </div>
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

function AuthLink() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <div className={linkStyles}>
            <FiLogIn size={16} />
            Sign In
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <>
          <NavLink href="/user/polls" icon={FiGrid}>
            Your Polls
          </NavLink>
          <NavLink href="/user/account" icon={FiUser}>
            Account
          </NavLink>
          <UserButton />
        </>
      </SignedIn>
    </>
  );
}
