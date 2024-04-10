import type { NextApiRequest, NextApiResponse } from "next";
import { createHash, randomUUID } from "crypto";
import { db } from "@/lib/db";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("entrooo");
  const { email, password } = req.body;
  const uuid = randomUUID();
  const hashedPassword = createHash("sha256").update(password).digest("hex");
  await db.query(
    `INSERT INTO users (uuid, email, password) VALUES ('${uuid}', '${email}', '${hashedPassword}');`
  );

  res.status(200).json({ data: "Successfully Registration" });
}
