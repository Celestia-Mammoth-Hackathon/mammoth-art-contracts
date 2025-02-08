import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Account: p.createTable({
    id: p.hex(),

    tokens: p.many("TokenBalance.ownerId"),
    transferFromEvents: p.many("TransferEvent.fromId"),
    transferToEvents: p.many("TransferEvent.toId"),

    dropMints: p.many("DropMint.senderId"),
    orders: p.many("Order.makerId"),
    orderTakeEvents: p.many("OrderTakeEvent.takerId"),
  }),
  Approval: p.createTable({
    id: p.string(),
    ownerId: p.hex().references("Account.id"),
    operatorId: p.hex().references("Account.id"),
    tokenAddress: p.hex(),
  }, {
    tokenAddressIdx: p.index("tokenAddress"),
    ownerIdx: p.index("ownerId"),
    operatorIdx: p.index("operatorId"),
  }),
  Drop: p.createTable({
    id: p.bigint(),
    creator: p.hex(),
    recipient: p.hex(),
    tokenAddress: p.hex(),
    tokenId: p.bigint(),
    maxAllowed: p.int(),
    maxPerWallet: p.int(),
    startDate: p.int(),
    endDate: p.int(),
    price: p.bigint(),
    minted: p.bigint(),
    merkleRoot: p.hex(),

    mints: p.many("DropMint.dropId")
  }, {
    tokenIdx: p.index(["tokenAddress", "tokenId"]),
  }),
  DropMint: p.createTable({
    id: p.string(),
    dropId: p.bigint().references("Drop.id"),
    timestamp: p.int(),
    senderId: p.hex().references("Account.id"),
    recipientId: p.hex().references("Account.id"),
    qty: p.bigint(),
    block: p.int(),
    txhash: p.hex(),

    drop: p.one("dropId"),
    sender: p.one("senderId"),
    recipient: p.one("recipientId"),
  }, {
    senderIdx: p.index("senderId"),
    recipientIdx: p.index("recipientId"),
    timestampIdx: p.index("timestamp"),
  }),
  OrderType: p.createEnum(["BUY", "SELL"]),
  OrderStatus: p.createEnum(["ACTIVE", "CANCELLED", "FILLED", "INVALID"]),
  Order: p.createTable({
    id: p.bigint(),
    orderStatus: p.enum("OrderStatus"),
    orderType: p.enum("OrderType"),
    makerId: p.hex().references("Account.id"),
    recipientId: p.hex().references("Account.id"),
    tokenAddress: p.hex(),
    tokenId: p.bigint(),
    qty: p.bigint(),
    price: p.bigint(),
    filled: p.bigint(),
    validFrom: p.int(),
    validUntil: p.int(),

    maker: p.one("makerId"),
    recipient: p.one("recipientId"),
  }, {
    makerIdx: p.index("makerId"),
    recipientIdx: p.index("recipientId"),
    tokenIdx: p.index(["tokenAddress", "tokenId"]),
    priceIdx: p.index("price"),
  }),
  OrderTakeEvent: p.createTable({
    id: p.string(),
    timestamp: p.int(),
    orderId: p.bigint().references("Order.id"),
    takerId: p.hex().references("Account.id"),
    recipientId: p.hex().references("Account.id"),
    qty: p.bigint(),
    block: p.int(),
    txhash: p.hex(),

    order: p.one("orderId"),
    taker: p.one("takerId"),
    recipient: p.one("recipientId"),
  }, {
    takerIdx: p.index("takerId"),
    recipientIdx: p.index("recipientId"),
    timestampIdx: p.index("timestamp"),
  }),
  Token: p.createTable({
    id: p.string(),
    tokenAddress: p.hex(),
    tokenId: p.bigint(),
    totalSupply: p.bigint(),
    isMarketplaceAllowed: p.boolean(),
  }, {
    tokenIdx: p.index(["tokenAddress", "tokenId"]),
  }),
  TokenBalance: p.createTable({
    id: p.string(),
    tokenAddress: p.hex(),
    tokenId: p.bigint(),
    ownerId: p.hex().references("Account.id"),
    balance: p.bigint(),

    owner: p.one("ownerId"),
  }, {
    tokenIdx: p.index(["tokenAddress", "tokenId"]),
    ownerIdx: p.index("ownerId"),
  }),
  TransferEvent: p.createTable({
    id: p.string(),
    timestamp: p.int(),
    fromId: p.hex().references("Account.id"),
    toId: p.hex().references("Account.id"),
    tokenAddress: p.hex(),
    tokenId: p.bigint(),
    amount: p.bigint(),
    block: p.int(),
    txhash: p.hex(),

    from: p.one("fromId"),
    to: p.one("toId"),
  }, {
    fromIdx: p.index("fromId"),
    toIdx: p.index("toId"),
    tokenIdx: p.index(["tokenAddress", "tokenId"]),
    timestampIdx: p.index("timestamp"),
  }),
}));
