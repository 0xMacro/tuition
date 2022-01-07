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
      <Box py={{ base: 6, sm: 10 }} px={{ base: 2, sm: 10 }} w="full">
        {children}
      </Box>
    </>
  );
};

export default Layout;
