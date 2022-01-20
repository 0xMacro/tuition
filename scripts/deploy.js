const hre = require("hardhat");

async function main() {
  const Tuition = await hre.ethers.getContractFactory("Tuition");
  const tuition = await Tuition.deploy(
    "0xE312146E8968f70FFd8Ab456EcF05de4c331a794",
    "0x92c9Ce45fdBA89F810F8580120adacB6e9e7657F"
  );

  await tuition.deployed();

  console.log("Tuition deployed to:", tuition.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
