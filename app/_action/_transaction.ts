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
  oldData: {
    transaction;
    academicTermsId;
    amount;
    updateWallet;
    id;
  }
) {
  console.log("=========");
  // return;
  let formData: Partial<WalletTransactions> = {
    amount: data.amount,
    type: data.type,
    updatedAt: new Date(),
    description: data.description,
    meta: {},
    transaction: data.transaction,
    updateWallet: data.updateWallet,
  };
  let academicTermsId = data.academicTermsId;
  if (!oldData) {
    // console.log(formData);
    formData = {
      ...formData,
      createdAt: new Date(),
      academicTermsId: data.academicTermsId,
      academicYearsId: data.academicYearsId,
      userId: 1,
    };
    // console.log(formData);
    await prisma.walletTransactions.create({
      data: formData as any,
    });
  } else {
    academicTermsId = oldData.academicTermsId;
    //
    if (oldData.updateWallet) {
      let multiplier = 1;
      if (oldData.transaction == "credit") multiplier = -1;
      await updateWallet(oldData.amount * multiplier, academicTermsId);
    }
    await prisma.walletTransactions.update({
      where: { id: oldData.id },
      data: {
        ...(formData as any),
      },
    });
  }
  const multiplier = data.transaction == "credit" ? 1 : -1;
  console.log(`TermId: ${academicTermsId}`);
  await updateWallet(data.amount * multiplier, academicTermsId);
  await _revalidate("transactions");
}
