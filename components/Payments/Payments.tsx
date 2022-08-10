import React, { useState, useCallback, useEffect } from "react";
import { parseUnits } from "ethers/lib/utils";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";
import {
  useContractFunction,
  useEthers,
  useSendTransaction,
} from "@usedapp/core";
import {
  activateWalletAndHandleError,
  handleContractInteractionResponse,
  getEthPricePeggedInUsd,
  usdcContract,
} from "utils";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import ThankYou from "./ThankYou";
import { Flex, Text } from "@chakra-ui/react";
import { TREASURY_ADDRESS, USDC_DECIMALS } from "utils/constants";

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
  const { state: ethTransactionState, sendTransaction } = useSendTransaction();

  // console.log("contributionStatus2 sendTransaction yyy", contributionStatus2);

  const { state: usdcTransactionState, send: sendUsdc } = useContractFunction(
    usdcContract,
    "transfer"
  );

  console.log("contributionStatus sendUsdc yyy", usdcTransactionState);

  const handleEthContribution = async () => {
    if (account) {
      const ethValue = await getEthPricePeggedInUsd({ usdAmount: 1 }); // 3_000
      sendTransaction({
        to: TREASURY_ADDRESS,
        value: ethValue,
      });
    } else {
      activateWalletAndHandleError(activateBrowserWallet, toast);
    }
  };

  const handleUsdcContribution = async () => {
    if (account) {
      // usdc has 6 decimals, not 18 like eth
      // sendUsdc({
      //   to: TREASURY_ADDRESS,
      //   value: parseUnits("3000", USDC_DECIMALS),
      // });

      console.log("usdcContract contract", usdcContract);
      const val = parseUnits("0.1", USDC_DECIMALS);
      console.log("yyy 10 are we hitting this", { val });

      const resp = await sendUsdc(
        TREASURY_ADDRESS,
        parseUnits("0.1", USDC_DECIMALS)
      );

      console.log("yyy 12 are we hitting this", resp);
    } else {
      activateWalletAndHandleError(activateBrowserWallet, toast);
    }
  };

  useEffect(() => {
    handleContractInteractionResponse(ethTransactionState, toast, setIsLoading);
  }, [ethTransactionState]);

  useEffect(() => {
    handleContractInteractionResponse(
      usdcTransactionState,
      toast,
      setIsLoading
    );
  }, [usdcTransactionState]);

  const isSuccessState =
    account &&
    (ethTransactionState?.status === "Success" ||
      usdcTransactionState?.status === "Success");

  return (
    <MotionFlex
      mt={7}
      w={{ base: "100%" }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Loading isLoading={isLoading}>
        {isSuccessState ? (
          <ThankYou itemVariant={item} />
        ) : (
          <>
            <Flex
              justifyContent="flex-start"
              flexDirection={{
                base: "column",
                md: "row",
              }}
              // minWidth={{ base: "100%" }}
              w={{ base: "100%" }}
            >
              <MotionBox
                variants={item}
                marginRight={{ base: "0px", md: "20px" }}
              >
                <PaymentChoice
                  title="Contribute ETH *"
                  action={() => handleEthContribution()}
                />
              </MotionBox>
              <MotionBox
                variants={item}
                marginRight={{ base: "0px", md: "20px" }}
              >
                <PaymentChoice
                  title="Contribute 3,000 USDC"
                  action={() => handleUsdcContribution()}
                />
              </MotionBox>
            </Flex>
            <Text
              mt="4"
              color="black.100"
              textAlign="left"
              fontStyle="italic"
              fontSize={{ base: "lg", md: "xl" }}
            >
              *If Tuition is paid in ETH, it will be equivalent to $3,000 USD.
              <br />
              We calculate exchange rate at time of transaction.
              <br />
              Actual rate may vary by a few basis points.
            </Text>
          </>
        )}
      </Loading>
    </MotionFlex>
  );
};

export default Payments;
