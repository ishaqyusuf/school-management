"use server";

import { prisma } from "@/db";
import { StudentForm } from "@/types/types";
import { slugModel } from "./utils";

export async function _updateStudent(data: StudentForm) {}
export async function _createStudent(data: StudentForm) {
  const student = await prisma.students.create({
    data: {
      name: data.name,
      slug: await slugModel(data.name, prisma.students),
      StudentTermSheets: {
        create: {
          classId: data.classId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });
  await prisma.studentTermSheets.create({});
}
