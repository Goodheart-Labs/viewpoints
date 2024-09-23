"use client";

import * as React from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background dark:group-[.toaster]:bg-foreground group-[.toaster]:text-foreground dark:group-[.toaster]:text-background group-[.toaster]:border group-[.toaster]:shadow-md",
          title: "",
          description: "group-[.toast]:text-neutral-500",
          actionButton:
            "group-[.toast]:bg-foreground group-[.toast]:text-neutral-100 group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 group-[.toast]:rounded-md",
        },
      }}
      {...props}
    />
  );
};
Toaster.displayName = "Toaster";

export { Toaster };
