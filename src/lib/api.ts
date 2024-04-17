import { Credentials } from "@/types";
import { validateAPIErrorResponse } from "./validators";
import FormValidationError from "@/errors/form-validation-error";
import { signIn } from "next-auth/react";
import { REGISTER_API_ROUTE } from "@/constanst";

export async function callAPISignUpFromAuthForm(credentials: Credentials) {
  try {
    const res = await fetch(REGISTER_API_ROUTE, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const payload = await res.json();
      const payloadParsed = validateAPIErrorResponse(payload);

      throw new FormValidationError([payloadParsed.error]);
    }
  } catch (error) {
    throw error;
  }
}

export async function callAPICredentialsSignIn(credentials: Credentials) {
  const resSignIn = await signIn("credentials", {
    ...credentials,
    redirect: false,
  });

  if (!resSignIn || !resSignIn.ok) {
    throw new Error("it was not posible sign in");
  }
}
