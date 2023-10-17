"use server";

import { revalidatePath } from "next/cache";

export type IPage = "transactions";
export async function _revalidate(page: IPage) {
  const path = ({
    transactions: "/[lng]/session/[sessionSlug]/term/[termSlug]/transactions",
  } as { [page in IPage]: string })[page];
  if (path) revalidatePath(path, "page");
}
