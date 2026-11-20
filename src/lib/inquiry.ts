/** Framework-free helpers for the service inquiry planner. */

export type Inquiry = {
  service: string;
  property: string;
  city: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const PROPERTY_TYPES = ["Home", "Business"] as const;

export const INQUIRY_FILE_NAME = "tyndall-service-inquiry.txt";

export function createInquiry(preset: Partial<Inquiry> = {}): Inquiry {
  return {
    service: "",
    property: PROPERTY_TYPES[0],
    city: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    ...preset,
  };
}

/** Plain-text summary used for the email body, clipboard and download. */
export function buildInquirySummary(inquiry: Inquiry): string {
  return [
    "Service inquiry for Tyndall HVAC",
    "",
    `Service: ${inquiry.service}`,
    `Property: ${inquiry.property}`,
    `City: ${inquiry.city}`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    "",
    `Details: ${inquiry.message || "Please contact me to discuss."}`,
    "",
    "I understand that availability and appointments need to be confirmed directly.",
  ].join("\n");
}

/** mailto: link that opens a pre-filled draft in the visitor's email app. */
export function buildInquiryMailto(
  recipient: string,
  inquiry: Inquiry,
): string {
  const subject = encodeURIComponent(`Service inquiry — ${inquiry.service}`);
  const body = encodeURIComponent(buildInquirySummary(inquiry));
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
