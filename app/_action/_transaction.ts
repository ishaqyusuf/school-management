"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { updateWallet } from "./_wallet";
import { _revalidate } from "./_revalidate";
import { IWalletTransactions } from "@/types/types";

export async function _omitTransaction(id, amount, termId) {
  await prisma.walletTransactions.update({
    where: { id },
    data: { updateWallet: false, updatedAt: new Date() },
  });
  await updateWallet(amount * -1, termId);
  await _revalidate("transactions");
}
export async function _includeTransaction(id, amount, termId) {
  await prisma.walletTransactions.update({
    where: { id },
    data: { updateWallet: true, updatedAt: new Date() },
  });
  await updateWallet(amount, termId);
  await _revalidate("transactions");
}
export async function _createTransaction(data: IWalletTransactions) {
  await prisma.walletTransactions.create({
    data: {
      amount: data.amount,
      type: data.type,
      academicTermsId: data.academicTermsId,
      academicYearsId: data.academicYearsId,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: data.description,
      meta: {},
      transaction: data.transaction,
      updateWallet: data.updateWallet,
    },
  });
  const multiplier = data.transaction == "credit" ? 1 : -1;
  await updateWallet(data.amount * multiplier, data.academicTermsId);
}
