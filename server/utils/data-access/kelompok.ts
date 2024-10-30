import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  type NewKelompok,
  kelompokTable,
} from "~~/server/database/schema/tempat";

export async function getAllKelompok() {
  return await db.query.kelompokTable.findMany({
    orderBy: desc(kelompokTable.createdAt),
  });
}

export async function getKelompokById(id: number) {
  return await db.query.kelompokTable.findFirst({
    where: eq(kelompokTable.id, id),
  });
}

export async function getKelompokByDesa(desaId: number) {
  return await db.query.kelompokTable.findMany({
    where: eq(kelompokTable.desaId, desaId),
    orderBy: desc(kelompokTable.createdAt),
  });
}

export async function createKelompok(data: NewKelompok) {
  return await db
    .insert(kelompokTable)
    .values(data)
    .returning({ insertedId: kelompokTable.id });
}

export async function updateKelompok(id: number, data: Partial<NewKelompok>) {
  return await db
    .update(kelompokTable)
    .set(data)
    .where(eq(kelompokTable.id, id));
}

export async function deleteKelompok(id: number[]) {
  return await db.delete(kelompokTable).where(inArray(kelompokTable.id, id));
}
