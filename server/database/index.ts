import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as tempat from "./schema/tempat";

const config = useRuntimeConfig();

export const db = drizzle({
  connection: {
    url: config.databaseUrl as string,
    authToken: config.databaseAuthToken as string,
  },
  schema: {
    ...auth,
    ...tempat,
  },
  casing: "snake_case",
});
