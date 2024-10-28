import { z } from "zod";

const bodySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  daerahId: z.number(),
});

export default defineEventHandler(async (event) => {
  const formData = await readBody(event);

  const res = bodySchema.parse(formData);

  if (res.id) {
    await updateDesa(res.id, res);
  } else {
    const newData = {
      ...res,
    };
    await createDesa(newData);
  }

  return;
});
