"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { openModal } from "@/lib/modal";
import { IStudent, IWalletTransactions } from "@/types/types";
import { formatCurrency, sum, termLink, toArabic } from "@/lib/utils";
import Link from "next/link";
import { useAppSelector } from "@/store";
import { Badge } from "../ui/badge";
import { useTranslation } from "@/app/i18n/client";

interface Props {
  list: IWalletTransactions[];
  params;
}
export default function TransactionsListShell({ list, params }: Props) {
  // const _params = useAppSelector((s) => s.slicers?.params);

  const { t } = useTranslation(params.lng);
  return (
    <div className="pb-24">
      <ul>
        {list.map((transaction, i) => (
          <li
            key={i}
            className="text-right border-b p-2"
            onClick={() => {
              // openModal("studentOptions", student);
            }}
          >
            <div className="flex items-center">
              {/* <div className="w-6">
                {toArabic(i + 1)}
                {"."}
              </div> */}
              <div className="">
                <p className="font-semibold">
                  {transaction?.StudentTermSheet?.Student?.name ||
                    transaction.description}
                </p>

                <div className="flex space-x-2 items-center">
                  {transaction.StudentTermSheet && (
                    <p className="text-muted-foreground text-sm">
                      {t("school-fee")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1"></div>
              <p className="font-bold text-lg">
                {toArabic(formatCurrency.format(transaction.amount))}
              </p>
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
