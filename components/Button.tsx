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
      borderRadius={30}
      _hover={{ cursor: "pointer", background: "blue.800", transition: "all 0.2s" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Button;
