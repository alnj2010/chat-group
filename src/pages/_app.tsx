import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_Display } from "next/font/google";

const notoSans = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={notoSans.className}>
      <Component {...pageProps} />;
    </main>
  );
}
