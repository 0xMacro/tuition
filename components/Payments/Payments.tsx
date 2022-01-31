import React, { useState, useCallback, useEffect } from "react";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";
import { useContractFunction, useEthers } from "@usedapp/core";
import {
  activateWalletAndHandleError,
  handleContractInteractionResponse,
  tuition,
} from "utils";
import { toast } from "react-toastify";
import { parseEther } from "ethers/lib/utils";
import { useUserAlreadyPaid } from "hooks/useUserAlreadyPaid";
import { Text } from "@chakra-ui/react";
import Loading from "components/Loading";
import ThankYou from "./ThankYou";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};

const Payments = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  const userAlreadyPaid = useUserAlreadyPaid(account);
  const { state: contributionStatus, send: contribute } = useContractFunction(
    tuition,
    "contribute"
  );

  const handleContribution = useCallback(
    (amount: "1") => {
      if (account) {
        contribute({ value: parseEther(amount) });
      } else {
        setSelectedChoice(amount);
        activateWalletAndHandleError(activateBrowserWallet, toast);
      }
    },
    [account, contribute, setSelectedChoice, activateBrowserWallet]
  );

  useEffect(() => {
    // Continue the flow in case an user connected when clicking on Pay
    if (selectedChoice && account) {
      handleContribution(selectedChoice as "1");
      setSelectedChoice("");
    }
  }, [account, handleContribution, selectedChoice]);

  useEffect(() => {
    handleContractInteractionResponse(contributionStatus, toast, setIsLoading);
  }, [contributionStatus]);

  return (
    <MotionFlex
      mt={{ base: 5, md: 10 }}
      w={{ base: "100%", sm: "80%", md: "70%", lg: "52%", xl: "40%" }}
      flexDirection="column"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Loading isLoading={isLoading}>
        {account && userAlreadyPaid ? (
          <ThankYou itemVariant={item} />
        ) : (
          <>
            <MotionBox variants={item}>
              <PaymentChoice
                title="CONTRIBUTE 1 ETH AND GET STARTED"
                action={() => handleContribution("1")}
              />
              <Text color="gray.100" fontSize="sm">
                *refundable on job acceptance
              </Text>
            </MotionBox>
          </>
        )}
      </Loading>
    </MotionFlex>
  );
};

export default Payments;
