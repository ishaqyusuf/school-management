"use client";

import MobileList from "../shared/mobile-list";
import { formatCurrency, kFormatter } from "@/lib/utils";

export default function MembersListShell({ data }) {
  console.log(data);
  return (
    <MobileList<any>
      data={data}
      primary={(data) => data.User.name}
      secondary={(data) => data.User.phoneNo}
      sn
      slotRight={(data) => kFormatter(data.amount)}
      // link={(data) => data.slug}
    />
  );
}
