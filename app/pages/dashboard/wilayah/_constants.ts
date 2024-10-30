import { z } from "zod";

export const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Required"),
});

export type Schema = z.output<typeof schema>;

export const initialFormData = (): Schema => ({
  id: undefined,
  name: "",
});
