"use client";

import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { Check, Copy, Download, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/config/site";
import { services } from "@/content/services";
import {
  INQUIRY_FILE_NAME,
  PROPERTY_TYPES,
  buildInquiryMailto,
  buildInquirySummary,
  createInquiry,
  type Inquiry,
} from "@/lib/inquiry";

const STEPS = [
  {
    label: "Your space",
    heading: "What can we help with?",
    intro: "A few details help start a better conversation.",
  },
  {
    label: "Your details",
    heading: "A few details about you.",
    intro: "Let the team know how to reach you and what’s happening.",
  },
  {
    label: "Review & contact",
    heading: "Your inquiry is ready.",
    intro:
      "Review your details, then open your email app to send them to Tyndall.",
  },
] as const;

type Step = 1 | 2 | 3;

type InquiryPlannerProps = {
  /** Service name preselected from the URL (?service=<slug>). */
  initialService?: string;
  /** City pre-filled from the URL (?city=<name>). */
  initialCity?: string;
};

/**
 * Three-step inquiry planner. Nothing is submitted anywhere: the last step
 * opens a pre-filled email draft, or lets the visitor copy/download the text.
 * Field values live in state, so they survive Back and Edit.
 */
export function InquiryPlanner({
  initialService = "",
  initialCity = "",
}: InquiryPlannerProps) {
  const [step, setStep] = useState<Step>(1);
  const [inquiry, setInquiry] = useState<Inquiry>(() =>
    createInquiry({ service: initialService, city: initialCity }),
  );
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const summary = buildInquirySummary(inquiry);
  const current = STEPS[step - 1];

  function update(field: keyof Inquiry, value: string) {
    setInquiry((previous) => ({ ...previous, [field]: value }));
    setCopied(false);
  }

  /** Move to a step and put focus on its heading for screen-reader users. */
  function goTo(next: Step) {
    flushSync(() => setStep(next));
    headingRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Native constraint validation (required, type=email) runs before submit.
    event.preventDefault();
    goTo(step === 1 ? 2 : 3);
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setCopyError("");
    } catch {
      setCopyError(
        "Copy is unavailable here. Please download your inquiry instead.",
      );
    }
  }

  function downloadSummary() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = INQUIRY_FILE_NAME;
    link.click();
    // Give the browser a moment to start the download before releasing it.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="inquiry">
      <div className="planner-steps" role="group" aria-label="Inquiry progress">
        {STEPS.map(({ label }, index) => {
          const number = index + 1;
          const state =
            step === number ? "active" : step > number ? "complete" : "";
          return (
            <span
              key={label}
              className={state}
              aria-current={step === number ? "step" : undefined}
            >
              <b>{step > number ? <Check size={14} /> : number}</b>
              {label}
            </span>
          );
        })}
      </div>
      <h2 ref={headingRef} tabIndex={-1}>
        {current.heading}
      </h2>
      <p className="planner-intro">{current.intro}</p>

      {step < 3 ? (
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <SpaceFields inquiry={inquiry} update={update} />
          ) : (
            <ContactFields inquiry={inquiry} update={update} />
          )}
          <div className="planner-buttons">
            {step > 1 && (
              <button
                type="button"
                className="button outline"
                onClick={() => goTo(1)}
              >
                Back
              </button>
            )}
            <button type="submit" className="button">
              {step === 1 ? "Continue" : "Review inquiry"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <dl className="inquiry-summary">
            <div>
              <dt>Service</dt>
              <dd>{inquiry.service}</dd>
            </div>
            <div>
              <dt>Property</dt>
              <dd>
                {inquiry.property} in {inquiry.city}
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                {inquiry.name}
                <br />
                {inquiry.email}
                {inquiry.phone && (
                  <>
                    <br />
                    {inquiry.phone}
                  </>
                )}
              </dd>
            </div>
            {inquiry.message && (
              <div>
                <dt>Details</dt>
                <dd>{inquiry.message}</dd>
              </div>
            )}
          </dl>
          <ButtonLink
            href={buildInquiryMailto(site.email, inquiry)}
            variant="full"
          >
            Open email to send inquiry
          </ButtonLink>
          <div className="review-tools">
            <button type="button" onClick={copySummary}>
              <Copy size={16} />
              {copied ? "Copied" : "Copy inquiry"}
            </button>
            <button type="button" onClick={downloadSummary}>
              <Download size={16} />
              Download
            </button>
            <button type="button" onClick={() => goTo(2)}>
              Edit details
            </button>
          </div>
          <p role="status" className="small-note">
            {copyError ||
              (copied
                ? "Inquiry copied. You can paste it into your email app."
                : "No email app? Copy or download your inquiry, or call the team.")}
          </p>
        </>
      )}

      <div className="form-disclosure">
        Your details stay in this page until you choose to send them through
        your email app.
      </div>
      <a className="planner-call" href={site.phoneHref}>
        <Phone size={16} />
        Prefer a conversation? {site.phone}
      </a>
    </div>
  );
}

type FieldsProps = {
  inquiry: Inquiry;
  update: (field: keyof Inquiry, value: string) => void;
};

function SpaceFields({ inquiry, update }: FieldsProps) {
  return (
    <>
      <label>
        Service
        <select
          value={inquiry.service}
          required
          onChange={(event) => update("service", event.target.value)}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug}>{service.name}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </label>
      <fieldset>
        <legend>Your property</legend>
        <div className="radio-options">
          {PROPERTY_TYPES.map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="property"
                value={type}
                checked={inquiry.property === type}
                onChange={() => update("property", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        City
        <input
          required
          autoComplete="address-level2"
          maxLength={80}
          value={inquiry.city}
          onChange={(event) => update("city", event.target.value)}
          placeholder="e.g. Antioch"
        />
      </label>
    </>
  );
}

function ContactFields({ inquiry, update }: FieldsProps) {
  return (
    <>
      <label>
        Your name
        <input
          required
          autoComplete="name"
          maxLength={100}
          value={inquiry.name}
          onChange={(event) => update("name", event.target.value)}
        />
      </label>
      <label>
        Email address
        <input
          required
          type="email"
          autoComplete="email"
          maxLength={160}
          value={inquiry.email}
          onChange={(event) => update("email", event.target.value)}
        />
      </label>
      <label>
        Phone number <span>(optional)</span>
        <input
          type="tel"
          autoComplete="tel"
          maxLength={40}
          value={inquiry.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
      </label>
      <label>
        What’s happening? <span>(optional)</span>
        <textarea
          rows={4}
          maxLength={800}
          value={inquiry.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Tell us about your system, your space, or what you’d like to improve."
        />
      </label>
    </>
  );
}
