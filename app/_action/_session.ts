"use server";

import { prisma } from "@/db";
import { slugModel } from "./utils";

export async function _createAcademicSession(data) {
  data.createdAt = data.updatedAt = new Date();
  data.slug = await slugModel(data.title);
  await prisma.academicYears.create({
    data: {
      ...data,
    },
  });
}
