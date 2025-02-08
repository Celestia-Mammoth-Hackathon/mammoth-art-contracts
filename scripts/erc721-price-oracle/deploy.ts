import { ethers, upgrades } from "hardhat";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const collectionName = "Forma [oracle]";
  const symbol = "FOR";

  const PriceOracleERC721 = await ethers.getContractFactory("PriceOracleERC721");
  const c = await upgrades.deployProxy(PriceOracleERC721, [collectionName, symbol, signer.address]);
  await c.waitForDeployment();
  console.log("PriceOracleERC721 deployed to:", await c.getAddress());
})();

// local: 0x387F1A4Bdf2B90e1358907c2c9823F22e7047805
// sketchpad1: 0x1Cf8760a2e16DfA6124f385d0413A983f7335A00
// sketchpad2: 0x4B3d51b872222985744169ab2Dd5A483011A2371
// mainnet: 0x33a42f74A770897E0c95439AaB415f4806b173F1
