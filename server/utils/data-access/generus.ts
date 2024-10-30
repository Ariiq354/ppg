import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  type NewGenerus,
  generusTable,
} from "~~/server/database/schema/pengajar";

export async function getAllGenerus() {
  return await db.query.generusTable.findMany({
    orderBy: desc(generusTable.createdAt),
  });
}

export async function getGenerusByDaerah(daerahId: number) {
  return await db.query.generusTable.findMany({
    where: eq(generusTable.daerahId, daerahId),
    orderBy: desc(generusTable.createdAt),
  });
}

export async function createGenerus(data: NewGenerus) {
  return await db.insert(generusTable).values(data);
}

export async function updateGenerus(id: number, data: Partial<NewGenerus>) {
  return await db.update(generusTable).set(data).where(eq(generusTable.id, id));
}

export async function deleteGenerus(id: number[]) {
  return await db.delete(generusTable).where(inArray(generusTable.id, id));
}
