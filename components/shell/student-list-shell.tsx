"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { openModal } from "@/lib/modal";
import { IStudent } from "@/types/types";
import { toArabic } from "@/lib/utils";

interface Props {
  list: IStudent[];
}
export default function StudentListShell({ list }: Props) {
  return (
    <div className="">
      <ul>
        {list.map((student, i) => (
          <li
            key={i}
            className="text-right border-b p-2"
            onClick={() => {
              openModal("studentOptions", student);
            }}
          >
            <div className="inline-flex flex-row-reverse">
              <div className="w-6">
                {"."}
                {toArabic(i + 1)}
              </div>
              <div className="">
                <p className="font-semibold">{student.name}</p>
                <p className="text-muted-foreground text-sm">
                  {student.termSheet?.ClassRoom?.title}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-0 right-0 m-4">
        <Button
          onClick={() => {
            openModal("studentForm");
          }}
          className="w-12 h-12 p-0 rounded-full"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
