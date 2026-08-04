import { Menu, X } from "lucide-react";
import { HeaderIconButton } from "@/components/header/HeaderIconButton";

type MenuToggleProps = {
  open: boolean;
  onToggle: () => void;
  controlsId: string;
  className?: string;
};

export function MenuToggle({ open, onToggle, controlsId, className }: MenuToggleProps) {
  return (
    <HeaderIconButton
      label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controlsId}
      className={className}
    >
      {open ? (
        <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      )}
    </HeaderIconButton>
  );
}
