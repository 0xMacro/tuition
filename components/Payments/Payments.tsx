import React, { useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import { MotionBox, MotionFlex } from "components/MotionComponents";
import PaymentChoice from "./PaymentChoice";
import { useContractFunction, useEthers } from "@usedapp/core";
import { activateWalletAndHandleError, tuition } from "utils";
import { parseEther } from "ethers/lib/utils";
import { useUserAlreadyPaid } from "hooks/useUserAlreadyPaid";
import { useState } from "react";
import Loading from "components/Loading";
import { toast } from "react-toastify";

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
  const [isLoading, setIsLoading] = useState(false);
  const { account, activateBrowserWallet } = useEthers();
  const userAlreadyPaid = useUserAlreadyPaid(account);
  const { state: contributionStatus, send: contribute } = useContractFunction(
    tuition,
    "contribute"
  );

  useEffect(() => {
    if (userAlreadyPaid !== undefined) {
      setIsLoading(false);
    }
  }, [userAlreadyPaid]);

  useEffect(() => {
    if (contributionStatus.status === "Success") {
      setIsLoading(false);
    }
  }, [contributionStatus]);

  const handleContribution = (amount: "1" | "4") => {
    if (account) {
      setIsLoading(true);
      contribute({ value: parseEther(amount) });
    } else {
      activateWalletAndHandleError(activateBrowserWallet, toast);
    }
  };

  return (
    <MotionFlex
      mt={{ base: 5, md: 10 }}
      w={{ base: "100%", sm: "80%", md: "58%", lg: "36%" }}
      flexDirection="column"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Loading isLoading={isLoading}>
        <MotionBox variants={item}>
          <PaymentChoice
            title="CONTRIBUTE 1 ETH REFUNDABLE DEPOSIT"
            action={() => handleContribution("1")}
          />
        </MotionBox>
        <MotionBox variants={item}>
          <PaymentChoice
            title="CONTRIBUTE 4 ETH FOR FULL TUITION"
            action={() => handleContribution("4")}
          />
        </MotionBox>
      </Loading>
    </MotionFlex>
  );
};

export default Payments;
