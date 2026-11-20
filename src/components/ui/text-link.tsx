import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/smart-link";

type TextLinkProps = {
  href: string;
  /** Light variant for dark backgrounds. */
  light?: boolean;
  children: ReactNode;
};

/** Underlined call-to-action link (`.text-link`). */
export function TextLink({ href, light = false, children }: TextLinkProps) {
  return (
    <SmartLink
      className={light ? "text-link light-link" : "text-link"}
      href={href}
    >
      {children}
    </SmartLink>
  );
}
