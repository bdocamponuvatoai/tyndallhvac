import { FaqList } from "@/components/sections/faq-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { faqs } from "@/content/faqs";

export function FaqSection() {
  return (
    <section className="container faq-section">
      <div>
        <Eyebrow>A LITTLE CLARITY</Eyebrow>
        <h2>
          Good questions.
          <br />
          Straight answers.
        </h2>
        <p>
          Getting comfortable with your options
          <br />
          is a good first step.
        </p>
      </div>
      <FaqList items={faqs} />
    </section>
  );
}
