"use server";

import { prisma } from "@/db";
import { IQuery } from "@/types/types";

export async function _getStudentsByClass(query: IQuery, params) {
  const classes = await prisma.classRoom.findMany({
    where: {},
    include: {
      studentTermSheets: {
        where: {
          termId: +params.termSlug,
        },
        orderBy: {
          student: {
            name: "asc",
          },
        },
        include: {
          student: {
            include: {
              StudentTermSheets: true,
            },
          },
        },
      },
    },
  });

  return classes.map((c) => {
    return {
      ...c,
      StudentTermSheets: c.studentTermSheets
        .map((ts) => {
          return {
            ...ts,
            Student: {
              ...ts.student,
              amountOwed: ts.student?.StudentTermSheets?.map(
                (s) => s.owing || 0
              ).reduce((a, b) => a + b, 0),
              termSheet: c.studentTermSheets.find(
                (t) => t.termId == +params.termSlug
              ),
            },
            //   amountOwed: ts.Student,
          };
        })
        .sort((a, b) => a.Student?.amountOwed - b.Student?.amountOwed),
    };
  });
}
