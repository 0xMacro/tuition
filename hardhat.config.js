require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
    },
  },
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/A9KUAS0SsxwLBn6vvEXKoE792wahEAWD",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
