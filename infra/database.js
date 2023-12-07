import { Pool } from "pg";

async function query(queryObject) {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  const client = await pool.connect();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

export default {
  query,
};
