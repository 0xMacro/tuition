import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Button from "components/Button";
import { useEthers } from "@usedapp/core";
import { trimAddress } from "utils/helpers";
import { toast } from "react-toastify";
import { activateWalletAndHandleError } from "utils";
import Image from "next/image";

const Navbar = () => {
  const { account, activateBrowserWallet } = useEthers();

  const handleWalletConnect = async () => {
    activateWalletAndHandleError(activateBrowserWallet, toast);
  };

  return (
    <Flex
      px={{ base: 4, sm: 14 }}
      py={10}
      justifyContent="space-between"
      alignItems="center"
      userSelect="none"
    >
      <Box position="relative" w="2.5rem" pb="3rem" ml={{ base: 0, sm: 6 }}>
        <Image
          layout="fill"
          src="/assets/macro.svg"
          alt="macro"
          objectFit="contain"
        />
      </Box>
      <Flex>
        {/* <Button action={handleWalletConnect} mr={{ base: 0, sm: 4 }}>
          {account ? trimAddress(account) : "Connect Wallet"}
        </Button> */}
      </Flex>
    </Flex>
  );
};

export default Navbar;
