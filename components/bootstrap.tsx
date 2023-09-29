"use client";

import { _bootstrap } from "@/app/_action/bootstrap";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function Boostrap({}) {
  async function _init() {
    console.log(await _bootstrap());
    toast.success("Bootstraped!");
  }
  return (
    <div className="fixed m-4 z-[9999] right-0 bottom-0">
      <Button onClick={_init}>Bootstrap</Button>
    </div>
  );
}
