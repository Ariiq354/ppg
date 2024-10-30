import { z } from "zod";

export const columns = [
  {
    key: "nama",
    label: "Nama Generus",
    sortable: true,
  },
  {
    key: "gender",
    label: "Jenis Kelamin",
  },
  {
    key: "kelasPengajian",
    label: "Kelas Pengajian",
  },
  {
    key: "namaOrtu",
    label: "Nama orang tua",
  },
];

export const schema = z.object({
  id: z.number().optional(),
  foto: z.string(),
  gender: z.string(),
  nama: z.string(),
  kelasPengajian: z.string(),
  kelasSekolah: z.string(),
  namaOrtu: z.string(),
  tanggalLahir: z.string(),
  tempatLahir: z.string(),
  daerahId: z.number().nullable(),
  desaId: z.number().nullable(),
  kelompokId: z.number().nullable(),
});

export const getInitialFormData = (): Partial<Schema> => ({
  id: undefined,
  foto: undefined,
  gender: undefined,
  nama: undefined,
  daerahId: undefined,
  desaId: undefined,
  kelasPengajian: undefined,
  kelasSekolah: undefined,
  kelompokId: undefined,
  namaOrtu: undefined,
  tanggalLahir: undefined,
  tempatLahir: undefined,
});

export type Schema = z.output<typeof schema>;
