import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { MotionBox } from "components/MotionComponents";
import Payments from "./Payments/Payments";
import Orbit from "./Orbit/Orbit";

const text = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

const Landing = () => {
  return (
    <Flex pl={{ base: 0, sm: 7 }}>
      <Flex mt={10} flexDirection="column">
        <MotionBox variants={text} initial="hidden" animate="show">
          <Text
            color="black.100"
            textAlign="left"
            fontWeight="bold"
            fontFamily={"Gothic"}
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight={{ base: "2.8rem", md: "5rem" }}
          >
            Macro Engineering Fellowship
          </Text>
          <Text
            mt="4"
            color="black.100"
            textAlign="left"
            fontSize={{ base: "lg", md: "xl" }}
          >
            Get advanced training in Solidity & Web3
          </Text>
        </MotionBox>
        <Payments />
      </Flex>
      <Flex
        position={"fixed"}
        left="65%"
        top={"40%"}
        display={{ base: "none", lg: "block" }}
      >
        <Orbit />
      </Flex>
    </Flex>
  );
};

export default Landing;
