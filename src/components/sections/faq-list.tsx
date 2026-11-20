import type { Faq } from "@/content/faqs";

/** Native <details> accordion: works without JavaScript. */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div className="faq-list">
      {items.map(({ question, answer }) => (
        <details key={question}>
          <summary>
            {question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
