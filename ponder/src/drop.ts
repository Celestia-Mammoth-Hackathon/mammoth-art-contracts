import { ponder } from "@/generated";
import uuid from "uuid-by-string";

ponder.on("Drop:DropCreated", async ({ event, context }) => {
  const { Drop } = context.db;

  await Drop.create({
    id: event.args.id,
    data: {
      creator: event.args.drop.creator,
      recipient: event.args.drop.recipient,
      tokenAddress: event.args.drop.token.tokenAddress,
      tokenId: event.args.drop.token.tokenId,
      maxAllowed: event.args.drop.maxAllowed,
      maxPerWallet: event.args.drop.maxPerWallet,
      startDate: event.args.drop.startDate,
      endDate: event.args.drop.endDate,
      price: event.args.drop.price,
      minted: event.args.drop.minted,
      merkleRoot: event.args.drop.merkleRoot,
    },
  });
});

ponder.on("Drop:DropCancelled", async ({ event, context }) => {
  const { Drop } = context.db;
  await Drop.update({
    id: event.args.id,
    data: {
      endDate: Number(event.block.timestamp),
    },
  });
});

ponder.on("Drop:DropMinted", async ({ event, context }) => {
  const { Account, Drop, DropMint } = context.db;

  await Account.upsert({
    id: event.args.sender,
    update: {},
  });

  await Account.upsert({
    id: event.args.recipient,
    update: {},
  });

  await Drop.update({
    id: event.args.id,
    data: ({ current }) => ({
      minted: current.minted + event.args.qty,
    }),
  });

  await DropMint.create({
    id: uuid(event.log.id),
    data: {
      dropId: event.args.id,
      senderId: event.args.sender,
      recipientId: event.args.recipient,
      qty: event.args.qty,
      block: Number(event.block.number),
      timestamp: Number(event.block.timestamp),
      txhash: event.transaction.hash,
    }
  });
});
