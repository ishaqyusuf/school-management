"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { StudentForm } from "@/types/types";
import Btn from "../shared/btn";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { ClassRoom } from "@prisma/client";
import { useParams } from "next/navigation";
import { closeModal } from "@/lib/modal";
import SelectInput from "../shared/select-input";
import { Form } from "../ui/form";
import FormInput from "../shared/form-input";

interface Props {
  classRooms: ClassRoom[];
}
export default function StudentFormSheet({ classRooms }: Props) {
  const form = useForm<StudentForm>({
    defaultValues: {
      meta: {
        schoolFee: 3000,
      },
    },
  });
  const [saving, startTransition] = useTransition();
  const p = useParams();
  async function save() {
    startTransition(async () => {
      const formData = form.getValues();
      console.log(formData);
      formData.termId = Number(p?.termSlug);
      if (formData.id) await _updateStudent(formData);
      else await _createStudent(formData);
      closeModal();
    });
  }
  return (
    <BaseSheet
      side="bottom"
      modalName="studentForm"
      Title={({ data }) => <div>استمارة قبول الطالب</div>}
      Content={({ data }) => (
        <Form {...form}>
          <div className="min-h-[75vh]">
            <div className="grid gap-4">
              <FormInput label="اسم الطالب" rtl form={form} formKey={"name"} />
              <SelectInput
                label="جنس"
                rtl
                options={["ذكر", "أنثى"]}
                form={form}
                formKey={"sex"}
              />
              {/* <AutoComplete
                label="جنس"
                rtl
                options={["ذكر", "أنثى"]}
                form={form}
                formKey={"sex"}
              /> */}
              <SelectInput
                label="فصل"
                rtl
                options={classRooms}
                itemValue={"id"}
                itemText={"title"}
                form={form}
                formKey={"classId"}
              />
              <SelectInput
                label="فصل"
                rtl
                options={classRooms}
                itemValue={"id"}
                itemText={"title"}
                form={form}
                formKey={"meta.schoolFee"}
              />
              <FormInput
                label="اسم الوالد"
                rtl
                form={form}
                formKey={"parentName"}
              />
              <FormInput
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
        </Form>
      )}
    />
  );
}
