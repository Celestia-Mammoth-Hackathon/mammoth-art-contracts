import { ponder } from "@/generated";
import uuid from "uuid-by-string";

// ponder.on("Marketplace:MakeOrder", async ({ event, context }) => {
//   const { Account, Order } = context.db;

//   await Account.upsert({
//     id: event.args.order.maker,
//     update: {},
//   });

//   await Account.upsert({
//     id: event.args.order.recipient,
//     update: {},
//   });

//   await Order.create({
//     id: event.args.id,
//     data: {
//       orderStatus: "ACTIVE",
//       orderType: event.args.order.orderType === 0 ? "BUY" : "SELL",
//       makerId: event.args.order.maker,
//       recipientId: event.args.order.recipient,
//       tokenAddress: event.args.order.token.tokenAddress,
//       tokenId: event.args.order.token.tokenId,
//       qty: event.args.order.qty,
//       price: event.args.order.price,
//       filled: event.args.order.filled,
//       validFrom: Number(event.args.order.validFrom),
//       validUntil: Number(event.args.order.validUntil),
//     },
//   });
// });

// ponder.on("Marketplace:CancelOrder", async ({ event, context }) => {
//   const { Order } = context.db;
//   await Order.update({
//     id: event.args.id,
//     data: {
//       orderStatus: "CANCELLED",
//       validUntil: Number(event.block.timestamp),
//     },
//   });
// });

// ponder.on("Marketplace:TakeOrder", async ({ event, context }) => {
//   const { Account, Order, OrderTakeEvent } = context.db;

//   await Account.upsert({
//     id: event.args.taker,
//     update: {},
//   });

//   await Account.upsert({
//     id: event.args.recipient,
//     update: {},
//   });

//   await Order.update({
//     id: event.args.id,
//     data: ({ current }) => ({
//       filled: current.filled + event.args.qty,
//     }),
//   });

//   await OrderTakeEvent.create({
//     id: uuid(event.log.id),
//     data: {
//       orderId: event.args.id,
//       takerId: event.args.taker,
//       recipientId: event.args.recipient,
//       qty: event.args.qty,
//       block: Number(event.block.number),
//       timestamp: Number(event.block.timestamp),
//       txhash: event.transaction.hash,
//     }
//   })
// });

// ponder.on("Marketplace:FilledOrder", async ({ event, context }) => {
//   const { Order } = context.db;
//   await Order.update({
//     id: event.args.id,
//     data: {
//       orderStatus: "FILLED",
//     },
//   });
// });

// ponder.on("Marketplace:Allowed", async ({ event, context }) => {
//   const { Token } = context.db;
//   await Token.updateMany({
//     where: {
//       tokenAddress: event.args.addr
//     },
//     data: {
//       isMarketplaceAllowed: true,
//     },
//   });
// });

// ponder.on("Marketplace:Denied", async ({ event, context }) => {
//   const { Token } = context.db;
//   await Token.updateMany({
//     where: {
//       tokenAddress: event.args.addr
//     },
//     data: {
//       isMarketplaceAllowed: false,
//     },
//   });
// });
