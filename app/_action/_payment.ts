"use server";

import { prisma } from "@/db";
import { IStudentTermSheet } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function _makePayment(data) {
  await Promise.all(
    data.payments.map(async (p) => {
      const { studentTermId, payment, payable } = p;
      await prisma.studentTermSheets.update({
        where: {
          id: studentTermId,
        },
        data: {
          owing: payable,
          Fees: {
            create: {
              ...payment,
            },
            // createMany: {
            //   data: [...data.payments],
            // },
          },
        },
      });
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
              title: true,
              AcademicYear: {
                select: {
                  title: true,
                },
              },
            },
          },
          Fees: {
            select: {
              paymentType: true,
              amount: true,
            },
          },
        },
      },
    },
  });

  let owing = 0;

  const owingHistory = student?.StudentTermSheets.map((term) => {
    const t: IStudentTermSheet = term as any;
    const totalPaid =
      t.Fees.filter((f) => f.paymentType == "fee")
        .map((f) => f.amount)
        .reduce((p, c) => (p || 0) + (c || 0), 0) || 0;
    // let payable = t.meta?.payable;
    // if (!(payable >= 0)) payable = 3000;
    // const balance = payable - totalPaid;
    let _owing = term.owing || 0;
    if (_owing > 0) {
      owing += _owing;
      return {
        owing: _owing,
        term: term.Term.title,
        termId: term.id,
      };
    }
    return null;
  }).filter(Boolean);
  return {
    owing,
    owingHistory,
  };
}
