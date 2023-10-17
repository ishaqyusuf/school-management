"use client";

import { useTranslation } from "@/app/i18n/client";
import i18next from "i18next";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  lng;
  back?: Boolean;
  title?;
}
export default function Header({ lng, title }: Props) {
  const { t, i18n } = useTranslation(lng);
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
        <div className=""></div>
        <p className="font-bold text-lg"> {t(title)}</p>
        <div className="">
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
        </div>
      </div>
    </div>
  );
}
