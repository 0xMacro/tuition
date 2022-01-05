const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tuition contract", function () {
  beforeEach(async () => {
    [addr1, owner, addr2, ...addrs] = await ethers.getSigners();
    const Tuition = await ethers.getContractFactory("Tuition");
    tuition = await Tuition.deploy(owner.address);
  });

  describe("Deployment", () => {
    it("Transfers ownership on deployment", async () => {
      const contractOwner = await tuition.owner();
      expect(contractOwner).to.be.equal(owner.address);
    });

    it("Makes the deployer part of staff", async () => {
      const isAddr1Staff = await tuition.isStaff(addr1.address);
      expect(isAddr1Staff).to.be.true;
    });
  });

  describe("Owner only", () => {
    it("Only owner can add staff", async () => {
      await expect(tuition.addStaff(addr2.address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("Only owner can remove staff", async () => {
      tuition.connect(owner).addStaff(addr2.address);

      await expect(tuition.removeStaff(addr2.address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("Staff only", () => {});

  describe("Payments", () => {});

  describe("Refunds", () => {});

  describe("Moving to treasury", () => {});
});
