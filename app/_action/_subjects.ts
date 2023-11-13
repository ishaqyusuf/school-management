"use server";

import { prisma } from "@/db";
import { IQuery } from "@/types/types";

export async function _getSubjects(query: IQuery, params) {
  const subjects = await prisma.subjects.findMany({
    where: {},
  });
}
