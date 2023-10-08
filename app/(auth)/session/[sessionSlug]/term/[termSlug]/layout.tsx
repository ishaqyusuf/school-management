"use server";

import Params from "@/components/Params";

export default async function TermLayout({ children, params }) {
  //   console.log(props);
  return (
    <>
      <Params params={params} />
      {children}
    </>
  );
}
