import React from "react";
import Navbar from "components/Navbar";
import { Box } from "@chakra-ui/react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Box
        py={{ base: 6, sm: 10 }}
        px={{ base: 4, sm: 14 }}
        w="full"
        zIndex={1}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
