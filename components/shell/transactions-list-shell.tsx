"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { openModal } from "@/lib/modal";
import { IWalletTransactions } from "@/types/types";
import { cn, formatCurrency, termLink, toArabic } from "@/lib/utils";
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
              openModal("transactionForm", transaction);
            }}
          >
            <div className="flex items-center">
              <div className="">
                <p className="font-semibold">
                  {transaction?.StudentTermSheet?.Student?.name ||
                    transaction.description}
                </p>

                <div className="flex space-x-2 items-center">
                  {transaction.StudentTermSheet && (
                    <p className="text-muted-foreground text-sm">
                      {t("school-fee")} {"("}
                      {transaction.StudentTermSheet?.Term?.title} {")"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1"></div>
              <div>
                <p className="font-bold text-lg">
                  {toArabic(formatCurrency.format(transaction.amount))}
                </p>
                <div
                  className={cn(
                    "rounded-lg w-full h-0.5",
                    transaction.updateWallet ? "bg-green-500" : "bg-orange-500"
                  )}
                ></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-0 right-0 m-4">
        <Button
          onClick={() => openModal("transactionForm")}
          className="w-12 h-12 p-0 rounded-full"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
