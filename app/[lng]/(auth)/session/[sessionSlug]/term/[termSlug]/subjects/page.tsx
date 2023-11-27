import { prisma } from "@/db";
import Header from "@/components/header";
import { _updateWallet } from "@/app/_action/_wallet";
import SubjectListShell from "@/components/shell/subjects-list-shell";
import SubjectFormSheet from "@/components/sheets/subject-form-sheet";
import SessionSubjectOption from "@/components/sheets/session-subject-option";
export default async function SubjectsPage({ searchParams, params }) {
  const subjectsByClassRoom = await prisma.classRoom.findMany({
    where: {
      academicYearsId: +params.sessionSlug,
    },
    include: {
      sessionSubjects: {
        include: {
          subject: true,
        },
      },
    },
  });

  return (
    <div className="">
      <Header lng={params.lng} title="transactions" back />
      <SubjectListShell params={params} list={subjectsByClassRoom as any} />

      <SubjectFormSheet
        lng={params.lng}
        academicTermsId={+params.termSlug}
        academicYearsId={+params.sessionSlug}
      />

      <SessionSubjectOption lng={params.lng} />
    </div>
  );
}
