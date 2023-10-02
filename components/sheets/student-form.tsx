"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { StudentForm } from "@/types/types";
import AutoComplete from "../shared/auto-complete";
import { Button } from "../ui/button";
import Btn from "../shared/btn";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";

export default function StudentForm() {
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
            {/* <Input {...form.register("firstName")} className="h-8 text-right" /> */}
            <AutoComplete label="اسم الطالب" rtl form={form} formKey={"name"} />

            <div className="grid gap-2">
              <AutoComplete label="فصل" rtl form={form} formKey={"termId"} />
            </div>
            <AutoComplete
              label="اسم الوالد"
              rtl
              form={form}
              formKey={"parentName"}
            />
            <div className="">
              <AutoComplete
                label="رقم هاتف الوالد"
                rtl
                form={form}
                formKey={"phoneNo"}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <div>
              <Btn isLoading={saving}>سجل</Btn>
            </div>
          </div>
        </div>
      )}
    />
  );
}
