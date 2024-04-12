import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="flex justify-center items-center sm:h-screen">
      <div className="auth-container py-4 px-5 sm:w-[473px]">
        <div className="auth-box-container pb-20 sm:py-11 sm:px-14 sm:border rounded-3xl">
          <div className="devchallengeicon-container pb-7">
            <Image
              src="/devchallenges.svg"
              alt="devChallenge Logo"
              className=""
              width={130}
              height={18}
            />
          </div>

          <div className="welcome-container pb-9">
            <div className="welcome-title pb-4 text-lg font-semibold text-[#333333]">
              Join thousands of learners from around the world
            </div>

            <div className="welcome-subtitle text-base font-normal text-[#333333]">
              Master web development by making real-life projects. There are
              multiple paths for you to choose
            </div>
          </div>

          <div className="form-container pb-6">
            <form onSubmit={onSubmitHandler}>
              <div className="pb-4 relative">
                <Image
                  className="pb-4 absolute top-3 left-3"
                  src="/mail.svg"
                  alt="envelope icon"
                  width={24}
                  height={24}
                />
                <input
                  className="p-3 pl-12 border border-[#BDBDBD] rounded-lg w-full h-12 text-base font-normal placeholder:text-[#828282]"
                  placeholder="Email"
                  name="email"
                  type="email"
                  data-testid="textfield-user-email"
                  onChange={(e) => setEmail(e.target.value ?? "")}
                />
              </div>

              <div className="pb-4 relative">
                <Image
                  className="pb-4 absolute top-3 left-3"
                  src="/lock.svg"
                  alt="envelope icon"
                  width={24}
                  height={24}
                />
                <input
                  className="p-3 pl-12 border border-[#BDBDBD] rounded-lg w-full h-12 text-base font-normal placeholder:text-[#828282]"
                  placeholder="Password"
                  name="password"
                  type="password"
                  data-testid="textfield-user-password"
                  onChange={(e) => setPassword(e.target.value ?? "")}
                />
              </div>

              <button
                data-testid="register-button"
                className="w-full h-10 bg-[#2F80ED] rounded-lg text-base font-semibold text-white"
              >
                Start coding now
              </button>
            </form>
          </div>

          <div className="oauth-container pb-7 flex justify-center items-center flex-col">
            <div className="oauth-message pb-6 text-sm font-normal text-[#828282]">
              or continue with these social profile
            </div>
            <div className="oauth-providers flex justify-between w-60 ">
              <div className="google-provider" data-testid="google-provider">
                <Image
                  src="/google.svg"
                  alt="google icon"
                  width={42}
                  height={42}
                />
              </div>
              <div
                className="facebook-provider"
                data-testid="facebook-provider"
              >
                <Image
                  src="/facebook.svg"
                  alt="facebook icon"
                  width={42}
                  height={42}
                />
              </div>
              <div className="twitter-provider" data-testid="twitter-provider">
                <Image
                  src="/twitter.svg"
                  alt="twitter icon"
                  width={42}
                  height={42}
                />
              </div>
              <div className="github-provider" data-testid="github-provider">
                <Image
                  src="/github.svg"
                  alt="github icon"
                  width={42}
                  height={42}
                />
              </div>
            </div>
          </div>

          <div className="login-link-container text-center">
            <div className="text-sm font-normal text-[#828282]">
              Already a member? {" "}
              <span>
                <Link href="/" data-testid="login-link" className="text-[#2D9CDB]">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="auth-footer-container flex justify-between">
          <div className="text-sm font-normal text-[#828282]">created by <span className="font-semibold underline">anavarro</span></div>
          <div className="text-sm font-normal text-[#828282]">devChallenges.io</div>
        </div>
      </div>
    </div>
  );
}
