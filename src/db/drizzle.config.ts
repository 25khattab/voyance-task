import type { Config } from "drizzle-kit"

export default {
  schema: "./schema.ts",
  out: "./drizzle",
  dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
