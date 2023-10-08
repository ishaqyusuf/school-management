import MobileList from "@/components/shared/mobile-list";
import { Button } from "@/components/ui/button";
import { prisma } from "@/db";
import { Plus } from "lucide-react";
import StudentForm from "@/components/sheets/student-form-sheet";
import { openModal } from "@/lib/modal";
import StudentListShell from "@/components/shell/student-list-shell";
import StudentOptionSheet from "@/components/sheets/student-option-sheet";
export default async function StudentsPage({ searchParams, params }) {
  const students = await prisma.students.findMany({
    where: {},
    include: {
      StudentTermSheets: {
        where: {
          termId: +params.termSlug,
        },
        include: {
          ClassRoom: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  let s = students.map((_s) => {
    const termSheet = _s.StudentTermSheets?.[0];
    return {
      ..._s,
      termSheet,
    };
  });

  // console.log(classRooms);
  return (
    <div className="">
      <StudentListShell params={params} list={s as any} />
      {/* <StudentForm classRooms={classRooms} /> */}
      <StudentOptionSheet />
    </div>
  );
}
