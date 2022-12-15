import "../styles/main.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Navbar from "../components/Navbar/Nabar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import { ThemeProvider } from "../context/ThemeContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Newsify</title>
      </Head>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
