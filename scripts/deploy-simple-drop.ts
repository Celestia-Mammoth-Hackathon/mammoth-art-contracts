import { ethers, upgrades } from "hardhat";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const owner = signer.address;
  const name = "Modularium Drops";
  const platformRecipient = "0x1f95167C220d7B19EcA466Af76C54B1dB39c9186";
  const platformFee = 1000;

  const SimpleDropUpgradeable = await ethers.getContractFactory("SimpleDropUpgradeable");
  const c = await upgrades.deployProxy(SimpleDropUpgradeable, [name, owner, platformRecipient, platformFee]);
  await c.waitForDeployment();
  console.log("SimpleDropUpgradeable deployed to:", await c.getAddress());
})();

// sketchpad1: 0x122987bD1E1EaDCb0A68E220f272358B854159d7
