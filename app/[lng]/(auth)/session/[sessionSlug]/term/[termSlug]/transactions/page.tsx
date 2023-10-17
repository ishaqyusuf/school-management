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
export default async function TransactionsPage({ searchParams, params }) {
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
    include: {
      StudentTermSheet: {
        include: {
          Student: true,
          Term: true,
        },
      },
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
