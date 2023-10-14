import { useTranslation } from "@/app/i18n";
import DashboardCard from "@/components/dashboard-card";
import { prisma } from "@/db";
import { termLink, toArabic, toEnglish } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "",
};

export default async function HomePage({ searchParams, params }) {
  const term = await prisma.academicTerms.findUnique({
    where: {
      id: +params.termSlug,
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
        <div className="col-span-2">
          <DashboardCard
            link={termLink(params, "students")}
            title={t("students")}
            subtitle={t("registered-students")}
            value={toArabic(term._count.StudentTermSheets)}
          />
        </div>
      </div>
    </div>
  );
}
