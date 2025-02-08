import { ethers, upgrades } from "hardhat";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const owner = signer.address;
  const name = "Modularium Marketplace";
  const platformRecipient = "0x1f95167C220d7B19EcA466Af76C54B1dB39c9186";
  const platformFee = 250;

  const SimpleMarketplaceUpgradeable = await ethers.getContractFactory("SimpleMarketplaceUpgradeable");
  const c = await upgrades.deployProxy(SimpleMarketplaceUpgradeable, [name, owner, platformRecipient, platformFee]);
  await c.waitForDeployment();
  console.log("SimpleMarketplaceUpgradeable deployed to:", await c.getAddress());
})();

// sketchpad1: 0x83c62Cc36B792eE22ba14e74E07Ab05eC2630d1b
