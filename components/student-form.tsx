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
import { useTranslation } from "@/app/i18n/client";
 

interface Props {
  classRooms: ClassRoom[];
  params;
}
export default function StudentFormComponent({ classRooms, params }: Props) {

  const {t} = useTranslation(params.lng)
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
        toast(t('success'), {
          action: {
            label: t('go-back'),
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
            <FormInput label={t('student-name')} rtl form={form} formKey={"name"} />
            <SelectInput
              label={t("sex")}
              rtl
              options={[t('male'), t('female')]}
              form={form}
              formKey={"sex"}
            />
            <SelectInput
              label={t('class')}
              rtl
              options={classRooms}
              itemValue={"id"}
              itemText={"title"}
              form={form}
              formKey={"classId"}
            />
            <FormInput
              label={t('parent-name')}
              rtl
              form={form}
              formKey={"parentName"}
            />
            <FormInput
              label={t('parent-phone')}
              rtl
              form={form}
              formKey={"phoneNo"}
            />
          </div>
          <div className="flex justify-end mt-4">
            <div>
              <Btn onClick={save} isLoading={saving}>
                {t('register')}
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
