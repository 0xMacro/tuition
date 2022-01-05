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
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");
        require(msg.value == 1 ether, "DEPOSIT_COSTS_1_ETHER");

        alreadyPaid[msg.sender] = true;
        amountPaidBy[msg.sender] = 1 ether;
    }

    function payFullTuition() public payable {
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");
        require(msg.value == 4 ether, "FULL_TUITION_COSTS_4_ETHER");

        alreadyPaid[msg.sender] = true;
        amountPaidBy[msg.sender] = 4 ether;
    }

    function refundUser(address account) public onlyStaff {
        require(alreadyPaid[account], "STUDENT_DIDNT_PAY");
        require(amountPaidBy[account] > 0, "NOTHING_TO_REFUND");

        uint256 amountToRefund = amountPaidBy[account];
        amountPaidBy[account] = 0;
        alreadyPaid[account] = false;

        (bool success, ) = account.call{value: amountToRefund}("");
        require(success, "TRANSFER_FAILED");
    }

    function moveStudentFundsToTreasury(address student) public onlyStaff {
        require(alreadyPaid[student], "STUDENT_DIDNT_PAY");
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

    // In case of an emergency

    function moveAllFundsToTreasury() public onlyOwner {
        (bool success, ) = TREASURY.call{value: address(this).balance}("");
        require(success, "TRANSFER_FAILED");
    }
}
