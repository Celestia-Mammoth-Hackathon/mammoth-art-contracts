import { ponder } from "@/generated";   
import uuid from "uuid-by-string";
import * as schema from "../ponder.schema";

ponder.on("GenerativeERC721:Transfer", async ({ event, context }) => {
  // Create an Account for the sender
  await context.db.insert(schema.Account)
    .values({
      id: event.args.from,
    })
    .onConflictDoNothing();

  // Handle minting (transfer from zero address)
  if (event.args.from === '0x0000000000000000000000000000000000000000') {
    await context.db.insert(schema.Token)
      .values({
        id: uuid(`${event.log.address}-${event.args.tokenId}`),
        tokenAddress: event.log.address,
        tokenId: event.args.tokenId,
        totalSupply: 1n,
        isMarketplaceAllowed: false,
      })
      .onConflictDoNothing();
  }

  // Handle burning (transfer to zero address)
  if (event.args.to === '0x0000000000000000000000000000000000000000') {
    await context.db
      .update(schema.Token, { id: uuid(`${event.log.address}-${event.args.tokenId}`) })
      .set({ totalSupply: 0n });
  }

  // Update sender's token balance
  if (event.args.from !== '0x0000000000000000000000000000000000000000') {
    const balanceId = uuid(`${event.log.address}-${event.args.tokenId}-${event.args.from}`);
    
    // // Update orders to invalid
    // await context.db
    //   .update(schema.Order)
    //   .set({ orderStatus: "INVALID" })
    //   .where('makerId', '=', event.args.from)
    //   .where('orderStatus', '=', "ACTIVE")
    //   .where('tokenAddress', '=', event.log.address)
    //   .where('tokenId', '=', event.args.tokenId);

    // Update balance
    await context.db.insert(schema.TokenBalance)
      .values({
        id: balanceId,
        tokenAddress: event.log.address,
        tokenId: event.args.tokenId,
        ownerId: event.args.from,
        balance: 0n,
        owner: event.args.from,
      })
      .onConflictDoUpdate({
         balance: 0n 
      });
  }

  // Create an Account for the recipient
  await context.db.insert(schema.Account)
    .values({
      id: event.args.to,
      name: event.args.to,
      owner: event.args.to,
      registeredAt: Number(event.block.timestamp),
      tokens: [],
    })
    .onConflictDoNothing();

  // Update recipient's token balance
  const recipientBalanceId = uuid(`${event.log.address}-${event.args.tokenId}-${event.args.to}`);
  
//   // Update orders to active
//   await context.db
//     .update(schema.Order)
//     .set({ orderStatus: "ACTIVE" })
//     .where('makerId', '=', event.args.to)
//     .where('orderStatus', '=', "INVALID")
//     .where('tokenAddress', '=', event.log.address)
//     .where('tokenId', '=', event.args.tokenId);

  await context.db.insert(schema.TokenBalance)
    .values({
      id: recipientBalanceId,
      owner: event.args.to,
      tokenAddress: event.log.address,
      tokenId: event.args.tokenId,
      ownerId: event.args.to,
      balance: 1n,
    })
    .onConflictDoUpdate({balance: 1n }
    );

  // Create transfer event
  await context.db.insert(schema.TransferEvent)
    .values({
      id: uuid(event.log.id),
      from: event.args.from,
      to: event.args.to,
      tokenAddress: event.log.address,
      tokenId: event.args.tokenId,
      amount: 1n,
      block: Number(event.block.number),
      timestamp: Number(event.block.timestamp),
      txhash: event.transaction.hash,
    });
});
// ponder.on("GenerativeERC721:ApprovalForAll", async ({ event, context }) => {
//   const { Approval, Account, Order } = context.db;
//   const { owner, operator, approved } = event.args;
//   const id = uuid(`${owner}-${operator}-${event.log.address}`);

//   if (approved) {
//     await Account.upsert({
//       id: owner,
//       update: {},
//     });

//     await Account.upsert({
//       id: operator,
//       update: {},
//     });

//     await Approval.upsert({
//       id,
//       create: {
//         ownerId: owner,
//         operatorId: operator,
//         tokenAddress: event.log.address,
//       },
//       update: {},
//     });

//     if (operator === process.env.PONDER_MARKETPLACE_ADDRESS) {
//       await Order.updateMany({
//         where: {
//           makerId: owner,
//           orderStatus: "INVALID",
//           tokenAddress: event.log.address,
//         },
//         data: {
//           orderStatus: "ACTIVE",
//         }
//       });
//     }
//   } else {
//     await Approval.delete({ id });

//     if (operator === process.env.PONDER_MARKETPLACE_ADDRESS) {
//       // set any active orders to invalid
//       await Order.updateMany({
//         where: {
//           makerId: owner,
//           orderStatus: "ACTIVE",
//           tokenAddress: event.log.address,
//         },
//         data: {
//           orderStatus: "INVALID",
//         }
//       });
//     }
//   }
// });
