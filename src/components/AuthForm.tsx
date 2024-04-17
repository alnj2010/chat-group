import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import IconTextField from "./IconTextField";
import FormValidationError from "@/errors/form-validation-error";
import { Credentials } from "@/types";
import { validateAuthFormCredentials } from "@/lib/validators";
import { callAPICredentialsSignIn, callAPISignUpFromAuthForm } from "@/lib/api";
import { EDIT_PROFILE_PAGE_ROUTE, ERROR_PAGE_ROUTE } from "@/constanst";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Array<string>>([]);
  const disableSubmitButton = !(email && password);

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const credentials: Credentials = validateAuthFormCredentials({
        email,
        password,
      });

      await callAPISignUpFromAuthForm(credentials);
      await callAPICredentialsSignIn(credentials);

      router.push(EDIT_PROFILE_PAGE_ROUTE);
    } catch (error) {
      if (error instanceof FormValidationError) {
        setErrors(error.messages);
      } else {
        router.push(ERROR_PAGE_ROUTE);
      }
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <IconTextField
        placeholder="Email"
        alt="envelope icon"
        data-testid="textfield-user-email"
        name="email"
        onChange={(e) => setEmail(e.target.value ?? "")}
        src="/mail.svg"
        type="text"
      />
      <IconTextField
        placeholder="Password"
        alt="lock icon"
        data-testid="textfield-user-password"
        name="password"
        onChange={(e) => setPassword(e.target.value ?? "")}
        src="/lock.svg"
        type="password"
      />

      <button
        data-testid="register-button"
        className="w-full h-10 bg-[#2F80ED] rounded-lg text-base font-semibold text-white disabled:bg-[#828282]"
        disabled={disableSubmitButton}
      >
        Start coding now
      </button>
      {errors.length ? (
        <div className="mt-1 p-3 bg-[#FED6D6] rounded">
          <div className="pb-1 text-base font-semibold text-[#333333]">
            {errors.length} error{errors.length > 1 ? "s" : ""}{" "}
            {errors.length > 1 ? "have" : "has"} just occurred
          </div>
          <div className="pb-1 text-sm font-normal text-[#333333]">
            There were the following problems:
          </div>
          <ul
            data-testid="error-messages"
            className="pl-5 text-sm font-semibold text-[#333333] list-disc"
          >
            {errors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}
