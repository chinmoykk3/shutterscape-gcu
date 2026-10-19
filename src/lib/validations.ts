import { z } from 'zod';

export const imageSchema = z.object({
  url: z.string().url('Valid image URL is required'),
  publicId: z.string().min(1, 'Image publicId is required'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const activitySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(140),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Valid date is required',
  }),
  descriptionHtml: z.string().min(10, 'Description is too short'),
  image: imageSchema,
});

export const galleryItemSchema = z.object({
  caption: z.string().min(2, 'Caption is required').max(200),
  category: z.enum(['Events', 'Nature', 'Portraits', 'Street', 'Campus', 'Astrophotography']),
  image: imageSchema,
});

export const memberSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  role: z.string().min(2, 'Role is required').max(100),
  type: z.enum(['faculty', 'core', 'alumni']),
  image: imageSchema,
  order: z.coerce.number().int().min(0).default(0),
  batch: z.string().max(40).optional().or(z.literal('')),
});