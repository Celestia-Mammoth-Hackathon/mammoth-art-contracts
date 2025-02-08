import { ethers } from "hardhat";

(async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  const metadata = {
    name: "Test Token 101",
    created_by: "codecrafting",
    description: "This is a test token that has been updated",
    attributes: [
    {
      trait_type: "Artist",
      value: "codecrafting"
    },
    {
      trait_type: "Some Property",
      value: "And the value"
    }
    ],
    tags: [ "modularium", "genesis" ],
    image_details: {
      bytes: 194974,
      format: "JPEG",
      sha256: "5cf6b932d2e2a94698db0885e4c783a0e2bb5e5af03dc0e7f80e642ff394c2cb",
      width: 1280,
      height: 854
    },
    image: "https://arweave.net/XXLGCVysW_08Sx1N_66P9G7mbOEErS1a11Z2Jp7nk5M",
    image_url: "https://arweave.net/XXLGCVysW_08Sx1N_66P9G7mbOEErS1a11Z2Jp7nk5M"
  };

  const c = await ethers.getContractAt("SimpleERC1155Upgradeable", "0xF4d02dB1f758c1e97cDA8b46ceA44E8B4fBd01a2");
  const res = await c.create(JSON.stringify(metadata), false, signer.address);
  console.log(res);
})();
