"use server";

import { prisma } from "@/db";
import { IQuery } from "@/types/types";

export async function _getStudentsByClass(query: IQuery, params) {
  const classes = await prisma.classRoom.findMany({
    where: {},
    include: {
      StudentTermSheets: {
        include: {
          Student: {
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
      StudentTermSheets: c.StudentTermSheets.map((ts) => {
        return {
          ...ts,
          Student: {
            ...ts.Student,
            amountOwed: ts.Student?.StudentTermSheets?.map(
              (s) => s.owing || 0
            ).reduce((a, b) => a + b, 0),
          },
          //   amountOwed: ts.Student,
        };
      }).sort((a, b) => a.Student?.amountOwed - b.Student?.amountOwed),
    };
  });
}
