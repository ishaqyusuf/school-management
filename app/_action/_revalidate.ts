"use server";

import { revalidatePath } from "next/cache";

export type IPage = "transactions" | "students";
export async function _revalidate(page: IPage) {
  const path = ({
    transactions: "/[lng]/session/[sessionSlug]/term/[termSlug]/transactions",
    students: "/[lng]/session/[sessionSlug]/term/[termSlug]/students",
  } as { [page in IPage]: string })[page];
  if (path) revalidatePath(path, "page");
}
