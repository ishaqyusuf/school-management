"use client";

import BaseSheet from "./base-sheet";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { AcademicTerms, ClassRoom } from "@prisma/client";
import StudentFormComponent from "../student-form";
import { useTranslation } from "@/app/i18n/client";

interface Props {
  classRooms: ClassRoom[];
  params;
  terms: AcademicTerms[];
}
export default function StudentFormSheet(props: Props) {
  const { t } = useTranslation(props.params.lng);
  return (
    <BaseSheet
      side="bottom"
      modalName="studentForm"
      Title={({ data }) => <div>{t("edit-details")}</div>}
      Content={({ data }) => <StudentFormComponent {...props} data={data} />}
    />
  );
}
