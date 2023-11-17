import { useTranslation } from "@/app/i18n";
import DashboardCard from "@/components/dashboard-card";
import Header from "@/components/header";
import { prisma } from "@/db";
import {
  formatCurrency,
  sum,
  termLink,
  toArabic,
  toEnglish,
} from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "",
};

export default async function HomePage({ searchParams, params }) {
  // const _sum = sum(
  //   await prisma.walletTransactions.findMany({
  //     where: {
  //       updateWallet: true,
  //     },
  //   }),
  //   "amount"
  // );

  const academicTermId = +params.termSlug;
  const wallets = await prisma.wallets.findMany({
    // where: {
    // academicTermId,
    // },
  });
  const term = await prisma.academicTerms.findUnique({
    where: {
      id: academicTermId,
    },
    include: {
      AcademicYear: {
        include: {
          _count: {
            select: {
              ClassRooms: true,
            },
          },
        },
      },
      _count: {
        select: {
          studentTermSheets: true,
        },
      },
    },
  });
  if (!term) redirect("/");
  const { t } = await useTranslation(params.lng);

  return (
    <>
      <Header {...params} title={"dashboard"} />
      <div className="p-4">
        <div className="text-right">
          <p className="font-bold text-3xl">{term.title}</p>
          <p>{term.academicYear.title}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard
            className="col-span-2"
            link={termLink(params, "students")}
            title={t("students")}
            subtitle={t("registered-students")}
            value={toArabic(term._count.StudentTermSheets)}
          />
          <DashboardCard
            className="col-span-2"
            link={termLink(params, "transactions")}
            title={t("wallet")}
            subtitle={t("school-account")}
            value={toArabic(
              formatCurrency.format(sum(wallets, "balance") || 0)
            )}
          />
        </div>
      </div>
    </>
  );
}
