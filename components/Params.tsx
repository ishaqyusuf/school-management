"use client";

import { openModal } from "@/lib/modal";
import { dispatchSlice } from "@/store/slicers";
import { useEffect } from "react";

export default function Params({ params }) {
  useEffect(() => {
    dispatchSlice("params", params);
  }, [params]);
  return <></>;
}
