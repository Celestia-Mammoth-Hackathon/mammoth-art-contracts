import { ponder } from "@/generated";
import uuid from "uuid-by-string";

export const erc721OnTransfer = (eventName: any) => ponder.on(eventName, async ({ event, context }) => {
  const { Account, Token, TokenBalance, TransferEvent, Order } = context.db;

  // Create an Account for the sender, or update the balance if it already exists.
  await Account.upsert({
    id: event.args.from,
    update: {},
  });

  if (event.args.from === '0x0000000000000000000000000000000000000000') {
    await Token.upsert({
      id: uuid(`${event.log.address}-${event.args.tokenId}`),
      create: {
        tokenAddress: event.log.address,
        tokenId: event.args.tokenId,
        totalSupply: BigInt(1),
        isMarketplaceAllowed: false,
      },
      update: {},
    });
  }

  if (event.args.to === '0x0000000000000000000000000000000000000000') {
    await Token.update({
      id: uuid(`${event.log.address}-${event.args.tokenId}`),
      data: () => ({
        totalSupply: BigInt(0),
      }),
    });
  }

  if (event.args.from !== '0x0000000000000000000000000000000000000000') {
    await TokenBalance.upsert({
      id: uuid(`${event.log.address}-${event.args.tokenId}-${event.args.from}`),
      create: {
        tokenAddress: event.log.address,
        tokenId: event.args.tokenId,
        ownerId: event.args.from,
        balance: BigInt(1),
      },
      update: () => {
        Order.updateMany({
          where: {
            makerId: event.args.from,
            orderStatus: "ACTIVE",
            tokenAddress: event.log.address,
            tokenId: event.args.tokenId,
          },
          data: {
            orderStatus: "INVALID",
          }
        });
        return {
          balance: BigInt(0),
        };
      },
    });
  }

  // Create an Account for the recipient, or update the balance if it already exists.
  await Account.upsert({
    id: event.args.to,
    update: {},
  });

  await TokenBalance.upsert({
    id: uuid(`${event.log.address}-${event.args.tokenId}-${event.args.to}`),
    create: {
      tokenAddress: event.log.address,
      tokenId: event.args.tokenId,
      ownerId: event.args.to,
      balance: BigInt(1),
    },
    update: () => {
      Order.updateMany({
        where: {
          makerId: event.args.to,
          orderStatus: "INVALID",
          tokenAddress: event.log.address,
          tokenId: event.args.tokenId,
        },
        data: {
          orderStatus: "ACTIVE",
        }
      });
      return {
        balance: BigInt(1),
      };
    },
  });

  // Create a TransferEvent.
  await TransferEvent.create({
    id: uuid(event.log.id),
    data: {
      fromId: event.args.from,
      toId: event.args.to,
      tokenAddress: event.log.address,
      tokenId: event.args.tokenId,
      amount: BigInt(1),
      block: Number(event.block.number),
      timestamp: Number(event.block.timestamp),
      txhash: event.transaction.hash,
    },
  });
});

export const erc721ApprovalForAll = (eventName: any) => ponder.on(eventName, async ({ event, context }) => {
  const { Approval, Account, Order } = context.db;
  const { owner, operator, approved } = event.args;
  const id = uuid(`${owner}-${operator}-${event.log.address}`);

  if (approved) {
    await Account.upsert({
      id: owner,
      update: {},
    });

    await Account.upsert({
      id: operator,
      update: {},
    });

    await Approval.upsert({
      id,
      create: {
        ownerId: owner,
        operatorId: operator,
        tokenAddress: event.log.address,
      },
      update: {},
    });

    if (operator === process.env.PONDER_MARKETPLACE_ADDRESS) {
      await Order.updateMany({
        where: {
          makerId: owner,
          orderStatus: "INVALID",
          tokenAddress: event.log.address,
        },
        data: {
          orderStatus: "ACTIVE",
        }
      });
    }
  } else {
    await Approval.delete({ id });

    if (operator === process.env.PONDER_MARKETPLACE_ADDRESS) {
      // set any active orders to invalid
      await Order.updateMany({
        where: {
          makerId: owner,
          orderStatus: "ACTIVE",
          tokenAddress: event.log.address,
        },
        data: {
          orderStatus: "INVALID",
        }
      });
    }
  }
});
