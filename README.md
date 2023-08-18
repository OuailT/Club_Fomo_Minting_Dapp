# ClubFOMO NFT Minting DApp

Mint unique, non-fungible tokens (NFTs) with ClubFOMO's DApp on the Ethereum blockchain. I've developed this project for a client that has only one NFT, which was sold for 13.85ETH. At the time of minting, this was equivalent to $25,000.

<a href="https://ibb.co/LpngLYr"><img src="https://i.ibb.co/Thm0VY1/Club-Fomo-screenshot.png" alt="Club-Fomo-screenshot" border="0"></a>


## Technologies

- **Front-end**: ReactJS
- **Smart Contract Language**: Solidity
- **Blockchain**: Ethereum Mainnet
- **Testing**: Foundry

## Smart Contract Overview

`ClubFOMOVIP` is an ERC721 token representing Club FOMO's Legendary VIP collection. It leverages OpenZeppelin's library for solidity standards, ensuring security and efficiency. 

### Key Features:

1. **Limited Supply**: A maximum supply of tokens that can be minted, ensuring exclusivity.
2. **Price**: Set token price for minting.
3. **Metadata Extensions**: Enable detailed metadata association with NFTs.
4. **Reveal Mechanism**: Facilitates revealing the NFT metadata after a certain event.
5. **Payment Splitter**: Allows for funds to be split amongst several accounts.

### Contract Functions:

- `mint(uint256 _quantity)`: Allows users to mint NFTs.
- `tokenURI(uint _nftId)`: Retrieve the URI of a specific NFT.
- `setNotRevealURI(string memory _notRevealedURI)`: Set the unrevealed URI.
- `setBaseExtension(string memory _baseExtension)`: Modify the base extension of the metadata files.
- `setBaseURI(string memory _newBaseURI)`: Change the base URI.
- `setMaxSupply(uint256 _maxSupply)`: Adjust the max supply of NFTs.
- `_baseURI()`: Return the current base URI.
- `reveal()`: Toggle to reveal NFT metadata.
- `releaseAll()`: Release funds to the specified accounts.

### Contract Address

[View ClubFOMO Smart Contract on Ethereum Mainnet](https://etherscan.io/address/0x363cF0303Bb99958011dAED7578A65FDb3209bB8)

## Local Setup

1. **Clone the Repository**:
```
git clone <repository-url>
```

3. **Install Dependencies**:
```
npm install
```

5. **Start the DApp**:
```
npm start
```

## Foundry Test
Follow the [instructions](https://book.getfoundry.sh/getting-started/installation.html) to install [Foundry](https://github.com/foundry-rs/foundry).

Clone and install dependencies:git submodule update --init --recursive  
Test Contract: ```forge test --contracts ./src/test/ClubFomoTest.t.sol -vvvv```

Visit `http://localhost:3000/` to interact with the decentralizd application.  
