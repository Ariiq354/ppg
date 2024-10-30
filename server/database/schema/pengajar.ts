import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";
import { daerahTable, desaTable, kelompokTable } from "./tempat";

export const pengajarTable = sqliteTable("pengajar", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: text().notNull(),
  pendidikan: text().notNull(),
  status: text().notNull(),
  gender: text().notNull(),
  tanggalTugas: text().notNull(),
  noTelepon: text().notNull(),
  foto: text().notNull(),
  daerahId: int().references(() => daerahTable.id, { onDelete: "set null" }),
  desaId: int().references(() => desaTable.id, { onDelete: "set null" }),
  kelompokId: int().references(() => kelompokTable.id, {
    onDelete: "set null",
  }),
  ...timestamp,
});

export const generusTable = sqliteTable("generus", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: text().notNull(),
  gender: text().notNull(),
  namaOrtu: text().notNull(),
  kelasSekolah: text().notNull(),
  kelasPengajian: text().notNull(),
  foto: text().notNull(),
  daerahId: int().references(() => daerahTable.id, { onDelete: "set null" }),
  desaId: int().references(() => desaTable.id, { onDelete: "set null" }),
  kelompokId: int().references(() => kelompokTable.id, {
    onDelete: "set null",
  }),
  ...timestamp,
});

export type Pengajar = InferSelectModel<typeof pengajarTable>;
export type NewPengajar = InferInsertModel<typeof pengajarTable>;

export type Generus = InferSelectModel<typeof generusTable>;
export type NewGenerus = InferInsertModel<typeof generusTable>;
