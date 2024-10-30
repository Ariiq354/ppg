import { z } from "zod";

export const registerSchema = z.object({
  daerah: z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, "Required"),
  }),
  desa: z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional(),
  }),
  kelompok: z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional(),
  }),
});

export type Schema = z.output<typeof registerSchema>;

export const getInitialState = (): Partial<Schema> => ({
  daerah: {
    id: undefined,
    name: "",
  },
  desa: {
    id: undefined,
    name: undefined,
  },
  kelompok: {
    id: undefined,
    name: undefined,
  },
});
