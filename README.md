## Getting Started

### Prerequisites
- Node.js 16.x or higher
- Yarn package manager
- Hardhat development environment

### Installation
1. Clone the repository
```bash
git clone https://github.com/FormaArt/contracts.git
```

2. Install dependencies
```bash
cd contracts
yarn install
```

3. Create a `.env` file with the following variables:
```
PRIVATE_KEY=your_private_key_here
RPC_URL=your_rpc_url_here
```

### Usage

#### Compile Contracts
```bash
yarn compile
```

#### Run Tests
```bash
yarn test
```

#### Deploy Contracts
```bash
yarn deploy:network
```
Replace `network` with your target network (mainnet, goerli, etc.)

## Smart Contracts

### Core Contracts
- `FormaMarketplace.sol`: Main marketplace contract for NFT trading
- `GenerativeERC721.sol`: Base contract for generative art NFTs
- `Drop.sol`: Contract for managing NFT drops

### Contract Addresses
- Mainnet:
  - Marketplace: `[address]`
  - Drop: `[address]`
- Testnet:
  - Marketplace: `[address]`
  - Drop: `[address]`



## License
[Add license information]

