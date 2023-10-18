import { prisma } from "@/db";
import StudentListShell from "@/components/shell/student-list-shell";
import StudentOptionSheet from "@/components/sheets/student-option-sheet";
import StudentPaymentFormSheet from "@/components/sheets/student-payment-form";
import SetStudentClassSheet from "@/components/sheets/set-student-class-sheet";
import UpdateStudentPayableSheet from "@/components/sheets/update-student-payable";
import Header from "@/components/header";
export default async function StudentsPage({ searchParams, params }) {
  // const t = await prisma.studentTermSheets.updateMany({
  //   where: {
  //     owing: null,
  //   },
  //   data: {
  //     owing: 3000,
  //   },
  // });
  // console.log(t);
  const students = await prisma.students.findMany({
    where: {},
    include: {
      StudentTermSheets: {
        // where: {
        //   termId: +params.termSlug,
        // },
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

  // console.log(classRooms);
  return (
    <div className="">
      <Header title="students" lng={params.lng} back />
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
    </div>
  );
}
