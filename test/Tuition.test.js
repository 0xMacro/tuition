const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Tuition contract", function () {
  beforeEach(async () => {
    [addr1, owner, addr2, treasury, ...addrs] = await ethers.getSigners();
    const Tuition = await ethers.getContractFactory("Tuition");
    tuition = await Tuition.deploy(owner.address, treasury.address);
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

    it("Only owner can move all funds to treasury", async () => {
      await expect(tuition.moveAllFundsToTreasury()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("Staff only", () => {
    it("Only staff can refund", async () => {
      await expect(
        tuition.connect(addr2).refundUser(addr1.address)
      ).to.be.revertedWith("STAFF_ONLY");
    });

    it("Only staff can move student funds to treasury", async () => {
      await expect(
        tuition.connect(addr2).moveStudentFundsToTreasury(addr1.address)
      ).to.be.revertedWith("STAFF_ONLY");
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

  describe("Refunds", () => {
    it("Refunds a student", async () => {
      await tuition.connect(addr2).payFullTuition({ value: parseEther("4") });

      await expect(() =>
        tuition.refundUser(addr2.address)
      ).to.changeEtherBalances(
        [tuition, addr2],
        [parseEther("-4"), parseEther("4")]
      );

      expect(await tuition.amountPaidBy(addr2.address)).to.be.equal(0);
      expect(await tuition.alreadyPaid(addr2.address)).to.be.false;
    });
  });

  describe("Moving to treasury", () => {
    it("Moves a student funds to treasury", async () => {
      await tuition.connect(addr2).payFullTuition({ value: parseEther("4") });

      await expect(() =>
        tuition.moveStudentFundsToTreasury(addr2.address)
      ).to.changeEtherBalances(
        [tuition, treasury],
        [parseEther("-4"), parseEther("4")]
      );

      expect(await tuition.amountPaidBy(addr2.address)).to.be.equal(0);
      expect(await tuition.alreadyPaid(addr2.address)).to.be.false;
    });

    it("Moves all contract funds to treasury", async () => {
      await tuition.connect(addr2).payFullTuition({ value: parseEther("4") });
      await tuition
        .connect(addrs[0])
        .payFullTuition({ value: parseEther("4") });
      await tuition
        .connect(addrs[1])
        .depositInsurance({ value: parseEther("1") });

      await expect(
        await tuition.connect(owner).moveAllFundsToTreasury()
      ).to.changeEtherBalance(treasury, parseEther("9"));
    });

    it("Blocks fund movement once all funds have been transferred treasury", async () => {
      await tuition.connect(owner).moveAllFundsToTreasury();

      await expect(
        tuition.connect(addr2).depositInsurance({ value: parseEther("1") })
      ).to.be.revertedWith("NOT_TAKING_PAYMENTS");

      await expect(
        tuition.connect(addr2).payFullTuition({ value: parseEther("4") })
      ).to.be.revertedWith("NOT_TAKING_PAYMENTS");

      await expect(tuition.refundUser(addr2.address)).to.be.revertedWith(
        "NOT_TAKING_PAYMENTS"
      );

      await expect(
        tuition.moveStudentFundsToTreasury(addr2.address)
      ).to.be.revertedWith("NOT_TAKING_PAYMENTS");
    });
  });

  describe("Adding/removing staff", () => {
    it("Adds staff", async () => {
      await tuition.connect(owner).addStaff(addr2.address);
      expect(await tuition.isStaff(addr2.address)).to.be.true;
    });

    it("Removes staff", async () => {
      await tuition.connect(owner).addStaff(addr2.address);
      await tuition.connect(owner).removeStaff(addr2.address);
      expect(await tuition.isStaff(addr2.address)).to.be.false;
    });
  });
});
