"use client";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { useState } from "react";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { FiZap } from "react-icons/fi";

export function GeneratePollDialog({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (props: { description: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({ description });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2"
            data-testid="create-with-ai-title"
          >
            <FiZap className="h-5 w-5" fill="currentColor" />
            Create with AI
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="description">
              Describe the poll you&apos;d like to create. For best results:
            </Label>
            <ul className="text-sm text-neutral-700 dark:text-neutral-300 list-disc pl-4 leading-relaxed mb-2">
              <li className="py-0.5">Describe your target audience</li>
              <li className="py-0.5">Explain the insights you hope to gain</li>
            </ul>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              required
              autoFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSubmit}>
              Generate Poll
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
