import { prisma } from "@/db";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
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
  redirect(`/${term?.AcademicYear.id}/${term?.id}`);
  return <></>;
}
