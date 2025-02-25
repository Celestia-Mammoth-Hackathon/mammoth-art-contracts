import { ethers, upgrades } from "hardhat";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const owner = signer.address;
  const name = "Mammoth Art Drops";
  const platformRecipient = "0x75B128c7AE715Ffe273433DbfF63097FDC10804d";
  const platformFee = 1000;

  const SimpleDropUpgradeable = await ethers.getContractFactory("SimpleDropUpgradeable");
  const c = await upgrades.deployProxy(SimpleDropUpgradeable, [name, owner, platformRecipient, platformFee]);
  await c.waitForDeployment();
  console.log("SimpleDropUpgradeable deployed to:", await c.getAddress());
})();

// sketchpad1: 0x122987bD1E1EaDCb0A68E220f272358B854159d7
