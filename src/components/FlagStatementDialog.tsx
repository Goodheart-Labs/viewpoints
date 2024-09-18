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
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { usePendingAction } from "@/lib/usePendingAction";
import { flagStatement } from "@/lib/actions";
import { toast } from "sonner";

const flagOptions = [
  { value: "off-topic", label: "Off topic" },
  { value: "rude-offensive", label: "Rude/offensive" },
  { value: "duplicated", label: "Duplicated" },
  { value: "other", label: "Other" },
];

export default function FlagStatementDialog({
  children,
  statementId,
  next,
}: {
  statementId: number;
  children: React.ReactNode;
  next: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");

  const [loading, handler] = usePendingAction(flagStatement, {
    after: () => {
      toast.success("Statement flagged");
    },
    before: () => {
      setOpen(false);
      next();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handler({
      statementId,
      reason: selectedOption || otherReason,
      description: selectedOption === "other" ? otherReason : null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report statement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <p className="text-sm">Please choose from the following options</p>
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
            className="grid gap-2"
          >
            {flagOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {selectedOption === "other" && (
            <div className="grid gap-2">
              <Label htmlFor="other-reason">Please specify:</Label>
              <Textarea
                id="other-reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                required
                autoFocus
              />
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
