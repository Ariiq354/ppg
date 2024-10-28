import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";
import { daerahTable, desaTable, kelompokTable } from "./tempat";

export const userTable = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  password: text().notNull(),
  role: int().notNull().default(2),
  daerahId: int().references(() => daerahTable.id, { onDelete: "set null" }),
  desaId: int().references(() => desaTable.id, { onDelete: "set null" }),
  kelompokId: int().references(() => kelompokTable.id, {
    onDelete: "set null",
  }),
  ...timestamp,
});

export const sessionTable = sqliteTable("session", {
  id: text().primaryKey(),
  userId: int()
    .notNull()
    .references(() => userTable.id),
  expiresAt: int({ mode: "timestamp" }).notNull(),
});

export const userRelations = relations(userTable, ({ one }) => ({
  daerah: one(daerahTable, {
    fields: [userTable.daerahId],
    references: [daerahTable.id],
  }),
  desa: one(desaTable, {
    fields: [userTable.desaId],
    references: [desaTable.id],
  }),
  kelompok: one(kelompokTable, {
    fields: [userTable.kelompokId],
    references: [kelompokTable.id],
  }),
}));

export type User = InferSelectModel<typeof userTable>;
export type NewUser = InferInsertModel<typeof userTable>;

export type UserLucia = Omit<User, "createdAt" | "updatedAt" | "password">;

export type Session = InferSelectModel<typeof sessionTable>;
export type NewSession = InferInsertModel<typeof sessionTable>;
