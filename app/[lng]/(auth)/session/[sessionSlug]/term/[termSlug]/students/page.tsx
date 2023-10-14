import { prisma } from "@/db";
import StudentListShell from "@/components/shell/student-list-shell";
import StudentOptionSheet from "@/components/sheets/student-option-sheet";
import StudentPaymentFormSheet from "@/components/sheets/student-payment-form";
export default async function StudentsPage({ searchParams, params }) {
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
      <StudentListShell params={params} list={s as any} />
      {/* <StudentForm classRooms={classRooms} /> */}
      <StudentOptionSheet lng={params.lng} />
      <StudentPaymentFormSheet lng={params.lng} />
    </div>
  );
}
