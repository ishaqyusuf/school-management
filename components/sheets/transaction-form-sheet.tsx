"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { IStudent, IWalletTransactions } from "@/types/types";
import Btn from "../shared/btn";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { useParams } from "next/navigation";
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

export default function TransactionFormSheet({
  lng,
  academicTermsId,
  academicYearsId,
}) {
  const form = useForm<IWalletTransactions>({
    defaultValues: {},
  });
  const [saving, startTransition] = useTransition();

  const { t } = useTranslation(lng);
  async function save(data: IStudent) {
    startTransition(async () => {
      const formData = form.getValues();
      const amount = +formData.amount;
      await _createTransaction({
        ...formData,
        amount,
        academicTermsId,
        academicYearsId,
      });
      closeModal();
    });
  }

  async function init(data) {
    form.reset({ transaction: "credit", updateWallet: true });
  }
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="transactionForm"
      onOpen={(data) => init(data)}
      Title={({ data }) => <div>{data?.name}</div>}
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
                <Btn onClick={save} isLoading={saving}>
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
