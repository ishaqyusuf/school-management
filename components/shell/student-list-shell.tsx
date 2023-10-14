"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { openModal } from "@/lib/modal";
import { IStudent } from "@/types/types";
import { termLink, toArabic } from "@/lib/utils";
import Link from "next/link";
import { useAppSelector } from "@/store";
import { Badge } from "../ui/badge";

interface Props {
  list: IStudent[];
  params;
}
export default function StudentListShell({ list, params }: Props) {
  // const _params = useAppSelector((s) => s.slicers?.params);
  return (
    <div className="pb-24">
      <ul>
        {list.map((student, i) => (
          <li
            key={i}
            className="text-right border-b p-2"
            onClick={() => {
              openModal("studentOptions", student);
            }}
          >
            <div className="flex">
              <div className="w-6">
                {toArabic(i + 1)}
                {"."}
              </div>
              <div className="">
                <p className="font-semibold">{student.name}</p>
                <div className="flex space-x-2 items-center">
                  <p className="text-muted-foreground text-sm">
                    {student.termSheet?.ClassRoom?.title}
                  </p>
                  <div className="flex-1"></div>
                  {student.amountOwed > 0 ? (
                    <Badge className="text-red-400" variant={"secondary"}>
                      -{toArabic(student.amountOwed)}
                    </Badge>
                  ) : (
                    <Badge variant={"secondary"} className="text-green-600">
                      تم الدفع
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-0 right-0 m-4">
        <Button asChild className="w-12 h-12 p-0 rounded-full">
          <Link href={termLink(params, "student/form/-1")}>
            <Plus />
          </Link>
        </Button>
      </div>
    </div>
  );
}
