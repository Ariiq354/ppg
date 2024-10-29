import { z } from "zod";

const bodySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  daerahId: z.number(),
});

export default defineEventHandler(async (event) => {
  const formData = await readBody(event);

  const res = bodySchema.parse(formData);

  res.name = res.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (res.id) {
    await updateDesa(res.id, res);
  } else {
    await createDesa(res);
  }

  return;
});
