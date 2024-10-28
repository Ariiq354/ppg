import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

export const daerahTable = sqliteTable("daerah", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  ...timestamp,
});

export const desaTable = sqliteTable("desa", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const kelompokTable = sqliteTable("kelompok", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  desaId: int()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const daerahRelations = relations(daerahTable, ({ many }) => ({
  desa: many(desaTable),
}));

export const desaRelations = relations(desaTable, ({ many, one }) => ({
  daerah: one(daerahTable, {
    fields: [desaTable.daerahId],
    references: [daerahTable.id],
  }),
  kelompok: many(kelompokTable),
}));

export const kelompokRelations = relations(kelompokTable, ({ one }) => ({
  desa: one(desaTable, {
    fields: [kelompokTable.desaId],
    references: [desaTable.id],
  }),
}));

export type Daerah = InferSelectModel<typeof daerahTable>;
export type NewDaerah = InferInsertModel<typeof daerahTable>;

export type Desa = InferSelectModel<typeof desaTable>;
export type NewDesa = InferInsertModel<typeof desaTable>;

export type Kelompok = InferSelectModel<typeof kelompokTable>;
export type NewKelompok = InferInsertModel<typeof kelompokTable>;
