// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockPancakeRouter {
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // Mock WETH address
    
    // Mock swap function that just transfers tokens
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint /* amountOutMin */,
        address[] calldata path,
        address /* to */,
        uint deadline
    ) external payable {
        // In a real scenario, this would swap ETH for tokens
        // For testing, we'll just accept the ETH and emit an event
        require(msg.value > 0, "No ETH sent");
        require(deadline > block.timestamp, "Deadline passed");
        require(path.length >= 2, "Invalid path");
        
        // Mock successful swap - in reality this would transfer tokens to 'to'
        // For testing purposes, we just accept the ETH
    }
} 