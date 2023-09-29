"use server";

import { prisma } from "@/db";
import { slugModel } from "./utils";
import { sluggify } from "@/lib/utils";

export async function _createClassRooms(sessionSlug, classes: string[]) {
  return await prisma.academicYears.update({
    where: {
      slug: sessionSlug,
    },
    data: {
      ClassRooms: {
        createMany: {
          data: classes.map((title) => ({
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
            slug: sluggify(sessionSlug, title),
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
