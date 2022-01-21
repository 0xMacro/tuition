async function main() {
  const Tuition = await ethers.getContractFactory("Tuition");
  console.log("Deploying tuition...");
  const tuition = await Tuition.deploy(
    "0x1984EDf70973E1389548F21cD0DCb15b408240c9",
    "0x92c9Ce45fdBA89F810F8580120adacB6e9e7657F",
    ["0xE312146E8968f70FFd8Ab456EcF05de4c331a794"]
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
