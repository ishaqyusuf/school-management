"use server";

import { prisma } from "@/db";
import { AcademicYears } from "@prisma/client";
import { slugModel } from "./utils";

export async function createAcademicSession(data: AcademicYears) {
  data.createdAt = data.updatedAt = new Date();
  data.slug = await slugModel();
  await prisma.academicYears.create();
}
