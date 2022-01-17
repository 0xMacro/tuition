import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { trimAddress } from "utils/helpers";

const Navbar = () => {
  const { account, activateBrowserWallet } = useEthers();

  const handleWalletConnect = async () => {
    activateBrowserWallet();
  };

  return (
    <Flex px={10} py={6} justifyContent="space-between" alignItems="center">
      <Text fontSize="2xl" fontWeight="bold">
        SHIPYARD
      </Text>
      <Flex>
        <Button
          onClick={handleWalletConnect}
          bg="pink.400"
          color="gray.100"
          _hover={{ bg: "blue.300" }}
        >
          {account ? trimAddress(account) : "Connect Wallet"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
