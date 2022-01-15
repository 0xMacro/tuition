import { DAppProvider } from "@usedapp/core";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import config from "config/dappConfig";
import theme from "config/extendTheme";
import "@fontsource/roboto";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
