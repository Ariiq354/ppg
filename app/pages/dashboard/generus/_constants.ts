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
    key: "kelasSekolah",
    label: "Kelas Sekolah",
  },
  {
    key: "kelasPengajian",
    label: "Kelas Pengajian",
  },
  {
    key: "namaKelompok",
    label: "Kelompok",
  },
];

export const genderOptions = [
  {
    value: "laki",
    name: "Laki - laki",
  },
  {
    value: "perempuan",
    name: "Perempuan",
  },
];

export const pengajianOptions = [
  {
    value: "paud",
    name: "PAUD",
  },
  {
    value: "caberawit",
    name: "Cabe Rawit",
  },
  {
    value: "praremaja",
    name: "Pra Remaja",
  },
  {
    value: "remaja",
    name: "Remaja",
  },
  {
    value: "pranikah",
    name: "Pra Nikah",
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
  nama: undefined,
  gender: undefined,
  kelasSekolah: undefined,
  kelasPengajian: undefined,
  namaOrtu: undefined,
  tempatLahir: undefined,
  tanggalLahir: undefined,
  foto: "",
  daerahId: undefined,
  desaId: undefined,
  kelompokId: undefined,
});

export type Schema = z.output<typeof schema>;
