import { Client } from "pg";
import * as core from "@actions/core";

function log(msg: string) {
  core.debug(msg);
}

async function main() {
  const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
  const POSTGRES_HOST = process.env.POSTGRES_HOST;
  const POSTGRES_PORT = process.env.POSTGRES_PORT;
  const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
  const POSTGRES_USER = process.env.POSTGRES_USER;
  log(
    `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`
  );
  const client = new Client({
    connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`,
  });

  try {
    await client.connect();
    log("connected");

    await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      uuid VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(250) NOT NULL,
      name VARCHAR(50),
      phone VARCHAR(25),
      bio VARCHAR(255),
      photo VARCHAR(255)
    );`);

    log("CREATE TABLE IF NOT EXISTS users executed!");
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

main();
