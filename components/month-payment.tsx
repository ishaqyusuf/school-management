"use client";

import { IMonthWallet } from "@/app/types/type";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { kFormatter } from "@/lib/utils";
import StatusBadge from "./shared/status-badge";

interface Props {
  month: IMonthWallet;
}
export default function MonthPayment({ month }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(month);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">{month.title}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDownIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {/* <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div> */}
      <CollapsibleContent className="space-y-2">
        {month.Payments.map((payment) => (
          <div key={payment.id} className="border-b px-4 py-3 text-sm flex ">
            <div className="">
              <p>{payment.Users.name}</p>
              <div className="inline-flex">
                <p>{kFormatter(payment.payable)}</p>
                <StatusBadge>paid</StatusBadge>
              </div>
            </div>
            <div className="flex-1"></div>
            <div>
              <Button className="p-2 w-8 h-8" variant="outline" size="icon">
                <Check className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
