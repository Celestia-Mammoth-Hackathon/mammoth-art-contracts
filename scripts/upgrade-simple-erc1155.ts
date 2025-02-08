import { ethers, upgrades } from "hardhat";

(async () => {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error("Missing contract to upgrade");
    return;
  }

  console.log(`Upgrading SimpleERC1155Upgradeable implementation for proxy at ${args[0]}`);
  const SimpleERC1155Upgradeable = await ethers.getContractFactory("SimpleERC1155Upgradeable");
  await upgrades.upgradeProxy(args[0], SimpleERC1155Upgradeable);
  console.log("SimpleERC1155Upgradeable upgraded");
})();
