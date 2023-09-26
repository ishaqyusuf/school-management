"use client";

import { ThriftCycle } from "@prisma/client";
import MobileList from "../shared/mobile-list";

export default function ThriftListShell({ data }) {
  return (
    <MobileList<ThriftCycle>
      data={data}
      primary={(data) => data.title}
      link={(data) => data.slug}
    />
  );
}
