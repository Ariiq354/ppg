import { z } from "zod";

const bodySchema = z.object({
  id: z.number().optional(),
  foto: z.string(),
  gender: z.string(),
  nama: z.string(),
  noTelepon: z.string(),
  pendidikan: z.string(),
  status: z.string(),
  tanggalLahir: z.string(),
  tempatLahir: z.string(),
  tanggalTugas: z.string(),
  daerahId: z.number(),
  desaId: z.number(),
  kelompokId: z.number(),
});

export default defineEventHandler(async (event) => {
  protectFunction(event);

  const res = await readValidatedBody(event, (body) => bodySchema.parse(body));

  if (res.id) {
    await updatePengajar(res.id, res);
  } else {
    await createPengajar(res);
  }

  return;
});
