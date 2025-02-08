#!/bin/sh

export $(grep -v '^#' .env.testnet | xargs)

pnpm clean
pnpm build
pnpm build:ts

rm -fr ./abi
mkdir ./abi

pnpm wagmi generate

for file in $(find ./contracts -name "*.sol")
do
  cp ./out/$(basename $file)/$(basename $file .sol).json ./abi/$(basename $file .sol).json
  cp ./out/$(basename $file)/$(basename $file .sol).abi.json ./abi/$(basename $file .sol).abi.json
done
