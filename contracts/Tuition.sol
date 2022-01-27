//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tuition is Ownable {
    address public TREASURY;
    bool public locked;
    mapping(address => bool) public isStaff;
    mapping(address => bool) public alreadyPaid;
    mapping(address => uint256) public balance;

    constructor(
        address newOwner,
        address treasury,
        address[] memory initialStaff
    ) {
        for (uint256 i = 0; i < initialStaff.length; i++) {
            isStaff[initialStaff[i]] = true;
        }
        TREASURY = treasury;
        transferOwnership(newOwner);
    }

    modifier onlyStaff() {
        // Owner should be considered part of staff
        require(isStaff[msg.sender] || msg.sender == owner(), "STAFF_ONLY");
        _;
    }

    modifier contractNotLocked() {
        require(!locked, "NOT_TAKING_PAYMENTS");
        _;
    }

    /**
     * Takes a 1 ETH or 4 ETH contribution from a student
     */
    function contribute() external payable contractNotLocked {
        require(!alreadyPaid[msg.sender], "ALREADY_PAID");
        require(msg.value == 1 ether || msg.value == 4 ether, "WRONG_AMOUNT");

        alreadyPaid[msg.sender] = true;
        balance[msg.sender] = msg.value;
    }

    /**
     * Allows staff to refund the entirety of a student's contribution
     * @param account Student address to be refunded
     */
    function refundUser(address account) external onlyStaff contractNotLocked {
        require(alreadyPaid[account], "STUDENT_DIDNT_PAY");
        require(balance[account] > 0, "NOTHING_TO_REFUND");

        uint256 amountToRefund = balance[account];
        balance[account] = 0;
        alreadyPaid[account] = false;

        (bool success, ) = account.call{value: amountToRefund}("");
        require(success, "TRANSFER_FAILED");
    }

    /**
     * Allows staff to move a student's funds to treasury
     * @param account Contributor of the funds to move to the treasury
     */
    function moveStudentFundsToTreasury(address account)
        external
        onlyStaff
        contractNotLocked
    {
        require(alreadyPaid[account], "STUDENT_DIDNT_PAY");
        require(balance[account] > 0, "NO_FUNDS_AVAILABLE");

        uint256 amountToMove = balance[account];
        balance[account] = 0;
        alreadyPaid[account] = false;

        (bool success, ) = TREASURY.call{value: amountToMove}("");
        require(success, "TRANSFER_FAILED");
    }

    /**
     * @param account Account to add/remove of staff
     * @param isAddingStaff Boolean variable that will add or remove the account as staff
     */
    function manageStaff(address account, bool isAddingStaff)
        external
        onlyOwner
    {
        isStaff[account] = isAddingStaff;
    }

    /**
     * @param newTreasury New treasury address
     */
    function changeTreasuryAddress(address newTreasury) external onlyOwner {
        TREASURY = newTreasury;
    }

    /**
     * @dev This function should only be used in case of an emergency or a redeployment
     *      to move all funds to the treasury, it will permanently lock the contract
     */
    function permanentlyMoveAllFundsToTreasuryAndLockContract()
        external
        onlyOwner
    {
        locked = true;
        (bool success, ) = TREASURY.call{value: address(this).balance}("");
        require(success, "TRANSFER_FAILED");
    }
}
