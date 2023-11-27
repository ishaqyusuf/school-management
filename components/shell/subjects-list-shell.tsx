"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { openModal } from "@/lib/modal";
import { IClassRoom, IWalletTransactions } from "@/types/types";
import { cn, formatCurrency, toArabic } from "@/lib/utils";
import { useTranslation } from "@/app/i18n/client";
import { Icons } from "../shared/icons";

interface Props {
  list: IClassRoom[];
  params;
}
export default function SubjectListShell({ list, params }: Props) {
  // const _params = useAppSelector((s) => s.slicers?.params);

  const { t } = useTranslation(params.lng);
  return (
    <div className="pb-24">
      {list.map((classRoom) => (
        <div key={classRoom.id}>
          <div className="p-2 bg-slate-100 px-4 font-semibold">
            <p>{classRoom.title}</p>
          </div>
          <ul>
            {classRoom.sessionSubjects.map((sessionSubject, i) => (
              <li
                key={i}
                className="border-b p-2"
                onClick={() => {
                  openModal("sessionSubjectOption", sessionSubject);
                }}
              >
                <div className="flex items-center">
                  <div className="">
                    <p className="font-semibold">
                      {sessionSubject?.subject?.title}
                    </p>

                    <div className="flex space-x-2 items-center text-muted-foreground text-sm"></div>
                  </div>
                  <div className="flex-1"></div>
                  <div className=""></div>
                  <div></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="fixed bottom-0 right-0 m-4">
        <Button
          onClick={() => openModal("subjectForm")}
          className="w-12 h-12 p-0 rounded-full"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
