import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

/**
 * Root-relative hrefs ("/about/") use next/link for client-side navigation.
 * Everything else (tel:, mailto:, #hash, external) stays a plain anchor and
 * keeps its target/rel exactly as given.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
