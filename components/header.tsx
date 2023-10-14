"use client";

import { useTranslation } from "@/app/i18n/client";
import i18next from "i18next";

export default function Header({ lng }) {
  const { t, i18n } = useTranslation(lng);
  return (
    <div
      className="h-12"
      onClick={() => {
        // i18next.changeLanguage("en").then((e) => {
        //   //   console.log(lng);
        // });
      }}
    >
      a
    </div>
  );
}
