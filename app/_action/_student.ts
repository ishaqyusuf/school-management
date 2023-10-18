"use server";

import { prisma } from "@/db";
import { StudentForm } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function _updateStudent(data: StudentForm) {}
export async function _createStudent(data: StudentForm) {
  const student = await prisma.students.create({
    data: {
      name: data.name,
      sex: data.sex,
      meta: {
        ...data.meta,
      },
      StudentTermSheets: {
        create: data.classId
          ? {
              termId: +data.termId,
              classId: +data.classId,
              payable: +data.meta?.schoolFee || 3000,
              owing: +data.meta?.schoolFee || 3000,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          : undefined,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  revalidatePath("/[sessionSlug]/[termSlug]/students", "page");
}
