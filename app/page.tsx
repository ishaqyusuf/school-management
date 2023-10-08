import { prisma } from "@/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { _bootstrap } from "./_action/bootstrap";

export default async function Home() {
  if ((await prisma.academicTerms.count()) == 0) await _bootstrap();
  const term = await prisma.academicTerms.findFirst({
    where: {},
    orderBy: {
      startedAt: "desc",
    },
    include: {
      AcademicYear: {
        select: {
          id: true,
        },
      },
    },
  });
  console.log(term);
  redirect(`/session/${term?.AcademicYear.id}/term/${term?.id}`);
  return <></>;
}
