"use client";

import { useRef, type ReactNode } from "react";

/** Distance each Previous/Next click scrolls the rail. */
const SCROLL_STEP = 410;

/**
 * Horizontally scrolling rail with Previous/Next buttons. The cards are
 * rendered on the server and passed in as children.
 */
export function ServiceRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 1 | -1) =>
    railRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });

  return (
    <>
      <div
        className="service-rail"
        ref={railRef}
        role="region"
        aria-label="Explore HVAC services"
        tabIndex={0}
      >
        {children}
      </div>
      <div className="container rail-foot">
        <span>AI-generated illustrative photography</span>
        <div>
          <button type="button" onClick={() => scroll(-1)}>
            Previous
          </button>
          <button type="button" onClick={() => scroll(1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
