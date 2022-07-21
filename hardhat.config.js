require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.6.0",
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
            details: {
              yul: true,
              yulDetails: {
                stackAllocation: true,
                optimizerSteps: "dhfoDgvulfnTUtnIf",
              },
            },
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY,
    },
  },
  networks: {
    goerli: {
      url: process.env.ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
