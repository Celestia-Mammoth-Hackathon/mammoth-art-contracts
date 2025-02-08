import { ethers, upgrades } from "hardhat";

(async () => {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error("Missing contract to upgrade");
    return;
  }

  console.log(`Upgrading PriceOracleERC721 implementation for proxy at ${args[0]}`);
  const PriceOracleERC721 = await ethers.getContractFactory("PriceOracleERC721");
  await upgrades.upgradeProxy(args[0], PriceOracleERC721);
  console.log("PriceOracleERC721 upgraded");
})();
