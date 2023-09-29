"use server";

import { start } from "repl";
import { _createClassRooms } from "./_class-room";
import { _createAcademicSession } from "./_session";
import { _createAcademicTerm } from "./_term";
import dayjs from "dayjs";

export async function _bootstrap() {
  // create session:
  const startedAt = dayjs()
    .set("month", 7)
    .set("D", 26);
  // return startedAt;
  const session = await _createAcademicSession({
    title: "١٤٤٥/١٤٤٦",
  } as any);
  //create term:

  const term = await _createAcademicTerm(session.slug, {
    title: `الفترة الأولى`,
    startedAt: startedAt.toISOString(),
  } as any);
  //create classRooms
  const classes = await _createClassRooms(session.slug, [
    `الأول التمهيدى ا`,
    `الأول التمهيدى ب`,
    `الأول التمهيدى ج`,
    `الثاني التمهيدي`,
    `الأول الإبتدائي`,
  ]);
  return { session, classes, term };
  // create students and register them to classroom
}
