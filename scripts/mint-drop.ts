import { ethers } from "hardhat";
import { BigNumber } from "bignumber.js";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const mint = {
    _dropId: 5,
    _qty: 1,
    _recipient: "0x1d496375989b99EBCD89AD9e56494C39F74B7603",
    _merkleRoot: [], // no merkle root mints yet
  };

  const c = await ethers.getContractAt("SimpleDropUpgradeable", "0x122987bD1E1EaDCb0A68E220f272358B854159d7");

  const res = await c.mint(mint._dropId, mint._qty, mint._recipient, mint._merkleRoot, {
    value: new BigNumber(0.1 * mint._qty).times(new BigNumber(10).pow(18)).toFixed(),
  });
  console.log(res);
})();
