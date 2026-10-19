import { z } from "zod";

/* ── Auth ─────────────────────────────────────────────────────────── */

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

/* ── Activity ─────────────────────────────────────────────────────── */

export const activitySchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

/* ── Gallery Item ─────────────────────────────────────────────────── */

export const galleryItemSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  category: z.string().min(1, "Category is required").max(100),
  photographer: z.string().max(200).optional(),
});

/* ── Member ───────────────────────────────────────────────────────── */

export const memberSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  role: z.string().min(1, "Role is required").max(200),
  category: z.enum(["faculty", "core", "alumni"], {
    errorMap: () => ({ message: "Category must be faculty, core, or alumni" }),
  }),
  order: z.number().int().min(0).optional(),
});

/* ── Types ────────────────────────────────────────────────────────── */

export type LoginInput = z.infer<typeof loginSchema>;
export type ActivityInput = z.infer<typeof activitySchema>;
export type GalleryItemInput = z.infer<typeof galleryItemSchema>;
export type MemberInput = z.infer<typeof memberSchema>;
