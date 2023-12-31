"use server";

import { prisma } from "@/db";
import { IQuery, IStudentFormTerms, StudentForm } from "@/types/types";
import { revalidatePath } from "next/cache";
import { _makePayment, _payEntranceFee } from "./_payment";
import { Prisma } from "@prisma/client";
import { _revalidate } from "./_revalidate";
export async function _getStudents(query: IQuery, params) {
  const where: Prisma.StudentsWhereInput = {};
  if (query._classId) {
    where.StudentTermSheets = {
      some: {
        classId: +query._classId,
        termId: +params.termSlug,
      },
    };
  }
  const students = await prisma.students.findMany({
    where,
    include: {
      StudentTermSheets: {
        include: {
          classRoom: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return students;
}
export async function _updateStudent(data: StudentForm) {
  await prisma.students.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      sex: data.sex,
    },
  });
  _revalidate("students");
}
export async function _createStudent(
  data: StudentForm,
  {
    terms,
    entranceForm,
  }: {
    terms: IStudentFormTerms[];
    entranceForm?: {
      checked: boolean;
      updateWallet: boolean;
    };
  }
) {
  if (
    await prisma.students.count({
      where: {
        name: data.name,
      },
    })
  )
    throw new Error("student-exists");
  const student = await prisma.students.create({
    data: {
      name: data.name,
      sex: data.sex,
      meta: {
        ...data.meta,
      },
      StudentTermSheets: {
        createMany:
          data.classId && terms.length
            ? {
                data: terms.map((term) => ({
                  termId: term.id,
                  classId: +data.classId,
                  payable: data.meta.schoolFee,
                  owing: data.meta.schoolFee - term.amount,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                })),
              }
            : undefined,
        // create: data.classId
        //   ? {
        //       termId: +data.termId,
        //       classId: +data.classId,
        //       payable: data.meta.schoolFee,
        //       owing: data.meta.schoolFee,
        //       createdAt: new Date(),
        //       updatedAt: new Date(),
        //     }
        //   : undefined,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    include: {
      StudentTermSheets: {
        orderBy: {
          termId: "desc",
        },
        include: {
          term: true,
        },
      },
    },
  });
  const termSheets = student.StudentTermSheets;
  const currentTerm = termSheets?.[0];
  console.log(termSheets);
  if (currentTerm) {
    if (entranceForm?.checked) {
      await _payEntranceFee(
        termSheets[0]?.id,
        {
          academicTermsId: currentTerm.termId,
          academicYearsId: currentTerm.term.academicYearId,
          updateWallet: entranceForm.updateWallet,
        },
        false
      );
    }
    if (terms.length) {
      console.log(termSheets);
      console.log(terms);
      await _makePayment(
        {
          studentId: student.id,
          payments: terms
            .map((t) => {
              const termSheet = termSheets.find((_t) => _t.termId == t.id);
              if (!termSheet) return null as any;
              return {
                owing: termSheet.owing,
                studentTermId: termSheet.id,
                termId: termSheet.termId,
                yearId: termSheet.term.academicYearId,
                payment: {
                  amount: t.amount,
                  updateWallet: t.updateWallet,
                  type: "school-fee",
                },
              };
            })
            .filter(Boolean), //.filter(Boolean)
        },
        false
      );
    }
  }
  revalidatePath("/[sessionSlug]/[termSlug]/students", "page");
}
export async function _deleteStudent(studentId) {
  await prisma.walletTransactions.deleteMany({
    where: {
      studentTermSheet: {
        studentId,
      },
    },
  });
  await prisma.studentTermSheets.deleteMany({
    where: {
      studentId,
    },
  });
  await prisma.students.delete({
    where: {
      id: studentId,
    },
  });
  _revalidate("students");
}
