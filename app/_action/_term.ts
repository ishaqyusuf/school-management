"use server";

import { AcademicTerms } from "@prisma/client";
import { slugModel } from "./utils";
import { prisma } from "@/db";

export async function _createAcademicTerm(sessionId, data: AcademicTerms) {
  // const session = await prisma.academicTerms.findFirst({
  //     where: {
  //         slug: sessionSlug
  //     }
  // })

  data.createdAt = new Date();
  data.updatedAt = new Date();
  return await prisma.academicTerms.create({
    data: {
      AcademicYear: {
        connect: {
          id: sessionId,
        },
      },
      ...(data as any),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
