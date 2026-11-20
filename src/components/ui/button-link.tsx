import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/smart-link";

type ButtonLinkProps = {
  href: string;
  variant?: "white" | "glass" | "small" | "full";
  children: ReactNode;
};

/** A link styled as a button (`.button` plus an optional variant class). */
export function ButtonLink({ href, variant, children }: ButtonLinkProps) {
  return (
    <SmartLink className={variant ? `button ${variant}` : "button"} href={href}>
      {children}
    </SmartLink>
  );
}
