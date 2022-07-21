async function main() {
  const Tuition = await ethers.getContractFactory("Tuition");
  console.log("Deploying tuition...");
  const tuition = await Tuition.deploy(
    "0xE312146E8968f70FFd8Ab456EcF05de4c331a794",
    "0x92c9Ce45fdBA89F810F8580120adacB6e9e7657F",
    ["0xE312146E8968f70FFd8Ab456EcF05de4c331a794"],
    "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557"
  );

  await tuition.deployed();
  console.log("Tuition deployed to:", tuition.address);

  if (network !== "localhost") {
    console.log("Waiting for 5 confirmations");
    await tuition.deployTransaction.wait(5);

    console.log("Uploading code to Etherscan");
    await hre.run("verify:verify", {
      address: tuition.address,
      constructorArguments: [
        "0xE312146E8968f70FFd8Ab456EcF05de4c331a794",
        "0x92c9Ce45fdBA89F810F8580120adacB6e9e7657F",
        ["0xE312146E8968f70FFd8Ab456EcF05de4c331a794"],
        "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557",
      ],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
