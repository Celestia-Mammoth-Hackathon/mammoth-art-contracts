import { defineConfig } from "@wagmi/cli";
// import { foundry } from "@wagmi/cli/plugins";
import { hardhat } from '@wagmi/cli/plugins';

export default defineConfig({
  out: "abi/generated.ts",
  plugins: [
    hardhat({
      project: ".",
    }),
  ],
});
