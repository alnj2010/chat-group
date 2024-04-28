//PAGE ROUTES
export const LOGIN_PAGE_ROUTE = "/";
export const REGISTER_PAGE_ROUTE = "/register";
export const PROFILE_PAGE_ROUTE = "/profile";
export const EDIT_PROFILE_PAGE_ROUTE = "/profile/edit";
export const ERROR_PAGE_ROUTE = "/error";

//API ROUTES
export const REGISTER_API_ROUTE = "/api/auth/register";
export const SIGNIN_API_ROUTE = "/api/auth/callback/credentials";

//FORM ERROR MESSAGES
export const EMAIL_FIELD_IS_REQUIRED = "Email is required";
export const EMAIL_FIELD_MUST_BE_A_STRING = "Email must be a string";
export const EMAIL_IS_INVALID = "Email is invalid";
export const EMAIL_ALREADY_EXIST = "Email already exist";

export const PASSWORD_FIELD_IS_REQUIRED = "PASSWORD is required";
export const PASSWORD_FIELD_MUST_BE_A_STRING = "Email must be a string";
export const PASSWORD_FIELD_LENGTH_IS_TOO_SHORT =
  "Password length must be greater than 4 character";

export const INVALID_CREDENTIALS = "Invalid credentials";

export const API_ERROR_NOT_FOUND = "Not Found";
export const API_ERROR_BAD_REQUEST = "Bad request";
export const API_ERROR_INTERNAL_SERVER = "Internal server error";
export const API_ERROR_DB = "DB error";

export const API_SUCCESS_SIGN_UP = "Success";

export const DB_ERROR_RECORD_NOT_FOUND="Record not found"
