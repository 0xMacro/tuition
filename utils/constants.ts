// production wallet for 0xmacro.eth
export const TREASURY_ADDRESS = "0x705a47ebc6fce487a3c64a2da64ce2e3b8b2ef55";

// USDC token info. reference: https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
export const USDC_ERC20_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const USDC_DECIMALS = 6;

export const USDC_TRANSFER_ABI = [
  // transfer
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];
