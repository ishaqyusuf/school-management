"use server";

import { prisma } from "@/db";
import { slugModel } from "./utils";
import { sluggify } from "@/lib/utils";

export async function _createClassRooms(sessionId, classes: string[]) {
  return await prisma.academicYears.update({
    where: {
      id: sessionId,
    },
    data: {
      ClassRooms: {
        createMany: {
          data: classes.map((title) => ({
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
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
