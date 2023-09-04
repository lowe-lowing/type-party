import { sql } from "@vercel/postgres";

import "dotenv/config";

async function seed() {
  // Create table with raw SQL
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        done BOOLEAN NOT NULL
      );
  `);
  console.log(`Created "todos" table`);

  return {
    createTable,
  };
}

seed().catch((err) => {
  console.error("❌ Seed failed");
  console.error(err);
  process.exit(1);
});
