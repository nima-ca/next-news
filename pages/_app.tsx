import "../styles/main.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default appWithTranslation(App);
