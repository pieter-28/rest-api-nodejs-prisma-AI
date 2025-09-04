import { z } from "zod";

export const createAddressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(1),
});

export const updateAddressSchema = z.object({
  line1: z.string().min(1).optional(),
  line2: z.string().optional(),
  city: z.string().min(1).optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(1).optional(),
});
