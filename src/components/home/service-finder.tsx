"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { serviceNeeds } from "@/content/home";

/** "What brings you here?" toggle group (aria-pressed buttons). */
export function ServiceFinder() {
  const [selected, setSelected] = useState(0);
  const need = serviceNeeds[selected];
  return (
    <section className="finder container" id="find-service">
      <div>
        <Eyebrow>A GOOD PLACE TO START</Eyebrow>
        <h2>What brings you here?</h2>
      </div>
      <div className="finder-body">
        <div
          className="need-tabs"
          role="group"
          aria-label="Choose your service need"
        >
          {serviceNeeds.map((option, index) => (
            <button
              type="button"
              key={option.label}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="need-result" aria-live="polite">
          <div>
            <h3>{need.title}</h3>
            <p>{need.text}</p>
          </div>
          <TextLink href={need.href}>{need.cta}</TextLink>
        </div>
      </div>
    </section>
  );
}
