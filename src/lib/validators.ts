import {
  EMAIL_FIELD_IS_REQUIRED,
  EMAIL_FIELD_MUST_BE_A_STRING,
  EMAIL_IS_INVALID,
  PASSWORD_FIELD_IS_REQUIRED,
  PASSWORD_FIELD_LENGTH_IS_TOO_SHORT,
  PASSWORD_FIELD_MUST_BE_A_STRING,
} from "@/constanst";
import FormValidationError from "@/errors/form-validation-error";
import ValidatorError from "@/errors/validator-error";
import { APIErrorData, Credentials } from "@/types";
import { ZodError, ZodType, z } from "zod";

const credentialsSchema = z.object({
  email: z
    .string({
      required_error: EMAIL_FIELD_IS_REQUIRED,
      invalid_type_error: EMAIL_FIELD_MUST_BE_A_STRING,
    })
    .email(EMAIL_IS_INVALID),
  password: z
    .string({
      required_error: PASSWORD_FIELD_IS_REQUIRED,
      invalid_type_error: PASSWORD_FIELD_MUST_BE_A_STRING,
    })
    .min(4, PASSWORD_FIELD_LENGTH_IS_TOO_SHORT),
}) satisfies ZodType<Credentials>;

const apiErrorResponseSchema = z.object({
  errors: z.array(z.string()),
}) satisfies ZodType<APIErrorData>;

function validate<T>(object: T, schema: z.AnyZodObject): T {
  try {
    return schema.parse(object) as T;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidatorError(error.errors.map((e) => e.message));
    } else {
      throw error;
    }
  }
}

export function validateAuthFormCredentials(
  credentials: Credentials
): Credentials {
  try {
    return validate<Credentials>(credentials, credentialsSchema);
  } catch (error) {
    if (error instanceof ValidatorError) {
      throw new FormValidationError(error.messages);
    } else {
      throw error;
    }
  }
}

export function validateCredentials(credentials: Credentials) {
  return validate<Credentials>(credentials, credentialsSchema);
}

export function validateAPIErrorResponse(
  apiErrorResponse: APIErrorData
): APIErrorData {
  return validate<APIErrorData>(apiErrorResponse, apiErrorResponseSchema);
}
