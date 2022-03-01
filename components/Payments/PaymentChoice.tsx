import { Text, Flex } from "@chakra-ui/react";
import Button from "components/Button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";

type PaymentChoiceProps = {
  title: string;
  action: () => void;
};

const PaymentChoice = ({ title, action }: PaymentChoiceProps) => {
  return (
    <Button
      onClick={action}
      display="flex"
      p={{ base: 3, sm: 4 }}
      my={{ base: 3, md: 4 }}
      justifyContent="center"
      fontSize="lg"
    >
      <Text textAlign="center" userSelect="none">
        {title}
      </Text>
    </Button>
  );
};

export default PaymentChoice;
