import { prisma } from "@/db";
import SetStudentClassSheet from "@/components/sheets/set-student-class-sheet";

import TransactionsListShell from "@/components/shell/transactions-list-shell";
import Header from "@/components/header";
import TransactionOptionSheet from "@/components/sheets/transaction-option-sheet";
import { _updateWallet } from "@/app/_action/_wallet";
import TransactionFormSheet from "@/components/sheets/transaction-form-sheet";
export default async function TransactionsPage({ searchParams, params }) {
  // await prisma.walletTransactions.updateMany({
  //   data: {
  //     updateWallet: false,
  //   },
  // });
  // await prisma.wallets.create({
  //   data: {
  //     id: 2,
  //     academicTermId: 2,
  //     academicYearId: 1,
  //     balance: 0,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // });
  // await prisma.wallets.updateMany({
  //   data: {
  //     balance: 0,
  //   },
  // });
  // await prisma.walletTransactions.deleteMany({
  //   where: {
  //     amount: {
  //       in: [5],
  //     },
  //   },
  // });
  // await _updateWallet(-5, 2);
  // await prisma.walletTransactions.updateMany({
  //   where: {
  //     amount: {
  //       in: [5670, 5],
  //     },
  //   },
  //   data: {
  //     updateWallet: false,
  //   },
  // });
  // await prisma.walletTransactions.deleteMany({});
  // await prisma.wallets.updateMany({
  //   data: {
  //     balance: 0,
  //   },
  // });
  // await prisma.studentTermSheets.updateMany({
  //   data: {
  //     owing: 3000,
  //   },
  // });
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
  // console.log(classRooms);
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
