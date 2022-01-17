import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "linear-gradient(180deg, rgba(143,204,236,1) 28%, rgba(255,255,255,1) 100%)",
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
