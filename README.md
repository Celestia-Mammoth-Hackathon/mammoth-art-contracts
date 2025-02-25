# 🎨 MammothArt Smart Contracts and Indexer - Dynamic NFT Platform

> A revolutionary NFT platform that creates dynamic, influence-based generative art NFTs on the blockchain.

## 🌟 Project Overview

MammothArt introduces a groundbreaking approach to NFT creation and valuation through our innovative "Influence System". This system dynamically affects NFT rarity and characteristics based on the collector's existing NFT portfolio, creating a more engaging and interconnected digital art ecosystem.

### 🔥 Key Features

- **Dynamic Rarity System**: NFT characteristics are influenced by the collector's existing NFT holdings
- **Upgradeable Smart Contracts**: Future-proof architecture using OpenZeppelin's UUPS pattern
- **Flexible Metadata Management**: Support for both pre-reveal placeholder and post-reveal metadata
- **Advanced Royalty System**: Configurable royalties at both collection and individual token levels
- **Secure Minting Controls**: Multi-role system with owner and minter separation

## 🛠 Technical Architecture

### Core Smart Contracts

- `GenerativeERC721Upgradeable.sol`: Main contract implementing the influence system
  - ERC721 compliant
  - Upgradeable architecture
  - Dynamic metadata management
  - Influence calculation system

### Influence System Algorithm

```solidity
function _calculateRanking(address _minter) internal view returns (uint256) {
    // Innovative ranking system that considers:
    // 1. Collector's existing NFT portfolio
    // 2. Influence weight of each NFT
    // 3. Dynamic boost calculations
    // Results in unique rarity characteristics
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

# Run tests
yarn test

# Deploy to testnet
yarn deploy:testnet
```

## 🧪 Testing

Our comprehensive test suite covers:
- Influence system calculations
- Minting mechanics
- Metadata management
- Access control
- Upgrade mechanisms

Run tests with:
```bash
yarn test
```

## 📊 Performance & Security

- ✅ Fully audited smart contracts
- 🔒 Role-based access control
- ⚡ Gas-optimized operations
- 🛡️ Emergency pause functionality
- 🔄 Upgradeable architecture

## 🌐 Deployment
- [Generative ERC721](https://explorer.sketchpad-1.forma.art/address/0x5a47Cf34ACf7e8cE83f80653263488049CA10eFb)
- [Drop Contract](https://explorer.sketchpad-1.forma.art/address/0x1bC036834BA66EC8073Ced8c1d9490AD67A3A0bC)
## 🏆 Hackathon Specific Achievements

- Implemented novel influence-based rarity system
- Created gas-efficient ranking algorithm
- Developed flexible metadata management system
- Built comprehensive testing framework
- Deployed fully functional testnet implementation

## 🔜 Future Roadmap

- [ ] Enhanced influence calculations
- [ ] Cross-chain NFT influence support
- [ ] Dynamic metadata rendering
- [ ] Community governance integration
- [ ] Advanced rarity visualization tools

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