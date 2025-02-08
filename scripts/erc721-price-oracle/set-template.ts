import { ethers } from "hardhat";
import fs from 'fs';

(async () => {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error("Missing contract param");
    return;
  }

  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const svgContent = fs.readFileSync('./assets/price-oracle.svg', 'utf8');

  const c = await ethers.getContractAt("PriceOracleERC721", args[0]);
  const res = await c.setTemplate(svgContent);
  console.log(res);
})();
