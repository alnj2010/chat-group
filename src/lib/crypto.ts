import { createHash, randomUUID } from "node:crypto";

export function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function generateUUID() {
  return randomUUID();
}
