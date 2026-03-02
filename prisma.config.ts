/**
 * Prisma v7 configuration file
 * Connection URLs for database migrations and queries.
 * @see https://pris.ly/d/config-datasource
 */

import path from "node:path";
import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

// Load .env so DATABASE_URL / DIRECT_URL are available when this file is evaluated
import "dotenv/config";

export default defineConfig({
  schema: path.join(__dirname, "prisma/schema.prisma"),

  datasource: {
    url: process.env.DATABASE_URL!,
  },

  // @ts-ignore — adapter typing is loose in v7 beta
  migrate: {
    async adapter(env: NodeJS.ProcessEnv) {
      const { Pool } = await import("pg");
      // Use DIRECT_URL for migrations (bypasses connection pooling)
      // Falls back to pooler DATABASE_URL if DIRECT_URL not set
      const pool = new Pool({
        connectionString: env.DIRECT_URL ?? env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required for Supabase
      });
      return new PrismaPg(pool);
    },
  },
});
