import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { FiHome, FiBookOpen, FiPlus, FiLogIn } from "react-icons/fi";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image src="/logo.png" alt="viewpoints.xyz" width={160} height={25} />
        </Link>
        <div className="flex items-center gap-4">
          <NavLink href="/" icon={FiHome}>
            Home
          </NavLink>
          <NavLink href="/how-it-works" icon={FiBookOpen}>
            How It Works
          </NavLink>
          <NavLink href="/create-poll" icon={FiPlus}>
            Create a Poll
          </NavLink>
          <AuthLink />
        </div>
      </div>
    </header>
  );
}

const linkStyles =
  "text-sm font-medium text-neutral-500 hover:text-neutral-700 flex items-center gap-2";
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
        <UserButton />
      </SignedIn>
    </>
  );
}
