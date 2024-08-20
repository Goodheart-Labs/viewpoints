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
          <h3 className="text-xl font-semibold leading-6 text-neutral-900">
            {title}
          </h3>
          {loading ? (
            <FiLoader className="w-4 h-4 text-purple-400 animate-spin" />
          ) : null}
        </div>
        {description ? (
          <p className="text-neutral-500 text-base">{description}</p>
        ) : null}
      </div>
      {children}
      {errors && <p className="text-sm text-red-500">{errors.message}</p>}
    </div>
  );
}
