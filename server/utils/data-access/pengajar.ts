import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  type NewPengajar,
  pengajarTable,
} from "~~/server/database/schema/pengajar";

export async function getAllPengajar() {
  return await db.query.pengajarTable.findMany({
    orderBy: desc(pengajarTable.createdAt),
  });
}

export async function getPengajarByDaerah(daerahId: number) {
  return await db.query.pengajarTable.findMany({
    where: eq(pengajarTable.daerahId, daerahId),
    orderBy: desc(pengajarTable.createdAt),
  });
}

export async function createPengajar(data: NewPengajar) {
  return await db.insert(pengajarTable).values(data);
}

export async function updatePengajar(id: number, data: Partial<NewPengajar>) {
  return await db
    .update(pengajarTable)
    .set(data)
    .where(eq(pengajarTable.id, id));
}

export async function deletePengajar(id: number[]) {
  return await db.delete(pengajarTable).where(inArray(pengajarTable.id, id));
}
