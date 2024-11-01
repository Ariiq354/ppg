import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  rememberMe: z.boolean(),
});

export const getInitialState = () => ({
  username: "",
  password: "",
  rememberMe: false,
});

export type Schema = z.output<typeof loginSchema>;
