import { z } from "zod";

const querySchema = z.object({
  daerahId: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    querySchema.parse(query)
  );

  const res = await getDesaByDaerah(query.daerahId);
  const data = res.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });

  return data;
});
