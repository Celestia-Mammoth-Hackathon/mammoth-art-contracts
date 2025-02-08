import { ethers } from "hardhat";
import { BigNumber } from "bignumber.js";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const drop = {
    recipient: "0xD43a19826F7eD0B0eF68d83148C8E3873F832B0f", // recipient of drop mint revenue
    token: {
      tokenAddress: "0x62F0BEaAa650DEebF9e6Be13b19048af7bA9E712",
      tokenId: 0,
    },
    maxAllowed: 0,    // 0 mean unlimited
    maxPerWallet: 0,  // 0 mean unlimited
    maxPerToken: 0, // 0 mean unlimited
    maxPerBlock: 0, // 0 mean unlimited,
    reserves: 0, // 0 mean unlimited,
    startDate: Math.floor(new Date('2025-06-18T00:00:00Z').getTime() / 1000),
    endDate: Math.floor(new Date('2025-06-22T00:00:00Z').getTime() / 1000),
    price: new BigNumber(0.1).times(new BigNumber(10).pow(18)).toFixed(),
    // merkleRoot: ethers.encodeBytes32String(""), // no merkle root mints yet
    merkleRoot: "0x2222000000000000000000000000000000000000000000000000000000000000", // no merkle root mints yet,
  };

  const c = await ethers.getContractAt("SimpleDropUpgradeable", "0x1bC036834BA66EC8073Ced8c1d9490AD67A3A0bC");
  const res = await c.createDrop(drop);
  console.log(res);
})();
