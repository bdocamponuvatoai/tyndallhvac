import type { ReactNode } from "react";

/** Small uppercase label above a heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
