import { Text, Flex, useTheme } from "@chakra-ui/react";
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
      p={{ base: 3, sm: 5 }}
      my={{ base: 3, md: 4 }}
      justifyContent="space-between"
      fontSize="lg"
    >
      <Text userSelect="none">{title}</Text>
      <Flex>
        <ArrowForwardIcon w={6} h={6} />
      </Flex>
    </Button>
  );
};

export default PaymentChoice;
