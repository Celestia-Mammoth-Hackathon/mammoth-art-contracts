import { ethers } from "hardhat";
import { BigNumber } from "bignumber.js";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const drop = {
    recipient: "0x75B128c7AE715Ffe273433DbfF63097FDC10804d", // recipient of drop mint revenue
    token: {
      tokenAddress: "0xCc12A832ac19A62e23e9A250370cf923c69A3189",
      // tokenAddress: "0x6fd7eac0c417D068A424d0ef5eF9d3b058c05580",
      // tokenAddress: "0x15558b1214FEA5D83eBB0f27889C98Bfae3DCD1b",
      tokenId: 0,
    },
    maxAllowed: 100,    // 0 mean unlimited
    maxPerWallet: 0,  // 0 mean unlimited
    maxPerToken: 0, // 0 mean unlimited
    maxPerBlock: 0, // 0 mean unlimited,
    reserves: 0, // 0 mean unlimited,
    startDate: Math.floor(new Date('2025-02-08T00:00:00Z').getTime() / 1000),
    endDate: Math.floor(new Date('2025-06-22T00:00:00Z').getTime() / 1000),
    price: new BigNumber(0.2).times(new BigNumber(10).pow(18)).toFixed(),
    merkleRoot: ethers.encodeBytes32String(""), // no merkle root mints yet
    // merkleRoot: "0x2222000000000000000000000000000000000000000000000000000000000000", // no merkle root mints yet,
  };

  const c = await ethers.getContractAt("SimpleDropUpgradeable", "0x4Bc6C96b6996ecFDF55059d091b38A5EF2836aA0");
  const res = await c.createDrop(drop);
  console.log(res);
})();
