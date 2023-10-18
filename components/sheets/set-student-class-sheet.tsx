"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { IStudent, StudentForm } from "@/types/types";
import AutoComplete from "../shared/auto-complete";
import Btn from "../shared/btn";
import { useState, useTransition } from "react";
import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { ClassRoom } from "@prisma/client";
import { useParams } from "next/navigation";
import { closeModal, openModal } from "@/lib/modal";
import { Button } from "../ui/button";
import { cn, labelValue } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";
import {
  _addStudentToClass,
  _changeStudentClassroom,
  _getClassRooms,
} from "@/app/_action/_class-room";
import { toast } from "sonner";

export default function SetStudentClassSheet({ lng, sessionId, termId }) {
  const [saving, startTransition] = useTransition();

  const { t } = useTranslation(lng);
  const p = useParams();

  const [classrooms, setClassroom] = useState<ClassRoom[]>([]);
  async function init(data) {
    setClassroom(await _getClassRooms(sessionId));
  }
  async function applyClassRoom(data: IStudent, classRoom: ClassRoom) {
    if (data.termSheet)
      await _changeStudentClassroom(data.termSheet.id, classRoom.id);
    else
      await _addStudentToClass(
        data.id,
        classRoom.id,
        termId,
        data.meta?.schoolFee || 0
      );
    closeModal();
    toast.success(t("success"));
  }
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="setClass"
      onOpen={(data) => {
        init(data);
      }}
      Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <div className="flex flex-col divide-y text-right">
          {classrooms.map((classRoom, i) => (
            <Button
              key={i}
              variant="ghost"
              onClick={() => applyClassRoom(data as any, classRoom)}
              className={cn(
                data?.termSheet?.id == classRoom.id && "text-green-500"
              )}
            >
              <p className="text-right w-full">{classRoom.title}</p>
            </Button>
          ))}
        </div>
      )}
    />
  );
}
