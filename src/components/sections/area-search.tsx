"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { site } from "@/config/site";
import { cityInquiryPath, serviceAreas } from "@/content/service-areas";

/** Communities shown on the home page before the visitor types anything. */
const COMPACT_LIMIT = 8;

type AreaSearchProps = {
  /** Home page teaser: shorter list plus a link to the full directory. */
  compact?: boolean;
};

export function AreaSearch({ compact = false }: AreaSearchProps) {
  const [query, setQuery] = useState("");
  const inputId = compact ? "city-home" : "city-page";
  const needle = query.trim().toLowerCase();
  const matches = serviceAreas.filter((city) =>
    city.toLowerCase().includes(needle),
  );
  const visible = compact && !query ? matches.slice(0, COMPACT_LIMIT) : matches;

  return (
    <div className="area-search">
      <label htmlFor={inputId}>Find your community</label>
      <div className="search-input">
        <Search size={19} aria-hidden="true" />
        <input
          id={inputId}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search city, e.g. Antioch"
          type="search"
        />
      </div>
      <div className="city-list" aria-live="polite">
        {visible.map((city) => (
          <Link href={cityInquiryPath(city)} key={city}>
            <MapPin size={15} aria-hidden="true" />
            {city}
          </Link>
        ))}
        {matches.length === 0 && (
          <p>
            {"No match in this directory. "}
            <a href={site.phoneHref}>Call to check your address.</a>
          </p>
        )}
      </div>
      <p className="small-note">
        Service availability and scheduling are confirmed directly with Tyndall.
      </p>
      {compact && (
        <Link className="text-link" href="/service-areas/">
          See our service area
        </Link>
      )}
    </div>
  );
}
