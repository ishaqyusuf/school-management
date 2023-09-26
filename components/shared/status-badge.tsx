"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface Props {
  status?;
  children?;
}
export default function StatusBadge({ status, children }: Props) {
  if (!status) status = children;
  const color = getBadgeColor(status);
  return <Badge className={cn(color)}>{status}</Badge>;
}
export function getBadgeColor(status: string | null) {
  let color: Colors | undefined = status
    ? StatusColorMap[(status?.toLowerCase() || "").replace(" ", "_")]
    : "slate";
  if (!color) color = "slate";
  return `bg-${color}-500 hover:bg-${color}-600`;
}

let StatusColorMap: { [key: string]: Colors } = {
  queued: "orange",
  completed: "green",
  paid: "green",
  available: "green",
  started: "blue",
  scheduled: "blue",
  incomplete: "orange",
  unknown: "orange",
  late: "red",
  in_transit: "fuchsia",
  order_placed: "sky",
  arrived_warehouse: "emerald",
  item_not_available: "orange",
};

export type Colors =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "lightBlue"
  | "warmGray"
  | "trueGray"
  | "coolGray"
  | "blueGray";
