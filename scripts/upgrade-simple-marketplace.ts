import { ethers, upgrades } from "hardhat";

(async () => {
  const SimpleMarketplaceUpgradeable = await ethers.getContractFactory("SimpleMarketplaceUpgradeable");
  await upgrades.upgradeProxy("0x83c62Cc36B792eE22ba14e74E07Ab05eC2630d1b", SimpleMarketplaceUpgradeable);
  console.log("SimpleMarketplaceUpgradeable upgraded");
})();
