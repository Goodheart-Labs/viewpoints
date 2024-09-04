"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="grid place-items-center p-4">
      <SignIn appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />
    </div>
  );
}
