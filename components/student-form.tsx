"use client";

import { useForm } from "react-hook-form";
import { StudentForm } from "@/types/types";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { ClassRoom } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Form } from "./ui/form";
import FormInput from "./shared/form-input";
import SelectInput from "./shared/select-input";
import Btn from "./shared/btn";
import { toast } from "sonner";
import { termLink } from "@/lib/utils";

interface Props {
  classRooms: ClassRoom[];
  params;
}
export default function StudentFormComponent({ classRooms, params }: Props) {
  const form = useForm<StudentForm>({
    defaultValues: {},
  });
  const [saving, startTransition] = useTransition();
  const p = useParams();
  const router = useRouter();
  async function save() {
    startTransition(async () => {
      const formData = form.getValues();
      // console.log(formData);
      formData.termId = Number(p?.termSlug);
      if (formData.id) await _updateStudent(formData);
      else {
        await _createStudent(formData);
        toast("success", {
          action: {
            label: "Go Back",
            onClick: () => router.push(termLink(params, "students")),
          },
        });
      }
      // closeModal();
    });
  }
  return (
    <>
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
    </>
  );
  // return (
  //   <BaseSheet
  //     side="bottom"
  //     modalName="studentForm"
  //     Title={({ data }) => <div>استمارة قبول الطالب</div>}
  //     Content={({ data }) => (

  //     )}
  //   />
  // );
}
