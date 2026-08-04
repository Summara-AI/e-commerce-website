import { Search } from "lucide-react";
import { HeaderIconButton } from "@/components/header/HeaderIconButton";

type SearchButtonProps = {
  className?: string;
  onClick?: () => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export function SearchButton({
  className,
  onClick,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: SearchButtonProps) {
  return (
    <HeaderIconButton
      label="Search"
      className={className}
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      <Search className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
    </HeaderIconButton>
  );
}
