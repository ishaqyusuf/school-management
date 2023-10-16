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
    `الأول التمهيدي`,
    `الأول التمهيدي ب`,
    `الأول التمهيدي ج`,
    `الثاني التمهيدي`,
    `الأول الإبتدائي`,
    `الثاني الإبتدائي`,
    `الأول الإعدادي`,
  ]);
  return { session, classes, term };
  // create students and register them to classroom
}
export async function _createSecondTerm() {
  const firstTerm = await prisma.academicTerms.findFirst({
    where: { title: `الفترة الأولى` },
  });
  if (firstTerm && !firstTerm.endsAt) {
    const startedAt = firstTerm.startedAt;
    const term = await _createAcademicTerm(1, {
      title: `الفترة الثانية`,
      startedAt: startedAt,
    } as any);
    await prisma.academicTerms.update({
      where: { id: firstTerm.id },
      data: {
        endsAt: new Date(),
      },
    });
  }
}
