"use server";

import { prisma } from "@/db";
import {
  IStudentMeta,
  IStudentTermSheet,
  MakePaymentData,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { _updateWallet } from "./_wallet";
import { sum } from "@/lib/utils";
import { WalletTransactions } from "@prisma/client";
import { _revalidate } from "./_revalidate";

export async function _payEntranceFee(
  termSheetId,
  tx: Partial<WalletTransactions>,
  revalidate = true
) {
  await prisma.studentTermSheets.update({
    where: {
      id: termSheetId,
    },
    data: {
      Transactions: {
        create: {
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...(tx as any),
          type: "entrance-fee",
          transaction: "credit",
          amount: 500,
          meta: tx?.meta || ({} as any),
        },
      },
    },
  });
  if (tx.updateWallet) await _updateWallet(tx.academicTermsId);
  if (revalidate) _revalidate("students");
}
export async function _makePayment(
  data: {
    payments: MakePaymentData[];
    studentId;
    // amount;
  },
  validate = true
) {
  console.log(data);
  await Promise.all(
    data.payments.map(async (p) => {
      const { studentTermId, payment, termId, yearId, owing } = p;
      if (!payment.amount) return;
      await prisma.studentTermSheets.update({
        where: {
          id: studentTermId,
        },
        data: {
          owing,
          Transactions: {
            create: {
              academicTermsId: termId,
              academicYearsId: yearId,
              // description: "school-fee",
              userId: 1,
              updateWallet: payment.updateWallet,
              type: payment.type as string,
              transaction: "credit",
              amount: payment.amount as any,
              meta: {},
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
      });
      if (payment.updateWallet) await _updateWallet(termId);
    })
  );
  if (validate) _revalidate("students");
}
export async function _getStudentPaymentInformation(studentId) {
  const student = await prisma.students.findFirst({
    where: {
      id: studentId,
    },
    include: {
      StudentTermSheets: {
        include: {
          Term: {
            select: {
              id: true,
              title: true,
              academicYear: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          Transactions: {
            select: {
              type: true,
              description: true,
              amount: true,
            },
          },
        },
      },
    },
  });

  let owing = 0;

  const owingHistory = student?.StudentTermSheets.map((termSheet) => {
    const t: IStudentTermSheet = termSheet as any;
    const totalPaid =
      t.Transactions.filter((f) => f.description == "fee")
        .map((f) => f.amount)
        .reduce((p, c) => (p || 0) + (c || 0), 0) || 0;
    // let payable = t.meta?.payable;
    // if (!(payable >= 0)) payable = 3000;
    // const balance = payable - totalPaid;
    let _owing = termSheet.owing || 0;
    if (_owing > 0) {
      owing += _owing;
      return {
        owing: _owing,
        term: termSheet.Term.title,
        studentTermId: termSheet.id,
        termId: termSheet.termId,
        yearId: t.Term.academicYear.id,
      };
    }
    return null;
  }).filter(Boolean);
  return {
    owing,
    studentId,
    owingHistory,
  };
}

export async function _setStudentTermPayable({
  studentTermId,
  studentId,
  payable,
  studentMeta,
  allTerms = false,
}: {
  studentTermId;
  studentId;
  payable;
  studentMeta?: IStudentMeta;
  allTerms: boolean;
}) {
  await Promise.all(
    (
      await prisma.studentTermSheets.findMany({
        where: {
          studentId,
        },
        include: {
          Transactions: {
            where: {
              type: "school-fee",
            },
          },
        },
      })
    ).map(async (sheet) => {
      if (allTerms || sheet.id == studentTermId) {
        // const payments = await prisma.walletTransactions.findMany({
        //   where: {
        //     studentTermSheetsId: sheet.id,
        //     type: "school-fee",
        //   },
        // });
        const paid = sum(sheet.Transactions, "amount") || 0;
        let owing = payable - paid;
        if (owing < 0) owing = 0;
        // console.log(owing);
        // return;
        await prisma.studentTermSheets.update({
          where: {
            id: sheet.id,
          },
          data: {
            payable,
            owing,
          },
        });
      }
    })
  );
  await prisma.students.update({
    where: {
      id: studentId,
    },
    data: {
      meta: studentMeta as any,
      updatedAt: new Date(),
    },
  });
  _revalidate("students");
}
