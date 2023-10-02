import MobileList from "@/components/shared/mobile-list";
import { Button } from "@/components/ui/button";
import { prisma } from "@/db";
import { Plus } from "lucide-react";
import StudentForm from "@/components/sheets/student-form";
import { openModal } from "@/lib/modal";
import StudentListShell from "@/components/shell/student-list-shell";
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
  });
  console.log(students[0]?.StudentTermSheets[0]?.ClassRoom);
  let s = students.map((_s) => {
    const termSheet = _s.StudentTermSheets?.[0];
    return {
      ..._s,
      termSheet,
    };
  });
  // const students = await prisma.studentTermSheets.findMany({
  //   where: {
  //     Term: {
  //       id: +params.termSlug,
  //     },
  //   },
  //   include: {
  //     Student: true,
  //     Fees: true,
  //     ClassRoom: true,
  //   },
  // });
  const classRooms = await prisma.classRoom.findMany({
    where: {
      academicYearsId: +params.sessionSlug,
    },
  });
  // console.log(classRooms);
  return (
    <div className="">
      <StudentListShell list={s as any} />
      <StudentForm classRooms={classRooms} />
    </div>
  );
}
