import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const resSignIn = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (resSignIn && resSignIn.ok) {
      router.push("/profile/edit");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="email"
          data-testid="user-email-register-textfield"
          onChange={(e) => setEmail(e.target.value ?? "")}
        />
        <input
          type="password"
          data-testid="user-password-register-textfield"
          onChange={(e) => setPassword(e.target.value ?? "")}
        />
        <button data-testid="register-button">Start coding now</button>
      </form>
    </div>
  );
}
