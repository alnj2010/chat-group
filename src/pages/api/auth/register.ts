import type { NextApiRequest, NextApiResponse } from "next";
import { APIData, APIErrorData, Credentials } from "@/types";
import {
  API_ERROR_INTERNAL_SERVER,
  API_ERROR_NOT_FOUND,
  API_SUCCESS_SIGN_UP,
  EMAIL_ALREADY_EXIST,
} from "@/constanst";
import { validateCredentials } from "@/lib/validators";
import ValidatorError from "@/errors/validator-error";
import { ApiError } from "next/dist/server/api-utils";
import { createUserByCredentials, userEmailExist } from "@/lib/db";

interface NextApiRequestRegister extends NextApiRequest {
  body: Credentials;
}

export default async function handler(
  req: NextApiRequestRegister,
  res: NextApiResponse<APIData | APIErrorData>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ errors: [API_ERROR_NOT_FOUND] });
  }

  try {
    const credentials = validateCredentials(req.body);

    const exist = await userEmailExist(credentials.email);
    if (exist) {
      return res.status(400).json({ errors: [EMAIL_ALREADY_EXIST] });
    }

    await createUserByCredentials(credentials);

    return res.status(200).json({ data: API_SUCCESS_SIGN_UP });
  } catch (error) {
    if (error instanceof ValidatorError) {
      return res.status(400).json({ errors: error.messages });
    } else {
      return res.status(500).json({ errors: [API_ERROR_INTERNAL_SERVER] });
    }
  }
}
