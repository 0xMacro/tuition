const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
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

  describe("Payments", () => {
    describe("Deposits", () => {
      it("Reverts if not exactly 1 ETH", async () => {
        await expect(
          tuition.connect(addr2).depositInsurance({ value: parseEther("1.1") })
        ).to.be.revertedWith("DEPOSIT_COSTS_1_ETHER");
      });

      it("Student can deposit 1 ETH", async () => {
        await tuition
          .connect(addr2)
          .depositInsurance({ value: parseEther("1") });

        const studentPaid = await tuition.alreadyPaid(addr2.address);
        expect(studentPaid).to.be.true;
      });

      it("Reverts if student already paid", async () => {
        await tuition
          .connect(addr2)
          .depositInsurance({ value: parseEther("1") });

        await expect(
          tuition.connect(addr2).depositInsurance({ value: parseEther("1") })
        ).to.be.revertedWith("ALREADY_PAID");
      });
    });

    describe("Full tuition payment", () => {
      it("Reverts if not exactly 4 ETH", async () => {
        await expect(
          tuition.connect(addr2).payFullTuition({ value: parseEther("4.1") })
        ).to.be.revertedWith("FULL_TUITION_COSTS_4_ETHER");
      });

      it("Student can pay full tuition for 4 ETH", async () => {
        await tuition.connect(addr2).payFullTuition({ value: parseEther("4") });

        const studentPaid = await tuition.alreadyPaid(addr2.address);
        expect(studentPaid).to.be.true;
      });

      it("Reverts if student already paid", async () => {
        await tuition.connect(addr2).payFullTuition({ value: parseEther("4") });

        await expect(
          tuition.connect(addr2).payFullTuition({ value: parseEther("4") })
        ).to.be.revertedWith("ALREADY_PAID");
      });
    });
  });

  describe("Staff only", () => {});

  describe("Refunds", () => {});

  describe("Moving to treasury", () => {});
});
