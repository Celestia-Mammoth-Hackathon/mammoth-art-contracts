import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Using signer:", signer.address);

  // Replace with your deployed contract address
  const contractAddress = "0x62F0BEaAa650DEebF9e6Be13b19048af7bA9E712";
  const contract = await ethers.getContractAt("GenerativeERC721Upgradeable", contractAddress);

  try {
    // 1. Set placeholder metadata (unrevealed state)
    try {
      console.log("\nSetting placeholder metadata...");
      const placeholderMetadata = JSON.stringify({
        name: "Mystery NFT",
        description: "This NFT hasn't been revealed yet!",
        image: "ipfs://QmTCL5c97KY2tvMfq2yGiyggueTZa8wWg2SZoDLBNW4D6A/0.png",
        attributes: []
      });
      const setPlaceholderTx = await contract.setPlaceholderMetadata(placeholderMetadata);
      await setPlaceholderTx.wait();
      console.log("✅ Placeholder metadata set successfully");
    } catch (error: any) {
      console.error("❌ Error setting placeholder metadata:", error.message);
      throw error;
    }

    // 2. Set reveal metadata base URL
    try {
      console.log("\nSetting reveal metadata...");
      const revealBaseUrl = "ipfs://QmTsdefERWDhxiQqsyKXp3prpXazt1ZfJoHzxkqGUWpQdq/";
      const setRevealTx = await contract.setRevealPlaceholderMetadata(revealBaseUrl);
      await setRevealTx.wait();
      console.log("✅ Reveal metadata base URL set successfully");
    } catch (error: any) {
      console.error("❌ Error setting reveal metadata:", error.message);
      throw error;
    }

    // 3. Grant minter role to signer
    try {
      console.log("\nGranting minter role...");
      const grantMinterTx = await contract.grantMinter(signer.address);
      await grantMinterTx.wait();
      console.log("✅ Minter role granted successfully");
    } catch (error: any) {
      console.error("❌ Error granting minter role:", error.message);
      throw error;
    }

    // 4. Mint some NFTs
    try {
      console.log("\nMinting NFTs...");
      const mintAmount = 3;
      const mintTx = await contract.mint(signer.address, mintAmount);
      await mintTx.wait();
      console.log(`✅ ${mintAmount} NFTs minted successfully`);
    } catch (error: any) {
      console.error("❌ Error minting NFTs:", error.message);
      throw error;
    }

    // 5. Reveal specific NFTs
    try {
      console.log("\nRevealing NFTs...");
      
      // Verify tokens exist
      const tokenIdsToReveal = [1, 2, 3];
      const metadata = [
        `{"name":"Example token #7","description":"This is an token generated as part of an example project.","attributes":[{"trait_type":"Number of Rectangles","value":7},{"trait_type":"Background Color","value":"black"}],"image":"ipfs://QmbTy6nV85VFxY9eyRZgKtMmpHTUJBikgKgUVuRu5sjXRi/1.png"}`,
        `{"name":"Example token #8","description":"This is an token generated as part of an example project.","attributes":[{"trait_type":"Number of Rectangles","value":9},{"trait_type":"Background Color","value":"white"}],"image":"ipfs://QmbTy6nV85VFxY9eyRZgKtMmpHTUJBikgKgUVuRu5sjXRi/2.png"}`,
        `{"name":"Example token #9","description":"This is an token generated as part of an example project.","attributes":[{"trait_type":"Number of Rectangles","value":9},{"trait_type":"Background Color","value":"white"}],"image":"ipfs://QmbTy6nV85VFxY9eyRZgKtMmpHTUJBikgKgUVuRu5sjXRi/3.png"}`
      ];


      // Try revealing
      console.log("Attempting to reveal tokens:", tokenIdsToReveal);
      const revealTx = await contract.reveal(tokenIdsToReveal, metadata);
      console.log("Reveal transaction hash:", revealTx.hash);
      
      // Wait for confirmation and get receipt
      const receipt = await revealTx.wait();
      console.log("Transaction confirmed in block:", receipt.blockNumber);
      
      console.log("✅ NFTs revealed successfully");
    } catch (error: any) {
      console.error("❌ Error revealing NFTs:", error);
      if (error.data) {
        console.error("Error data:", error.data);
      }
      throw error;
    }


    // 6. Verify the results
    try {
      console.log("\nVerifying results...");
      for (const tokenId of [1, 2, 3]) {
        const owner = await contract.ownerOf(tokenId);
        console.log(`Token ${tokenId} owner: ${owner}`);
        if (owner === signer.address) {
          console.log(`✅ Token ${tokenId} verified successfully`);
        } else {
          console.log(`❌ Token ${tokenId} ownership verification failed`);
        }
      }
    } catch (error: any) {
      console.error("❌ Error verifying NFTs:", error.message);
      throw error;

    }

    // New Test: Set Influencing NFTs
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
      throw error;
    }

    // Mint 3 more tokens
    try {
      console.log("\nMinting additional NFTs...");
      const mintAmount = 3;
      const mintTx = await contract.mint(signer.address, mintAmount);
      await mintTx.wait();
      console.log(`✅ ${mintAmount} additional NFTs minted successfully`);
    } catch (error: any) {
      console.error("❌ Error minting additional NFTs:", error.message);
      throw error;

    }

    // Reveal the new tokens
    try {
      console.log("\nRevealing new NFTs...");
      const newTokenIds = [4, 5, 6];
      const newMetadata = [
        `{"name":"Example token #10","description":"This is an token generated as part of an example project.","attributes":[{"trait_type":"Number of Rectangles","value":7},{"trait_type":"Background Color","value":"black"}],"image":"ipfs://QmbTy6nV85VFxY9eyRZgKtMmpHTUJBikgKgUVuRu5sjXRi/4.png"}`,
        `{"name":"Example token #11","description":"This is an token generated as part of an example project.","attributes":[{"trait_type":"Number of Rectangles","value":9},{"trait_type":"Background Color","value":"white"}],"image":"ipfs://QmbTy6nV85VFxY9eyRZgKtMmpHTUJBikgKgUVuRu5sjXRi/5.png"}`,
        `{"name":"Example token #12","description":"This is an token generated as part of an example project.","attributes":[{"trait_type":"Number of Rectangles","value":9},{"trait_type":"Background Color","value":"white"}],"image":"ipfs://QmbTy6nV85VFxY9eyRZgKtMmpHTUJBikgKgUVuRu5sjXRi/6.png"}`
      ];


      const revealTx = await contract.reveal(newTokenIds, newMetadata);
      await revealTx.wait();
      console.log("✅ New NFTs revealed successfully");

      // Verify rankings after reveal
      console.log("\nVerifying final rankings for all tokens:");
      for (let tokenId = 1; tokenId <= 6; tokenId++) {
        try {
          const tokenURI = await contract.tokenURI(tokenId);
          console.log(`Token ${tokenId} final URI:`, tokenURI);
        } catch (error: any) {
          console.error(`Error getting final data for token ${tokenId}:`, error.message);
        }
      }
    } catch (error: any) {
      console.error("❌ Error revealing new NFTs:", error.message);
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