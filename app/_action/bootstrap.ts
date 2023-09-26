"use server";

import { _createAcademicSession } from "./_session";
import { _createAcademicTerm } from "./_term";

export async function _bootstrap() {
  const session = await _createAcademicSession({
    title: "١٤٤٥/١٤٤٦",
  } as any);
  const term = await _createAcademicTerm(session.slug, {
    title: `الفترة الأولى`,
  } as any);
}
