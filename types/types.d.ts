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
export interface IStudent extends Students {
  termSheet: StudentTermSheets & {
    ClassRoom: ClassRoom;
  };
  amountOwed;
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
  payable;
}
export interface IWalletTransactions extends WalletTransactions {
  StudentTermSheet: StudentTermSheets & {
    Student: Students;
    Term: AcademicTerms & {
      AcademicYear: AcademicYears;
    };
  };
}
