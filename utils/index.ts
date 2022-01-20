import Tuition from "artifacts/contracts/Tuition.sol/Tuition.json";
import { Contract } from "ethers";

export const TuitionObject = {
  abi: Tuition.abi,
  address: "0x818df997213BE7db19EBc1f25902C08E3Ec8d43F",
};

export const tuition = new Contract(TuitionObject.address, TuitionObject.abi);

export const requestAccount = async (ethereum: any) => {
  const [account] = await ethereum.request({
    method: "eth_requestAccounts",
  });

  return account;
};

export const callContractMethod = async (callMethod: () => Promise<object>) => {
  let error, result;
  try {
    result = await callMethod();
  } catch (e) {
    error = handleContractCallError(e.error || e);
  }

  return {
    error,
    result,
  };
};

export const handleContractCallError = (error: any) => {
  let errorReason = getErrorFromReversion(error?.message);

  return errorReason;
};

const getErrorFromReversion = (revertReason: string) => {
  console.log(revertReason);
  const revertErrors = [
    "NOT_ALLOWED",
    "OWNER_ONLY",
    "NOT_LAST_PHASE",
    "NO_AVAILABLE_TOKENS",
    "LAST_PHASE",
    "FUNDS_MOVED_TO_LP",
    "CONTRACT_PAUSED",
    "User denied transaction",
    "errorSignature=null",
    "insufficient funds",
  ];

  const error = revertErrors.find((errorConstant) =>
    revertReason.includes(errorConstant)
  );

  return mapErrorToFriendlyMessage(error);
};

const mapErrorToFriendlyMessage = (error: string | undefined) => {
  switch (error) {
    case "OWNER_ONLY":
      return "This is meant for the owner! What are you doing here?";
    case "FUNDS_MOVED_TO_LP":
      return "Funds have been already moved to the liquidity pool!";
    case "NOT_LAST_PHASE":
      return "Not at OPEN phase yet!";
    case "NO_AVAILABLE_TOKENS":
      return "Not enough SPC available!";
    case "LAST_PHASE":
      return "Already at last phase!";
    case "CONTRACT_PAUSED":
      return "Contract is paused!";
    case "NOT_ALLOWED":
      return "You don't have permission to contribute!";
    case "User denied transaction":
      return "Transaction denied by user!";
    case "errorSignature=null":
      return "Error getting contract! Are you on the rinkeby network?";
    case "insufficient funds":
      return "Insufficient funds!";
    default:
      return "An error occured calling this method!";
  }
};

// export const handleContractInteractionResponse = async (
//   result,
//   error,
//   toast
// ) => {
//   if (error) {
//     return toast.error(error);
//   }

//   toast.success(
//     "Transaction sent! Waiting for confirmation from the network..."
//   );
//   await result.wait();
//   toast.success("Transaction confirmed!");
// };

export const activateWalletAndHandleError = (activate: any, toast: any) => {
  activate(() => {
    toast.error("Please use a Web3-enabled browser!", {
      hideProgressBar: true,
    });
  });
};
