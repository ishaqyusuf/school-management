"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import {
  IOwingData,
  IStudent,
  MakePaymentData,
  StudentForm,
} from "@/types/types";
import Btn from "../shared/btn";
import { useState, useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { useParams } from "next/navigation";
import { closeModal } from "@/lib/modal";
import SelectInput from "../shared/select-input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useTranslation } from "@/app/i18n/client";
import { labelValue, toArabic } from "@/lib/utils";
import { Button } from "../ui/button";
import FormInput from "../shared/form-input";
import {
  _getStudentPaymentInformation,
  _makePayment,
  _setStudentTermPayable,
} from "@/app/_action/_payment";
import { Label } from "../ui/label";

import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

export default function UpdateStudentPayableSheet({ lng }) {
  const form = useForm<{
    amount;
    allTerms;
  }>({
    defaultValues: {
      amount: "",
    },
  });
  const amount = form.watch("amount");
  const [saving, startTransition] = useTransition();
  const p = useParams();
  const { t } = useTranslation(lng);
  async function save(data: IStudent) {
    startTransition(async () => {
      const formData = form.getValues();
      const amount = +formData.amount;
      await _setStudentTermPayable({
        payable: amount,
        studentId: data.id,
        studentTermId: data.termSheet.id,
        allTerms: formData.allTerms,
        studentMeta: {
          ...(data.meta || {}),
          schoolFee: amount,
        } as any,
      });
      closeModal();
    });
  }
  const quickPayments = [0, 500, 1000, 1500, 2000, 2500, 3000].map((v) => ({
    en: v,
    ar: toArabic(v),
  }));
  async function init(data) {}
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="updateStudentPayable"
      onOpen={(data) => init(data)}
      Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <Form {...form}>
          <div className="">
            <div className="grid gap-4">
              <div className="flex  space-x-4 items-center">
                <Label>{t("amount-owed")}:</Label>
                <Badge variant={"secondary"} className="font-bold text-red-500">
                  {data?.meta?.schoolFee || 0}
                </Badge>
              </div>
              {/* 

              <FormInput
                label={t("amount")}
                rtl
                form={form}
                formKey={"amount"}
              /> */}
              <div className="flex flex-wrap">
                {quickPayments.map((p) => (
                  <Button
                    onClick={() => {
                      form.setValue("amount", p.en);
                    }}
                    variant={p.en != amount ? "secondary" : "default"}
                    className="p-1 px-4 h-8 m-1"
                    key={p.en}
                  >
                    {p.ar}
                  </Button>
                ))}
              </div>
              <FormField
                control={form.control}
                name="allTerms"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>{t("update-all-terms")}</FormLabel>
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
            <div className="flex ltr:justify-end mt-4">
              <div>
                <Btn onClick={() => save(data as any)} isLoading={saving}>
                  {t("apply")}
                </Btn>
              </div>
            </div>
          </div>
        </Form>
      )}
    />
  );
}
