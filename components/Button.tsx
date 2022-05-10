import React from "react";
import { Box } from "@chakra-ui/react";

const Button = ({ action, children, ...props }: any) => {
  return (
    <Box
      onClick={action}
      py={2}
      px={4}
      fontWeight="bold"
      bg="black"
      color="gray.100"
      borderRadius={"100px"}
      transition="all 0.2s"
      _hover={{
        cursor: "pointer",
        background: "red.100",
        color: "gray.900",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Button;
