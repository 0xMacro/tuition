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
        // Owner should be considered part of staff
        require(isStaff[msg.sender] || msg.sender == owner(), "STAFF_ONLY");
        _;
    }

    modifier contractNotLocked() {
        require(allowPayments, "NOT_TAKING_PAYMENTS");
        _;
    }

    /**
     * Takes a 1 ETH or 4 ETH contribution from a student
     */
    function contribute() public payable contractNotLocked {
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");
        require(msg.value == 1 ether || msg.value == 4 ether, "WRONG_AMOUNT");

        alreadyPaid[msg.sender] = true;
        amountPaidBy[msg.sender] = msg.value;
    }

    /**
     * Allows staff to refund the entirety of a student's contribution
     * @param account Student address to be refunded
     */
    function refundUser(address account) public onlyStaff contractNotLocked {
        require(alreadyPaid[account], "STUDENT_DIDNT_PAY");
        require(amountPaidBy[account] > 0, "NOTHING_TO_REFUND");

        uint256 amountToRefund = amountPaidBy[account];
        amountPaidBy[account] = 0;
        alreadyPaid[account] = false;

        (bool success, ) = account.call{value: amountToRefund}("");
        require(success, "TRANSFER_FAILED");
    }

    /**
     * Allows staff to move a student's funds to treasury
     * @param account Contributer of the funds to move to the treasury
     */
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

    /**
     * @dev This function should only be used in case of an emergency to move all
     *      funds to the treasury, it will permanently lock the contract
     */
    function moveAllFundsToTreasury() public onlyOwner {
        (bool success, ) = TREASURY.call{value: address(this).balance}("");
        require(success, "TRANSFER_FAILED");
        allowPayments = false;
    }
}
