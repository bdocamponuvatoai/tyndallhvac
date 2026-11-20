"use client";

import { useState } from "react";
import { Snowflake, Sun } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageNote, Photo } from "@/components/ui/photo";
import { TextLink } from "@/components/ui/text-link";
import { seasons, type Season } from "@/content/home";

const SEASON_ICONS = { cool: Snowflake, warm: Sun } as const;
const SEASON_ORDER: readonly Season[] = ["cool", "warm"];

export function SeasonFeature() {
  const [season, setSeason] = useState<Season>("cool");
  const copy = seasons[season];
  const TagIcon = SEASON_ICONS[season];

  return (
    <section className={`season-section ${season}`}>
      <div className="container season-grid">
        <div className="season-copy">
          <Eyebrow>ONE HOME. EVERY SEASON.</Eyebrow>
          <h2>
            {copy.heading}
            <br />
            <span>{copy.subheading}</span>
          </h2>
          <p>{copy.text}</p>
          <div
            className="season-controls"
            role="group"
            aria-label="Explore seasonal services"
          >
            {SEASON_ORDER.map((option) => {
              const Icon = SEASON_ICONS[option];
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={season === option}
                  onClick={() => setSeason(option)}
                >
                  <Icon size={18} />
                  {` ${seasons[option].buttonLabel}`}
                </button>
              );
            })}
          </div>
          <TextLink href={copy.href} light>
            {copy.linkLabel}
          </TextLink>
        </div>
        <div className="season-image">
          <Photo
            name="home"
            alt="An inviting California home at dusk, AI-generated"
          />
          <div className="comfort-tag">
            <span>
              <TagIcon />
            </span>
            <div>
              Home feels good.<small>{copy.tag}</small>
            </div>
          </div>
          <ImageNote />
        </div>
      </div>
    </section>
  );
}
