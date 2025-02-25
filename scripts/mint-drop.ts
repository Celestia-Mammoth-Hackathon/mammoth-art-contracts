import { ethers } from "hardhat";
import { BigNumber } from "bignumber.js";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const mint = {
    _dropId: 8,
    _qty: 1,
    _recipient: "0xAFCaf48bE2e70F26759e519716b5431eF87c4Fb0",
    _merkleRoot: [], // no merkle root mints yet
  };

  const c = await ethers.getContractAt("SimpleDropUpgradeable", "0x4Bc6C96b6996ecFDF55059d091b38A5EF2836aA0");

  const res = await c.mint(mint._dropId, mint._qty, mint._recipient, mint._merkleRoot, {
    value: new BigNumber(0.5 * mint._qty).times(new BigNumber(10).pow(18)).toFixed(),
  });
  console.log(res);
})();
