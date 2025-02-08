import { ethers } from "hardhat";
import axios from 'axios';

(async () => {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error("Missing contract param");
    return;
  }

  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  console.log("Current signer's address:", signer.address);

  console.log("Fetching TIA price");

  const cgRes = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
    params: {
      ids: 'celestia',
      vs_currencies: 'usd',
      include_24hr_change: 'true',
      include_last_updated_at: 'true'
    }
  });

  if (!cgRes || !cgRes.data || !cgRes.data.celestia) {
    console.error("Could not read data from coingecko. Try again later.");
    return;
  }

  const data = cgRes.data.celestia;
  console.log("Received data from coingecko:", JSON.stringify(data));

  const usd = Math.floor(data.usd * 1e2);
  const usd24hrChange = Math.floor(data.usd_24h_change * 1e9);
  const lastUpdated = data.last_updated_at;

  const c = await ethers.getContractAt("PriceOracleERC721", args[0]);
  const res = await c.update(0, usd, usd24hrChange, lastUpdated);
  console.log(res);
})();
