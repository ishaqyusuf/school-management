"use client";

import BaseSheet from "./base-sheet";
import { IStudent } from "@/types/types";

import { useState, useTransition } from "react";
import {
  _createStudent,
  _deleteStudent,
  _updateStudent,
} from "@/app/_action/_student";
import { closeModal, openModal } from "@/lib/modal";
import { Button } from "../ui/button";
import { cn, labelValue } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";
import { toast } from "sonner";

export default function StudentOptionSheet({ lng }) {
  const [saving, startTransition] = useTransition();

  const { t } = useTranslation(lng);
  const [actions, setActions] = useState<any[]>([]);
  function init(data?: IStudent) {
    if (data) {
      setActions([
        labelValue(
          t("edit-details"),
          (data) => {
            openModal("studentForm", data);
          },
          {}
        ),
        // labelValue(t("change-class")),
        labelValue(t("remove-from-class"), (data) => {}, {
          disabled: data.termSheet == null,
        }),
        labelValue(
          t("update-payable"),
          (data) => {
            openModal("updateStudentPayable", data);
          },
          { disabled: data.termSheet == null }
        ),
        labelValue(
          t("apply-payment"),
          (data) => {
            openModal("applyPayment", data);
          }
          // { disabled: !data.amountOwed }
        ),
        labelValue(t("set-class"), (data) => {
          openModal("setClass", data);
        }),
        labelValue(t("delete-student"), async (data) => {
          console.log(data);
          await _deleteStudent(data.id);
          toast.success(t("success"));
          closeModal();
        }),
      ]);
    }
  }
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="studentOptions"
      onOpen={(data) => {
        init(data);
      }}
      Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <div className="flex flex-col divide-y text-right">
          {actions.map((Btn, i) => (
            <Button
              key={i}
              variant="ghost"
              disabled={Btn.extras.disabled}
              onClick={() => Btn.value(data)}
              className={cn(actions.length - 1 == i && "text-red-500")}
            >
              <p className="text-right w-full">{Btn.label}</p>
            </Button>
          ))}
        </div>
      )}
    />
  );
}
