import { createConfig } from "@ponder/core";
import { http } from "viem";
import { simpleDropUpgradeableAbi } from "./abi/simpleDropUpgradeable";
import { simpleMarketplaceUpgradeableAbi } from "./abi/simpleMarketplaceUpgradeable";
import { generativeERC721UpgradeableAbi } from "./abi/generativeERC721Upgradeable";

export default createConfig({
  networks: {
    mainnet: {
      chainId: Number(process.env.PONDER_CHAIN_ID),
      transport: http(process.env.PONDER_RPC_URL),
    },
  },
  database: {
    kind: "postgres",
  },
  contracts: {
    Drop: {
      network: "mainnet",
      abi: simpleDropUpgradeableAbi,
      address: process.env.PONDER_DROP_ADDRESS! as `0x${string}`,
      startBlock: Number(process.env.PONDER_START_BLOCK),
    },
    Marketplace: {
      network: "mainnet",
      abi: simpleMarketplaceUpgradeableAbi,
      address: process.env.PONDER_MARKETPLACE_ADDRESS! as `0x${string}`,
      startBlock: Number(process.env.PONDER_START_BLOCK),
    },
    GenerativeERC721: {
      network: "mainnet",
      abi: generativeERC721UpgradeableAbi,
      address: process.env.PONDER_GENERATIVE_ERC721_ADDRESSES! as `0x${string}`,
      startBlock: Number(process.env.PONDER_START_BLOCK),
    }
  },
});
