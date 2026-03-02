/**
 * Prisma v7 configuration file
 * Connection URLs for database migrations and queries.
 * @see https://pris.ly/d/config-datasource
 */

import path from "node:path";
import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

// Load .env for local dev — on Vercel, env vars are injected directly
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("dotenv").config();
} catch {
  // dotenv not critical in CI — env vars injected by platform
}

export default defineConfig({
  schema: path.join(__dirname, "prisma/schema.prisma"),

  datasource: {
    url: process.env.DATABASE_URL!,
  },

  // @ts-ignore — adapter typing is loose in v7
  migrate: {
    async adapter(env: NodeJS.ProcessEnv) {
      const { Pool } = await import("pg");
      const pool = new Pool({
        connectionString: env.DIRECT_URL ?? env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
      return new PrismaPg(pool);
    },
  },
});
