// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPancakeRouterV2 {
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function WETH() external pure returns (address);
}

contract AutoInteractionBot is Ownable, ReentrancyGuard {
    address public immutable trustedExecutor;
    address public immutable whitelistedRouter; // PancakeSwap V2 router

    event Deposit(address indexed user, uint amount);
    event Withdraw(address indexed user, uint amount);
    event SwapExecuted(
        address indexed executor, uint amountIn, address indexed tokenOut, uint amountOutMin, uint timestamp
    );

    modifier onlyTrustedExecutor() {
        require(msg.sender == trustedExecutor, "Not executor");
        _;
    }

    constructor(address _trustedExecutor, address _router) Ownable(msg.sender) {
        require(_trustedExecutor != address(0), "Bad executor");
        require(_router != address(0), "Bad router");
        trustedExecutor = _trustedExecutor;
        whitelistedRouter = _router;
    }

    // Accept BNB from the owner only
    receive() external payable {
        require(msg.sender == owner(), "Only owner");
        emit Deposit(msg.sender, msg.value);
    }
    /**
     * @dev Explicit deposit for the owner
     */
    function deposit() public payable onlyOwner nonReentrant {
        require(msg.value > 0, "No BNB sent");
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Withdraw BNB
     */
    function withdraw(uint amount) external onlyOwner nonReentrant {
        require(amount > 0 && address(this).balance >= amount, "Insufficient");
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send BNB");
        emit Withdraw(msg.sender, amount);
    }

    /**
     * @dev Swap BNB to a token on PancakeSwap.
     * Only the trusted executor can call this.
     * - `tokenOut` is the target token to receive.
     * - `amountOutMin` and `deadline` standard DEX protections.
     * - Path is always [WBNB, tokenOut].
     */
    function executeSafeSwap(
        address tokenOut,
        uint amountIn,
        uint amountOutMin,
        uint deadline
    ) external onlyTrustedExecutor nonReentrant {
        require(amountIn > 0 && address(this).balance >= amountIn, "Insufficient BNB");
        require(tokenOut != address(0), "Invalid token");

        address[] memory path = new address[](2);
        path[0] = IPancakeRouterV2(whitelistedRouter).WETH();
        path[1] = tokenOut;

        IPancakeRouterV2(whitelistedRouter).swapExactETHForTokensSupportingFeeOnTransferTokens{ value: amountIn }(
            amountOutMin,
            path,
            address(this),
            deadline
        );

        emit SwapExecuted(msg.sender, amountIn, tokenOut, amountOutMin, block.timestamp);
    }

    // Emergency fallback for the owner to change the executor (optional)
    function transferBotOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }
}