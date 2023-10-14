"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { IStudent, StudentForm } from "@/types/types";
import AutoComplete from "../shared/auto-complete";
import Btn from "../shared/btn";
import { useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { ClassRoom } from "@prisma/client";
import { useParams } from "next/navigation";
import { closeModal, openModal } from "@/lib/modal";
import { Button } from "../ui/button";
import { cn, labelValue } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";

export default function StudentOptionSheet({ lng }) {
  const [saving, startTransition] = useTransition();

  const { t } = useTranslation(lng);
  const p = useParams();
  const actions = [
    labelValue(t("edit-details")),
    labelValue(t("change-class")),
    labelValue(t("remove-from-class")),
    labelValue(t("apply-payment"), (data) => {
      openModal("applyPayment", data);
    }),
    labelValue(t("set-class")),
    labelValue(t("delete-student")),
  ];

  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="studentOptions"
      onOpen={(data) => {}}
      Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <div className="flex flex-col divide-y text-right">
          {actions.map((Btn, i) => (
            <Button
              key={i}
              variant="ghost"
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
