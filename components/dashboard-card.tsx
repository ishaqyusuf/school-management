"use client";

import { PrimitiveDivProps } from "@radix-ui/react-collapsible";
import LinkNode from "./shared/link-node";
import { cn } from "@/lib/utils";

interface props extends PrimitiveDivProps {
  title?;
  subtitle?;
  value?;
  link?;
}
export default function DashboardCard({
  title,
  subtitle,
  value,
  link,
  className,
}: props) {
  return (
    <LinkNode
      href={link}
      className={cn(
        className,
        "rounded-lg p-4 shadow-xl border border-foreground flex flex-row-reverse justify-between items-end shadow-accent"
      )}
    >
      <div className="">
        <p className="text-right text-primary font-bold text-2xl">{title}</p>
        <div className="text-right text-muted-foreground">{subtitle}</div>
      </div>
      <div className="text-4xl font-bold">{value}</div>
    </LinkNode>
  );
}
