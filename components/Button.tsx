import React from "react";
import { Box, useTheme } from "@chakra-ui/react";

const Button = ({ action, children, ...props }: any) => {
  const theme = useTheme();

  return (
    <Box
      onClick={action}
      py={2}
      px={4}
      borderRadius="md"
      fontWeight="bold"
      bg="pink.400"
      color="gray.100"
      boxShadow={`2px 4px 0 ${theme.colors.blue[300]}`}
      _hover={{ cursor: "pointer", bg: "blue.300", transition: "all 0.2s" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Button;
