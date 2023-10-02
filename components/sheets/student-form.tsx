"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { StudentForm } from "@/types/types";
import AutoComplete from "../shared/auto-complete";
import Btn from "../shared/btn";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { ClassRoom } from "@prisma/client";

interface Props {
  classRooms: ClassRoom[];
}
export default function StudentForm({ classRooms }: Props) {
  const form = useForm<StudentForm>({
    defaultValues: {},
  });
  const [saving, startTransition] = useTransition();
  async function save() {
    startTransition(async () => {
      const formData = form.getValues();
      if (formData.termId) await _updateStudent(formData);
      else await _createStudent(formData);
    });
  }
  return (
    <BaseSheet
      side="bottom"
      modalName="studentForm"
      Title={({ data }) => <div>استمارة قبول الطالب</div>}
      Content={({ data }) => (
        <div className="min-h-[75vh]">
          <div className="grid gap-4">
            <AutoComplete label="اسم الطالب" rtl form={form} formKey={"name"} />
            <AutoComplete
              label="فصل"
              rtl
              options={classRooms}
              itemValue={"id"}
              itemText={"title"}
              form={form}
              formKey={"classId"}
            />
            <AutoComplete
              label="اسم الوالد"
              rtl
              form={form}
              formKey={"parentName"}
            />
            <AutoComplete
              label="رقم هاتف الوالد"
              rtl
              form={form}
              formKey={"phoneNo"}
            />
          </div>
          <div className="flex justify-end mt-4">
            <div>
              <Btn onClick={save} isLoading={saving}>
                سجل
              </Btn>
            </div>
          </div>
        </div>
      )}
    />
  );
}
