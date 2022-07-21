// hooks/index.ts
import { BigNumber, Contract, ethers } from "ethers";
import { useCalls } from "@usedapp/core";
import { TuitionObject } from "utils";

const tuitionInterface = new ethers.utils.Interface(TuitionObject.abi);
const USDCInterface = new ethers.utils.Interface([
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
  "function nonces(address owner) external view returns (uint256)",
  "function name() external view returns (string)",
]);

function useUSDCInfo(
  account: string,
  address: string
): (BigNumber | undefined)[] {
  const calls =
    [{ method: "nonces", args: account }, { method: "name" }].map(
      (functionName) => ({
        contract: new Contract(address, USDCInterface),
        method: functionName.method,
        args: functionName.args || [],
      })
    ) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(
        `Error encountered on ${calls[idx]?.contract.address}: ${result.error.message}`
      );
    }
  });
  return results.map((result) => result?.value?.[0]);
}
