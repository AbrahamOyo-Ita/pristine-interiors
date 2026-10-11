import { z } from 'zod';

const phoneRegex = /^\+?[0-9()\-\s]{7,16}$/;

export const consultationSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.'),
  phone: z.string().trim().regex(phoneRegex, 'Please enter a valid phone number.'),
  email: z.union([z.literal(''), z.string().email('Please enter a valid email, or leave this blank.')]),
  projectType: z.string().min(1, 'Please select a project type.'),
  location: z.string().trim().min(2, 'Please tell us where the property is located.'),
  budget: z.string().optional(),
  preferredDate: z.string().optional(),
  description: z.string().trim().min(10, 'Please describe your project (at least 10 characters).'),
});
export type ConsultationInput = z.infer<typeof consultationSchema>;

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name.'),
    phone: z.union([z.literal(''), z.string().regex(phoneRegex, 'Please enter a valid phone number.')]),
    email: z.union([z.literal(''), z.string().email('Please enter a valid email address.')]),
    message: z.string().trim().min(10, 'Please write a short message (at least 10 characters).'),
  })
  .refine((d) => d.phone || d.email, {
    message: 'Please provide a phone number or an email so we can reply to you.',
    path: ['phone'],
  });
export type ContactInput = z.infer<typeof contactSchema>;

export const productFormSchema = z.object({
  name: z.string().trim().min(2, 'Name is required.'),
  category: z.string().min(1, 'Choose a category.'),
  price: z.union([z.literal(''), z.string().regex(/^\d+(\.\d+)?$/, 'Price must be a number (or leave blank for “price on request”).')]),
  description: z.string().trim().min(10, 'Description should be at least 10 characters.'),
  imagesText: z.string().trim().min(1, 'Add at least one image path or URL (one per line).'),
  stock: z.enum(['in-stock', 'made-to-order', 'out-of-stock']),
  published: z.boolean(),
});
export type ProductFormInput = z.infer<typeof productFormSchema>;

export const projectFormSchema = z.object({
  title: z.string().trim().min(2, 'Title is required.'),
  category: z.string().min(1, 'Choose a category.'),
  location: z.string().trim().min(2, 'Location is required.'),
  cover: z.string().trim().min(1, 'A cover image is required.'),
  imagesText: z.string().trim().min(1, 'Add at least one image (one per line).'),
  summary: z.string().trim().min(10, 'Summary should be at least 10 characters.'),
  approach: z.string().trim().min(10, 'Design approach should be at least 10 characters.'),
  materialsText: z.string(),
  published: z.boolean(),
});
export type ProjectFormInput = z.infer<typeof projectFormSchema>;

export const serviceFormSchema = z.object({
  title: z.string().trim().min(2, 'Title is required.'),
  blurb: z.string().trim().min(10, 'Blurb should be at least 10 characters.'),
  pointsText: z.string().trim().min(1, 'Add at least one bullet point (one per line).'),
  active: z.boolean(),
});
export type ServiceFormInput = z.infer<typeof serviceFormSchema>;

export const settingsFormSchema = z.object({
  heroHeadline: z.string().trim().min(5, 'Headline is required.'),
  heroHighlight: z.string().trim().min(2, 'Highlight phrase is required.'),
  heroSub: z.string().trim().min(10, 'Subheading is required.'),
  featuredProductIds: z.array(z.string()),
  featuredProjectIds: z.array(z.string()),
  showTestimonials: z.boolean(),
  showServices: z.boolean(),
});
export type SettingsFormInput = z.infer<typeof settingsFormSchema>;
