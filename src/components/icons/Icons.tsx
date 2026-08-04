import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
};

function BaseIcon({ size = 20, title, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSearch(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="7" {...stroke} />
      <path d="M20 20l-3.5-3.5" {...stroke} />
    </BaseIcon>
  );
}

export function IconUser(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="8" r="3.25" {...stroke} />
      <path d="M5.5 19.5c1.8-3.2 4-4.75 6.5-4.75s4.7 1.55 6.5 4.75" {...stroke} />
    </BaseIcon>
  );
}

export function IconHeart(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M12 20s-7-4.35-7-9.25C5 8.01 6.9 6.25 9.1 6.25c1.25 0 2.35.6 2.9 1.5.55-.9 1.65-1.5 2.9-1.5 2.2 0 4.1 1.76 4.1 4.5C19 15.65 12 20 12 20z"
        {...stroke}
      />
    </BaseIcon>
  );
}

export function IconBag(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5.5 7h13l-1.2 11.2a1.5 1.5 0 01-1.5 1.3H8.2a1.5 1.5 0 01-1.5-1.3L5.5 7z" {...stroke} />
      <path d="M9 7V5.8A2.8 2.8 0 0111.8 3h.4A2.8 2.8 0 0115 5.8V7" {...stroke} />
    </BaseIcon>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />
    </BaseIcon>
  );
}

export function IconClose(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 6l12 12M18 6L6 18" {...stroke} />
    </BaseIcon>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 9l6 6 6-6" {...stroke} />
    </BaseIcon>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 6l6 6-6 6" {...stroke} />
    </BaseIcon>
  );
}
