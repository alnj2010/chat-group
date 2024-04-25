import Image from "next/image";
import { Noto_Sans_Display } from "next/font/google";

import { ReactElement } from "react";
const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export default function AuthLayout({ children }: { children: ReactElement }) {
  return (
    <main
      className={`flex justify-center items-center sm:h-screen ${notoSans.variable} font-sans`}
    >
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
          {children}
        </div>
        <div className="auth-footer-container flex justify-between">
          <div className="text-sm font-normal text-[#828282]">
            created by <span className="font-semibold underline">anavarro</span>
          </div>
          <div className="text-sm font-normal text-[#828282]">
            devChallenges.io
          </div>
        </div>
      </div>
    </main>
  );
}
