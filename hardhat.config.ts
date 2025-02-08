import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import '@openzeppelin/hardhat-upgrades';
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 150,
      },
      viaIR: true,
    },
  },
  defaultNetwork: "sketchpad",
  networks: {
    hardhat: {
    },
    local: {
      url: "http://localhost:8545",
      accounts: [PRIVATE_KEY || ""]
    },
    forma: {
      url: "https://rpc.forma.art",
      accounts: [PRIVATE_KEY || ""]
    },
    sketchpad: {
      url: "https://rpc.sketchpad-1.forma.art",
      accounts: [PRIVATE_KEY || ""]
    }
  },
  paths: {
    sources: "./contracts",
  },
  typechain: {
    outDir: './types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true,
    node16Modules: true,
  },
  mocha: {
    bail: true,
    import: 'tsx',
  },
  etherscan: {
    apiKey: {
      forma: "abc",
      sketchpad: "abc"
    },
    customChains: [
      {
        network: "forma",
        chainId: 984122,
        urls: {
          apiURL: "https://explorer.forma.art/api",
          browserURL: "https://explorer.forma.art"
        }
      },
      {
        network: "sketchpad",
        chainId: 984123,
        urls: {
          apiURL: "https://explorer.sketchpad-1.forma.art/api",
          browserURL: "https://explorer.sketchpad-1.forma.art"
        }
      }
    ]
  }
};

export default config;
