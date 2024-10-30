import { z } from "zod";

export const columns = [
  {
    key: "nama",
    label: "Nama Pengajar",
    sortable: true,
  },
  {
    key: "gender",
    label: "Jenis Kelamin",
  },
  {
    key: "pendidikan",
    label: "Pendidikan",
  },
  {
    key: "status",
    label: "Status",
  },
];

export const schema = z.object({
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
  daerahId: z.number().nullable(),
  desaId: z.number().nullable(),
  kelompokId: z.number().nullable(),
});

export const getInitialFormData = (): Partial<Schema> => ({
  id: undefined,
  foto: undefined,
  gender: undefined,
  nama: undefined,
  noTelepon: undefined,
  pendidikan: undefined,
  status: undefined,
  tanggalLahir: undefined,
  tempatLahir: undefined,
  tanggalTugas: undefined,
  daerahId: undefined,
  desaId: undefined,
  kelompokId: undefined,
});

export type Schema = z.output<typeof schema>;
