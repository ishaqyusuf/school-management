"use server";

import { prisma } from "@/db";
import { sum } from "@/lib/utils";

export async function _updateWallet(academicTermId) {
  // prisma.wallets
  //   await prisma.$queryRaw`INSERT INTO wallets (id, balance)
  // VALUES (1, ${amount})
  // ON DUPLICATE KEY UPDATE balance = balance + ${amount};`;
  // const balance: any = {};
  // if (amount > 0) balance.increment = amount;
  // else if (amount < 0) balance.decrement = amount * -1;
  const tx = await prisma.walletTransactions.findMany({
    where: {
      academicTermsId: academicTermId,
      updateWallet: true,
    },
    select: {
      amount: true,
      transaction: true,
    },
  });
  const credit =
    sum(
      tx.filter((t) => t.transaction == "credit"),
      "amount"
    ) || 0;
  const debit =
    sum(
      tx.filter((t) => t.transaction == "debit"),
      "amount"
    ) || 0;

  await prisma.wallets.updateMany({
    where: {
      // id: 1
      academicTermId,
    },
    data: {
      balance: credit - debit,
    },
  });
  // }
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
