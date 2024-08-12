import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const client = createClient({
  url: "file:./db/sqlite.db",
  authToken: "...",
});
export const db = drizzle(client);