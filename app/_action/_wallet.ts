"use server";

import { prisma } from "@/db";

export async function updateWallet(amount, academicTermId) {
  // prisma.wallets
  //   await prisma.$queryRaw`INSERT INTO wallets (id, balance)
  // VALUES (1, ${amount})
  // ON DUPLICATE KEY UPDATE balance = balance + ${amount};`;
  await prisma.wallets.update({
    where: {
      // id: 1
      academicTermId,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  });
  //   await prisma.$queryRaw`INSERT INTO "Wallets" (id, balance)
  // VALUES (1, ${amount})
  // ON CONFLICT (id)
  // DO UPDATE SET balance = Wallets.balance + ${amount};`;
}
export async function _getTransactions() {
  return await prisma.walletTransactions.findMany({
    where: {},
    include: {
      payment: {
        include: {
          StudentTermSheet: {
            include: {
              Student: true,
            },
          },
        },
      },
    },
  });
}
