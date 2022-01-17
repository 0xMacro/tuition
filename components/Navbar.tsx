import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Button from "components/Button";
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
        <Button action={handleWalletConnect}>
          {account ? trimAddress(account) : "Connect Wallet"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
