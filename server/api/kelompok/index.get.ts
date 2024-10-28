import { z } from "zod";

const querySchema = z.object({
  desaId: z.number(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    querySchema.parse(query)
  );

  const res = await getKelompokByDesa(query.desaId);
  const data = res.map((item) => {
    return {
      id: item.id,
      name: item.name,
      desaId: item.desaId,
    };
  });

  return data;
});
