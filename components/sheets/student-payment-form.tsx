"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import {
  IOwingData,
  IPaymentType,
  IStudent,
  MakePaymentData,
} from "@/types/types";
import Btn from "../shared/btn";
import { useState, useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { useParams } from "next/navigation";
import { closeModal } from "@/lib/modal";
import SelectInput from "../shared/select-input";
import { Form, FormField } from "../ui/form";
import { useTranslation } from "@/app/i18n/client";
import { labelValue, toArabic } from "@/lib/utils";
import { Button } from "../ui/button";
import FormInput from "../shared/form-input";
import {
  _getStudentPaymentInformation,
  _makePayment,
  _payEntraceFee,
} from "@/app/_action/_payment";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

export default function StudentPaymentFormSheet({
  lng,
  academicTermsId,
  academicYearsId,
}) {
  const form = useForm<{
    amount;
    type: IPaymentType;
    updateWallet;
  }>({
    defaultValues: {
      amount: "",
      type: "school-fee",

      updateWallet: true,
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
      let payments: MakePaymentData[] = [];
      let balance = amount;
      if (formData.type == "entrance-fee") {
        await _payEntraceFee(data.termSheet.id, {
          academicTermsId,
          academicYearsId,
          amount,
          transaction: "credit",
          updateWallet: formData.updateWallet,
          type: formData.type,
          meta: {} as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any);
        return;
      } else {
        paymentInfo.owingHistory.map((h) => {
          if (balance == 0) return;
          let _amount = balance > h.owing ? balance : h.owing;
          balance -= _amount;
          payments.push({
            ...h,
            payable: h.owing - _amount,
            payment: {
              amount: _amount,
              // payable: h.owing - _amount,
              transaction: "credit",
              type: formData.type,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        });
        await _makePayment({
          // ...h,
          payments,
          ...formData,
          studentId: data.id,
          amount,
        });
      }
      closeModal();
    });
  }
  const quickPayments = [500, 1000, 1500, 2000, 2500, 3000].map((v) => ({
    en: v,
    ar: toArabic(v),
  }));
  const [paymentInfo, setPaymentInfo] = useState<{
    owing;
    studentId;
    owingHistory: IOwingData[];
  }>({} as any);
  async function init(data) {
    const paymentInfo = await _getStudentPaymentInformation(data.id);
    console.log(data);
    setPaymentInfo(paymentInfo as any);
    form.reset({ amount: "", type: "school-fee", updateWallet: true });
  }
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="applyPayment"
      onOpen={(data) => init(data)}
      Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <Form {...form}>
          <div className="">
            <div className="grid gap-4">
              <div className="flex  space-x-4 items-center">
                <Label>{t("amount-owed")}:</Label>
                <Badge variant={"secondary"} className="font-bold text-red-500">
                  {data?.amountOwed}
                </Badge>
              </div>
              <SelectInput
                label={t("payment-type")}
                rtl
                options={[
                  labelValue(t("entrance-fee"), "entrance-fee"),
                  labelValue(t("school-fee"), "school-fee"),
                ]}
                form={form}
                formKey={"type"}
              />
              <FormInput
                label={t("amount")}
                rtl
                form={form}
                formKey={"amount"}
              />
              {/* {form.getValues("updateWallet") ? "true" : "false"} */}
              <FormField
                control={form.control}
                name="updateWallet"
                render={({ field }) => (
                  <Switch
                    checked={field.value as any}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
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
            </div>
            <div className="flex ltr:justify-end mt-4">
              <div>
                <Btn
                  disabled={data?.id != paymentInfo?.studentId}
                  onClick={() => save(data as any)}
                  isLoading={saving}
                >
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
