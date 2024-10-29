import { hash } from "@node-rs/argon2";
import { z } from "zod";

const bodySchema = z.object({
  username: z.string(),
  password: z.string().optional(),
  daerahId: z.number().optional(),
  desaId: z.number().optional(),
  kelompokId: z.number().optional(),
});

export default defineEventHandler(async (event) => {
  protectFunction(event);
  const formData = await readBody(event);

  const res = bodySchema.parse(formData);

  if (res.password) {
    const passwordHash = await hash(res.password);
    res.password = passwordHash;
  }

  await updateUser(event.context.user!.id, res);

  return;
});
