"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function AuthLayoutComponent({ children, thriftSlug, title }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-12 border-b p-2 px-4 flex justify-between">
        <p className="font-bold text-lg">{title}</p>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="" size="icon" variant="ghost">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["members", "payments", "transactions", "payout"].map((p) => (
                <DropdownMenuItem key={p} asChild>
                  <Link className="capitalize" href={`${thriftSlug}/${p}`}>
                    {p}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 min-h-screen  overflow-auto">{children}</div>
    </div>
  );
}
