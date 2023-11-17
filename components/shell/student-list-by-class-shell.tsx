"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { openModal } from "@/lib/modal";
import { IClassRoom, IStudent } from "@/types/types";
import { termLink, toArabic } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useTranslation } from "@/app/i18n/client";

interface Props {
  list: IClassRoom[];
  params;
}
export default function StudentListByClassShell({ list, params }: Props) {
  // const _params = useAppSelector((s) => s.slicers?.params);
  const { t } = useTranslation(params.lng);
  return (
    <div className="pb-24">
      {list.map((classRoom) => (
        <div key={classRoom.id}>
          <div className="py-2 font-semibold">
            <p>{classRoom.title}</p>
          </div>
          <ul>
            {classRoom.StudentTermSheets.map((termSheet, i) => (
              <li
                key={i}
                className="text-right border-b p-2"
                onClick={() => {
                  openModal("studentOptions", termSheet.Student);
                }}
              >
                <div className="flex">
                  <div className="w-6">
                    {toArabic(i + 1)}
                    {"."}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{termSheet.Student.name}</p>
                    <div className="flex space-x-2 items-center">
                      <p className="text-muted-foreground text-sm">
                        {classRoom.title}
                      </p>

                      <div className="flex-1"></div>
                      {termSheet.Student.amountOwed > 0 ? (
                        <Badge
                          className="text-red-500  font-bold"
                          variant={"secondary"}
                        >
                          {toArabic(termSheet.Student.amountOwed)}
                        </Badge>
                      ) : termSheet.Student.meta?.schoolFee == 0 ? (
                        <Badge variant={"secondary"} className="text-gray-600">
                          {t("free")}
                        </Badge>
                      ) : (
                        <Badge variant={"secondary"} className="text-green-600">
                          {t("paid")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
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
