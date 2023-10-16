import { useTranslation } from "@/app/i18n";
import DashboardCard from "@/components/dashboard-card";
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
  // await prisma.wallets.update({
  //   where: { id: 1 },
  //   data: {
  //     academicTermId: 1,
  //     academicYearId: 1,
  //   },
  // });
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
          StudentTermSheets: true,
        },
      },
    },
  });
  if (!term) redirect("/");
  const { t } = await useTranslation(params.lng);

  return (
    <div className="p-4">
      <div className="text-right">
        <p className="font-bold text-3xl">{term.title}</p>
        <p>{term.AcademicYear.title}</p>
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
          title={t("school-wallet")}
          subtitle={t("school-accounting")}
          value={toArabic(formatCurrency.format(sum(wallets, "balance") || 0))}
        />
      </div>
    </div>
  );
}
