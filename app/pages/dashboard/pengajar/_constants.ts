import { z } from "zod";

export const columns = [
  {
    key: "nama",
    label: "Nama Pengajar",
    sortable: true,
  },
  {
    key: "namaKelompok",
    label: "Tempat Tugas",
  },
  {
    key: "tanggalTugas",
    label: "Tanggal Mulai tugas",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "gender",
    label: "Jenis Kelamin",
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

export const statusOptions = [
  {
    value: "mt",
    name: "Mubalig Tugasan",
  },
  {
    value: "ms",
    name: "Mubalig Setempat",
  },
  {
    value: "asisten",
    name: "Asisten Pengajar",
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
  nama: undefined,
  gender: undefined,
  noTelepon: undefined,
  pendidikan: undefined,
  status: undefined,
  tanggalLahir: undefined,
  tempatLahir: undefined,
  tanggalTugas: undefined,
  foto: "",
  daerahId: undefined,
  desaId: undefined,
  kelompokId: undefined,
});

export type Schema = z.output<typeof schema>;
