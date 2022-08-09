import React, { useState, useCallback, useEffect } from "react";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";
import { useEthers, useSendTransaction } from "@usedapp/core";
import {
  activateWalletAndHandleError,
  handleContractInteractionResponse,
  getEthPricePeggedInUsd,
} from "utils";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import ThankYou from "./ThankYou";
import { Text } from "@chakra-ui/react";
import { TREASURY_ADDRESS } from "utils/constants";

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
  const { state: contributionStatus, sendTransaction } = useSendTransaction();

  const handleContribution = async () => {
    if (account) {
      const ethValue = await getEthPricePeggedInUsd({ usdAmount: 3_000 });
      sendTransaction({
        to: TREASURY_ADDRESS,
        value: ethValue,
      });
    } else {
      activateWalletAndHandleError(activateBrowserWallet, toast);
    }
  };

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
        {account && contributionStatus?.status === "Success" ? (
          <ThankYou itemVariant={item} />
        ) : (
          <>
            <MotionBox variants={item}>
              <PaymentChoice
                title="Contribute ETH and Get Started *"
                action={() => handleContribution()}
              />
            </MotionBox>
            <Text
              mt="4"
              color="black.100"
              textAlign="center"
              fontStyle="italic"
              fontSize={{ base: "lg", md: "xl" }}
            >
              *Tuition is in ETH, pegged to $3,000 USD.
              <br />
              We calculate exchange rate at time of transaction.
              <br />
              Actual pegging may vary by a few basis points.
            </Text>
          </>
        )}
      </Loading>
    </MotionFlex>
  );
};

export default Payments;
