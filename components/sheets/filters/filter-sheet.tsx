"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "../base-sheet";
import { IStudent } from "@/types/types";
import Btn from "../../shared/btn";
import { useEffect, useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { useParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { useTranslation } from "@/app/i18n/client";
import { toArabic } from "@/lib/utils";
import { Button } from "../../ui/button";
import {
  _getStudentPaymentInformation,
  _makePayment,
  _setStudentTermPayable,
} from "@/app/_action/_payment";
import { Label } from "../../ui/label";

import { Badge } from "../../ui/badge";
import { Switch } from "../../ui/switch";
import { Checkbox } from "../../ui/checkbox";
import { ModalName } from "@/store/slicers";
import { deepCopy } from "@/lib/deep-copy";

interface Props {
  lng;
  query;
  modal: ModalName;
  Content({ form });
}
export default function FilterSheet({ lng, query, Content, modal }: Props) {
  const form = useForm<any>({
    defaultValues: {},
  });
  useEffect(() => {
    console.log(query);
    form.reset({ ...query });
  }, [query]);
  const amount = form.watch("amount");
  const [saving, startTransition] = useTransition();
  const p = useParams();
  const { t } = useTranslation(lng);

  const quickPayments = [0, 500, 1000, 1500, 2000, 2500, 3000].map((v) => ({
    en: v,
    ar: toArabic(v),
  }));
  async function init(data) {}
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName={modal}
      onOpen={(data) => init(data)}
      Title={({ data }) => <div>{t("filter")}</div>}
      Content={({ data }) => (
        <Form {...form}>
          <div className="">
            <div className="grid gap-4">
              {Content && <Content form={form} />}
            </div>
            <div className="flex mt-4">
              <Btn className="w-full" onClick={() => {}} isLoading={saving}>
                {t("apply")}
              </Btn>
            </div>
          </div>
        </Form>
      )}
    />
  );
}
