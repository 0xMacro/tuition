//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tuition is Ownable {
    address public TREASURY;
    bool public allowPayments = true;
    mapping(address => bool) public isStaff;
    mapping(address => bool) public alreadyPaid;
    mapping(address => uint256) public amountPaidBy;

    constructor(address newOwner, address treasury) {
        isStaff[msg.sender] = true;
        TREASURY = treasury;
        transferOwnership(newOwner);
    }

    modifier onlyStaff() {
        require(isStaff[msg.sender] || msg.sender == owner(), "STAFF_ONLY");
        _;
    }

    modifier contractNotLocked() {
        require(allowPayments, "NOT_TAKING_PAYMENTS");
        _;
    }

    function depositInsurance() public payable contractNotLocked {
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");
        require(msg.value == 1 ether, "DEPOSIT_COSTS_1_ETHER");

        alreadyPaid[msg.sender] = true;
        amountPaidBy[msg.sender] = 1 ether;
    }

    function payFullTuition() public payable contractNotLocked {
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");
        require(msg.value == 4 ether, "FULL_TUITION_COSTS_4_ETHER");

        alreadyPaid[msg.sender] = true;
        amountPaidBy[msg.sender] = 4 ether;
    }

    function refundUser(address account) public onlyStaff contractNotLocked {
        require(alreadyPaid[account], "STUDENT_DIDNT_PAY");
        require(amountPaidBy[account] > 0, "NOTHING_TO_REFUND");

        uint256 amountToRefund = amountPaidBy[account];
        amountPaidBy[account] = 0;
        alreadyPaid[account] = false;

        (bool success, ) = account.call{value: amountToRefund}("");
        require(success, "TRANSFER_FAILED");
    }

    function moveStudentFundsToTreasury(address account)
        public
        onlyStaff
        contractNotLocked
    {
        require(alreadyPaid[account], "STUDENT_DIDNT_PAY");
        require(amountPaidBy[account] > 0, "NO_FUNDS_AVAILABLE");

        uint256 amountToMove = amountPaidBy[account];
        amountPaidBy[account] = 0;
        alreadyPaid[account] = false;

        (bool success, ) = TREASURY.call{value: amountToMove}("");
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
        allowPayments = false;
    }
}
