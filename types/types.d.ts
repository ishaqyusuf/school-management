import {
  AcademicTerms,
  AcademicYears,
  ClassRoom,
  StudentPayments,
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
  Fees: StudentPayments[];
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
  payment: Partial<StudentPayments>;
  // studentTermId;
  payable;
}
export interface IWalletTransactions extends WalletTransactions {
  payment: StudentPayments & {
    StudentTermSheet: StudentTermSheets & {
      Student: Students;
    };
  };
}
