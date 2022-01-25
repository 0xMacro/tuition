import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    green: {
      300: "#45C283",
    },
    blue: {
      900: "#001226",
    },
    red: {
      700: "#953333",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#001226",
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
