// hooks/index.ts
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import { TuitionObject } from "utils";

const tuitionInterface = new ethers.utils.Interface(TuitionObject.abi);

export function useUserAlreadyPaid(account: string | null | undefined) {
  const [alreadyPaid]: any =
    useContractCall(
      account && {
        abi: tuitionInterface,
        address: TuitionObject.address,
        method: "alreadyPaid",
        args: [account],
      }
    ) ?? [];
  return alreadyPaid;
}
