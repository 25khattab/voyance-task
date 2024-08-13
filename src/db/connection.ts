import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
export const client = createClient({
  url: 'file:./src/db/sqlite.db',
  authToken: "...",
});
export const db = drizzle(client, { schema });
