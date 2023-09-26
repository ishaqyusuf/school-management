"use server";

import { prisma } from "@/db";
import { slugModel, sluggify } from "./utils";

export async function _createClassRooms(sessionSlug, classes: string[]) {
  await prisma.classRoom.createMany({
    data: classes.map((title) => ({
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      slug: sluggify(sessionSlug, title),
    })),
  });
}
