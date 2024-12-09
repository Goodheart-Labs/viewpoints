import { useState } from "react";
import QRCode from "react-qr-code";
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

export default function QRCodeDialog({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle data-testid="qr-code-dialog-title">QR Code</DialogTitle>
        </DialogHeader>
        <div className="grid place-items-center py-4">
          <QRCode value={link} size={256} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
