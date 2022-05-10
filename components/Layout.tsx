import React from "react";
import Navbar from "components/Navbar";
import { Box } from "@chakra-ui/react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import bubbles from "utils/bubbles.json";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };
  return (
    <>
      <Particles
        init={particlesInit}
        // @ts-ignore
        options={bubbles}
      />
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
