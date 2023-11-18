"use server";

import { prisma } from "@/db";
import { slugModel } from "./utils";
import { sluggify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
export async function _getClassRooms(sessionId) {
  const classRooms = await prisma.classRoom.findMany({
    where: {
      academicYearsId: sessionId,
    },
  });
  return classRooms;
}
export async function _changeStudentClassroom(studentTermId, classId) {
  await prisma.studentTermSheets.update({
    where: {
      id: studentTermId,
    },
    data: {
      ClassRoom: {
        connect: {
          id: classId,
        },
      },
    },
  });
  revalidatePath("/[lng]/[sessionSlug]/[termSlug]/students", "page");
}
export async function _addStudentToClass(studentId, classId, termId, payable) {
  await prisma.studentTermSheets.create({
    data: {
      classId,
      studentId,
      payable,
      owing: payable,
      termId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  revalidatePath("/[lng]/[sessionSlug]/[termSlug]/students", "page");
}

export async function _createClassRooms(sessionId, classes: string[]) {
  return await prisma.academicYears.update({
    where: {
      id: sessionId,
    },
    data: {
      classRooms: {
        createMany: {
          data: classes.map((title) => ({
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
    },
    include: {
      classRooms: true,
    },
  });
  // await prisma.classRoom.createMany({
  //   data: classes.map((title) => ({
  //     academicYearsId: 1,
  //     title,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     slug: sluggify(sessionSlug, title),
  //   })),
  // });
}
