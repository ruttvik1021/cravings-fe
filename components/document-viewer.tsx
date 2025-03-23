"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DocumentViewerModalProps {
  documentUrl: string;
  open: boolean;
  onClose: () => void;
}

export function DocumentViewerModal({
  documentUrl,
  open,
  onClose,
}: DocumentViewerModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-3xl" onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Document Viewer</DialogTitle>
        </DialogHeader>
        <div className="relative h-[60vh] w-full">
          <Image
            src={documentUrl || "/placeholder.svg"}
            alt="Document"
            fill
            className="object-contain"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
