"use client";

import { Dialog } from "@base-ui/react/dialog";
import type { ReactNode } from "react";

/* Neon-styled dialog over base-ui primitives: keeps focus trap / Esc / scroll
   lock / outside-click, but the visual is fully owned by the child card. */
export function FzDialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fz-fly-backdrop" />
        <Dialog.Popup className="fz-fly-popup">
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
