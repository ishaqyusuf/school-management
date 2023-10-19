"use client";

import { useForm } from "react-hook-form";
import { IStudentFormTerms, StudentForm } from "@/types/types";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { AcademicTerms, ClassRoom } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import FormInput from "./shared/form-input";
import SelectInput from "./shared/select-input";
import Btn from "./shared/btn";
import { toast } from "sonner";
import { termLink } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface Props {
  classRooms: ClassRoom[];
  params;
  terms: AcademicTerms[];
}
export default function StudentFormComponent({
  classRooms,
  terms,
  params,
}: Props) {
  const { t } = useTranslation(params.lng);
  const form = useForm<
    StudentForm & {
      entranceForm: {
        checked: boolean;
        updateWallet: boolean;
      };
      terms: {
        [termId in any]: { amount; updateWallet; checked };
      };
    }
  >({
    defaultValues: {
      meta: {
        schoolFee: 3000,
      },
      terms: {},
    },
  });
  const [saving, startTransition] = useTransition();
  const p = useParams();
  const router = useRouter();
  async function save() {
    startTransition(async () => {
      const { terms, entranceForm, ...formData } = form.getValues();
      console.log(terms);
      // return;
      formData.termId = Number(p?.termSlug);
      formData.meta.schoolFee = Number(formData.meta.schoolFee || 0);
      try {
        if (formData.id) await _updateStudent(formData);
        else {
          const _terms: IStudentFormTerms[] = [];
          Object.entries(terms).map(([k, v]) => {
            if (v?.checked)
              _terms.push({
                id: +k,
                amount: +v.amount || 0,
                updateWallet: v.updateWallet,
              });
          });
          await _createStudent(formData, {
            entranceForm,
            terms: _terms,
          });
          toast(t("success"), {
            action: {
              label: t("go-back"),
              onClick: () => router.push(termLink(params, "students")),
            },
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(t("student-exists"));
      }
      // closeModal();
    });
  }
  return (
    <>
      <Form {...form}>
        <div className="min-h-[75vh]">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t("student-name")}
              rtl
              className="col-span-2"
              form={form}
              formKey={"name"}
            />
            <SelectInput
              label={t("sex")}
              rtl
              options={[t("male"), t("female")]}
              form={form}
              formKey={"sex"}
            />
            <SelectInput
              label={t("class")}
              rtl
              options={classRooms}
              itemValue={"id"}
              itemText={"title"}
              form={form}
              formKey={"classId"}
            />
            <FormInput
              label={t("parent-name")}
              rtl
              form={form}
              formKey={"parentName"}
            />
            <FormInput
              label={t("parent-phone")}
              rtl
              form={form}
              formKey={"phoneNo"}
            />
            <FormInput
              label={t("school-fee")}
              rtl
              form={form}
              formKey={"meta.schoolFee"}
            />
            <div className="col-span-2 border p-2 rounded-lg">
              <div className="grid grid-cols-6 gap-2">
                <Label className="col-span-3">{t("term")}</Label>
                <Label className="col-span-2">{t("payment")}</Label>
                <Label>{t("update-wallet")}</Label>
              </div>
              {terms.map((term) => (
                <div
                  className="grid grid-cols-6 gap-2 items-center"
                  key={term.id}
                >
                  <FormField
                    key={term.id}
                    control={form.control}
                    name={`terms.${term.id.toString()}.checked`}
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value as any}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>{term.title}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormInput
                    rtl
                    className={"col-span-2"}
                    form={form}
                    formKey={`terms.${term.id.toString()}.amount`}
                  />
                  <FormField
                    key={term.id}
                    control={form.control}
                    name={`terms.${term.id.toString()}.updateWallet`}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Checkbox
                            checked={field.value as any}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="col-span-2 grid grid-cols-2 border p-2 rounded-lg gap-2">
              <FormField
                control={form.control}
                name={`entranceForm.checked`}
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Checkbox
                        checked={field.value as any}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t("entrance-fee")}</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`entranceForm.updateWallet`}
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Checkbox
                        checked={field.value as any}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t("update-wallet")}</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <div>
              <Btn onClick={save} isLoading={saving}>
                {t("register")}
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
