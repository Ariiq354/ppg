import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { type NewDesa, desaTable } from "~~/server/database/schema/tempat";

export async function getAllDesa() {
  return await db.query.desaTable.findMany({
    orderBy: desc(desaTable.createdAt),
  });
}

export async function getDesaByDaerah(daerahId: number) {
  return await db.query.desaTable.findMany({
    where: eq(desaTable.daerahId, daerahId),
    orderBy: desc(desaTable.createdAt),
  });
}

export async function createDesa(data: NewDesa) {
  return await db
    .insert(desaTable)
    .values(data)
    .returning({ insertedId: desaTable.id });
}

export async function updateDesa(id: number, data: Partial<NewDesa>) {
  return await db.update(desaTable).set(data).where(eq(desaTable.id, id));
}

export async function deleteDesa(id: number[]) {
  return await db.delete(desaTable).where(inArray(desaTable.id, id));
}
