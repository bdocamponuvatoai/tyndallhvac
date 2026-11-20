/**
 * Tyndall symbol and wordmark. This is a proposed design treatment, not the
 * company's existing official logo.
 */
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={light ? "brand brand-light" : "brand"}>
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M4 5h32v8H24v22h-8V13H4z" fill="currentColor" />
        <path d="M29 19l7 4-7 4z" fill="#53b7f5" />
        <path d="M11 19l-7 4 7 4z" fill="#53b7f5" />
      </svg>
      <span>
        TYNDALL<small>HEATING &amp; AIR</small>
      </span>
    </span>
  );
}
