import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmDialog({
  icon: Icon = FiAlertTriangle,
  title,
  description,
  children,
  action,
}: {
  icon?: typeof FiAlertTriangle;
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  action: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          {action}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
