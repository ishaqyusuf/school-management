import { prisma } from "@/db";
import SetStudentClassSheet from "@/components/sheets/set-student-class-sheet";

import TransactionsListShell from "@/components/shell/transactions-list-shell";
import Header from "@/components/header";
import TransactionOptionSheet from "@/components/sheets/transaction-option-sheet";
import TransactionFormSheet from "@/components/sheets/transaction-form-sheet";
import { _updateWallet } from "@/app/_action/_wallet";
export default async function SubjectsPage({ searchParams, params }) {
  const transactions = await prisma.walletTransactions.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      StudentTermSheet: {
        include: {
          Student: true,
        },
      },
      AcademicTerm: true,
    },
  });

  return (
    <div className="">
      <Header lng={params.lng} title="transactions" back />
      <TransactionsListShell params={params} list={transactions as any} />

      <TransactionOptionSheet lng={params.lng} />
      <SetStudentClassSheet
        lng={params.lng}
        termId={+params.termSlug}
        sessionId={+params.sessionSlug}
      />
      <TransactionFormSheet
        lng={params.lng}
        academicTermsId={+params.termSlug}
        academicYearsId={+params.sessionSlug}
      />
    </div>
  );
}
