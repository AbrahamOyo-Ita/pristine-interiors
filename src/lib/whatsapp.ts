import { business } from './config';

/** Builds a wa.me link with correctly URL-encoded message text. Works on mobile & desktop. */
export function waHref(message: string): string {
  const digits = business.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const waMessage = {
  general: () => `Hello ${business.name}! I found your website and I'd like to make an enquiry.`,
  consultation: () =>
    `Hello ${business.name}! I'd like to book a design consultation. Please share the next steps.`,
  quote: () => `Hello ${business.name}! I'd like to request a quote for furniture / interior design work.`,
  product: (name: string) =>
    `Hello ${business.name}! I'm interested in the "${name}" I saw on your website. ` +
    `Please share availability and your current price.`,
  order: (lines: string[], totalLabel: string) =>
    `Hello ${business.name}! I'd like to enquire about ordering the following items from your website:\n\n` +
    `${lines.join('\n')}\n\n${totalLabel}\n\n` +
    `Please confirm availability, final pricing and delivery details. Thank you!`,
};
