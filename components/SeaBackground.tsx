import React from "react";
import Image from "next/image";
import Wave from "react-wavify";
import { Box, keyframes, useTheme } from "@chakra-ui/react";

const float = keyframes`
  0% {
    transform: translateY(20px)
  }
  50% {
    transform: translateY(0px)
  }
  100% {
    transform: translateY(20px)
  }
`;

function SeaBackground() {
  const theme = useTheme();
  const animation = `${float} infinite 5s ease-in-out`;
  return (
    <>
      <Box
        w={{ base: 100, md: 200, xl: 250 }}
        h={{ base: 100, md: 200, xl: 250 }}
        zIndex={-1}
        position="absolute"
        bottom={20}
        left={5}
        animation={animation}
        userSelect="none"
      >
        <Image src="/assets/boat.gif" layout="fill" />
      </Box>
      <Wave
        fill={theme.colors.blue[300]}
        style={{ position: "absolute", bottom: 0, zIndex: -2 }}
      />
    </>
  );
}

export default SeaBackground;
