"use client";
import { cn } from "@/ui/cn";
import { FieldError } from "react-hook-form";
import { FiLoader } from "react-icons/fi";

export function FormField({
  title,
  description,
  errors,
  children,
  loading = false,
}: {
  title: string;
  description?: string;
  errors?: FieldError | undefined;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className={cn("grid gap-3", { "animate-pulse": loading })}>
      <div className="grid gap-0.5">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold leading-6 text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          {loading ? (
            <FiLoader className="w-4 h-4 animate-spin text-purple-400 dark:text-purple-600" />
          ) : null}
        </div>
        {description ? (
          <p className="text-base text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        ) : null}
      </div>
      {children}
      {errors && (
        <p className="text-sm text-red-500 dark:text-red-400">
          {errors.message}
        </p>
      )}
    </div>
  );
}
