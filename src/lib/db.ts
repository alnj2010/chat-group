import { Credentials } from "@/types";
import { Pool } from "pg";
import { createHash, randomUUID } from "crypto";
import { ApiError } from "next/dist/server/api-utils";
import { API_ERROR_DB } from "@/constanst";

const connection = new Pool({
  connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function createUserByCredentials(credentials: Credentials) {
  const uuid = randomUUID();

  const hashedPassword = createHash("sha256")
    .update(credentials.password)
    .digest("hex");

  try {
    await connection.query(
      `INSERT INTO users (uuid, email, password) VALUES ('${uuid}', '${credentials.email}', '${hashedPassword}');`
    );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, API_ERROR_DB);
  }
}

export async function userEmailExist(email: string): Promise<boolean> {
  try {
    const result = await connection.query(
      `SELECT id FROM users WHERE users.email='${email}';`
    );
    return result.rowCount !== 0;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, API_ERROR_DB);
  }
}

export async function getCredentialsByEmail(
  email: string
): Promise<{ id: string; email: string; password: string } | null> {
  try {
    const result = await connection.query(
      `SELECT * FROM users WHERE users.email='${email}';`
    );
    if (result.rowCount === 0) return null;

    const [userRow] = result.rows;
    return { id: userRow.id, email: userRow.email, password: userRow.password };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, API_ERROR_DB);
  }
}
