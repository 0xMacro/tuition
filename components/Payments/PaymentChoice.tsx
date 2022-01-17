import { Text, Flex, useTheme } from "@chakra-ui/react";
import Button from "components/Button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";

type PaymentChoiceProps = {
  title: string;
  action: () => void;
};

const PaymentChoice = ({ title }: PaymentChoiceProps) => {
  const theme = useTheme();

  return (
    <Button
      display="flex"
      p={{ base: 3, sm: 5 }}
      my={4}
      justifyContent="space-between"
      fontSize="lg"
    >
      <Text>{title}</Text>
      <Flex>
        <ArrowForwardIcon w={6} h={6} />
      </Flex>
    </Button>
  );
};

export default PaymentChoice;
