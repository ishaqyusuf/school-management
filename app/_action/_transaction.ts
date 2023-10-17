"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { updateWallet } from "./_wallet";
import { _revalidate } from "./_revalidate";
import { IWalletTransactions } from "@/types/types";
import { WalletTransactions } from "@prisma/client";

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
export async function _createTransaction(
  data: IWalletTransactions,
  oldData: IWalletTransactions
) {
  let formData: Partial<WalletTransactions> = {
    amount: data.amount,
    type: data.type,
    updatedAt: new Date(),
    description: data.description,
    meta: {},
    transaction: data.transaction,
    updateWallet: data.updateWallet,
  };
  if (!oldData) {
    formData = {
      ...formData,
      createdAt: new Date(),
      academicTermsId: data.academicTermsId,
      academicYearsId: data.academicYearsId,
      userId: 1,
    };
    await prisma.walletTransactions.create({
      data: formData as any,
    });
  } else {
    //
    let multiplier = 1;
    if (oldData.transaction == "credit") multiplier = -1;
    await updateWallet(oldData.amount * multiplier, oldData.academicTermsId);
    await prisma.walletTransactions.update({
      where: { id: oldData.id },
      data: {
        ...(formData as any),
      },
    });
  }
  const multiplier = data.transaction == "credit" ? 1 : -1;
  await updateWallet(
    data.amount * multiplier,
    oldData?.academicTermsId || data.academicTermsId
  );
  await _revalidate("transactions");
}
