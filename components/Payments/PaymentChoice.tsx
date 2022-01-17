import { Text, Flex, useTheme } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";

type PaymentChoiceProps = {
  title: string;
  action: () => void;
};

const PaymentChoice = ({ title, action }: PaymentChoiceProps) => {
  const theme = useTheme();

  return (
    <Flex
      p={5}
      my={4}
      justifyContent="space-between"
      alignItems="center"
      fontSize="lg"
      fontWeight="bold"
      bg="pink.400"
      borderRadius="md"
      boxShadow={`1px 4px 0 ${theme.colors.blue[300]}`}
      color="gray.100"
      _hover={{ cursor: "pointer", bg: "blue.300", transition: "all 0.2s" }}
      onClick={action}
    >
      <Text>{title}</Text>
      <Flex>
        <ArrowForwardIcon w={6} h={6} />
      </Flex>
    </Flex>
  );
};

export default PaymentChoice;
