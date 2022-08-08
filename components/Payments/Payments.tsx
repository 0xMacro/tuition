import React, { useState, useCallback, useEffect } from "react";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";
import { useContractFunction, useEthers } from "@usedapp/core";
import {
  activateWalletAndHandleError,
  handleContractInteractionResponse,
  tuition,
  getEthPricePeggedInUsd,
} from "utils";
import { toast } from "react-toastify";
import { parseEther } from "ethers/lib/utils";
import { useUserAlreadyPaid } from "hooks/useUserAlreadyPaid";
import Loading from "components/Loading";
import ThankYou from "./ThankYou";
import { Text } from "@chakra-ui/react";

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
  // const [selectedChoice, setSelectedChoice] = useState(""); xx
  const userAlreadyPaid = useUserAlreadyPaid(account);
  const { state: contributionStatus, send: contribute } = useContractFunction(
    tuition,
    "contribute"
  );

  const handleContribution = async () => {
    if (account) {
      const ethValue = await getEthPricePeggedInUsd({ usdAmount: 3_000 });
      console.log("yyyy ethValue", ethValue);
      contribute({ value: ethValue });
    } else {
      // setSelectedChoice(amount);
      activateWalletAndHandleError(activateBrowserWallet, toast);
    }
  };

  // useEffect(() => {
  //   // add
  //   console.log("testing 3333");
  //   (async () => {
  //     console.log("testing 4444");
  //     const resp = await getEthPricePeggedInUsd({ usdAmount: 3_000 });
  //     console.log("testing 5555", resp);
  //     console.log("test 666", { account });
  //     // Continue the flow in case an user connected when clicking on Pay
  //     if (account) {
  //       handleContribution("1");
  //       // setSelectedChoice("");
  //     }
  //   })();
  // }, [account, handleContribution]);

  useEffect(() => {
    handleContractInteractionResponse(contributionStatus, toast, setIsLoading);
  }, [contributionStatus]);

  return (
    <MotionFlex
      mt={7}
      w={{ base: "100%", sm: "90%", md: "64%", lg: "50%", xl: "50%" }}
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
                title="Contribute ETH and Get Started *"
                action={() => handleContribution("1")}
              />
            </MotionBox>
            <Text
              mt="4"
              color="black.100"
              textAlign="center"
              fontSize={{ base: "lg", md: "xl" }}
            >
              *Tuition is in ETH, pegged to $3,000 USD.
              <br />
              We calculate exchange rate at time of transaction.
            </Text>
          </>
        )}
      </Loading>
    </MotionFlex>
  );
};

export default Payments;
