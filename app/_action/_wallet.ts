"use server";

import { prisma } from "@/db";

export async function updateWallet(amount, academicTermId) {
  // prisma.wallets
  //   await prisma.$queryRaw`INSERT INTO wallets (id, balance)
  // VALUES (1, ${amount})
  // ON DUPLICATE KEY UPDATE balance = balance + ${amount};`;
  const balance: any = {};
  if (amount > 0) balance.increment = amount;
  else if (amount < 0) balance.decrement = amount * -1;

  if (balance.increment || balance.decrement) {
    console.log(">>>>>>>>>>>");
    console.log(balance);
    await prisma.wallets.updateMany({
      where: {
        // id: 1
        academicTermId,
      },
      data: {
        balance,
      },
    });
  }
  //   await prisma.$queryRaw`INSERT INTO "Wallets" (id, balance)
  // VALUES (1, ${amount})
  // ON CONFLICT (id)
  // DO UPDATE SET balance = Wallets.balance + ${amount};`;
}
export async function _getTransactions() {
  return await prisma.walletTransactions.findMany({
    where: {},
    include: {
      // StudentTermSheets
      // payment: {
      //   include: {
      StudentTermSheet: {
        include: {
          Student: true,
        },
        // },
        // },
      },
    },
  });
}
