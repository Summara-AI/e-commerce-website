import { User } from "lucide-react";
import { HeaderIconButton } from "@/components/header/HeaderIconButton";

type AccountButtonProps = {
  className?: string;
};

export function AccountButton({ className }: AccountButtonProps) {
  return (
    <HeaderIconButton href="/account/login" label="Account" className={className}>
      <User className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
    </HeaderIconButton>
  );
}
