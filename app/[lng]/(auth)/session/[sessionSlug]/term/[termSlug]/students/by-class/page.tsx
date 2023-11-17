import StudentListShell from "@/components/shell/student-list-by-class-shell";
import StudentOptionSheet from "@/components/sheets/student-option-sheet";
import StudentPaymentFormSheet from "@/components/sheets/student-payment-form";
import SetStudentClassSheet from "@/components/sheets/set-student-class-sheet";
import UpdateStudentPayableSheet from "@/components/sheets/update-student-payable";
import Header from "@/components/header";
import StudentFilterSheet from "@/components/sheets/filters/student-filter-sheet";
import { _getClassRooms } from "@/app/_action/_class-room";
import { _getStudents } from "@/app/_action/_student";
import StudentFormSheet from "@/components/sheets/student-form-sheet";
import { prisma } from "@/db";
import StudentListByClassShell from "@/components/shell/student-list-by-class-shell";
import { _getStudentsByClass } from "@/app/_action/_student-by-class";
export default async function StudentsPage({ searchParams, params }) {
  // console.log(params);
  const students = await _getStudentsByClass(searchParams, params);
  const classRooms = await _getClassRooms(+params.sessionSlug);

  const terms = await prisma.academicTerms.findMany({
    where: {
      academicYearId: +params.sessionSlug,
    },
  });
  // console.log(classRooms);
  return (
    <div className="">
      <Header
        title="students-by-class"
        filter="studentFilter"
        lng={params.lng}
        back
      />
      <StudentListByClassShell params={params} list={students as any} />
      {/* <StudentForm classRooms={classRooms} /> */}
      <StudentOptionSheet lng={params.lng} />
      <SetStudentClassSheet
        lng={params.lng}
        termId={+params.termSlug}
        sessionId={+params.sessionSlug}
      />
      <StudentPaymentFormSheet
        academicTermsId={+params.termSlug}
        academicYearsId={+params.sessionSlug}
        lng={params.lng}
      />
      <UpdateStudentPayableSheet lng={params.lng} />
      <StudentFilterSheet
        ClassRooms={classRooms}
        lng={params.lng}
        query={searchParams}
      />
      <StudentFormSheet classRooms={classRooms} terms={terms} params={params} />
      {/* lng={params.lng} */}
    </div>
  );
}
