import {
  AcademicTerms,
  AcademicYears,
  ClassRoom,
  StudentTermSheets,
  Students,
  WalletTransactions,
} from "@prisma/client";

export interface StudentForm {
  name?;
  parentName?;
  phoneNo?;
  termId?;
  id?;
  classId?;
  sex;
  termSheetId?;
  meta: {
    schoolFee?;
  };
}
export interface PaymentForm {}
export interface IStudentTermSheet extends StudentTermSheets {
  Student: Students;
  ClassRoom: ClassRoom;
}
export interface IStudent extends Omit<Students, "meta"> {
  termSheet: StudentTermSheets & {
    ClassRoom: ClassRoom;
  };
  amountOwed;
  meta: IStudentMeta;
}
export interface IStudentMeta {
  schoolFee: number;
}
export interface IStudentFormTerms {
  id;
  amount;
  updateWallet;
}
export interface IStudentTermSheet extends Omit<StudentTermSheets, "meta"> {
  meta: {
    payable: number;
  };
  Transactions: WalletTransactions[];
  Term: AcademicTerms & {
    AcademicYear: AcademicYears;
  };
}
export interface IOwingData {
  term;
  owing;
  termId;
  yearId;
  studentTermId;
}
export interface MakePaymentData extends IOwingData {
  payment: Partial<WalletTransactions>;
  // studentTermId;
  // payable;
}
export type IPaymentType = "school-fee" | "other-payment" | "entrance-fee";
export interface IWalletTransactions
  extends Omit<WalletTransactions, "transaction" | "type"> {
  transaction: "credit" | "debit";
  type: IPaymentType;
  AcademicTerm: AcademicTerms & {
    AcademicYear: AcademicYears;
  };
  StudentTermSheet: StudentTermSheets & {
    Student: Students;
  };
}
