"use server";

import { start } from "repl";
import { _createClassRooms } from "./_class-room";
import { _createAcademicSession } from "./_session";
import { _createAcademicTerm } from "./_term";
import dayjs from "dayjs";
import { prisma } from "@/db";

export async function _bootstrap() {
  // create session:
  await prisma.classRoom.deleteMany({});
  await prisma.academicTerms.deleteMany({});
  await prisma.academicYears.deleteMany({});
  const startedAt = dayjs()
    .set("month", 7)
    .set("D", 26);
  // return startedAt;
  const session = await _createAcademicSession({
    title: "١٤٤٥/١٤٤٦",
  } as any);
  //create term:

  const term = await _createAcademicTerm(session.id, {
    title: `الفترة الأولى`,
    startedAt: startedAt.toISOString(),
  } as any);
  //create classRooms
  const classes = await _createClassRooms(session.id, [
    `الأول التمهيدى ا`,
    `الأول التمهيدى ب`,
    `الأول التمهيدى ج`,
    `الثاني التمهيدي`,
    `الأول الإبتدائي`,
  ]);
  return { session, classes, term };
  // create students and register them to classroom
}
