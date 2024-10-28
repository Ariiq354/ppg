import { z } from "zod";

export const loginSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Required"),
});

export const getInitialState = () => ({
  id: undefined,
  name: "",
});

export type Schema = z.output<typeof loginSchema>;
