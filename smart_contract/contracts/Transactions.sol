// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Transactions {
    uint256 transactionCount;
    uint256 nftTransactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
    event NFTTransfer(address from, address receiver, uint256 tokenId);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
  struct NFTTransferStruct {
        address sender;
        address receiver;
        uint256 tokenId;
        
    }
    TransferStruct[] transactions;
    NFTTransferStruct[] nftTransactions;
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function addNFTToBlockchain(address payable receiver, uint256 tokenId) public {
        nftTransactionCount += 1;
        nftTransactions.push(NFTTransferStruct(msg.sender, receiver, tokenId));

        emit NFTTransfer(msg.sender, receiver, tokenId);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
    function getNFTTransactionCount() public view returns (uint256) {
        return nftTransactionCount;
    }
}