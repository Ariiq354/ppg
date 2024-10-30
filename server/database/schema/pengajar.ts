import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

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
  ...timestamp,
});

export type Pengajar = InferSelectModel<typeof pengajarTable>;
export type NewPengajar = InferInsertModel<typeof pengajarTable>;

export type Generus = InferSelectModel<typeof generusTable>;
export type NewGenerus = InferInsertModel<typeof generusTable>;
