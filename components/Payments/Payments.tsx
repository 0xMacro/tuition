import React, { useState, useCallback, useEffect } from "react";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";
import { useContractFunction, useEthers } from "@usedapp/core";
import { signERC2612Permit } from "eth-permit";
import {
  activateWalletAndHandleError,
  handleContractInteractionResponse,
  tuition,
} from "utils";
import { toast } from "react-toastify";
import { useUserAlreadyPaid } from "hooks/useUserAlreadyPaid";
import Loading from "components/Loading";
import ThankYou from "./ThankYou";
import { BigNumber, ethers } from "ethers";

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
  const { account, activateBrowserWallet, library } = useEthers();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  const userAlreadyPaid = useUserAlreadyPaid(account);
  const { state: contributionStatus, send: contribute } = useContractFunction(
    tuition,
    "contribute"
  );

  const handleContribution = useCallback(
    async (amount: "1") => {
      if (account) {
        const tuitionAddress = process.env
          .NEXT_PUBLIC_CONTRACT_ADDRESS as string;
        let usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS as string;

        const result = await signERC2612Permit(
          library,
          usdcAddress,
          account,
          tuitionAddress,
          "1"
        );

        console.log(library);
        contribute(result.deadline, result.v, result.r, result.s);
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
                title="Contribute 3000 USDC and Get Started"
                action={() => handleContribution("1")}
              />
            </MotionBox>
          </>
        )}
      </Loading>
    </MotionFlex>
  );
};

export default Payments;
