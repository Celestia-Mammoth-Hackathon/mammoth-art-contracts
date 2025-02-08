import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Using signer:", signer.address);

  // Replace with your deployed contract address
  const contractAddress = "0x956695f89Fe2d8d39A8D78b520599E9972705E5f";
  const contract = await ethers.getContractAt("GenerativeERC721Upgradeable", contractAddress);

  try {
    // 1. Set Influencing NFTs
    try {
      console.log("\nSetting influencing NFTs...");
      const influencingAddresses = [
        "0x62650662EBB109Fd1E86CBdC0b3126C5895ee492",
        "0x063eA336c397d8112bcd7707164148cCCBEfB218"
      ];
      const influencingTokenIds = [6, 0];

      const setInfluencingTx = await contract.setInfluencingNFTs(
        influencingAddresses,
        influencingTokenIds
      );
      await setInfluencingTx.wait();
      console.log("✅ Influencing NFTs set successfully");
    } catch (error: any) {
      console.error("❌ Error setting influencing NFTs:", error.message);
      throw error;
    }

    // 2. Check initial metadata
    const tokenId = 2;
    try {
      console.log("\nChecking initial metadata for token", tokenId);
      const initialTokenURI = await contract.tokenURI(tokenId);
      console.log("Initial Token URI:", initialTokenURI);
      
      // If the URI is base64 encoded, decode it
      if (initialTokenURI.startsWith('data:application/json;base64,')) {
        const base64Data = initialTokenURI.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64').toString();
        console.log("Decoded initial metadata:", decodedData);
      }
    } catch (error: any) {
      console.error("❌ Error getting initial metadata:", error.message);
      throw error;
    }

    // 3. Set reveal placeholder metadata if not set
    try {
      console.log("\nSetting reveal placeholder metadata...");
      const revealBaseUrl = "ipfs://QmTsdefERWDhxiQqsyKXp3prpXazt1ZfJoHzxkqGUWpQdq/";
      const setRevealTx = await contract.setRevealPlaceholderMetadata(revealBaseUrl);
      await setRevealTx.wait();
      console.log("✅ Reveal placeholder metadata set successfully");
    } catch (error: any) {
      console.error("❌ Error setting reveal placeholder metadata:", error.message);
      throw error;
    }

    // 4. Reveal single NFT
    try {
      console.log("\nRevealing single NFT...");
      
      const metadata = [
        `{"name":"Example token #7","description":"This is an token generated as part of an example project.","attributes":[{"trait_type":"Number of Rectangles","value":7},{"trait_type":"Background Color","value":"black"}],"image":"ipfs://QmbTy6nV85VFxY9eyRZgKtMmpHTUJBikgKgUVuRu5sjXRi/1.png"}`,
      ];

      console.log("Revealing token:", tokenId);
      console.log("New metadata:", metadata[0]);
      
      const revealTx = await contract.reveal([tokenId], metadata);
      const receipt = await revealTx.wait();
      console.log("✅ Token revealed successfully in block:", receipt.blockNumber);

      // Wait a few blocks for metadata to update
      console.log("Waiting for a few blocks...");
      await new Promise(resolve => setTimeout(resolve, 5000));

      // 5. Verify token metadata after reveal
      console.log("\nVerifying revealed token metadata...");
      try {
        const newTokenURI = await contract.tokenURI(tokenId);
        console.log(`New Token URI:`, newTokenURI);
        
        // If the URI is base64 encoded, decode it
        if (newTokenURI.startsWith('data:application/json;base64,')) {
          const base64Data = newTokenURI.split(',')[1];
          const decodedData = Buffer.from(base64Data, 'base64').toString();
          console.log("Decoded new metadata:", decodedData);
        }

        const owner = await contract.ownerOf(tokenId);
        console.log(`Token owner: ${owner}`);

        // Compare metadata
        const base64Data = newTokenURI.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64').toString();
        const updatedMetadata = await contract.getTokenMetadata(tokenId);
        
        console.log("\nMetadata comparison:");
        console.log("Expected:", metadata[0]);
        console.log("Actual:", decodedData);
        console.log("Updated Metadata:", updatedMetadata);
        
      } catch (error: any) {
        console.error(`Error verifying token ${tokenId}:`, error.message);
      }

    } catch (error: any) {
      console.error("❌ Error revealing NFT:", error.message);
      throw error;
    }

  } catch (error: any) {
    console.error("\n❌ Script failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("\n✅ Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Script failed:", error);
    process.exit(1);
  });
