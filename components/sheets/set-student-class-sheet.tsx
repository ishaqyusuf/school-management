"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { IStudent, StudentForm } from "@/types/types";
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
  _createClassRooms,
  _getClassRooms,
} from "@/app/_action/_class-room";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Form } from "../ui/form";

export default function SetStudentClassSheet({ lng, sessionId, termId }) {
  const [saving, startTransition] = useTransition();

  const { t } = useTranslation(lng);
  const p = useParams();

  const [classrooms, setClassroom] = useState<ClassRoom[]>([]);
  async function init(data) {
    setClassroom(await _getClassRooms(sessionId));
  }
  async function applyNewClass(data) {
    const newClass = form.getValues("class");
    if (newClass) {
      const resp = await _createClassRooms(+sessionId, [newClass]);
      let c = resp.classRooms.find((v) => v.title == newClass);
      if (c) {
        applyClassRoom(data, c);
      } else toast.error(t("error-class"));
    }
  }
  async function applyClassRoom(data: IStudent, classRoom: ClassRoom) {
    if (data.termSheet)
      await _changeStudentClassroom(data.id, sessionId, classRoom.id);
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
  const form = useForm({
    defaultValues: {
      class: null,
    },
  });
  return (
    <BaseSheet<IStudent>
      side="bottom"
      modalName="setClass"
      onOpen={(data) => {
        init(data);
        form.reset({
          class: null,
        });
      }}
      Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <div className="flex flex-col divide-y text-right">
          <Form {...form}>
            <Input {...form.register("class")} />
            <Button onClick={() => applyNewClass(data)} />
          </Form>
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
