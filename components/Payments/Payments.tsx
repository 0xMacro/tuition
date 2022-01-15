import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import PaymentChoice from "./PaymentChoice";

const Payments = () => {
  return (
    <Box w={{ base: "100%", sm: "80%", lg: "50%" }} p={20} boxShadow="md">
      <PaymentChoice
        title="Deposit price 1 ETH"
        buttonText="PAY 1 ETH"
        action={() => {}}
      />
      <PaymentChoice
        title="Full tuition 4 ETH"
        buttonText="PAY 4 ETH"
        action={() => {}}
      />
    </Box>
  );
};

export default Payments;
