"use server";

import { prisma } from "@/db";
import { IStudentTermSheet, MakePaymentData } from "@/types/types";
import { revalidatePath } from "next/cache";
import { updateWallet } from "./_wallet";
import { sum } from "@/lib/utils";

export async function _makePayment(data: {
  payments: MakePaymentData[];
  studentId;
  amount;
  updateWallet;
}) {
  await Promise.all(
    data.payments.map(async (p) => {
      const { studentTermId, payment, termId, yearId, payable } = p;

      await prisma.studentTermSheets.update({
        where: {
          id: studentTermId,
        },
        data: {
          owing: payable,
          Transactions: {
            create: {
              academicTermsId: termId,
              academicYearsId: yearId,
              // description: "school-fee",
              userId: 1,
              updateWallet: data.updateWallet,
              type: payment.type as string,
              transaction: "credit",
              amount: data.amount,
              meta: {},
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
      });

      if (data.updateWallet) await updateWallet(data.amount, termId);
    })
  );
  revalidatePath("/[lng]/session/[sessionSlug]/term/[termSlug]/students");
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
              AcademicYear: {
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
        yearId: t.Term.AcademicYear.id,
      };
    }
    return null;
  }).filter(Boolean);
  return {
    owing,
    owingHistory,
  };
}

export async function _setStudentTermPayable(studentTermId, payable) {
  const payments = await prisma.walletTransactions.findMany({
    where: {
      studentTermSheetsId: studentTermId,
      description: "school-fee",
    },
  });
  const paid = sum(payments, "amount") || 0;
  const owing = payable - paid;
  await prisma.studentTermSheets.update({
    where: {
      id: studentTermId,
    },
    data: {
      payable,
      owing,
    },
  });
  revalidatePath("/[lng]/[sessionSlug]/[termSlug]/students", "page");
}
