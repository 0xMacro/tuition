import React from "react";
import { Text, Box } from "@chakra-ui/react";
import { MotionBox } from "components/MotionComponents";
import Payments from "./Payments/Payments";

const text = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

const Landing = () => {
  return (
    <Box mt={10}>
      <MotionBox variants={text} initial="hidden" animate="show">
        <Text
          color="gray.100"
          textAlign={{ base: "center", sm: "left" }}
          fontWeight="bold"
          fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
          lineHeight={{ base: "2.8rem", md: "5rem" }}
        >
          🚀 Go Really Deep in Learning Solidity & Web3
        </Text>
      </MotionBox>
      <Payments />
    </Box>
  );
};

export default Landing;
