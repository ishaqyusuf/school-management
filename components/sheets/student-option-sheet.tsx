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
import { closeModal } from "@/lib/modal";
import { Button } from "../ui/button";
import { cn, labelValue } from "@/lib/utils";

export default function StudentOptionSheet() {
  const [saving, startTransition] = useTransition();
  const p = useParams();
  const actions = [
    labelValue("عدل التفاصيل"),
    labelValue("غير الفصل"),
    labelValue("أزل من الفصل"),
    labelValue("تطبيق الرسوم"),
    labelValue("تعيين الفصل"),
    labelValue("حذف الطالب"),
  ];

  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="studentOptions"
      Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <div className="flex flex-col divide-y text-right">
          {actions.map((Btn, i) => (
            <Button
              key={i}
              variant="ghost"
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
