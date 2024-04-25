import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import IconTextField from "./IconTextField";
import FormValidationError from "@/errors/form-validation-error";
import { Credentials } from "@/types";
import { validateAuthFormCredentials } from "@/lib/validators";
import { ERROR_PAGE_ROUTE } from "@/constanst";

export default function CredentialsForm({
  action,
  redirectTo,
  textButton,
  formId,
}: {
  action: (credentials: Credentials) => Promise<void>;
  redirectTo: string;
  textButton: string;
  formId: "" | "sign-in" | "sign-up";
}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const disableSubmitButton = !(email && password) || loading;

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const credentials: Credentials = validateAuthFormCredentials({
        email,
        password,
      });

      await action(credentials);

      router.push(redirectTo);
    } catch (error) {
      if (error instanceof FormValidationError) {
        setErrors(error.messages);
      } else {
        router.push(ERROR_PAGE_ROUTE);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} data-testid={`${formId}-credentials-form`}>
      <IconTextField
        disabled={loading}
        placeholder="Email"
        alt="envelope icon"
        data-testid={`${formId}-textfield-user-email`}
        name="email"
        onChange={(e) => setEmail(e.target.value ?? "")}
        src="/mail.svg"
        type="text"
      />
      <IconTextField
        disabled={loading}
        placeholder="Password"
        alt="lock icon"
        data-testid={`${formId}-textfield-user-password`}
        name="password"
        onChange={(e) => setPassword(e.target.value ?? "")}
        src="/lock.svg"
        type="password"
      />

      <button
        data-testid={`${formId}-credentials-submit-button`}
        className="w-full h-10 bg-[#2F80ED] rounded-lg text-base font-semibold text-white disabled:bg-[#828282]"
        disabled={disableSubmitButton}
      >
        {textButton}
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
            data-testid={`${formId}-error-messages`}
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
