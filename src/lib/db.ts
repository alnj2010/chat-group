import { Credentials, User } from "@/types";
import { Pool } from "pg";
import { API_ERROR_DB, DB_ERROR_RECORD_NOT_FOUND } from "@/constanst";
import DBError from "@/errors/db-error";
import { generateUUID, hash } from "./crypto";

const connection = new Pool({
  connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function createUserByCredentials(credentials: Credentials) {
  const uuid = generateUUID();

  const hashedPassword = hash(credentials.password);

  try {
    await connection.query(
      `INSERT INTO users (uuid, email, password) VALUES ('${uuid}', '${credentials.email}', '${hashedPassword}');`
    );
  } catch (error) {
    //console.error(error);
    throw new DBError(API_ERROR_DB);
  }
}

export async function userEmailExist(email: string): Promise<boolean> {
  try {
    const result = await connection.query(
      `SELECT id FROM users WHERE users.email='${email}';`
    );
    return result.rowCount !== 0;
  } catch (error) {
    //console.error(error);
    throw new DBError(API_ERROR_DB);
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const result = await connection.query(
      `SELECT * FROM users WHERE users.email='${email}';`
    );
    if (result.rowCount === 0) throw new DBError(DB_ERROR_RECORD_NOT_FOUND);

    const [userRow] = result.rows;

    return {
      id: userRow.id,
      uuid: userRow.uuid,
      email: userRow.email,
      password: userRow.password,
      name: userRow.name,
      phone: userRow.phone,
      bio: userRow.bio,
      image: userRow.photo,
    };
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
