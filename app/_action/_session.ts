"use server";

import { prisma } from "@/db";
import { slugModel } from "./utils";
import { AcademicYears } from "@prisma/client";

export async function _createAcademicSession(data: AcademicYears) {
  data.createdAt = data.updatedAt = new Date();
  const session = await prisma.academicYears.create({
    data: {
      ...(data as any),
    },
  });
  return session;
}
