"use client";

import { useForm } from "react-hook-form";
import BaseSheet from "./base-sheet";
import { IStudent, IWalletTransactions, StudentForm } from "@/types/types";
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
import OptionMenu from "../shared/option-menu";
import { Delete, Trash } from "lucide-react";
import {
  _includeTransaction,
  _omitTransaction,
} from "@/app/_action/_transaction";

export default function TransactionOptionSheet({ lng }) {
  const [saving, startTransition] = useTransition();

  const { t } = useTranslation(lng);
  async function omitTransaction(data: IWalletTransactions) {
    await _omitTransaction(data.id, data.amount, data.academicTermsId);
    closeModal();
  }
  async function includeTransaction(data: IWalletTransactions) {
    await _includeTransaction(data.id, data.amount, data.academicTermsId);
    closeModal();
  }
  return (
    <BaseSheet<IWalletTransactions>
      side="bottom"
      modalName="transactionOption"
      onOpen={(data) => {}}
      // Title={({ data }) => <div>{data?.name}</div>}
      Content={({ data }) => (
        <div className="flex flex-col divide-y">
          {data?.updateWallet ? (
            <OptionMenu onClick={() => omitTransaction(data as any)}>
              {t("omit-transaction")}
            </OptionMenu>
          ) : (
            <OptionMenu onClick={() => includeTransaction(data as any)}>
              {t("include-transaction")}
            </OptionMenu>
          )}
          <OptionMenu onClick={() => openModal("transactionForm", data)}>
            {t("edit")}
          </OptionMenu>
          <OptionMenu warn>{t("delete")}</OptionMenu>
        </div>
      )}
    />
  );
}
