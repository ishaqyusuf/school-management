"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  children?;
  Icon?;
  disabled?: boolean;
  warn?: boolean;
  onClick?;
}
export default function OptionMenu({
  children,
  Icon,
  disabled,
  warn,
  onClick,
}: Props) {
  return (
    <Button
      variant="ghost"
      disabled={disabled}
      onClick={onClick}
      className={cn(warn && "text-red-500", "flex justify-start")}
    >
      <div className="flex items-center space-x-4">
        {Icon && <Icon className="" />}
        <p className="w-full">{children}</p>
      </div>
    </Button>
  );
}
