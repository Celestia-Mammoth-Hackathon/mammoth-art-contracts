# 🔍 MammothArt Indexer

> High-performance indexer for MammothArt's dynamic NFT platform with GraphQL API support.

## 🌟 Overview

MammothArt Indexer provides real-time tracking and querying capabilities for our dynamic NFT ecosystem. Built with Ponder, it enables efficient data retrieval through GraphQL for NFT metadata, influence calculations, and marketplace activities.

## ⚡ Key Features

- **Real-time Indexing**: Track NFT mints, transfers, and metadata updates
- **GraphQL API**: Flexible queries for NFT data and market analytics
- **Dynamic Influence Tracking**: Monitor NFT influence calculations
- **High Performance**: Optimized for quick data retrieval
- **Multi-Contract Support**: Index multiple NFT collections simultaneously

## 🔍 GraphQL Examples

```graphql
# Query all drops created by a specific address
query AllDrops {
  drops(
    orderBy: "id"
    orderDirection: "desc"
    where: {creator: "${address}"}
  ) {
    items {
      id
      startDate
      endDate
      maxAllowed
      maxPerWallet
      price
      tokenAddress
      tokenId
      minted
      merkleRoot
      creator
    }
  }
}

# Get user's NFT portfolio
query AccountTokenBalances {
    account(
      id: "${address}"
      
    ) {
      id
      tokens(limit: 1000, where: {balance_gt: "0"}) {
        items {
          tokenAddress
          tokenId
          balance
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
```

## 🚀 Quick Start


### Installation
```bash
# Configure environment
# Create .env file with:
PONDER_RPC_URL=https://rpc.sketchpad-1.forma.art
PONDER_CHAIN_ID=984123
PONDER_START_BLOCK=584693
PONDER_DROP_ADDRESS=
PONDER_MARKETPLACE_ADDRESS=
PONDER_GENERATIVE_ERC721_ADDRESSES=
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

# Start indexer
yarn dev
```

## 🌐 Deployment
- **Indexer API**: [https://mammoth-bros-contracts-production.up.railway.app/](https://mammoth-bros-contracts-production.up.railway.app/)
- **Contracts Being Indexed**:
  - [Drop Contract](https://explorer.sketchpad-1.forma.art/address/0x1bC036834BA66EC8073Ced8c1d9490AD67A3A0bC)
  - [All Generative ERC721]
  - [All accounts interacting with the contracts]
  - [All nft minted from the contracts]


## 👥 Team

- **Lead Smart Contract Developer**: [HuyDo](https://github.com/huydo2105)
- **Technical Architect**: [Loc Luong](https://github.com/locluong2107)
- **Smart Contract Developer**: [Duc Anh Pham](https://github.com/daph147)

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for the Mammoth Hackathon 2024
</p>