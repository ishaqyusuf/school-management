"use server";

import { AcademicTerms } from "@prisma/client";
import { slugModel } from "./utils";
import { prisma } from "@/db";

export async function _createAcademicTerm(sessionSlug, data: AcademicTerms) {
  // const session = await prisma.academicTerms.findFirst({
  //     where: {
  //         slug: sessionSlug
  //     }
  // })
  data.slug = await slugModel(`${sessionSlug} ${data.title}`);
  data.createdAt = new Date();
  data.updatedAt = new Date();
  await prisma.academicTerms.create({
    data: data as any,
  });
}
