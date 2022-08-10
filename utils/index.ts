import axios from "axios";
import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { USDC_ERC20_ADDRESS, USDC_TRANSFER_ABI } from "./constants";

export const UsdcObject = {
  abi: USDC_TRANSFER_ABI,
  address: USDC_ERC20_ADDRESS,
};

export const usdcContract = new Contract(UsdcObject.address, UsdcObject.abi);

export const getErrorFromReversion = (revertReason: string) => {
  const revertErrors = [
    "ALREADY_PAID",
    "NOT_TAKING_PAYMENTS",
    "User denied transaction",
    "insufficient funds",
    "ERC20: transfer amount exceeds balance",
  ];

  const error = revertErrors.find((errorConstant) =>
    revertReason.includes(errorConstant)
  );

  return mapErrorToFriendlyMessage(error);
};

const mapErrorToFriendlyMessage = (error: string | undefined) => {
  switch (error) {
    case "ALREADY_PAID":
      return "You already contributed!";
    case "NOT_TAKING_PAYMENTS":
      return "Not taking payments at the moment, please try again later.";
    case "User denied transaction":
      return "Transaction denied by user!";
    case "insufficient funds":
      return "Insufficient funds!";
    case "ERC20: transfer amount exceeds balance":
      return "You do not have enough USDC to complete this transaction";
    default:
      return "An error occured calling this method!";
  }
};

export const activateWalletAndHandleError = (activate: any, toast: any) => {
  activate(() => {
    toast.error("Please use a Web3-enabled browser!");
  });
};

export const handleChainIdError = (toast: any) => {
  return toast.error("Please switch to Ethereum Mainnet before contributing!");
};

export const handleContractInteractionResponse = async (
  state: any,
  toast: any,
  setIsLoading: any
) => {
  switch (state.status) {
    case "Fail":
    case "Exception":
      toast.error(getErrorFromReversion(state.errorMessage as string));
      setIsLoading(false);
      break;
    case "Mining":
      toast.success(
        "Transaction sent! Waiting for confirmation from the network..."
      );
      setIsLoading(true);
      break;
    case "Success":
      toast.success("Transaction mined. Thank you for your contribution!");
      setIsLoading(false);
      break;
  }
};

export const getEthPricePeggedInUsd = async (props: { usdAmount: number }) => {
  const { usdAmount } = props;

  // gemini public price feed. does not require API key. rate limit is ~ 7.4k requests / hour & preferably no more than 1 req every 0.1 second.
  const resp = await axios.get("https://api.gemini.com/v1/pricefeed/ethusd");

  if (resp.status !== 200) {
    window.alert(
      `There is a Gemini API Issue. Please contact admin.\n Details: ${JSON.stringify(
        resp,
        null,
        2
      )}`
    );
    return;
  }

  const price = resp?.data[0]?.price;

  if (!price || typeof Number(price) !== "number") {
    window.alert(
      "Cannot retrive ETH price from Gemini API. Please contact admin."
    );
    return;
  }

  // calculating amount & rounding to 5th decimal
  const ethAmount = String(usdAmount / Number(price));

  // converting response to big number to be used by metamask
  return parseEther(ethAmount);
};
