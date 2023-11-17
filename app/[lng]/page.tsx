import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { _bootstrap, _createSecondTerm } from "../_action/bootstrap";

export default async function Home() {
  if ((await prisma.academicTerms.count()) == 0) await _bootstrap();
  if ((await prisma.academicTerms.count()) == 1) await _createSecondTerm();
  const term = await prisma.academicTerms.findFirst({
    where: {
      endsAt: null,
    },
    orderBy: {
      startedAt: "desc",
    },
    include: {
      academicYear: {
        select: {
          id: true,
        },
      },
    },
  });
  // console.log(term);
  redirect(`/session/${term?.academicYear.id}/term/${term?.id}`);
  return <></>;
}
