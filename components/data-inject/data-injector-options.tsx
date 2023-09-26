"use client";

import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { initialize } from "@/app/_actions/init";
import { toast } from "sonner";

export default function DataInjectorOptions({}) {
  async function _action(actn) {
    const res = await actn();
    console.log(res);
    toast.success("Initialized");
  }
  return (
    <div className="fixed bottom-0 right-0 z-[9999]   m-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => _action(initialize)}>
            Initialize
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
