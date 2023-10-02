"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { openModal } from "@/lib/modal";

interface Props {}
export default function StudentListShell({}: Props) {
  return (
    <>
      <div className="fixed bottom-0 right-0 m-4">
        <Button
          onClick={() => {
            openModal("studentForm");
          }}
          className="w-12 h-12 p-0 rounded-full"
        >
          <Plus />
        </Button>
      </div>
    </>
  );
}
