import StudentFormComponent from "@/components/student-form";
import { prisma } from "@/db";

export default async function StudentFormPage({ searchParams, params }) {
  const classRooms = await prisma.classRoom.findMany({
    where: {
      academicYearsId: +params.sessionSlug,
    },
  });
  return (
    <div className="p-4">
      <StudentFormComponent params={params} classRooms={classRooms} />
    </div>
  );
}
