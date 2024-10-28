import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { type NewDaerah, daerahTable } from "~~/server/database/schema/tempat";

export async function getAllDaerah() {
  return await db.query.daerahTable.findMany({
    orderBy: desc(daerahTable.createdAt),
  });
}

export async function createDaerah(data: NewDaerah) {
  return await db
    .insert(daerahTable)
    .values(data)
    .returning({ insertedId: daerahTable.id });
}

export async function updateDaerah(id: number, data: Partial<NewDaerah>) {
  return await db.update(daerahTable).set(data).where(eq(daerahTable.id, id));
}

export async function deleteDaerah(id: number[]) {
  return await db.delete(daerahTable).where(inArray(daerahTable.id, id));
}
