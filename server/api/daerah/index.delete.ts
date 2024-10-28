import { z } from "zod";

const deleteSchema = z.object({
  id: z.array(z.number()),
});

export default defineEventHandler(async (event) => {
  adminFunction(event);

  const formData = await readBody(event);

  const res = deleteSchema.parse(formData);

  await deleteDaerah(res.id);

  return;
});
