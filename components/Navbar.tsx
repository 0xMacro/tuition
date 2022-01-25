import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Button from "components/Button";
import { useEthers } from "@usedapp/core";
import { trimAddress } from "utils/helpers";
import { toast } from "react-toastify";
import { activateWalletAndHandleError } from "utils";

const Navbar = () => {
  const { account, activateBrowserWallet } = useEthers();

  const handleWalletConnect = async () => {
    activateWalletAndHandleError(activateBrowserWallet, toast);
  };

  return (
    <Flex
      px={{ base: 4, sm: 14 }}
      py={6}
      justifyContent="space-between"
      alignItems="center"
      userSelect="none"
    >
      <Text fontSize="2xl" fontWeight="bold" color="gray.100">
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
