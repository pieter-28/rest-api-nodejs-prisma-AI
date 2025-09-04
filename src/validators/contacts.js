import { z } from "zod";

export const createContactSchema = z.object({
  phone: z.string().min(3),
  label: z.string().optional(),
});

export const updateContactSchema = z.object({
  phone: z.string().min(3).optional(),
  label: z.string().optional(),
});
