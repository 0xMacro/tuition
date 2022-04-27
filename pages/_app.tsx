import { DAppProvider } from "@usedapp/core";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import config from "config/dappConfig";
import theme from "config/extendTheme";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Macro Tuition</title>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css"
        />
      </Head>
      <DAppProvider config={config}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <ToastContainer hideProgressBar />
        </ChakraProvider>
      </DAppProvider>
    </>
  );
}

export default MyApp;
