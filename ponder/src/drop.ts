import { ponder } from "@/generated";
import uuid from "uuid-by-string";
import * as schema from "../ponder.schema";

ponder.on("Drop:DropCreated", async ({ event, context }) => {
  await context.db.insert(schema.Drop).values({
    id: event.args.id,
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
  });
});

ponder.on("Drop:DropCancelled", async ({ event, context }) => {
  await context.db
    .update(schema.Drop, { id: event.args.id })
    .set({ endDate: Number(event.block.timestamp) });
});

ponder.on("Drop:DropMinted", async ({ event, context }) => {
  // Upsert sender account
  await context.db.insert(schema.Account)
    .values({
      id: event.args.sender,
    })
    .onConflictDoNothing();

  // Upsert recipient account
  await context.db.insert(schema.Account)
    .values({
      id: event.args.recipient,
    })
    .onConflictDoNothing();

  // Update drop minted count
  const row = await context.db
    .update(schema.Drop, { id: event.args.id })
    .set((row) => ({ minted: row.minted + event.args.qty }));

  // Create drop mint record
  await context.db.insert(schema.DropMint).values({
    id: uuid(event.log.id),
    dropId: event.args.id,
    senderId: event.args.sender,
    sender: event.args.sender,
    recipientId: event.args.recipient,
    recipient: event.args.recipient,
    qty: event.args.qty,
    block: Number(event.block.number),
    timestamp: Number(event.block.timestamp),
    txhash: event.transaction.hash,
  });
});
