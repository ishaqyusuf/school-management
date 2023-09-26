"use client";

import { ThriftCycle } from "@prisma/client";
import MobileList from "../shared/mobile-list";
import { IParticipants, IUser } from "@/app/types/type";
import { formatCurrency, kFormatter } from "@/lib/utils";

export default function MembersListShell({ data }) {
  console.log(data);
  return (
    <MobileList<IParticipants>
      data={data}
      primary={(data) => data.User.name}
      secondary={(data) => data.User.phoneNo}
      sn
      slotRight={(data) => kFormatter(data.amount)}
      // link={(data) => data.slug}
    />
  );
}
