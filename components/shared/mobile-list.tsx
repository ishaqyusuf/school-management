"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import LinkNode from "./link-node";

interface Props<T> {
  data: T[];
  primary?(data: T);
  secondary?(data: T);
  slotRight?(data: T);
  slotLeft?(data: T);
  text?(data: T);
  Item?(data: T);
  link?(data: T);
  sn?: Boolean;
}
export default function MobileList<T>({
  data,
  primary,
  secondary,
  slotRight,
  slotLeft,
  text,
  Item,
  link,
  sn,
}: Props<T>) {
  return (
    <ul className="">
      {data?.map((l, i) => {
        const _link = link ? link(l) : null;

        const nodeProps: any = {};
        if (_link) nodeProps.href = _link;
        const pr = primary && primary(l);
        const sec = secondary && secondary(l);
        const txt = text && text(l);
        return (
          <li className="" key={i}>
            <LinkNode
              href={_link}
              {...nodeProps}
              className={cn("flex space-x-2 text-sm border-b p-2 px-4")}
            >
              {sn && <p className="">{i + 1}.</p>}

              <div id="mainData" className="flex flex-col space-y-1">
                {pr && <p className="font-semibold">{pr}</p>}
                {sec && <p className="text-muted-foreground">{sec}</p>}
                {txt && <p className="">{txt}</p>}
              </div>
              <div className="flex-1"></div>
              {slotRight && (
                <div className="text-muted-foreground font-semibold">
                  {slotRight(l)}
                </div>
              )}
            </LinkNode>
          </li>
        );
      })}
    </ul>
  );
}
