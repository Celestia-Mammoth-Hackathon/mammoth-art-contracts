import { ethers, upgrades } from "hardhat";
import { artifacts } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const collectionName = "Mammoth Art Generative";
  const symbol = "MAG";
  const royaltyRecipient = "0x75B128c7AE715Ffe273433DbfF63097FDC10804d";
  const royaltyFee = 750;
  const collectionSize = 100;

  // Deploy the contract
  const GenerativeERC721Upgradeable = await ethers.getContractFactory("GenerativeERC721Upgradeable");
  const proxy = await upgrades.deployProxy(GenerativeERC721Upgradeable, [
    collectionName, 
    symbol, 
    collectionSize, 
    signer.address, 
    royaltyRecipient, 
    royaltyFee
  ]);
  
  await proxy.waitForDeployment();
  const proxyAddress = await proxy.getAddress();
  console.log("Proxy deployed to:", proxyAddress);

  // Get implementation address
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
  console.log("Implementation deployed to:", implementationAddress);
  
  const adminAddress = await upgrades.erc1967.getAdminAddress(proxyAddress);
  console.log("Admin deployed to:", adminAddress);

  // Get bytecode for all contracts
  const proxyBytecode = await ethers.provider.getCode(proxyAddress);
  const implementationBytecode = await ethers.provider.getCode(implementationAddress);
  const adminBytecode = await ethers.provider.getCode(adminAddress);

  console.log("\nProxy Bytecode:");
  console.log(proxyBytecode);
  console.log("\nProxy Bytecode Length:", proxyBytecode.length);

  console.log("\nImplementation Bytecode:");
  console.log(implementationBytecode);
  console.log("\nImplementation Bytecode Length:", implementationBytecode.length);

  console.log("\nAdmin Bytecode:");
  console.log(adminBytecode);
  console.log("\nAdmin Bytecode Length:", adminBytecode.length);
  
  // Get ABIs
  const implementationArtifact = await artifacts.readArtifact("GenerativeERC721Upgradeable");
  const proxyArtifact = await artifacts.readArtifact("@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol");
  // const adminArtifact = await artifacts.readArtifact("ProxyAdmin");

  // Save everything to files
  const fs = require('fs');
  
  // Save bytecode
  fs.writeFileSync('proxy-bytecode.txt', proxyBytecode);
  fs.writeFileSync('implementation-bytecode.txt', implementationBytecode);
  // fs.writeFileSync('admin-bytecode.txt', adminBytecode);
  
  // Save ABIs
  fs.writeFileSync(
    'implementation-abi.json', 
    JSON.stringify(implementationArtifact.abi, null, 2)
  );
  fs.writeFileSync(
    'proxy-abi.json', 
    JSON.stringify(proxyArtifact.abi, null, 2)
  );
  // fs.writeFileSync(
  //   'admin-abi.json', 
  //   JSON.stringify(adminArtifact.abi, null, 2)
  // );

  // Save full artifacts
  fs.writeFileSync(
    'implementation-artifact.json', 
    JSON.stringify(implementationArtifact, null, 2)
  );
  fs.writeFileSync(
    'proxy-artifact.json', 
    JSON.stringify(proxyArtifact, null, 2)
  );
  // fs.writeFileSync(
  //   'admin-artifact.json', 
  //   JSON.stringify(adminArtifact, null, 2)
  // );

  console.log("\nFiles saved:");
  console.log("- Bytecode: proxy-bytecode.txt, implementation-bytecode.txt, admin-bytecode.txt");
  console.log("- ABIs: proxy-abi.json, implementation-abi.json, admin-abi.json");
  console.log("- Full Artifacts: proxy-artifact.json, implementation-artifact.json, admin-artifact.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// sketchpad1: 0x03Ef6ecD2087Ff89D124adDaB19E8796630B96b5
// sketchpad1: 0xF4d02dB1f758c1e97cDA8b46ceA44E8B4fBd01a2
