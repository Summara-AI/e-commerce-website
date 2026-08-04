"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Reusable Drawer (Sheet) — Cart, Filters, Wishlist, Nav-adjacent panels.
 * Built on Dialog primitives for a11y + focus trap.
 */

const sheetVariants = cva(
  "fixed z-drawer flex flex-col bg-surface shadow-elev3 transition ease-out data-[state=open]:animate-in data-[state=closed]:animate-out motion-reduce:transition-none motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-[100dvh] w-full max-w-full border-l border-border-subtle data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right tablet:w-[min(100%,28rem)]",
        left:
          "inset-y-0 left-0 h-[100dvh] w-full max-w-full border-r border-border-subtle data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left tablet:w-[min(100%,28rem)]",
        bottom:
          "inset-x-0 bottom-0 flex max-h-[min(85dvh,100%)] flex-col rounded-t-lg border-t border-border-subtle data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;
export const DrawerPortal = DialogPrimitive.Portal;

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-drawer bg-ink/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-320 motion-reduce:animate-none motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetVariants>;

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), "duration-280 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]", className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-badge text-foreground-muted transition-[color,transform,background-color] duration-280 ease-out hover:bg-blush hover:text-foreground hover:scale-105 active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus motion-reduce:hover:scale-100"
        aria-label="Close"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-border-subtle px-5 py-5 pr-14", className)} {...props} />;
}

export function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto border-t border-border-subtle bg-surface-soft px-5 py-4", className)}
      {...props}
    />
  );
}

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-xl font-light text-foreground", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-foreground-secondary", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";
