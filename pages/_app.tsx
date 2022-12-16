import "../styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Navbar from "../components/Navbar/Nabar";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
