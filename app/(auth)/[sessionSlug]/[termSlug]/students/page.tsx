import MobileList from "@/components/shared/mobile-list";
import { Button } from "@/components/ui/button";
import { prisma } from "@/db";
import { Plus } from "lucide-react";
import StudentForm from "@/components/sheets/student-form";
import { openModal } from "@/lib/modal";
import StudentListShell from "@/components/shell/student-list-shell";
export default async function StudentsPage({ searchParams, params }) {
  const students = await prisma.studentTermSheets.findMany({
    where: {
      Term: {
        id: +params.termSlug,
      },
    },
    include: {
      Student: true,
      Fees: true,
      ClassRoom: true,
    },
  });
  const classRooms = await prisma.classRoom.findMany({
    where: {
      academicYearsId: +params.sessionsSlug,
    },
  });
  return (
    <div className="">
      <StudentListShell />
      <StudentForm classRooms={classRooms} />
    </div>
  );
}
