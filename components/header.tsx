"use client";

import { useTranslation } from "@/app/i18n/client";
import i18next from "i18next";
import { Button } from "./ui/button";
import { ChevronLeft, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModalName } from "@/store/slicers";
import { openModal } from "@/lib/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icons } from "./shared/icons";
import Link from "next/link";
import { termLink } from "@/lib/utils";

interface Props {
  lng;
  back?: Boolean;
  title?;
  filter?: ModalName;
}
export default function Header({
  title,
  back,
  filter,
  ...params
}: Partial<Props>) {
  const { t, i18n } = useTranslation(params.lng);
  const router = useRouter();
  return (
    <div className="relative h-12">
      <div
        className="fixed top-0 w-full bg-white shadow flex justify-between p-2 px-2 items-center"
        onClick={() => {
          // i18next.changeLanguage("en").then((e) => {
          //   //   console.log(lng);
          // });
        }}
      >
        <div className="">
          {/* {back && (
            <Button
              onClick={() => {
                router.back();
              }}
              className="p-1 h-8 w-8"
              variant="secondary"
              size="icon"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )} */}
        </div>
        <p className="font-bold text-lg"> {t(title)}</p>
        <div className="flex-1"></div>
        <div className="flex space-x-2">
          {filter && (
            <Button
              onClick={() => {
                openModal(filter);
              }}
              className="p-1 h-8 w-8"
              variant="secondary"
              size="icon"
            >
              <Filter className="w-4 h-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size={"icon"} variant={"outline"}>
                <Icons.menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={termLink(params, "")}>
                <DropdownMenuItem>{t("dashboard")}</DropdownMenuItem>
              </Link>
              <Link href={termLink(params, "students")}>
                <DropdownMenuItem>{t("students")}</DropdownMenuItem>
              </Link>
              <Link href={termLink(params, "transactions")}>
                <DropdownMenuItem>{t("transactions")}</DropdownMenuItem>
              </Link>
              <Link href={termLink(params, "subjects")}>
                <DropdownMenuItem>{t("subjects")}</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
