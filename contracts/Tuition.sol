//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tuition is Ownable {
    address public constant TREASURY =
        0x705a47eBC6fCE487a3C64A2dA64cE2E3B8b2EF55;

    mapping(address => bool) public isStaff;
    mapping(address => bool) public alreadyPaid;
    mapping(address => uint256) public amountPaidBy;

    constructor(address newOwner) {
        isStaff[msg.sender] = true;
        transferOwnership(newOwner);
    }

    modifier onlyStaff() {
        require(isStaff[msg.sender] || msg.sender == owner(), "STAFF_ONLY");
        _;
    }

    function depositInsurance() public payable {
        require(msg.value == 1 ether, "DEPOSIT_COSTS_1_ETHER");
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");

        alreadyPaid[msg.sender] = true;
    }

    function payFullTuition() public payable {
        require(msg.value == 4 ether, "FULL_TUITION_COSTS_4_ETHER");
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");

        alreadyPaid[msg.sender] = true;
    }

    function refundUser(address account) public onlyStaff {
        require(alreadyPaid[account], "NOTHING_TO_REFUND");
        require(amountPaidBy[account] > 0, "NOTHING_TO_REFUND");

        uint256 amountToRefund = amountPaidBy[account];
        amountPaidBy[account] = 0;
        alreadyPaid[msg.sender] = false;

        (bool success, ) = account.call{value: amountToRefund}("");
        require(success, "TRANSFER_FAILED");
    }

    function moveStudentFundsToTreasury(address student) public onlyStaff {
        require(alreadyPaid[student], "NO_FUNDS_AVAILABLE");
        require(amountPaidBy[student] > 0, "NO_FUNDS_AVAILABLE");

        (bool success, ) = TREASURY.call{value: amountPaidBy[student]}("");
        require(success, "TRANSFER_FAILED");
    }

    function addStaff(address account) public onlyOwner {
        isStaff[account] = true;
    }

    function removeStaff(address account) public onlyOwner {
        isStaff[account] = false;
    }
}
