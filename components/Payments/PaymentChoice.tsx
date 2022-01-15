import { Text, Flex } from "@chakra-ui/react";
import React from "react";

type PaymentChoiceProps = {
  title: string;
  buttonText: string;
  action: () => void;
};

const PaymentChoice = ({ title, buttonText, action }: PaymentChoiceProps) => {
  return (
    <Flex
      py={6}
      px={4}
      my={4}
      justifyContent="space-between"
      fontSize="lg"
      fontWeight="bold"
      boxShadow="sm"
    >
      <Text>{title}</Text>
      <Text _hover={{ cursor: "pointer" }} color="blue.400" onClick={action}>
        {buttonText}
      </Text>
    </Flex>
  );
};

export default PaymentChoice;
