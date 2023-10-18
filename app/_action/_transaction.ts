"use server";

import { prisma } from "@/db";
import { _updateWallet } from "./_wallet";
import { _revalidate } from "./_revalidate";
import { IWalletTransactions } from "@/types/types";
import { WalletTransactions } from "@prisma/client";

export async function _omitTransaction(id, amount, termId) {
  await prisma.walletTransactions.update({
    where: { id },
    data: { updateWallet: false, updatedAt: new Date() },
  });
  await _updateWallet(termId);
  await _revalidate("transactions");
}
export async function _includeTransaction(id, amount, termId) {
  await prisma.walletTransactions.update({
    where: { id },
    data: { updateWallet: true, updatedAt: new Date() },
  });
  await _updateWallet(termId);
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
      // await _updateWallet(oldData.amount * multiplier, academicTermsId);
    }
    await prisma.walletTransactions.update({
      where: { id: oldData.id },
      data: {
        ...(formData as any),
      },
    });
  }
  await _updateWallet(academicTermsId);
  await _revalidate("transactions");
}
export async function _deleteTransaction({
  updateWallet: __updateWallet,
  id,
  type,
  transaction,
  amount,
  academicTermsId,
  studentTermSheetsId,
}: Partial<IWalletTransactions>) {
  if (__updateWallet) {
    await _updateWallet(academicTermsId);
  }
  if (type == "school-fee" && studentTermSheetsId) {
    await prisma.studentTermSheets.update({
      where: {
        id: studentTermSheetsId,
      },
      data: {
        owing: {
          increment: amount || 0,
        },
      },
    });
  }
  await prisma.walletTransactions.delete({
    where: { id },
  });
  await _updateWallet(academicTermsId);
  await _revalidate("transactions");
}
export async function _synchronizeTransaction() {}
