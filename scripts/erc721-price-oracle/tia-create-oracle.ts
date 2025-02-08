import { ethers } from "hardhat";

(async () => {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error("Missing contract param");
    return;
  }

  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const metadata = {
    "id": "0",
    "name": "Forma [oracle][tia]",
    "description": "TIA price updates as a composable NFT. Fed by data from Coingecko API. Not for serious business.",
    "image": "",
    "tags": [ "genesis", "forma" ],
    "attributes": [
      { "trait_type": "Origin", "value": "Genesis" },
      { "trait_type": "Creation Era", "value": "Canvas" },
    ],
  };

  const c = await ethers.getContractAt("PriceOracleERC721", args[0]);
  const res = await c.create(JSON.stringify(metadata));
  console.log(res);
})();
