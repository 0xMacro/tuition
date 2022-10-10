# Tuition DApp

Live on [tuition.0xmacro.com](https://tuition.0xmacro.com)!

## Functionality

This dapp allows Macro's students to deposit their $5,000 USD payment in denominations of ETH or USDC to the DAO's treasury.

## Pricing display

The ETH -> USD conversion rate is determined by the Gemini API at the time of the transaction

## Future extensions

This dapp will be extended to add a Pay-To-Earn section.

Here, students will be able to do a precourse to get them up to the level required to apply for our main bootcamp, as well as earn the DAO's ERC20 token in the process.

### Getting Started

Below are steps you need in order to run locally

1. `yarn install`
2. `yarn run dev`

### Things to Keep in Mind:

- I deleted some of the ts/js utils related to contract since we are not using tuition contract and don't have to `yarn hardhat compile` in order to run app locally. if you want to add contract back in the front-end, you need to add `.env` variables and execute `yarn hardhat compile` to compile abi, etc.
