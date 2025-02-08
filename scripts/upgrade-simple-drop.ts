import { ethers, upgrades } from "hardhat";

(async () => {
  const SimpleDropUpgradeable = await ethers.getContractFactory("SimpleDropUpgradeable");
  await upgrades.upgradeProxy("0x122987bD1E1EaDCb0A68E220f272358B854159d7", SimpleDropUpgradeable);
  console.log("SimpleDropUpgradeable upgraded");
})();
