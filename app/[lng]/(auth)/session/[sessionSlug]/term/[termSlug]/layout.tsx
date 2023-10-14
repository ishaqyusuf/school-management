"use server";

import { languages } from "@/app/i18n/settings";
import Params from "@/components/Params";
import Header from "@/components/header";

export default async function TermLayout({ children, params }) {
  //   console.log(props);
  return (
    <>
      <Params params={params} />
      <Header lng={params.lng} />
      {children}
    </>
  );
}
