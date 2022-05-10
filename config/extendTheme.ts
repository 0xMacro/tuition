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
        backgroundImage: "linear-gradient(140deg, rgba(249,249,249,1) 70%, rgba(245,154,190,1) 100%)",
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
