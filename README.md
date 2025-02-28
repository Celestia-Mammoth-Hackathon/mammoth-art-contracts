# 🎨 MammothArt Smart Contracts and Indexer - Dynamic NFT Platform

> A revolutionary NFT platform that creates dynamic, influence-based generative art NFTs with permanent on-chain metadata powered by Forma blockchain.

## 🌟 Project Overview

MammothArt introduces a groundbreaking approach to NFT creation and valuation through our innovative "Influence System". This system dynamically affects NFT rarity and characteristics based on the collector's existing NFT portfolio, creating a more engaging and interconnected digital art ecosystem. Built on Forma blockchain, our platform ensures true decentralization by storing all NFT metadata directly on-chain, guaranteeing permanent and immutable access to your digital assets.

### 🔥 Key Features

- **True On-Chain Metadata**: 
  - All NFT metadata stored directly on Forma blockchain
  - No reliance on external IPFS or centralized storage
  - Permanent and immutable metadata access
  - Gas-efficient storage using Forma's CompressedJSON
  - Complete metadata history preserved on-chain

- **Dynamic Rarity System**: NFT characteristics are influenced by the collector's existing NFT holdings
- **Upgradeable Smart Contracts**: Future-proof architecture using OpenZeppelin's UUPS pattern
- **Advanced Royalty System**: Configurable royalties at both collection and individual token levels
- **Secure Minting Controls**: Multi-role system with owner and minter separation

## 🛠 Technical Architecture

### Core Smart Contracts

- `GenerativeERC721Upgradeable.sol`: Main contract implementing the influence system
  - ERC721 compliant with on-chain metadata storage
  - Upgradeable architecture
  - Dynamic metadata management using Forma's CompressedJSON
  - Influence calculation system

### 💾 On-Chain Metadata System

```solidity
// Example of on-chain metadata storage using Forma's CompressedJSON
function _setTokenMetadata(uint256 tokenId, string memory metadata) internal {
    // Metadata is compressed and stored directly on-chain
    bytes memory compressedMetadata = CompressedJSON.wrap(metadata);
    // Store metadata permanently on Forma blockchain
}

// Metadata can be updated while maintaining full history
function reveal(uint256[] calldata _tokenIds, string[] calldata _metadata) external {
    // Updates metadata on-chain with new revealed data
    // Includes ranking and influence calculations
}
```


### 🎯 Dynamic Ranking System with Forma Collections

Our platform introduces an innovative ranking system that leverages existing Forma collections as influence factors:

- **Collection-Based Influence**:
  - NFT rankings are determined by ownership of specific Forma collections
  - Each influencing collection can affect the ranking calculation
  - Multiple NFTs from the same collection can stack influence
  - Real-time ranking updates based on ownership changes

```solidity
// Example of ranking calculation using Forma collections
struct InfluencingNFT {
    address tokenAddress;  // Forma collection address
    uint256 tokenId;      // Specific NFT ID from collection
}

function _calculateRanking(address _minter, uint256 collectionSize) internal view returns (uint256) {
    // Count influencing NFTs owned by minter

    // Check ownership of specified Forma collections

    // Generate base ranking and apply boost based on owned NFTs
}
```


## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- Yarn package manager
- Hardhat development environment

### Quick Start
```bash
# Clone repository
git clone https://github.com/Celestia-Mammoth-Hackathon/mammoth-bros-contracts.git

# Install dependencies
yarn install

# Set up environment
cp .env.example .env
# Add your private key and RPC URL to .env

# Build contracts
yarn build


## 🧪 Testing

Our comprehensive test suite covers:
- Deploying generative ERC-721 contracts
- Deploying drop contract
- Testing generative ERC-721 contracts
- Creating drop
- Minting drop

Run tests with:
```bash
yarn testnet:deploy:generative-erc721
yarn testnet:deploy:simple-drop
yarn testnet:test:generative-erc721
yarn testnet:create-drop
yarn testnet:mint-drop

```

## 📊 Performance & Security

- ✅ Fully audited smart contracts
- 🔒 Role-based access control
- ⚡ Gas-optimized metadata storage using Forma's compression
- 🛡️ Emergency pause functionality
- 🔄 Upgradeable architecture
- 💾 100% on-chain metadata storage

## 🌐 Deployment
- [Generative ERC721](https://explorer.sketchpad-1.forma.art/address/0x5a47Cf34ACf7e8cE83f80653263488049CA10eFb)
- [Drop Contract](https://explorer.sketchpad-1.forma.art/address/0x1bC036834BA66EC8073Ced8c1d9490AD67A3A0bC)

## 🏆 Hackathon Specific Achievements

- Implemented novel influence-based rarity system
- **Leveraged Forma blockchain's native on-chain metadata capabilities**
- Created gas-efficient ranking algorithm with compressed storage
- Developed permanent on-chain metadata management system
- Built comprehensive testing framework
- Deployed fully functional testnet implementation

## 🔜 Future Roadmap

- [ ] Enhanced influence calculations
- [ ] Cross-chain NFT influence support
- [ ] Advanced on-chain metadata rendering
- [ ] Community governance integration
- [ ] Advanced rarity visualization tools
- [ ] Metadata compression optimizations

## 👥 Team

- **Lead Smart Contract Developer**: [HuyDo](https://github.com/huydo2105)
- **Technical Architect**: [Loc Luong](https://github.com/locluong2107)
- **Smart Contract Developer**: [Duc Anh Pham](https://github.com/daph147)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please check our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

<p align="center">
  Built with ❤️ for the Mammoth Hackathon 2024
</p>