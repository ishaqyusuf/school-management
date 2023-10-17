import { prisma } from "@/db";
import StudentOptionSheet from "@/components/sheets/student-option-sheet";
import StudentPaymentFormSheet from "@/components/sheets/student-payment-form";
import SetStudentClassSheet from "@/components/sheets/set-student-class-sheet";
import UpdateStudentPayableSheet from "@/components/sheets/update-student-payable";
import TransactionsListShell from "@/components/shell/transactions-list-shell";
import Header from "@/components/header";
import { useTranslation } from "@/app/i18n";
import TransactionOptionSheet from "@/components/sheets/transaction-option-sheet";
import TransactionFormSheet from "@/components/sheets/transaction-form-sheet";
import { updateWallet } from "@/app/_action/_wallet";
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
  // await updateWallet(-5, 2);
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
