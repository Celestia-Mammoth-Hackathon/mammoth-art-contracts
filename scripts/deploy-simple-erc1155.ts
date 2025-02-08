import { ethers, upgrades } from "hardhat";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const collectionName = "Test Collection 456";
  const royaltyRecipient = "0x45BE33bFD6fC8D4448B7FA603Db753A5f69a29f3";
  const royaltyFee = 750;

  const SimpleERC1155Upgradeable = await ethers.getContractFactory("SimpleERC1155Upgradeable");
  const c = await upgrades.deployProxy(SimpleERC1155Upgradeable, [collectionName, signer.address, royaltyRecipient, royaltyFee]);
  await c.waitForDeployment();
  console.log("SimpleERC1155Upgradeable deployed to:", await c.getAddress());
})();

// sketchpad1: 0x03Ef6ecD2087Ff89D124adDaB19E8796630B96b5
// sketchpad1: 0xF4d02dB1f758c1e97cDA8b46ceA44E8B4fBd01a2
