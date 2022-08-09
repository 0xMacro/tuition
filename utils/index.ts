import axios from "axios";
import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";

export const getErrorFromReversion = (revertReason: string) => {
  const revertErrors = [
    "ALREADY_PAID",
    "NOT_TAKING_PAYMENTS",
    "User denied transaction",
    "insufficient funds",
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
    default:
      return "An error occured calling this method!";
  }
};

export const activateWalletAndHandleError = (activate: any, toast: any) => {
  activate(() => {
    toast.error("Please use a Web3-enabled browser!");
  });
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
    console.error("There is a Gemini API Issue", JSON.stringify(resp, null, 2));
  }

  const price = resp?.data[0]?.price;

  if (!price || typeof Number(price) !== "number") {
    throw new Error(
      "Cannot retrive ETH price from Gemini API. Please contact admin."
    );
  }

  // calculating amount & rounding to 3rd decimal
  const ethAmount = (usdAmount / Number(price)).toFixed(3);

  // converting response to big number to be used by metamask
  return parseEther(ethAmount);
};
