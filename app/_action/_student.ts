"use server";

import { prisma } from "@/db";
import { StudentForm } from "@/types/types";
import { slugModel } from "./utils";
import { revalidatePath } from "next/cache";

export async function _updateStudent(data: StudentForm) {}
export async function _createStudent(data: StudentForm) {
  const student = await prisma.students.create({
    data: {
      name: data.name,

      StudentTermSheets: {
        create: data.classId
          ? {
              termId: +data.termId,
              classId: +data.classId,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          : undefined,
      },
    },
  });
  revalidatePath("/[sessionSlug]/[termSlug]/students", "page");
}
