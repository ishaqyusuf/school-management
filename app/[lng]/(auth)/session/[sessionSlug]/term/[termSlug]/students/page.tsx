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
import StudentListShell from "@/components/shell/student-list-shell";
export default async function StudentsPage({ searchParams, params }) {
  // console.log(params);
  const students = await _getStudents(searchParams, params);
  console.log(params);
  const classRooms = await _getClassRooms(+params.sessionSlug);
  let s = students.map((_s) => {
    const termSheet = _s.StudentTermSheets.find(
      (s) => s.termId == +params.termSlug
    );
    return {
      ..._s,
      termSheet,
      amountOwed: _s.StudentTermSheets.map((s) => s.owing || 0).reduce(
        (a, b) => a + b,
        0
      ),
    };
  });
  const terms = await prisma.academicTerms.findMany({
    where: {
      academicYearId: +params.sessionSlug,
    },
  });
  // console.log(classRooms);
  return (
    <div className="">
      <Header title="students" filter="studentFilter" lng={params.lng} back />
      <StudentListShell params={params} list={s as any} />
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
