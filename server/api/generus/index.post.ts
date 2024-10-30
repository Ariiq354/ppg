import { z } from "zod";

const bodySchema = z.object({
  id: z.number().optional(),
  foto: z.string(),
  gender: z.string(),
  nama: z.string(),
  daerahId: z.number(),
  desaId: z.number(),
  kelasPengajian: z.string(),
  kelasSekolah: z.string(),
  kelompokId: z.number(),
  namaOrtu: z.string(),
  tanggalLahir: z.string(),
  tempatLahir: z.string(),
});

export default defineEventHandler(async (event) => {
  protectFunction(event);

  const res = await readValidatedBody(event, (body) => bodySchema.parse(body));

  if (res.id) {
    await updateGenerus(res.id, res);
  } else {
    await createGenerus(res);
  }

  return;
});
