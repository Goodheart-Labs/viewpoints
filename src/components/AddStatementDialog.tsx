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
import { useParams } from "next/navigation";
import { usePendingAction } from "@/lib/usePendingAction";
import { addStatement } from "@/lib/actions";

export default function AddStatementDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [statement, setStatement] = useState("");
  const [isPending, handler] = usePendingAction(addStatement, {
    after: () => {
      setOpen(false);
      window.location.reload();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof slug !== "string") {
      throw new Error("Invalid slug");
    }
    handler({ slug, statement });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Statement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="statement">
              Type the statement you want to add:
            </Label>
            <Textarea
              id="statement"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              required
              autoFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
