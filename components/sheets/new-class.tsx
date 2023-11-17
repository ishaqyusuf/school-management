"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { IStudent, IWalletTransactions } from "@/types/types";
import Btn from "../shared/btn";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { closeModal } from "@/lib/modal";
import SelectInput from "../shared/select-input";
import { Form, FormField } from "../ui/form";
import { useTranslation } from "@/app/i18n/client";
import { labelValue } from "@/lib/utils";
import FormInput from "../shared/form-input";
import {
  _getStudentPaymentInformation,
  _makePayment,
} from "@/app/_action/_payment";
import { Switch } from "../ui/switch";
import { _createTransaction } from "@/app/_action/_transaction";
import { deepCopy } from "@/lib/deep-copy";

export default function NewClassFormSheet({
  lng,
  academicTermsId,
  academicYearsId,
}) {
  const form = useForm<IWalletTransactions>({
    defaultValues: {},
  });
  const [saving, startTransition] = useTransition();

  const { t } = useTranslation(lng);
  async function save(data: IWalletTransactions) {
    startTransition(async () => {
      const formData = deepCopy<IWalletTransactions>(form.getValues());
      console.log(formData);
      const amount = +formData.amount;
      console.log([data]);
      await _createTransaction(
        {
          ...formData,
          amount,
          academicTermsId,
          academicYearsId,
        },
        data
          ? {
              academicTermsId: data.academicYearsId,
              amount: data.amount,
              id: data.id,
              transaction: data.transaction,
              updateWallet: data.updateWallet,
            }
          : (null as any)
      );
      closeModal();
    });
  }

  async function init(data) {
    // console.log(data);
    form.reset(
      ...(data || {
        transaction: "credit",
        updateWallet: true,
        type: "other-payment",
      })
    );
  }
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="newClass"
      onOpen={(data) => init(data)}
      // Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <Form {...form}>
          <div className="">
            <div className="grid gap-4">
              <SelectInput
                label={t("transaction")}
                rtl
                options={[
                  labelValue(t("credit"), "credit"),
                  labelValue(t("debit"), "debit"),
                ]}
                form={form}
                formKey={"transaction"}
              />
              <SelectInput
                label={t("payment-type")}
                rtl
                options={[
                  labelValue(t("entrance-fee"), "entrance-fee"),
                  labelValue(t("school-fee"), "school-fee"),
                  labelValue(t("salary"), "salary"),
                  labelValue(t("other-payment"), "other-payment"),
                ]}
                form={form}
                formKey={"type"}
              />
              <FormInput
                label={t("description")}
                rtl
                form={form}
                formKey={"description"}
              />
              <FormInput
                label={t("amount")}
                rtl
                type="number"
                form={form}
                formKey={"amount"}
              />
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
