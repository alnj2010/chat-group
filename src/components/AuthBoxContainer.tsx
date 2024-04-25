import Link from "next/link";
import Image from "next/image";
import { ReactElement } from "react";

export default function AuthBoxContainer({
  children,
  title,
  subtitle,
  jumpTo,
  jumpAdviceTo,
  jumpTextTo,
}: {
  children: ReactElement;
  title: string;
  subtitle: string;
  jumpTo: string;
  jumpTextTo: string;
  jumpAdviceTo: string;
}) {
  return (
    <div>
      <div className="welcome-container pb-9">
        <div className="welcome-title pb-4 text-lg font-semibold text-[#333333]">
          {title}
        </div>

        <div className="welcome-subtitle text-base font-normal text-[#333333]">
          {subtitle}
        </div>
      </div>

      <div className="form-container pb-6">{children}</div>

      <div className="oauth-container pb-7 flex justify-center items-center flex-col">
        <div className="oauth-message pb-6 text-sm font-normal text-[#828282]">
          or continue with these social profile
        </div>
        <div className="oauth-providers flex justify-between w-60 ">
          <div className="google-provider" data-testid="google-provider">
            <Image src="/google.svg" alt="google icon" width={42} height={42} />
          </div>
          <div className="facebook-provider" data-testid="facebook-provider">
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
            <Image src="/github.svg" alt="github icon" width={42} height={42} />
          </div>
        </div>
      </div>

      <div className="link-container text-center">
        <div className="text-sm font-normal text-[#828282]">
          {jumpAdviceTo}{" "}
          <span>
            <Link
              href={jumpTo}
              data-testid="jump-to"
              className="text-[#2D9CDB]"
            >
              {jumpTextTo}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
