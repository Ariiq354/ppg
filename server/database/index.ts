import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as tempat from "./schema/tempat";

export const db = drizzle({
  connection: {
    url: "file:test.db",
  },
  schema: {
    ...auth,
    ...tempat,
  },
  casing: "snake_case",
});
