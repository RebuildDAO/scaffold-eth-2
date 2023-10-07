// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProjectProposal is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    mapping(uint256 => uint256) public fundingGoals;
    mapping(uint256 => string) public locations;
    mapping(uint256 => string) public names;
    mapping(uint256 => string) public descriptions;
    mapping(uint256 => string) public urls;
    mapping(uint256 => uint256) public fundsRaised;
    
    constructor() ERC721("ProjectProposal", "PP") {}

    function createProposal(string memory name, string memory description,
        string memory uri, uint256 fundingGoal, string memory location) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        
        fundingGoals[tokenId] = fundingGoal;
        locations[tokenId] = location;
        names[tokenId] = name;
        descriptions[tokenId] = description;

        _tokenIdCounter.increment();
        return tokenId;
    }

    function doTransaction(uint256 tokenId) public payable {
        require(fundsRaised[tokenId] + msg.value <= fundingGoals[tokenId], "Funding goal would be exceeded.");

        fundsRaised[tokenId] += msg.value;
        
        // Transfer the funds to the owner of the contract
        payable(owner()).transfer(msg.value);
    }
}
