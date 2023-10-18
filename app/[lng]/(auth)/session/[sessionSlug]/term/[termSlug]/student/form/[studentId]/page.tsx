import Header from "@/components/header";
import StudentFormComponent from "@/components/student-form";
import { prisma } from "@/db";

export default async function StudentFormPage({ searchParams, params }) {
  const classRooms = await prisma.classRoom.findMany({
    where: {
      academicYearsId: +params.sessionSlug,
    },
  });
  const terms = await prisma.academicTerms.findMany({
    where: {
      academicYearId: +params.sessionSlug,
    },
  });
  return (
    <div className="p-4">
      <Header title={"student-form"} back lng={params.lng} />
      <StudentFormComponent
        params={params}
        terms={terms}
        classRooms={classRooms}
      />
    </div>
  );
}
